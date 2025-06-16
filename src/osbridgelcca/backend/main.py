from flask import Flask
from flask_cors import CORS
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from api.routes.materials_dropdown import materials_dropdown_bp
from api.routes.structure_works import structure_works_bp
from api.routes.financial_data import financial_bp
from api.routes.traffic_analysis import traffic_analysis_bp  # Add this import

app = Flask(__name__)
# Fix CORS configuration
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173"],
        "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Register blueprints
app.register_blueprint(materials_dropdown_bp, url_prefix='/api')
app.register_blueprint(structure_works_bp)
app.register_blueprint(financial_bp)
app.register_blueprint(traffic_analysis_bp)  # Add this line

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
            'calculate_cost': '/api/calculate-initial-cost',
            'save_financial': '/api/save-financial-data',
            'calculate_time_cost': '/api/calculate-time-cost',
            'save_traffic': '/api/save-traffic-data',           # Add these
            'calculate_road_user_cost': '/api/calculate-road-user-cost'  # Add these
        }
    }

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)