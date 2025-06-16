from flask import Blueprint, request, jsonify
import sys
import os

# Add the core module to path to import TimeCost
sys.path.append(os.path.join(os.path.dirname(__file__), '../../..'))
from core.cost_component import TimeCost

financial_bp = Blueprint('financial', __name__)

# Storage for financial data
financial_data_storage = {}

# Import the form data storage from structure_works
from .structure_works import form_data_storage

@financial_bp.route('/api/save-financial-data', methods=['POST'])
def save_financial_data():
    try:
        data = request.get_json()
        financial_data_storage['current'] = data
        print(f"Financial data saved: {data}")
        return jsonify({'message': 'Financial data saved successfully'}), 200
    except Exception as e:
        print(f"Error saving financial data: {str(e)}")
        return jsonify({'error': str(e)}), 500

@financial_bp.route('/api/calculate-time-cost', methods=['GET'])
def calculate_time_cost():
    try:
        # Get construction cost from all saved forms (foundation, sub-structure, super-structure, miscellaneous)
        total_construction_cost = 0
        
        for form_name, form_list in form_data_storage.items():
            form_total = 0
            for form_data in form_list:
                materials = form_data.get('materials', [])
                for material in materials:
                    try:
                        quantity = float(material.get('quantity', 0) or 0)
                        rate = float(material.get('rate', 0) or 0)
                        material_cost = quantity * rate
                        form_total += material_cost
                    except (ValueError, TypeError):
                        continue
            
            total_construction_cost += form_total
            print(f"{form_name.title()} total: {form_total}")
        
        print(f"Total construction cost from all forms: {total_construction_cost}")
        
        # Get financial data
        financial_data = financial_data_storage.get('current', {})
        if not financial_data:
            return jsonify({'error': 'No financial data found. Please save financial data first.'}), 400
        
        # Extract values and convert appropriately
        interest_rate = float(financial_data.get('interestRate', 10)) / 100  # Convert percentage to decimal
        construction_time = float(financial_data.get('constructionTime', 0))
        investment_ratio = float(financial_data.get('investmentRatio', 0.5))
        
        # Use the existing TimeCost class from cost_component.py
        time_cost_obj = TimeCost(
            construction_cost=total_construction_cost,
            interest_rate=interest_rate,
            time=construction_time,
            investment_ratio=investment_ratio
        )
        
        # Calculate the time cost using the class method
        calculated_time_cost = time_cost_obj.calculate_cost()
        
        # Print to console (backend console)
        print("=" * 50)
        print("TIME COST CALCULATION USING TimeCost CLASS")
        print("=" * 50)
        print(f"Construction Cost: ${total_construction_cost:,.2f}")
        print(f"Interest Rate: {interest_rate * 100}%")
        print(f"Construction Time: {construction_time} years")
        print(f"Investment Ratio: {investment_ratio}")
        print(f"Time Cost: ${calculated_time_cost:,.2f}")
        print(f"Category: {time_cost_obj.category}")
        print(f"Is Initial: {time_cost_obj.is_initial}")
        print(f"Present Worth Factor: {time_cost_obj.present_worth_factor}")
        print("=" * 50)
        
        return jsonify({
            'time_cost': calculated_time_cost,
            'construction_cost': total_construction_cost,
            'interest_rate': interest_rate * 100,  # Return as percentage for display
            'construction_time': construction_time,
            'investment_ratio': investment_ratio,
            'category': time_cost_obj.category,
            'is_initial': time_cost_obj.is_initial,
            'present_worth_factor': time_cost_obj.present_worth_factor
        }), 200
        
    except Exception as e:
        print(f"Error calculating time cost: {str(e)}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500