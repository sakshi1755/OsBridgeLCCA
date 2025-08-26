from flask import Blueprint, request, jsonify
import json
import os
import sys

# Add the parent directory to Python path to access core modules
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.join(current_dir, '..', '..', '..')
sys.path.insert(0, project_root)

financial_bp = Blueprint('financial', __name__)

# Global storage for Economic Parameter 
financial_data_storage = {}

class TimeCost:
    def __init__(self, construction_cost, interest_rate, construction_time, investment_ratio):
        self.construction_cost = construction_cost
        self.interest_rate = interest_rate / 100  # Convert percentage to decimal
        self.construction_time = construction_time
        self.investment_ratio = investment_ratio
    
    def calculate_time_cost(self):
        """
        Calculate time cost using the formula:
        Time Cost = Construction Cost × Interest Rate × Construction Time × Investment Ratio
        """
        try:
            time_cost = (self.construction_cost * 
                        self.interest_rate * 
                        self.construction_time * 
                        self.investment_ratio)
            
            return {
                'time_cost': round(time_cost, 2),
                'construction_cost': self.construction_cost,
                'interest_rate': self.interest_rate * 100,  # Convert back to percentage for display
                'construction_time': self.construction_time,
                'investment_ratio': self.investment_ratio,
                'formula_used': 'Time Cost = Construction Cost × Interest Rate × Construction Time × Investment Ratio'
            }
        except Exception as e:
            return {'error': str(e)}

def get_initial_construction_cost():
    """
    Get the initial construction cost from the API
    This function should fetch the calculated initial construction cost
    """
    try:
        # First, try to get the stored construction cost
        response = fetch_initial_construction_cost()
        if response and 'total_cost' in response:
            return response['total_cost']
        
        # If no stored cost, return a default value or calculate it
        # You might want to call the calculate-initial-cost endpoint here
        print("Warning: No initial construction cost found, using default value")
        return 1000000  # Default value - you should replace this with actual calculation
        
    except Exception as e:
        print(f"Error getting initial construction cost: {e}")
        return 1000000  # Default fallback value

def fetch_initial_construction_cost():
    """
    Fetch the initial construction cost from the calculate-initial-cost endpoint
    """
    try:
        # This would typically make an internal API call
        # For now, we'll return a placeholder - you should implement the actual fetch
        # You might need to import requests and make a call to your own API
        
        # Placeholder implementation
        # In a real scenario, you'd do something like:
        # response = requests.get('http://127.0.0.1:5000/api/calculate-initial-cost')
        # return response.json()
        
        return {'total_cost': 1000000}  # Placeholder
        
    except Exception as e:
        print(f"Error fetching initial construction cost: {e}")
        return None

@financial_bp.route('/api/save-financial-data', methods=['POST'])
def save_financial_data():
    """
    Save Economic Parameter  to storage
    """
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['realDiscountRate', 'interestRate', 'investmentRatio', 'durationOfStudy']
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Store the Economic Parameter 
        financial_data_storage.update(data)
        
        # Also save to file for persistence (optional)
        try:
            with open('financial_data.json', 'w') as f:
                json.dump(financial_data_storage, f, indent=2)
        except Exception as e:
            print(f"Warning: Could not save to file: {e}")
        
        return jsonify({
            'message': 'Economic Parameter  saved successfully',
            'saved_data': financial_data_storage
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@financial_bp.route('/api/calculate-time-cost', methods=['POST'])
def calculate_time_cost():
    """
    Calculate time cost based on Economic Parameter 
    """
    try:
        # Get data from request body
        request_data = request.json
        
        # Extract parameters from request or use stored data
        if request_data:
            interest_rate = float(request_data.get('interestRate', financial_data_storage.get('interestRate', 10)))
            construction_time = float(request_data.get('constructionTime', financial_data_storage.get('constructionTime', 1)))
            investment_ratio = float(request_data.get('investmentRatio', financial_data_storage.get('investmentRatio', 0.5)))
        else:
            # Use stored Economic Parameter 
            interest_rate = float(financial_data_storage.get('interestRate', 10))
            construction_time = float(financial_data_storage.get('constructionTime', 1))
            investment_ratio = float(financial_data_storage.get('investmentRatio', 0.5))
        
        # Get initial construction cost
        construction_cost = get_initial_construction_cost()
        
        # Create TimeCost instance and calculate
        time_cost_calculator = TimeCost(
            construction_cost=construction_cost,
            interest_rate=interest_rate,
            construction_time=construction_time,
            investment_ratio=investment_ratio
        )
        
        result = time_cost_calculator.calculate_time_cost()
        
        if 'error' in result:
            return jsonify({'error': result['error']}), 400
        
        return jsonify(result), 200
        
    except ValueError as e:
        return jsonify({'error': f'Invalid numeric value: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@financial_bp.route('/api/get-financial-data', methods=['GET'])
def get_financial_data():
    """
    Get stored Economic Parameter 
    """
    try:
        # Try to load from file first
        if os.path.exists('financial_data.json'):
            with open('financial_data.json', 'r') as f:
                file_data = json.load(f)
                financial_data_storage.update(file_data)
        
        return jsonify(financial_data_storage), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@financial_bp.route('/api/calculate-initial-cost', methods=['GET'])
def get_initial_cost():
    """
    Get or calculate the initial construction cost
    This endpoint should integrate with your existing cost calculation logic
    """
    try:
        # This should integrate with your existing initial cost calculation
        # For now, returning a placeholder
        total_cost = get_initial_construction_cost()
        
        return jsonify({
            'total_cost': total_cost,
            'message': 'Initial construction cost retrieved successfully'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Initialize storage with default values
financial_data_storage = {
    'realDiscountRate': '4.2500',
    'interestRate': '10',
    'investmentRatio': '0.5000',
    'durationOfStudy': '50 & 100',
    'constructionTime': '1'
}