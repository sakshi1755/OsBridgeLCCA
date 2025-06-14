from flask import Blueprint, jsonify, request
from osbridgelcca.core.material_types_consts import (
    get_forms, get_components, get_materials, get_sub_materials, 
    get_units, get_material_cost_template, is_valid_form, 
    is_valid_component, is_valid_material
)

materials_dropdown_bp = Blueprint('materials_dropdown', __name__)
material_costs = get_material_cost_template()

# Get all forms (foundation, substructure, superstructure, miscellaneous)
@materials_dropdown_bp.route('/forms')
def forms():
    return jsonify(get_forms())

# Get components for a specific form
@materials_dropdown_bp.route('/components/<form_name>')
def components(form_name):
    # Handle URL decoding and form name normalization
    form_name = form_name.replace('%20', ' ').replace('-', '-')
    if not is_valid_form(form_name):
        return jsonify([])
    return jsonify(get_components(form_name))

# Get materials for a specific form and component
@materials_dropdown_bp.route('/materials/<form_name>/<component_name>')
def materials(form_name, component_name):
    # Handle URL decoding
    form_name = form_name.replace('%20', ' ').replace('-', '-')
    component_name = component_name.replace('%20', ' ')
    
    if not is_valid_form(form_name) or not is_valid_component(form_name, component_name):
        return jsonify([])
    return jsonify(get_materials(form_name, component_name))

# Get sub-materials (grades) for a specific form, component, and material
@materials_dropdown_bp.route('/sub-materials/<form_name>/<component_name>/<material_name>')
def sub_materials(form_name, component_name, material_name):
    # Handle URL decoding
    form_name = form_name.replace('%20', ' ').replace('-', '-')
    component_name = component_name.replace('%20', ' ')
    material_name = material_name.replace('%20', ' ')
    
    if not is_valid_material(form_name, component_name, material_name):
        return jsonify([])
    return jsonify(get_sub_materials(form_name, component_name, material_name))

# Get units for a specific form, component, and material
@materials_dropdown_bp.route('/units/<form_name>/<component_name>/<material_name>')
def units(form_name, component_name, material_name):
    # Handle URL decoding
    form_name = form_name.replace('%20', ' ').replace('-', '-')
    component_name = component_name.replace('%20', ' ')
    material_name = material_name.replace('%20', ' ')
    
    if not is_valid_material(form_name, component_name, material_name):
        return jsonify([])
    return jsonify(get_units(form_name, component_name, material_name))

# Get all data for a specific form (components with their materials and sub-materials)
@materials_dropdown_bp.route('/form-data/<form_name>')
def form_data(form_name):
    # Handle URL decoding and form name normalization
    form_name = form_name.replace('%20', ' ').replace('-', '-')
    
    if not is_valid_form(form_name):
        return jsonify({})
    
    form_components = get_components(form_name)
    result = {}
    
    for component in form_components:
        component_materials = get_materials(form_name, component)
        result[component] = {}
        
        for material in component_materials:
            result[component][material] = {
                'sub_materials': get_sub_materials(form_name, component, material),
                'units': get_units(form_name, component, material)
            }
    
    return jsonify(result)

# Legacy endpoint for backward compatibility - returns all materials from all forms
@materials_dropdown_bp.route('/materials')
def all_materials():
    all_materials_set = set()
    forms = get_forms()
    
    for form in forms:
        components = get_components(form)
        for component in components:
            materials = get_materials(form, component)
            all_materials_set.update(materials)
    
    return jsonify(list(all_materials_set))

# Debug endpoint to check form name mappings
@materials_dropdown_bp.route('/debug/<form_name>')
def debug_form(form_name):
    form_name = form_name.replace('%20', ' ').replace('-', '-')
    return jsonify({
        'received_form_name': form_name,
        'is_valid': is_valid_form(form_name),
        'available_forms': get_forms(),
        'components': get_components(form_name) if is_valid_form(form_name) else []
    })


# Updated Flask App Entry Point
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains on all routes

# Register the blueprint with API prefix
app.register_blueprint(materials_dropdown_bp, url_prefix='/api')

# Health check endpoint
@app.route('/health')
def health_check():
    return {'status': 'healthy', 'message': 'Materials API is running'}

# Root endpoint
@app.route('/')
def root():
    return {
        'message': 'Materials Management API',
        'version': '2.0',
        'endpoints': {
            'forms': '/api/forms',
            'components': '/api/components/<form_name>',
            'materials': '/api/materials/<form_name>/<component_name>',
            'sub_materials': '/api/sub-materials/<form_name>/<component_name>/<material_name>',
            'units': '/api/units/<form_name>/<component_name>/<material_name>',
            'form_data': '/api/form-data/<form_name>',
            'debug': '/api/debug/<form_name>'
        }
    }

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)