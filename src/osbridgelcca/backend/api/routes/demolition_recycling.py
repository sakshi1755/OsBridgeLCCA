from flask import Blueprint, request, jsonify
import sys
import os

# Add the core module to the path
sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'core'))

try:
    from cost_component import DemolitionCost, RecyclingCost
except ImportError:
    # Fallback if import fails
    class DemolitionCost:
        def __init__(self, demolition_rate, construction_cost, discount_rate, design_life):
            pwf = 1 / ((1 + discount_rate) ** design_life)
            self.amount = demolition_rate * construction_cost * pwf
            self.demolition_rate = demolition_rate
            self.construction_cost = construction_cost
            self.discount_rate = discount_rate
            self.design_life = design_life
            self.present_worth_factor = pwf
        
        def calculate_cost(self):
            return self.amount

    class RecyclingCost:
        def __init__(self, scrap_value, quantity, discount_rate, design_life):
            pwf = 1 / ((1 + discount_rate) ** design_life)
            self.amount = scrap_value * quantity * pwf
            self.scrap_value = scrap_value
            self.quantity = quantity
            self.discount_rate = discount_rate
            self.design_life = design_life
            self.present_worth_factor = pwf
        
        def calculate_cost(self):
            return self.amount

demolition_recycling_bp = Blueprint('demolition_recycling', __name__)

# Storage for demolition and recycling data
demolition_recycling_storage = []

@demolition_recycling_bp.route('/api/save-demolition-recycling-data', methods=['POST'])
def save_demolition_recycling_data():
    try:
        data = request.get_json()
        
        # Add timestamp and save to storage
        import datetime
        data['timestamp'] = datetime.datetime.now().isoformat()
        demolition_recycling_storage.append(data)
        
        return jsonify({
            'message': 'Demolition and recycling data saved successfully',
            'total_records': len(demolition_recycling_storage)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@demolition_recycling_bp.route('/api/calculate-demolition-recycling-costs', methods=['POST'])
def calculate_demolition_recycling_costs():
    try:
        data = request.get_json()
        
        # Extract form data
        demolition_rate = float(data.get('demolitionCostRate', 10))
        scrap_value_per_unit = float(data.get('scrapValueOfStructuralSteel', 50000))
        structural_steel_quantity = float(data.get('structuralSteelScrap', 98))
        
        # You'll need to get these values from previous forms or set defaults
        # For now, using placeholder values - you should modify this based on your data flow
        construction_cost = data.get('constructionCost', 1000000)  # Get from previous form data
        discount_rate = data.get('discountRate', 0.08)  # Get from financial data
        design_life = data.get('designLife', 50)  # Get from project data
        
        # Calculate Demolition Cost
        demolition_cost_obj = DemolitionCost(
            demolition_rate=demolition_rate / 100,  # Convert percentage to decimal
            construction_cost=construction_cost,
            discount_rate=discount_rate,
            design_life=design_life
        )
        
        # Calculate Recycling Cost (this is typically a negative cost - revenue from scrap)
        recycling_cost_obj = RecyclingCost(
            scrap_value=scrap_value_per_unit,
            quantity=structural_steel_quantity,
            discount_rate=discount_rate,
            design_life=design_life
        )
        
        # Calculate costs
        demolition_cost = demolition_cost_obj.calculate_cost()
        recycling_revenue = recycling_cost_obj.calculate_cost()  # This is actually revenue (negative cost)
        
        # Net demolition cost (demolition cost minus recycling revenue)
        net_demolition_cost = demolition_cost - recycling_revenue
        
        # Present worth factors for information
        demolition_pwf = 1 / ((1 + discount_rate) ** design_life)
        
        # Print to console as requested
        print(f"=== DEMOLITION AND RECYCLING COST CALCULATION ===")
        print(f"Construction Cost: Rs {construction_cost:,.2f}")
        print(f"Discount Rate: {discount_rate*100:.2f}%")
        print(f"Design Life: {design_life} years")
        print(f"Present Worth Factor: {demolition_pwf:.6f}")
        print(f"")
        print(f"Demolition Cost Rate: {demolition_rate}%")
        print(f"Calculated Demolition Cost: Rs {demolition_cost:,.2f}")
        print(f"")
        print(f"Scrap Value per Unit: Rs {scrap_value_per_unit:,.2f}")
        print(f"Structural Steel Scrap Quantity: {structural_steel_quantity} units")
        print(f"Calculated Recycling Revenue: Rs {recycling_revenue:,.2f}")
        print(f"")
        print(f"NET DEMOLITION COST: Rs {net_demolition_cost:,.2f}")
        print(f"(Demolition Cost - Recycling Revenue)")
        print(f"=============================================")
        
        return jsonify({
            'demolition_cost': demolition_cost,
            'recycling_revenue': recycling_revenue,
            'net_demolition_cost': net_demolition_cost,
            'calculation_details': {
                'construction_cost': construction_cost,
                'discount_rate': discount_rate,
                'design_life': design_life,
                'demolition_rate': demolition_rate,
                'scrap_value_per_unit': scrap_value_per_unit,
                'structural_steel_quantity': structural_steel_quantity,
                'present_worth_factor': demolition_pwf
            },
            'message': 'Demolition and recycling costs calculated successfully'
        }), 200
        
    except Exception as e:
        print(f"Error in demolition and recycling cost calculation: {str(e)}")
        return jsonify({'error': f'Calculation failed: {str(e)}'}), 500

@demolition_recycling_bp.route('/api/get-demolition-recycling-data', methods=['GET'])
def get_demolition_recycling_data():
    try:
        return jsonify({
            'demolition_recycling_data': demolition_recycling_storage,
            'total_records': len(demolition_recycling_storage)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500