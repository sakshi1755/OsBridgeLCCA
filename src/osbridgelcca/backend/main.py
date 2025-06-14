from flask import Flask
from flask_cors import CORS
from api.routes.materials_dropdown import materials_dropdown_bp
from api.routes.structure_works import structure_works_bp


app = Flask(__name__)
CORS(app)  # Enable CORS for all domains on all routes

# Register the blueprint with API prefix
app.register_blueprint(materials_dropdown_bp, url_prefix='/api')
app.register_blueprint(structure_works_bp)

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
            'save_form': '/api/save-form-data/<form_name>',
            'calculate_cost': '/api/calculate-initial-cost'
        }
    }

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)