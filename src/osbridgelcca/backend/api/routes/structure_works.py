# Add these routes to your existing structure_works.py file

from flask import Blueprint, request, jsonify
import json
import os
from datetime import datetime

structure_works_bp = Blueprint('structure_works', __name__)

# Storage for form data (you can replace with database later)
form_data_storage = {}

@structure_works_bp.route('/api/save-form-data/<form_name>', methods=['POST'])
def save_form_data(form_name):
    """Save form data for a specific form"""
    try:
        data = request.json
        
        # Store the form data
        form_data_storage[form_name] = {
            'form_name': data.get('form_name', form_name),
            'materials': data.get('materials', []),
            'timestamp': data.get('timestamp', datetime.now().isoformat()),
            'saved_at': datetime.now().isoformat()
        }
        
        print(f"=== FORM DATA SAVED ===")
        print(f"Form: {form_name}")
        print(f"Materials count: {len(data.get('materials', []))}")
        print(f"Timestamp: {datetime.now().isoformat()}")
        print("=====================")
        
        return jsonify({
            'success': True,
            'message': f'Form data saved successfully for {form_name}',
            'form_name': form_name,
            'materials_count': len(data.get('materials', []))
        })
        
    except Exception as e:
        print(f"Error saving form data: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@structure_works_bp.route('/api/calculate-initial-cost', methods=['POST'])
def calculate_initial_cost():
    """Calculate initial construction cost for submitted materials"""
    try:
        data = request.json
        form_name = data.get('form_name', 'unknown')
        materials = data.get('materials', [])
        
        if not materials:
            return jsonify({
                'success': False,
                'error': 'No materials provided for calculation'
            })
        
        total_cost = 0
        cost_breakdown = []
        
        print(f"=== CALCULATING INITIAL COST ===")
        print(f"Form: {form_name}")
        print(f"Materials to calculate: {len(materials)}")
        
        for material in materials:
            try:
                quantity = float(material.get('quantity', 0))
                rate = float(material.get('rate', 0))
                material_cost = quantity * rate
                total_cost += material_cost
                
                cost_item = {
                    'material': material.get('material', ''),
                    'grade': material.get('grade', ''),
                    'quantity': quantity,
                    'unit': material.get('unit', ''),
                    'rate': rate,
                    'total_cost': material_cost,
                    'component': material.get('component', '')
                }
                cost_breakdown.append(cost_item)
                
                print(f"  - {material.get('material', 'Unknown')} ({material.get('grade', 'N/A')}): {quantity} {material.get('unit', '')} @ ₹{rate} = ₹{material_cost:.2f}")
                
            except (ValueError, TypeError) as e:
                print(f"  - Error processing material {material.get('material', 'Unknown')}: {str(e)}")
                continue
        
        print(f"Total Initial Construction Cost: ₹{total_cost:.2f}")
        print("================================")
        
        # Store calculation result
        calculation_result = {
            'form_name': form_name,
            'total_initial_cost': total_cost,
            'cost_breakdown': cost_breakdown,
            'materials': materials,
            'calculated_at': datetime.now().isoformat()
        }
        
        # Store in memory (you can save to database here)
        if form_name not in form_data_storage:
            form_data_storage[form_name] = {}
        form_data_storage[form_name]['calculation_result'] = calculation_result
        
        return jsonify({
            'success': True,
            'form_name': form_name,
            'total_initial_cost': total_cost,
            'cost_breakdown': cost_breakdown,
            'materials': materials,
            'calculated_at': datetime.now().isoformat()
        })
        
    except Exception as e:
        print(f"Error calculating initial cost: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@structure_works_bp.route('/api/calculate-initial-cost', methods=['GET'])
def get_calculated_cost():
    """Get calculated cost for a specific form"""
    try:
        form_name = request.args.get('form')
        
        if not form_name:
            return jsonify({
                'success': False,
                'error': 'Form name is required'
            })
        
        if form_name in form_data_storage and 'calculation_result' in form_data_storage[form_name]:
            result = form_data_storage[form_name]['calculation_result']
            return jsonify({
                'success': True,
                'form_name': form_name,
                'total_initial_cost': result.get('total_initial_cost', 0),
                'cost_breakdown': result.get('cost_breakdown', []),
                'materials': result.get('materials', []),
                'calculated_at': result.get('calculated_at')
            })
        else:
            return jsonify({
                'success': True,
                'form_name': form_name,
                'total_initial_cost': 0,
                'cost_breakdown': [],
                'materials': [],
                'message': 'No calculation data found for this form'
            })
            
    except Exception as e:
        print(f"Error getting calculated cost: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@structure_works_bp.route('/api/get-form-data/<form_name>', methods=['GET'])
def get_form_data(form_name):
    """Get saved form data for a specific form"""
    try:
        if form_name in form_data_storage:
            return jsonify({
                'success': True,
                'form_name': form_name,
                'data': form_data_storage[form_name]
            })
        else:
            return jsonify({
                'success': True,
                'form_name': form_name,
                'data': None,
                'message': 'No data found for this form'
            })
            
    except Exception as e:
        print(f"Error getting form data: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@structure_works_bp.route('/api/get-all-form-data', methods=['GET'])
def get_all_form_data():
    """Get all saved form data"""
    try:
        return jsonify({
            'success': True,
            'data': form_data_storage,
            'forms_count': len(form_data_storage)
        })
        
    except Exception as e:
        print(f"Error getting all form data: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@structure_works_bp.route('/api/clear-form-data', methods=['DELETE'])
def clear_form_data():
    """Clear all saved form data"""
    try:
        form_data_storage.clear()
        return jsonify({
            'success': True,
            'message': 'All form data cleared successfully'
        })
        
    except Exception as e:
        print(f"Error clearing form data: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@structure_works_bp.route('/api/debug-form-storage', methods=['GET'])
def debug_form_storage():
    """Debug endpoint to check what's stored"""
    try:
        return jsonify({
            'success': True,
            'storage_keys': list(form_data_storage.keys()),
            'storage_data': form_data_storage
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500