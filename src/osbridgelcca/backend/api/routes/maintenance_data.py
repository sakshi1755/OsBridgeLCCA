from flask import Blueprint, request, jsonify
import sys
import os

# Add the core module to the path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'core'))

try:
    from cost_component import PeriodicMaintenanceCost, RoutineInspectionCost, RepairAndRehabilitationCost
except ImportError:
    # Fallback if import fails
    class PeriodicMaintenanceCost:
        def __init__(self, maintenance_cost_rate, construction_cost, discount_rate, period, design_life):
            pwf = sum(1 / ((1 + discount_rate) ** (i * period)) for i in range(1, int(design_life / period) + 1))
            self.amount = maintenance_cost_rate * construction_cost * pwf
            self.maintenance_cost_rate = maintenance_cost_rate
            self.construction_cost = construction_cost
            self.discount_rate = discount_rate
            self.period = period
            self.design_life = design_life
            self.present_worth_factor = pwf
        
        def calculate_cost(self):
            return self.maintenance_cost_rate * self.construction_cost * self.present_worth_factor

    class RoutineInspectionCost:
        def __init__(self, quantity, rate, discount_rate, design_life):
            pwf = sum(1 / ((1 + discount_rate) ** i) for i in range(1, design_life + 1))
            self.amount = quantity * rate * pwf
            self.quantity = quantity
            self.rate = rate
            self.present_worth_factor = pwf
        
        def calculate_cost(self):
            return self.quantity * self.rate * self.present_worth_factor

    class RepairAndRehabilitationCost:
        def __init__(self, repair_cost_rate, construction_cost, discount_rate, period, design_life):
            pwf = sum(1 / ((1 + discount_rate) ** (i * period)) for i in range(1, int(design_life / period) + 1))
            self.amount = repair_cost_rate * construction_cost * pwf
        
        def calculate_cost(self):
            return self.amount

maintenance_data_bp = Blueprint('maintenance_data', __name__)

# Storage for maintenance data
maintenance_data_storage = []

@maintenance_data_bp.route('/api/save-maintenance-data', methods=['POST'])
def save_maintenance_data():
    try:
        data = request.get_json()
        
        # Add timestamp and save to storage
        import datetime
        data['timestamp'] = datetime.datetime.now().isoformat()
        maintenance_data_storage.append(data)
        
        return jsonify({
            'message': 'Maintenance data saved successfully',
            'total_records': len(maintenance_data_storage)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@maintenance_data_bp.route('/api/calculate-maintenance-costs', methods=['POST'])
def calculate_maintenance_costs():
    try:
        data = request.get_json()
        
        # Extract form data
        periodic_maintenance_rate = float(data.get('periodicMaintenanceCost', 0.55))
        routine_inspection_cost = float(data.get('annualRoutineInspectionCost', 1))
        repair_rehab_rate = float(data.get('repairRehabilitationCost', 10))
        periodic_frequency = int(data.get('frequencyOfPeriodicMaintenance', 5))
        inspection_frequency = int(data.get('frequencyOfRoutineInspection', 1))
        
        # You'll need to get these values from previous forms or set defaults
        # For now, using placeholder values - you should modify this based on your data flow
        construction_cost = data.get('constructionCost', 1000000)  # Get from previous form data
        discount_rate = data.get('discountRate', 0.08)  # Get from financial data
        design_life = data.get('designLife', 50)  # Get from project data
        
        # Calculate Periodic Maintenance Cost
        periodic_maintenance = PeriodicMaintenanceCost(
            maintenance_cost_rate=periodic_maintenance_rate / 100,  # Convert percentage to decimal
            construction_cost=construction_cost,
            discount_rate=discount_rate,
            period=periodic_frequency,
            design_life=design_life
        )
        
        # Calculate Routine Inspection Cost
        # Assuming quantity is 1 (bridge unit) and rate is the annual cost
        routine_inspection = RoutineInspectionCost(
            quantity=1,
            rate=routine_inspection_cost * construction_cost / 100,  # Convert percentage to amount
            discount_rate=discount_rate,
            design_life=design_life
        )
        
        # Calculate Repair and Rehabilitation Cost
        # Assuming repair happens every 15-20 years (you can make this configurable)
        repair_period = data.get('repairPeriod', 15)
        repair_rehabilitation = RepairAndRehabilitationCost(
            repair_cost_rate=repair_rehab_rate / 100,  # Convert percentage to decimal
            construction_cost=construction_cost,
            discount_rate=discount_rate,
            period=repair_period,
            design_life=design_life
        )
        
        # Calculate costs
        periodic_cost = periodic_maintenance.calculate_cost()
        inspection_cost = routine_inspection.calculate_cost()
        repair_cost = repair_rehabilitation.calculate_cost()
        
        total_maintenance_cost = periodic_cost + inspection_cost + repair_cost
        
        # Print to console as requested
        print(f"=== MAINTENANCE AND REPAIR COST CALCULATION ===")
        print(f"Construction Cost: Rs {construction_cost:,.2f}")
        print(f"Discount Rate: {discount_rate*100:.2f}%")
        print(f"Design Life: {design_life} years")
        print(f"")
        print(f"Periodic Maintenance Cost Rate: {periodic_maintenance_rate}%")
        print(f"Periodic Maintenance Frequency: Every {periodic_frequency} years")
        print(f"Calculated Periodic Maintenance Cost: Rs {periodic_cost:,.2f}")
        print(f"")
        print(f"Annual Routine Inspection Cost Rate: {routine_inspection_cost}%")
        print(f"Inspection Frequency: Every {inspection_frequency} year(s)")
        print(f"Calculated Routine Inspection Cost: Rs {inspection_cost:,.2f}")
        print(f"")
        print(f"Repair & Rehabilitation Cost Rate: {repair_rehab_rate}%")
        print(f"Repair Period: Every {repair_period} years")
        print(f"Calculated Repair & Rehabilitation Cost: Rs {repair_cost:,.2f}")
        print(f"")
        print(f"TOTAL MAINTENANCE COST: Rs {total_maintenance_cost:,.2f}")
        print(f"===============================================")
        
        return jsonify({
            'periodic_maintenance_cost': periodic_cost,
            'routine_inspection_cost': inspection_cost,
            'repair_rehabilitation_cost': repair_cost,
            'total_maintenance_cost': total_maintenance_cost,
            'calculation_details': {
                'construction_cost': construction_cost,
                'discount_rate': discount_rate,
                'design_life': design_life,
                'periodic_maintenance_rate': periodic_maintenance_rate,
                'periodic_frequency': periodic_frequency,
                'routine_inspection_rate': routine_inspection_cost,
                'inspection_frequency': inspection_frequency,
                'repair_rehabilitation_rate': repair_rehab_rate,
                'repair_period': repair_period
            },
            'message': 'Maintenance costs calculated successfully'
        }), 200
        
    except Exception as e:
        print(f"Error in maintenance cost calculation: {str(e)}")
        return jsonify({'error': f'Calculation failed: {str(e)}'}), 500

@maintenance_data_bp.route('/api/get-maintenance-data', methods=['GET'])
def get_maintenance_data():
    try:
        return jsonify({
            'maintenance_data': maintenance_data_storage,
            'total_records': len(maintenance_data_storage)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500