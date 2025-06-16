from flask import Blueprint, request, jsonify
import sys
import os

# Add the core module to the path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'core'))

try:
    from cost_component import RoadUserCost
except ImportError:
    # Fallback if import fails
    class RoadUserCost:
        def __init__(self, vehicles_affected, vehicle_operation_cost, construction_time):
            self.vehicles_affected = vehicles_affected
            self.vehicle_operation_cost = vehicle_operation_cost
            self.construction_time = construction_time
            self.amount = vehicles_affected * vehicle_operation_cost * construction_time
        
        def calculate_cost(self):
            return self.vehicles_affected * self.vehicle_operation_cost * self.construction_time

traffic_analysis_bp = Blueprint('traffic_analysis', __name__)

# Storage for traffic data
traffic_data_storage = []

@traffic_analysis_bp.route('/api/save-traffic-data', methods=['POST'])
def save_traffic_data():
    try:
        data = request.get_json()
        
        # Add timestamp and save to storage
        import datetime
        data['timestamp'] = datetime.datetime.now().isoformat()
        traffic_data_storage.append(data)
        
        return jsonify({
            'message': 'Traffic data saved successfully',
            'total_records': len(traffic_data_storage)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@traffic_analysis_bp.route('/api/calculate-road-user-cost', methods=['POST'])
def calculate_road_user_cost():
    try:
        data = request.get_json()
        
        # Extract data with defaults
        num_lanes = data.get('numberOfLanes', '')
        reroute_distance = float(data.get('additionalReRouteDistance', 0) or 0)
        road_type = data.get('typeOfRoad', '')
        vehicle_composition = data.get('vehicleComposition', {})
        
        # Calculate total vehicles affected (simplified calculation)
        # You can adjust these multipliers based on your business logic
        lane_multiplier = {
            'Single lane': 1000,
            'Intermediate lane': 2000,
            'Multi-lane': 3000
        }.get(num_lanes, 1500)
        
        # Calculate total vehicles from composition
        total_vehicles = 0
        for vehicle_type, count in vehicle_composition.items():
            try:
                total_vehicles += int(count or 0)
            except (ValueError, TypeError):
                continue
        
        # If no vehicle composition provided, use lane-based estimate
        if total_vehicles == 0:
            total_vehicles = lane_multiplier
        
        # Vehicle operation cost per km (you can adjust these rates)
        vehicle_operation_cost_per_km = 15.0  # Rs per km per vehicle
        
        # Construction time in days (you can make this configurable)
        construction_time_days = 365  # 1 year default
        
        # Calculate total cost
        # Cost = vehicles_affected * additional_distance * cost_per_km * construction_days
        vehicles_affected = total_vehicles
        total_distance_cost = reroute_distance * vehicle_operation_cost_per_km
        
        # Create RoadUserCost instance
        road_user_cost = RoadUserCost(
            vehicles_affected=vehicles_affected,
            vehicle_operation_cost=total_distance_cost,
            construction_time=construction_time_days
        )
        
        calculated_cost = road_user_cost.calculate_cost()
        
        # Print to console as requested
        print(f"=== ROAD USER COST CALCULATION ===")
        print(f"Vehicles Affected: {vehicles_affected}")
        print(f"Additional Re-route Distance: {reroute_distance} km")
        print(f"Vehicle Operation Cost per km: Rs {vehicle_operation_cost_per_km}")
        print(f"Construction Time: {construction_time_days} days")
        print(f"Total Road User Cost: Rs {calculated_cost:,.2f}")
        print(f"=====================================")
        
        return jsonify({
            'road_user_cost': calculated_cost,
            'calculation_details': {
                'vehicles_affected': vehicles_affected,
                'reroute_distance': reroute_distance,
                'vehicle_operation_cost_per_km': vehicle_operation_cost_per_km,
                'construction_time_days': construction_time_days,
                'lane_type': num_lanes,
                'total_vehicles_from_composition': sum(int(v or 0) for v in vehicle_composition.values() if str(v).isdigit())
            },
            'message': 'Road user cost calculated successfully'
        }), 200
        
    except Exception as e:
        print(f"Error in road user cost calculation: {str(e)}")
        return jsonify({'error': f'Calculation failed: {str(e)}'}), 500

@traffic_analysis_bp.route('/api/get-traffic-data', methods=['GET'])
def get_traffic_data():
    try:
        return jsonify({
            'traffic_data': traffic_data_storage,
            'total_records': len(traffic_data_storage)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500