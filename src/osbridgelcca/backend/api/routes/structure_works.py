from flask import Blueprint, request, jsonify

structure_works_bp = Blueprint('structure_works', __name__)

# Storage for form data (in-memory)
form_data_storage = {
    'foundation': [],
    'sub-structure': [],
    'super-structure': [],
    'miscellaneous': []
}

@structure_works_bp.route('/api/save-form-data/<form_name>', methods=['POST'])
def save_form_data(form_name):
    try:
        data = request.get_json()
        
        if form_name not in form_data_storage:
            return jsonify({'error': 'Invalid form name'}), 400
        
        # Add the form data to the respective list
        form_data_storage[form_name].append(data)
        
        return jsonify({
            'message': f'{form_name} data saved successfully',
            'total_records': len(form_data_storage[form_name])
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@structure_works_bp.route('/api/calculate-initial-cost', methods=['GET'])
def calculate_initial_cost():
    try:
        total_initial_cost = 0
        form_totals = {}
        
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
                        continue  # Skip invalid entries
            
            form_totals[form_name] = form_total
            total_initial_cost += form_total
        
        return jsonify({
            'total_initial_cost': total_initial_cost,
            'form_totals': form_totals,
            'breakdown': {
                'foundation': form_totals.get('foundation', 0),
                'sub_structure': form_totals.get('sub-structure', 0),
                'super_structure': form_totals.get('super-structure', 0),
                'miscellaneous': form_totals.get('miscellaneous', 0)
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@structure_works_bp.route('/api/get-form-data/<form_name>', methods=['GET'])
def get_form_data(form_name):
    try:
        if form_name not in form_data_storage:
            return jsonify({'error': 'Invalid form name'}), 400
        
        return jsonify({
            'form_name': form_name,
            'data': form_data_storage[form_name],
            'total_records': len(form_data_storage[form_name])
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
