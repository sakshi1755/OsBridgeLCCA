from flask import Blueprint, request, jsonify
import json
import os

maintenance_data_bp = Blueprint('maintenance_data', __name__)

# Storage for maintenance data
maintenance_storage = {}

@maintenance_data_bp.route('/api/save-maintenance-data', methods=['POST'])
def save_maintenance_data():
    """Save maintenance data to storage"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = [
            'periodicMaintenanceCost',
            'annualRoutineInspectionCost', 
            'repairRehabilitationCost',
            'frequencyOfPeriodicMaintenance',
            'frequencyOfRoutineInspection'
        ]
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Convert string values to float for calculations
        processed_data = {}
        for key, value in data.items():
            try:
                processed_data[key] = float(value)
            except (ValueError, TypeError):
                return jsonify({'error': f'Invalid numeric value for {key}'}), 400
        
        # Store the data (using 'default' as project_id for now)
        project_id = 'default'
        maintenance_storage[project_id] = processed_data
        
        return jsonify({
            'message': 'Maintenance data saved successfully',
            'data': processed_data
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@maintenance_data_bp.route('/api/calculate-maintenance-costs', methods=['POST'])
def calculate_maintenance_costs():
    """Calculate maintenance costs based on provided data"""
    try:
        data = request.get_json()
        project_id = 'default'
        
        # Get initial construction cost from storage or API
        initial_construction_cost = get_initial_construction_cost()
        
        if initial_construction_cost is None:
            return jsonify({'error': 'Initial construction cost not available'}), 400
        
        # Extract maintenance parameters
        periodic_maintenance_rate = float(data.get('periodicMaintenanceCost', 0.55)) / 100  # Convert % to decimal
        routine_inspection_rate = float(data.get('annualRoutineInspectionCost', 1)) / 100
        repair_rehabilitation_rate = float(data.get('repairRehabilitationCost', 10)) / 100
        
        frequency_periodic = int(data.get('frequencyOfPeriodicMaintenance', 5))
        frequency_routine = int(data.get('frequencyOfRoutineInspection', 1))
        
        # Calculate costs
        periodic_maintenance_cost = initial_construction_cost * periodic_maintenance_rate
        routine_inspection_cost = initial_construction_cost * routine_inspection_rate
        repair_rehabilitation_cost = initial_construction_cost * repair_rehabilitation_rate
        
        # Calculate total annual maintenance cost
        annual_periodic_cost = periodic_maintenance_cost / frequency_periodic if frequency_periodic > 0 else 0
        annual_routine_cost = routine_inspection_cost / frequency_routine if frequency_routine > 0 else 0
        
        # Repair & rehabilitation is typically a one-time cost over project lifecycle
        # For annual calculation, we might divide by project lifespan (assuming 30 years)
        project_lifespan = 30  # years
        annual_repair_cost = repair_rehabilitation_cost / project_lifespan
        
        total_annual_maintenance_cost = annual_periodic_cost + annual_routine_cost + annual_repair_cost
        
        calculation_results = {
            'initial_construction_cost': initial_construction_cost,
            'periodic_maintenance_cost': periodic_maintenance_cost,
            'routine_inspection_cost': routine_inspection_cost,
            'repair_rehabilitation_cost': repair_rehabilitation_cost,
            'annual_periodic_cost': annual_periodic_cost,
            'annual_routine_cost': annual_routine_cost,
            'annual_repair_cost': annual_repair_cost,
            'total_annual_maintenance_cost': total_annual_maintenance_cost,
            'frequencies': {
                'periodic_maintenance': frequency_periodic,
                'routine_inspection': frequency_routine
            },
            'rates_used': {
                'periodic_maintenance_rate': periodic_maintenance_rate,
                'routine_inspection_rate': routine_inspection_rate,
                'repair_rehabilitation_rate': repair_rehabilitation_rate
            }
        }
        
        # Store calculation results
        if project_id not in maintenance_storage:
            maintenance_storage[project_id] = {}
        maintenance_storage[project_id]['calculations'] = calculation_results
        
        return jsonify({
            'message': 'Maintenance costs calculated successfully',
            'results': calculation_results
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@maintenance_data_bp.route('/api/get-maintenance-data', methods=['GET'])
def get_maintenance_data():
    """Retrieve stored maintenance data"""
    try:
        project_id = request.args.get('project_id', 'default')
        
        if project_id in maintenance_storage:
            return jsonify({
                'data': maintenance_storage[project_id]
            }), 200
        else:
            return jsonify({
                'message': 'No maintenance data found',
                'data': {}
            }), 404
            
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_initial_construction_cost():
    """Get initial construction cost from storage or calculate it"""
    try:
        # Try to get from structure works storage first
        structure_storage_file = 'structure_works_storage.json'
        if os.path.exists(structure_storage_file):
            with open(structure_storage_file, 'r') as f:
                structure_data = json.load(f)
                if 'calculations' in structure_data:
                    return structure_data['calculations'].get('total_cost', None)
        
        # Try to get from cost calculations storage
        cost_calc_storage_file = 'cost_calculations_storage.json'
        if os.path.exists(cost_calc_storage_file):
            with open(cost_calc_storage_file, 'r') as f:
                cost_data = json.load(f)
                if 'default' in cost_data and 'initial_construction_cost' in cost_data['default']:
                    return cost_data['default']['initial_construction_cost']
        
        # If not available in files, try to make API call to calculate it
        # For now, return a default value for testing
        print("Warning: Initial construction cost not found, using default value")
        return 1000000  # Default value for testing
        
    except Exception as e:
        print(f"Error getting initial construction cost: {e}")
        return 1000000  # Default fallback value

# Debug endpoint for maintenance data
@maintenance_data_bp.route('/api/debug/maintenance', methods=['GET'])
def debug_maintenance():
    """Debug endpoint to view stored maintenance data"""
    return jsonify({
        'maintenance_storage': maintenance_storage,
        'storage_keys': list(maintenance_storage.keys())
    })