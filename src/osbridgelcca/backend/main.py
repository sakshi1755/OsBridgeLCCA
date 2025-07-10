
from flask import Flask
from flask_cors import CORS
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import existing blueprints
from api.routes.materials_dropdown import materials_dropdown_bp
from api.routes.structure_works import structure_works_bp
from api.routes.financial_data import financial_bp
from api.routes.traffic_analysis import traffic_analysis_bp
from api.routes.maintenance_data import maintenance_data_bp
from api.routes.demolition_recycling import demolition_recycling_bp

# Import new cost calculations blueprint
from api.routes.cost_calculations import cost_calculations_bp

app = Flask(__name__)
# Fix CORS configuration
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Register existing blueprints
app.register_blueprint(materials_dropdown_bp, url_prefix='/api')
app.register_blueprint(structure_works_bp)
app.register_blueprint(financial_bp)
app.register_blueprint(traffic_analysis_bp)
app.register_blueprint(maintenance_data_bp)
app.register_blueprint(demolition_recycling_bp)

# Register new cost calculations blueprint
app.register_blueprint(cost_calculations_bp)

# Health check endpoint
@app.route('/health')
def health_check():
    return {'status': 'healthy', 'message': 'LCC Analysis API is running'}

# Root endpoint
@app.route('/')
def root():
    return {
        'message': 'Life Cycle Cost Analysis API',
        'version': '2.0',
        'endpoints': {
            # Form endpoints
            'forms': '/api/forms',
            'components': '/api/components/<form_name>',
            'form_data': '/api/form-data/<form_name>',
            
            # Material endpoints (independent)
            'all_materials': '/api/materials',
            'material_data': '/api/material-data/<material_name>',
            'sub_materials': '/api/sub-materials/<material_name>',
            'units': '/api/units/<material_name>',
            
            # Backward compatibility endpoints
            'materials_for_component': '/api/materials/<form_name>/<component_name>',
            'sub_materials_legacy': '/api/sub-materials/<form_name>/<component_name>/<material_name>',
            'units_legacy': '/api/units/<form_name>/<component_name>/<material_name>',
            
            # Data management endpoints
            'save_form': '/api/save-form-data/<form_name>',
            'get_carbon_materials': '/api/get-carbon-materials',  # NEW - Added this line
            'calculate_cost': '/api/calculate-initial-cost',
            'save_financial': '/api/save-financial-data',
            'calculate_time_cost': '/api/calculate-time-cost',
            'save_traffic': '/api/save-traffic-data',
            'calculate_road_user_cost': '/api/calculate-road-user-cost',
            'save_maintenance': '/api/save-maintenance-data',
            'calculate_maintenance_costs': '/api/calculate-maintenance-costs',
            'get_maintenance_data': '/api/get-maintenance-data',
            'save_demolition_recycling': '/api/save-demolition-recycling-data',
            'calculate_demolition_recycling_costs': '/api/calculate-demolition-recycling-costs',
            'get_demolition_recycling_data': '/api/get-demolition-recycling-data',
            
            # NEW LCC Cost Calculation endpoints
            'calculate_all_costs': '/api/calculate-all-costs',
            'calculate_initial_construction_cost': '/api/calculate-initial-construction-cost',
            'calculate_carbon_emission_cost': '/api/calculate-carbon-emission-cost',
            'calculate_time_cost_new': '/api/calculate-time-cost',
            'calculate_road_user_cost_new': '/api/calculate-road-user-cost',
            'calculate_maintenance_costs_new': '/api/calculate-maintenance-costs',
            'calculate_demolition_recycling_costs_new': '/api/calculate-demolition-recycling-costs',
            'get_calculation_results': '/api/get-calculation-results/<project_id>',
            'get_all_stored_results': '/api/get-all-stored-results',
            'clear_calculation_storage': '/api/clear-calculation-storage',
            
            # Debug endpoints
            'debug_form': '/api/debug/<form_name>',
            'debug_material': '/api/debug/material/<material_name>'
        }
    }

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)