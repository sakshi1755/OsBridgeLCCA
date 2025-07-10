from flask import Blueprint, request, jsonify
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create blueprint
demolition_recycling_bp = Blueprint('demolition_recycling', __name__)

# In-memory storage for demonstration (replace with database in production)
demolition_recycling_storage = {}
initial_construction_cost_storage = {}

@demolition_recycling_bp.route('/api/save-demolition-recycling-data', methods=['POST'])
def save_demolition_recycling_data():
    """Save demolition and recycling data"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Validate required fields
        required_fields = ['demolitionCostRate', 'scrapValueOfStructuralSteel', 'structuralSteelScrap']
        missing_fields = [field for field in required_fields if field not in data]
        
        if missing_fields:
            return jsonify({'error': f'Missing required fields: {missing_fields}'}), 400
        
        # Store data with project_id (defaulting to 'default' if not provided)
        project_id = data.get('project_id', 'default')
        demolition_recycling_storage[project_id] = data
        
        logger.info(f"Saved demolition recycling data for project {project_id}: {data}")
        
        return jsonify({
            'message': 'Demolition and recycling data saved successfully',
            'project_id': project_id,
            'data': data
        }), 200
        
    except Exception as e:
        logger.error(f"Error saving demolition recycling data: {str(e)}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

@demolition_recycling_bp.route('/api/calculate-demolition-recycling-costs', methods=['POST'])
def calculate_demolition_recycling_costs():
    """Calculate demolition and recycling costs"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Extract data with defaults
        demolition_cost_rate = float(data.get('demolitionCostRate', 10))  # as percentage
        scrap_value_structural_steel = float(data.get('scrapValueOfStructuralSteel', 50000))  # per ton
        structural_steel_scrap = float(data.get('structuralSteelScrap', 98))  # as percentage
        
        project_id = data.get('project_id', 'default')
        
        # Get initial construction cost from storage
        initial_construction_cost = initial_construction_cost_storage.get(project_id, {}).get('totalCost', 0)
        
        # If no initial construction cost found, try to use a provided value or default
        if initial_construction_cost == 0:
            initial_construction_cost = data.get('initialConstructionCost', 1000000)  # default 1M
            logger.warning(f"No initial construction cost found for project {project_id}, using default: {initial_construction_cost}")
        
        # Calculate demolition cost
        demolition_cost = (demolition_cost_rate / 100) * initial_construction_cost
        
        # Calculate recycling revenue
        # Assuming structural steel is 10% of construction cost (you can adjust this)
        structural_steel_weight = initial_construction_cost * 0.001  # Convert to tons (rough estimate)
        recoverable_steel = structural_steel_weight * (structural_steel_scrap / 100)
        recycling_revenue = recoverable_steel * scrap_value_structural_steel
        
        # Net demolition cost (demolition cost - recycling revenue)
        net_demolition_cost = demolition_cost - recycling_revenue
        
        # Store calculation results
        calculation_result = {
            'project_id': project_id,
            'demolitionCost': demolition_cost,
            'recyclingRevenue': recycling_revenue,
            'netDemolitionCost': net_demolition_cost,
            'structuralSteelWeight': structural_steel_weight,
            'recoverableSteel': recoverable_steel,
            'calculations': {
                'demolitionCostRate': demolition_cost_rate,
                'scrapValueOfStructuralSteel': scrap_value_structural_steel,
                'structuralSteelScrap': structural_steel_scrap,
                'initialConstructionCost': initial_construction_cost
            }
        }
        
        logger.info(f"Calculated demolition recycling costs for project {project_id}: {calculation_result}")
        
        return jsonify(calculation_result), 200
        
    except ValueError as e:
        logger.error(f"Invalid numeric value: {str(e)}")
        return jsonify({'error': f'Invalid numeric value: {str(e)}'}), 400
    except Exception as e:
        logger.error(f"Error calculating demolition recycling costs: {str(e)}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

@demolition_recycling_bp.route('/api/get-demolition-recycling-data', methods=['GET'])
def get_demolition_recycling_data():
    """Get saved demolition and recycling data"""
    try:
        project_id = request.args.get('project_id', 'default')
        
        if project_id not in demolition_recycling_storage:
            return jsonify({'error': 'No data found for this project'}), 404
        
        data = demolition_recycling_storage[project_id]
        
        return jsonify({
            'project_id': project_id,
            'data': data
        }), 200
        
    except Exception as e:
        logger.error(f"Error retrieving demolition recycling data: {str(e)}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

@demolition_recycling_bp.route('/api/get-initial-construction-cost', methods=['GET'])
def get_initial_construction_cost():
    """Get initial construction cost for calculations"""
    try:
        project_id = request.args.get('project_id', 'default')
        
        if project_id not in initial_construction_cost_storage:
            return jsonify({'error': 'No initial construction cost found for this project'}), 404
        
        cost_data = initial_construction_cost_storage[project_id]
        
        return jsonify({
            'project_id': project_id,
            'initialConstructionCost': cost_data.get('totalCost', 0),
            'data': cost_data
        }), 200
        
    except Exception as e:
        logger.error(f"Error retrieving initial construction cost: {str(e)}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

@demolition_recycling_bp.route('/api/set-initial-construction-cost', methods=['POST'])
def set_initial_construction_cost():
    """Set initial construction cost for calculations"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        project_id = data.get('project_id', 'default')
        total_cost = data.get('totalCost', 0)
        
        initial_construction_cost_storage[project_id] = data
        
        logger.info(f"Set initial construction cost for project {project_id}: {total_cost}")
        
        return jsonify({
            'message': 'Initial construction cost set successfully',
            'project_id': project_id,
            'totalCost': total_cost
        }), 200
        
    except Exception as e:
        logger.error(f"Error setting initial construction cost: {str(e)}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500