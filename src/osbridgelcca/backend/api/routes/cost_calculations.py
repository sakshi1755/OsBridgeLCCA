# from flask import Blueprint, request, jsonify
# import sys
# import os
# import sqlite3
# from typing import Dict, Any, List

# # Add the path to access the cost components
# sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'core'))

# # Import your cost components
# from cost_component import (
#     InitialConstructionCost, InitialCarbonEmissionCost, TimeCost, 
#     RoadUserCost, AdditionalCarbonEmissionCost, PeriodicMaintenanceCost,
#     PeriodicMaintenanceCarbonCost, RoutineInspectionCost, RepairAndRehabilitationCost,
#     DemolitionCost, RecyclingCost, ReconstructionCost, UserInputs
# )

# cost_calculations_bp = Blueprint('cost_calculations', __name__)

# @cost_calculations_bp.route('/api/calculate-initial-construction-cost', methods=['POST'])
# def calculate_initial_construction_cost():
#     """Calculate initial construction cost from materials data"""
#     try:
#         data = request.json
#         materials = data.get('materials', [])
        
#         total_cost = 0
#         cost_breakdown = []
        
#         for material in materials:
#             component = InitialConstructionCost(
#                 quantity=material.get('quantity', 0),
#                 rate=material.get('rate', 0)
#             )
#             cost = component.calculate_cost()
#             total_cost += cost
            
#             cost_breakdown.append({
#                 'material': material.get('material', ''),
#                 'grade': material.get('grade', ''),
#                 'quantity': material.get('quantity', 0),
#                 'unit': material.get('unit', ''),
#                 'rate': material.get('rate', 0),
#                 'cost': cost
#             })
        
#         return jsonify({
#             'total_initial_construction_cost': total_cost,
#             'cost_breakdown': cost_breakdown,
#             'status': 'success'
#         })
    
#     except Exception as e:
#         return jsonify({
#             'error': str(e),
#             'status': 'error'
#         }), 400

# @cost_calculations_bp.route('/api/calculate-carbon-emission-cost', methods=['POST'])
# def calculate_carbon_emission_cost():
#     """Calculate initial carbon emission cost"""
#     try:
#         data = request.json
#         materials = data.get('materials', [])
#         carbon_cost = data.get('carbon_cost', 6.3936)
#         concrete_emission_factor = data.get('concrete_emission_factor', 0.084)
#         steel_emission_factor = data.get('steel_emission_factor', 2.6)
        
#         total_concrete_kg = 0
#         total_steel_kg = 0
        
#         # Calculate concrete and steel quantities
#         for material in materials:
#             if material.get('material', '').lower() == 'concrete':
#                 qty = material.get('quantity', 0)
#                 unit = material.get('unit', '').lower()
#                 if unit == 'cum':
#                     qty = qty * 2549.25  # density: kg/cum
#                 total_concrete_kg += qty
#             elif material.get('material', '').lower() == 'steel':
#                 qty = material.get('quantity', 0)
#                 unit = material.get('unit', '').upper()
#                 if unit == 'MT':
#                     qty = qty * 1000  # 1 MT = 1000 kg
#                 total_steel_kg += qty
        
#         # Calculate total carbon emission cost
#         concrete_carbon_cost = total_concrete_kg * concrete_emission_factor * carbon_cost
#         steel_carbon_cost = total_steel_kg * steel_emission_factor * carbon_cost
#         total_carbon_cost = concrete_carbon_cost + steel_carbon_cost
        
#         return jsonify({
#             'total_carbon_emission_cost': total_carbon_cost,
#             'concrete_carbon_cost': concrete_carbon_cost,
#             'steel_carbon_cost': steel_carbon_cost,
#             'total_concrete_kg': total_concrete_kg,
#             'total_steel_kg': total_steel_kg,
#             'status': 'success'
#         })
    
#     except Exception as e:
#         return jsonify({
#             'error': str(e),
#             'status': 'error'
#         }), 400

# @cost_calculations_bp.route('/api/calculate-time-cost', methods=['POST'])
# def calculate_time_cost():
#     """Calculate time cost due to construction delays"""
#     try:
#         data = request.json
#         construction_cost = data.get('construction_cost', 0)
#         interest_rate = data.get('interest_rate', 0.1)
#         construction_time = data.get('construction_time', 0.75)
#         investment_ratio = data.get('investment_ratio', 0.5)
        
#         time_cost_component = TimeCost(
#             construction_cost=construction_cost,
#             interest_rate=interest_rate,
#             time=construction_time,
#             investment_ratio=investment_ratio
#         )
        
#         time_cost = time_cost_component.calculate_cost()
        
#         return jsonify({
#             'time_cost': time_cost,
#             'construction_cost': construction_cost,
#             'interest_rate': interest_rate,
#             'construction_time': construction_time,
#             'investment_ratio': investment_ratio,
#             'status': 'success'
#         })
    
#     except Exception as e:
#         return jsonify({
#             'error': str(e),
#             'status': 'error'
#         }), 400

# @cost_calculations_bp.route('/api/calculate-road-user-cost', methods=['POST'])
# def calculate_road_user_cost():
#     """Calculate road user cost from traffic data"""
#     try:
#         data = request.json
#         vehicles = data.get('vehicles', [])
#         lane_type = data.get('lane_type', 'Single Lane Roads')
#         roughness = data.get('roughness', 2000)
#         rf = data.get('rf', 5)
#         construction_time = data.get('construction_time', 0.75)
#         reroute_distance = data.get('reroute_distance', 1.0)
        
#         # Database path
#         db_path = os.path.join(os.path.dirname(__file__), '..', '..', 'data', 'databases', 'IRC_Road_Costs.db')
#         db_path = os.path.abspath(db_path)
        
#         total_road_user_cost = 0
#         calculation_details = []
        
#         with sqlite3.connect(db_path) as conn:
#             cursor = conn.cursor()
#             cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
#             table_name = cursor.fetchone()[0]
            
#             for vehicle in vehicles:
#                 vehicle_type = vehicle.get('type', '')
#                 count = vehicle.get('count', 0)
                
#                 cursor.execute(f'''
#                     SELECT Grand_Cost FROM {table_name} WHERE 
#                         Vehicle_Type = ? AND Lane_Type = ? AND Roughness = ? AND RF = ?
#                 ''', (vehicle_type, lane_type, roughness, rf))
                
#                 result = cursor.fetchone()
#                 if result:
#                     grand_cost = result[0]
#                     ct = construction_time * reroute_distance
                    
#                     road_user_cost_component = RoadUserCost(
#                         vehicles_affected=count,
#                         vehicle_operation_cost=grand_cost,
#                         construction_time=ct
#                     )
                    
#                     vehicle_cost = road_user_cost_component.calculate_cost()
#                     total_road_user_cost += vehicle_cost
                    
#                     calculation_details.append({
#                         'vehicle_type': vehicle_type,
#                         'count': count,
#                         'grand_cost': grand_cost,
#                         'vehicle_cost': vehicle_cost
#                     })
        
#         return jsonify({
#             'total_road_user_cost': total_road_user_cost,
#             'calculation_details': calculation_details,
#             'status': 'success'
#         })
    
#     except Exception as e:
#         return jsonify({
#             'error': str(e),
#             'status': 'error'
#         }), 400

# @cost_calculations_bp.route('/api/calculate-additional-carbon-cost', methods=['POST'])
# def calculate_additional_carbon_cost():
#     """Calculate additional carbon emission cost from rerouted traffic"""
#     try:
#         data = request.json
#         vehicles = data.get('vehicles', [])
#         reroute_distance = data.get('reroute_distance', 1.0)
#         co2_emission_per_km = data.get('co2_emission_per_km', 0.1213)
#         carbon_cost = data.get('carbon_cost', 6.3936)
        
#         total_vehicles = sum(v.get('count', 0) for v in vehicles)
        
#         additional_carbon_component = AdditionalCarbonEmissionCost(
#             vehicles_affected=total_vehicles,
#             reroute_distance=reroute_distance,
#             co2_emission_per_km=co2_emission_per_km,
#             carbon_cost=carbon_cost
#         )
        
#         additional_carbon_cost = additional_carbon_component.calculate_cost()
        
#         return jsonify({
#             'additional_carbon_emission_cost': additional_carbon_cost,
#             'total_vehicles': total_vehicles,
#             'reroute_distance': reroute_distance,
#             'co2_emission_per_km': co2_emission_per_km,
#             'carbon_cost': carbon_cost,
#             'status': 'success'
#         })
    
#     except Exception as e:
#         return jsonify({
#             'error': str(e),
#             'status': 'error'
#         }), 400

# @cost_calculations_bp.route('/api/calculate-maintenance-costs', methods=['POST'])
# def calculate_maintenance_costs():
#     """Calculate all maintenance-related costs"""
#     try:
#         data = request.json
#         construction_cost = data.get('construction_cost', 0)
#         materials = data.get('materials', [])
        
#         # Maintenance parameters
#         maintenance_cost_rate = data.get('maintenance_cost_rate', 0.0055)
#         maintenance_period = data.get('maintenance_period', 5.0)
#         discount_rate = data.get('discount_rate', 0.0425)
#         design_life = data.get('design_life', 50.0)
        
#         # Inspection parameters
#         inspection_rate = data.get('inspection_rate', 0.01)
#         inspection_period = data.get('inspection_period', 1.0)
        
#         # Repair parameters
#         repair_cost_rate = data.get('repair_cost_rate', 0.10)
#         repair_period = data.get('repair_period', 30.0)
        
#         # Carbon parameters
#         concrete_co2_emission_factor = data.get('concrete_co2_emission_factor', 0.487032864540167)
#         carbon_cost = data.get('carbon_cost', 6.3936)
        
#         # Calculate periodic maintenance cost
#         periodic_maintenance_component = PeriodicMaintenanceCost(
#             maintenance_cost_rate=maintenance_cost_rate,
#             construction_cost=construction_cost,
#             discount_rate=discount_rate,
#             period=maintenance_period,
#             design_life=design_life
#         )
#         periodic_maintenance_cost = periodic_maintenance_component.calculate_cost()
        
#         # Calculate maintenance carbon cost (concrete only)
#         maintenance_concrete_kg = 0
#         for material in materials:
#             if material.get('material', '').lower() == 'concrete':
#                 qty = material.get('quantity', 0)
#                 unit = material.get('unit', '').lower()
#                 if unit == 'cum':
#                     qty = qty * 2549.25  # density: kg/cum
#                 maintenance_concrete_kg += qty
        
#         maintenance_carbon_component = PeriodicMaintenanceCarbonCost(
#             material_quantity=maintenance_concrete_kg,
#             carbon_emission_factor=concrete_co2_emission_factor,
#             carbon_cost=carbon_cost,
#             discount_rate=discount_rate,
#             period=maintenance_period,
#             design_life=design_life
#         )
#         maintenance_carbon_cost = maintenance_carbon_component.calculate_cost()
        
#         # Calculate routine inspection cost
#         inspection_component = RoutineInspectionCost(
#             inspection_cost_rate=inspection_rate,
#             construction_cost=construction_cost,
#             discount_rate=discount_rate,
#             design_life=design_life,
#             period=inspection_period
#         )
#         inspection_cost = inspection_component.calculate_cost()
        
#         # Calculate repair and rehabilitation cost
#         repair_component = RepairAndRehabilitationCost(
#             repair_cost_rate=repair_cost_rate,
#             construction_cost=construction_cost,
#             discount_rate=discount_rate,
#             period=repair_period,
#             design_life=design_life
#         )
#         repair_cost = repair_component.calculate_cost()
        
#         return jsonify({
#             'periodic_maintenance_cost': periodic_maintenance_cost,
#             'maintenance_carbon_cost': maintenance_carbon_cost,
#             'routine_inspection_cost': inspection_cost,
#             'repair_rehabilitation_cost': repair_cost,
#             'total_maintenance_cost': periodic_maintenance_cost + maintenance_carbon_cost + inspection_cost + repair_cost,
#             'status': 'success'
#         })
    
#     except Exception as e:
#         return jsonify({
#             'error': str(e),
#             'status': 'error'
#         }), 400

# @cost_calculations_bp.route('/api/calculate-end-of-life-costs', methods=['POST'])
# def calculate_end_of_life_costs():
#     """Calculate demolition and recycling costs"""
#     try:
#         data = request.json
#         construction_cost = data.get('construction_cost', 0)
#         discount_rate = data.get('discount_rate', 0.0425)
#         design_life = data.get('design_life', 50.0)
        
#         # Demolition parameters
#         demolition_rate = data.get('demolition_rate', 0.10)
        
#         # Recycling parameters
#         steel_quantity = data.get('steel_quantity', 0)
#         steel_unit = data.get('steel_unit', 'MT')
#         scrap_value = data.get('scrap_value', 50000.0)
#         scrap_rate = data.get('scrap_rate', 0.98)
        
#         # Calculate demolition cost
#         demolition_component = DemolitionCost(
#             demolition_rate=demolition_rate,
#             construction_cost=construction_cost,
#             discount_rate=discount_rate,
#             design_life=design_life
#         )
#         demolition_cost = demolition_component.calculate_cost()
        
#         # Calculate recycling cost
#         if steel_unit.lower() == "kg":
#             steel_quantity_mt = steel_quantity / 1000
#         else:
#             steel_quantity_mt = steel_quantity
        
#         recycling_component = RecyclingCost(
#             scrap_value=scrap_value,
#             quantity=steel_quantity_mt,
#             scrap_rate=scrap_rate,
#             discount_rate=discount_rate,
#             design_life=design_life
#         )
#         recycling_cost = recycling_component.calculate_cost()
        
#         return jsonify({
#             'demolition_cost': demolition_cost,
#             'recycling_cost': recycling_cost,
#             'net_end_of_life_cost': demolition_cost - recycling_cost,
#             'status': 'success'
#         })
    
#     except Exception as e:
#         return jsonify({
#             'error': str(e),
#             'status': 'error'
#         }), 400

# @cost_calculations_bp.route('/api/calculate-complete-lcca', methods=['POST'])
# def calculate_complete_lcca():
#     """Calculate complete Life Cycle Cost Analysis"""
#     try:
#         data = request.json
        
#         # Extract all required parameters
#         materials = data.get('materials', [])
#         vehicles = data.get('vehicles', [])
        
#         # Financial parameters
#         discount_rate = data.get('discount_rate', 0.0425)
#         design_life = data.get('design_life', 50.0)
#         analysis_period = data.get('analysis_period', 50.0)
        
#         # Construction parameters
#         construction_time = data.get('construction_time', 0.75)
#         interest_rate = data.get('interest_rate', 0.1)
#         investment_ratio = data.get('investment_ratio', 0.5)
        
#         # Traffic parameters
#         lane_type = data.get('lane_type', 'Single Lane Roads')
#         roughness = data.get('roughness', 2000)
#         rf = data.get('rf', 5)
#         reroute_distance = data.get('reroute_distance', 1.0)
        
#         # Environmental parameters
#         carbon_cost = data.get('carbon_cost', 6.3936)
#         concrete_emission_factor = data.get('concrete_emission_factor', 0.084)
#         steel_emission_factor = data.get('steel_emission_factor', 2.6)
#         concrete_co2_emission_factor = data.get('concrete_co2_emission_factor', 0.487032864540167)
#         co2_emission_per_km = data.get('co2_emission_per_km', 0.1213)
        
#         # Maintenance parameters
#         maintenance_cost_rate = data.get('maintenance_cost_rate', 0.0055)
#         maintenance_period = data.get('maintenance_period', 5.0)
#         inspection_rate = data.get('inspection_rate', 0.01)
#         inspection_period = data.get('inspection_period', 1.0)
#         repair_cost_rate = data.get('repair_cost_rate', 0.10)
#         repair_period = data.get('repair_period', 30.0)
        
#         # End of life parameters
#         demolition_rate = data.get('demolition_rate', 0.10)
#         steel_quantity = data.get('steel_quantity', 0)
#         steel_unit = data.get('steel_unit', 'MT')
#         scrap_value = data.get('scrap_value', 50000.0)
#         scrap_rate = data.get('scrap_rate', 0.98)
        
#         # 1. Calculate Initial Construction Cost
#         total_construction_cost = 0
#         for material in materials:
#             component = InitialConstructionCost(
#                 quantity=material.get('quantity', 0),
#                 rate=material.get('rate', 0)
#             )
#             total_construction_cost += component.calculate_cost()
        
#         # 2. Calculate Initial Carbon Emission Cost
#         total_concrete_kg = 0
#         total_steel_kg = 0
#         for material in materials:
#             if material.get('material', '').lower() == 'concrete':
#                 qty = material.get('quantity', 0)
#                 if material.get('unit', '').lower() == 'cum':
#                     qty = qty * 2549.25
#                 total_concrete_kg += qty
#             elif material.get('material', '').lower() == 'steel':
#                 qty = material.get('quantity', 0)
#                 if material.get('unit', '').upper() == 'MT':
#                     qty = qty * 1000
#                 total_steel_kg += qty
        
#         carbon_emission_cost = (
#             (total_concrete_kg * concrete_emission_factor) + 
#             (total_steel_kg * steel_emission_factor)
#         ) * carbon_cost
        
#         # 3. Calculate Time Cost
#         time_cost_component = TimeCost(
#             construction_cost=total_construction_cost,
#             interest_rate=interest_rate,
#             time=construction_time,
#             investment_ratio=investment_ratio
#         )
#         time_cost = time_cost_component.calculate_cost()
        
#         # 4. Calculate Road User Cost
#         total_road_user_cost = 0
#         db_path = os.path.join(os.path.dirname(__file__), '..', '..', 'data', 'databases', 'IRC_Road_Costs.db')
#         db_path = os.path.abspath(db_path)
        
#         with sqlite3.connect(db_path) as conn:
#             cursor = conn.cursor()
#             cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
#             table_name = cursor.fetchone()[0]
            
#             for vehicle in vehicles:
#                 vehicle_type = vehicle.get('type', '')
#                 count = vehicle.get('count', 0)
                
#                 cursor.execute(f'''
#                     SELECT Grand_Cost FROM {table_name} WHERE 
#                         Vehicle_Type = ? AND Lane_Type = ? AND Roughness = ? AND RF = ?
#                 ''', (vehicle_type, lane_type, roughness, rf))
                
#                 result = cursor.fetchone()
#                 if result:
#                     grand_cost = result[0]
#                     ct = construction_time * reroute_distance
                    
#                     road_user_cost_component = RoadUserCost(
#                         vehicles_affected=count,
#                         vehicle_operation_cost=grand_cost,
#                         construction_time=ct
#                     )
#                     total_road_user_cost += road_user_cost_component.calculate_cost()
        
#         # 5. Calculate Additional Carbon Emission Cost
#         total_vehicles = sum(v.get('count', 0) for v in vehicles)
#         additional_carbon_component = AdditionalCarbonEmissionCost(
#             vehicles_affected=total_vehicles,
#             reroute_distance=reroute_distance,
#             co2_emission_per_km=co2_emission_per_km,
#             carbon_cost=carbon_cost
#         )
#         additional_carbon_cost = additional_carbon_component.calculate_cost()
        
#         # 6. Calculate Maintenance Costs
#         periodic_maintenance_component = PeriodicMaintenanceCost(
#             maintenance_cost_rate=maintenance_cost_rate,
#             construction_cost=total_construction_cost,
#             discount_rate=discount_rate,
#             period=maintenance_period,
#             design_life=design_life
#         )
#         periodic_maintenance_cost = periodic_maintenance_component.calculate_cost()
        
#         # 7. Calculate Maintenance Carbon Cost
#         maintenance_concrete_kg = 0
#         for material in materials:
#             if material.get('material', '').lower() == 'concrete':
#                 qty = material.get('quantity', 0)
#                 if material.get('unit', '').lower() == 'cum':
#                     qty = qty * 2549.25
#                 maintenance_concrete_kg += qty
        
#         maintenance_carbon_component = PeriodicMaintenanceCarbonCost(
#             material_quantity=maintenance_concrete_kg,
#             carbon_emission_factor=concrete_co2_emission_factor,
#             carbon_cost=carbon_cost,
#             discount_rate=discount_rate,
#             period=maintenance_period,
#             design_life=design_life
#         )
#         maintenance_carbon_cost = maintenance_carbon_component.calculate_cost()
        
#         # 8. Calculate Inspection Cost
#         inspection_component = RoutineInspectionCost(
#             inspection_cost_rate=inspection_rate,
#             construction_cost=total_construction_cost,
#             discount_rate=discount_rate,
#             design_life=design_life,
#             period=inspection_period
#         )
#         inspection_cost = inspection_component.calculate_cost()
        
#         # 9. Calculate Repair Cost
#         repair_component = RepairAndRehabilitationCost(
#             repair_cost_rate=repair_cost_rate,
#             construction_cost=total_construction_cost,
#             discount_rate=discount_rate,
#             period=repair_period,
#             design_life=design_life
#         )
#         repair_cost = repair_component.calculate_cost()
        
#         # 10. Calculate Demolition Cost
#         demolition_component = DemolitionCost(
#             demolition_rate=demolition_rate,
#             construction_cost=total_construction_cost,
#             discount_rate=discount_rate,
#             design_life=design_life
#         )
#         demolition_cost = demolition_component.calculate_cost()
        
#         # 11. Calculate Recycling Cost
#         if steel_unit.lower() == "kg":
#             steel_quantity_mt = steel_quantity / 1000
#         else:
#             steel_quantity_mt = steel_quantity
        
#         recycling_component = RecyclingCost(
#             scrap_value=scrap_value,
#             quantity=steel_quantity_mt,
#             scrap_rate=scrap_rate,
#             discount_rate=discount_rate,
#             design_life=design_life
#         )
#         recycling_cost = recycling_component.calculate_cost()
        
#         # 12. Calculate Reconstruction Cost (if analysis_period > design_life)
#         reconstruction_cost = 0
#         if analysis_period > design_life:
#             reconstruction_component = ReconstructionCost(
#                 demolition_cost=demolition_cost,
#                 reconstruction_cost=total_construction_cost,
#                 reconstruction_carbon_cost=carbon_emission_cost,
#                 reconstruction_time_cost=time_cost,
#                 reconstruction_roaduser_cost=total_road_user_cost,
#                 reconstruction_rerouting_carbon_cost=additional_carbon_cost,
#                 design_life=design_life,
#                 discount_rate=discount_rate
#             )
#             reconstruction_cost = reconstruction_component.calculate_cost()
        
#         # Calculate total LCCA
#         total_lcca = (
#             total_construction_cost +
#             carbon_emission_cost +
#             time_cost +
#             total_road_user_cost +
#             additional_carbon_cost +
#             periodic_maintenance_cost +
#             maintenance_carbon_cost +
#             inspection_cost +
#             repair_cost +
#             demolition_cost -
#             recycling_cost +
#             reconstruction_cost
#         )
        
#         # Prepare results
#         results = {
#             'total_lcca': total_lcca,
#             'cost_breakdown': {
#                 'initial_construction_cost': total_construction_cost,
#                 'initial_carbon_emission_cost': carbon_emission_cost,
#                 'time_cost': time_cost,
#                 'road_user_cost': total_road_user_cost,
#                 'additional_carbon_emission_cost': additional_carbon_cost,
#                 'periodic_maintenance_cost': periodic_maintenance_cost,
#                 'maintenance_carbon_cost': maintenance_carbon_cost,
#                 'routine_inspection_cost': inspection_cost,
#                 'repair_rehabilitation_cost': repair_cost,
#                 'demolition_cost': demolition_cost,
#                 'recycling_cost': recycling_cost,
#                 'reconstruction_cost': reconstruction_cost
#             },
#             'cost_categories': {
#                 'economic_costs': total_construction_cost + time_cost + total_road_user_cost + periodic_maintenance_cost + inspection_cost + repair_cost + demolition_cost - recycling_cost + reconstruction_cost,
#                 'environmental_costs': carbon_emission_cost + additional_carbon_cost + maintenance_carbon_cost,
#                 'social_costs': 0  # Add social costs if any
#             },
#             'status': 'success'
#         }
        
#         return jsonify(results)
    
#     except Exception as e:
#         return jsonify({
#             'error': str(e),
#             'status': 'error'
#         }), 400

#----- END OF SOLUTION -----#
from flask import Blueprint, request, jsonify
import os
import sqlite3
from typing import Dict, Any, List
import traceback

# Import your cost component classes
from core.cost_component import (
    InitialConstructionCost, InitialCarbonEmissionCost, TimeCost,
    RoadUserCost, AdditionalCarbonEmissionCost, PeriodicMaintenanceCost,
    PeriodicMaintenanceCarbonCost, RoutineInspectionCost, 
    RepairAndRehabilitationCost, DemolitionCost, RecyclingCost,
    ReconstructionCost, UserInputs
)

cost_calculations_bp = Blueprint('cost_calculations', __name__)

# Global storage for calculations (you can replace with database later)
calculation_storage = {}

class LCCCalculator:
    """Life Cycle Cost Calculator class to handle all calculations"""
    
    def __init__(self, inputs: UserInputs):
        self.inputs = inputs
        self.results = {}
        
    def calculate_initial_construction_cost(self) -> float:
        """Calculate initial construction cost"""
        total_cost = 0
        for item in self.inputs.user_materials:
            component = InitialConstructionCost(
                quantity=item["quantity"],
                rate=item["rate"]
            )
            total_cost += component.calculate_cost()
        return total_cost
    
    def calculate_initial_carbon_emission_cost(self) -> float:
        """Calculate initial carbon emission cost"""
        total_concrete_kg = 0
        total_steel_kg = 0
        
        for item in self.inputs.user_materials:
            if item["material"].lower() == "concrete":
                qty = item["quantity"]
                unit = item["unit"].lower()
                if unit == "cum":
                    qty = qty * 2549.25  # density: kg/cum
                total_concrete_kg += qty
            elif item["material"].lower() == "steel":
                qty = item["quantity"]
                unit = item["unit"].upper()
                if unit == "MT":
                    qty = qty * 1000  # 1 MT = 1000 kg
                total_steel_kg += qty
        
        total_cost = (
            (total_concrete_kg * self.inputs.concrete_emission_factor) + 
            (total_steel_kg * self.inputs.steel_emission_factor)
        ) * self.inputs.carbon_cost
        
        return total_cost
    
    def calculate_time_cost(self, construction_cost: float) -> float:
        """Calculate time cost"""
        component = TimeCost(
            construction_cost=construction_cost,
            interest_rate=self.inputs.interest_rate,
            time=self.inputs.construction_time,
            investment_ratio=self.inputs.investment_ratio
        )
        return component.calculate_cost()
    
    def calculate_road_user_cost(self) -> float:
        """Calculate road user cost"""
        total_cost = 0
        
        # Database path
        db_path = os.path.join(os.path.dirname(__file__), '..', '..', 'data', 'databases', 'IRC_Road_Costs.db')
        db_path = os.path.abspath(db_path)
        
        try:
            with sqlite3.connect(db_path) as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
                table_result = cursor.fetchone()
                if not table_result:
                    return 0
                
                table_name = table_result[0]
                
                for vehicle in self.inputs.road_user_inputs["Vehicles"]:
                    vehicle_type = vehicle["Vehicle_Type"]
                    count = vehicle["Count"]
                    lane_type = self.inputs.road_user_inputs["Lane_Type"]
                    roughness = self.inputs.road_user_inputs["Roughness"]
                    rf = self.inputs.road_user_inputs["RF"]
                    
                    cursor.execute(f'''
                        SELECT Grand_Cost FROM {table_name} WHERE 
                            Vehicle_Type = ? AND Lane_Type = ? AND Roughness = ? AND RF = ?
                    ''', (vehicle_type, lane_type, roughness, rf))
                    
                    result = cursor.fetchone()
                    if result:
                        grand_cost = result[0]
                        ct = self.inputs.construction_time * self.inputs.reroute_distance
                        component = RoadUserCost(
                            vehicles_affected=count,
                            vehicle_operation_cost=grand_cost,
                            construction_time=ct
                        )
                        total_cost += component.calculate_cost()
        except Exception as e:
            print(f"Database error: {e}")
            return 0
        
        return total_cost
    
    def calculate_additional_carbon_emission_cost(self) -> float:
        """Calculate additional carbon emission cost"""
        vehicles_affected = sum(v["Count"] for v in self.inputs.road_user_inputs["Vehicles"])
        
        component = AdditionalCarbonEmissionCost(
            vehicles_affected=vehicles_affected,
            reroute_distance=self.inputs.reroute_distance,
            co2_emission_per_km=self.inputs.co2_emission_per_km,
            carbon_cost=self.inputs.carbon_cost
        )
        return component.calculate_cost()
    
    def calculate_periodic_maintenance_cost(self, construction_cost: float) -> float:
        """Calculate periodic maintenance cost"""
        component = PeriodicMaintenanceCost(
            maintenance_cost_rate=self.inputs.maintenance_cost_rate,
            construction_cost=construction_cost,
            discount_rate=self.inputs.discount_rate,
            period=self.inputs.maintenance_period,
            design_life=self.inputs.design_life
        )
        return component.calculate_cost()
    
    def calculate_periodic_maintenance_carbon_cost(self) -> float:
        """Calculate periodic maintenance carbon cost"""
        maintenance_concrete_kg = 0
        
        for item in self.inputs.user_materials:
            if item["material"].lower() == "concrete":
                qty = item["quantity"]
                unit = item["unit"].lower()
                if unit == "cum":
                    qty = qty * 2549.25  # density: kg/cum
                maintenance_concrete_kg += qty
        
        component = PeriodicMaintenanceCarbonCost(
            material_quantity=maintenance_concrete_kg,
            carbon_emission_factor=self.inputs.concrete_co2_emission_factor,
            carbon_cost=self.inputs.carbon_cost,
            discount_rate=self.inputs.discount_rate,
            period=self.inputs.maintenance_period,
            design_life=self.inputs.design_life
        )
        return component.calculate_cost()
    
    def calculate_routine_inspection_cost(self, construction_cost: float) -> float:
        """Calculate routine inspection cost"""
        component = RoutineInspectionCost(
            inspection_cost_rate=self.inputs.inspection_rate,
            construction_cost=construction_cost,
            discount_rate=self.inputs.discount_rate,
            design_life=self.inputs.design_life,
            period=self.inputs.inspection_period
        )
        return component.calculate_cost()
    
    def calculate_repair_rehabilitation_cost(self, construction_cost: float) -> float:
        """Calculate repair and rehabilitation cost"""
        component = RepairAndRehabilitationCost(
            repair_cost_rate=self.inputs.repair_cost_rate,
            construction_cost=construction_cost,
            discount_rate=self.inputs.discount_rate,
            period=self.inputs.repair_period,
            design_life=self.inputs.design_life
        )
        return component.calculate_cost()
    
    def calculate_demolition_cost(self, construction_cost: float) -> float:
        """Calculate demolition cost"""
        component = DemolitionCost(
            demolition_rate=self.inputs.demolition_rate,
            construction_cost=construction_cost,
            discount_rate=self.inputs.discount_rate,
            design_life=self.inputs.design_life
        )
        return component.calculate_cost()
    
    def calculate_recycling_cost(self) -> float:
        """Calculate recycling cost"""
        user_input_steel_quantity = self.inputs.user_input_steel_quantity
        user_input_steel_unit = self.inputs.user_input_steel_unit
        
        if user_input_steel_unit.lower() == "kg":
            user_input_steel_quantity_mt = user_input_steel_quantity / 1000
        else:
            user_input_steel_quantity_mt = user_input_steel_quantity
        
        component = RecyclingCost(
            scrap_value=self.inputs.scrap_value,
            quantity=user_input_steel_quantity_mt,
            scrap_rate=self.inputs.scrap_rate,
            discount_rate=self.inputs.discount_rate,
            design_life=self.inputs.design_life
        )
        return component.calculate_cost()
    
    def calculate_reconstruction_cost(self, demolition_cost: float, construction_cost: float, 
                                   carbon_cost: float, time_cost: float, road_user_cost: float, 
                                   additional_carbon_cost: float) -> float:
        """Calculate reconstruction cost"""
        if self.inputs.analysis_period <= self.inputs.design_life:
            return 0
        
        component = ReconstructionCost(
            demolition_cost=demolition_cost,
            reconstruction_cost=construction_cost,
            reconstruction_carbon_cost=carbon_cost,
            reconstruction_time_cost=time_cost,
            reconstruction_roaduser_cost=road_user_cost,
            reconstruction_rerouting_carbon_cost=additional_carbon_cost,
            design_life=self.inputs.design_life,
            discount_rate=self.inputs.discount_rate
        )
        return component.calculate_cost()
    
    def calculate_all_costs(self) -> Dict[str, float]:
        """Calculate all costs and return as dictionary"""
        # Calculate initial construction cost first as it's needed for other calculations
        initial_construction_cost = self.calculate_initial_construction_cost()
        initial_carbon_cost = self.calculate_initial_carbon_emission_cost()
        time_cost = self.calculate_time_cost(initial_construction_cost)
        road_user_cost = self.calculate_road_user_cost()
        additional_carbon_cost = self.calculate_additional_carbon_emission_cost()
        periodic_maintenance_cost = self.calculate_periodic_maintenance_cost(initial_construction_cost)
        periodic_maintenance_carbon_cost = self.calculate_periodic_maintenance_carbon_cost()
        routine_inspection_cost = self.calculate_routine_inspection_cost(initial_construction_cost)
        repair_rehabilitation_cost = self.calculate_repair_rehabilitation_cost(initial_construction_cost)
        demolition_cost = self.calculate_demolition_cost(initial_construction_cost)
        recycling_cost = self.calculate_recycling_cost()
        reconstruction_cost = self.calculate_reconstruction_cost(
            demolition_cost, initial_construction_cost, initial_carbon_cost, 
            time_cost, road_user_cost, additional_carbon_cost
        )
        
        results = {
            "initial_construction_cost": initial_construction_cost,
            "initial_carbon_emission_cost": initial_carbon_cost,
            "time_cost": time_cost,
            "road_user_cost": road_user_cost,
            "additional_carbon_emission_cost": additional_carbon_cost,
            "periodic_maintenance_cost": periodic_maintenance_cost,
            "periodic_maintenance_carbon_cost": periodic_maintenance_carbon_cost,
            "routine_inspection_cost": routine_inspection_cost,
            "repair_rehabilitation_cost": repair_rehabilitation_cost,
            "demolition_cost": demolition_cost,
            "recycling_cost": recycling_cost,
            "reconstruction_cost": reconstruction_cost,
            "total_lcc": (
                initial_construction_cost + initial_carbon_cost + time_cost + 
                road_user_cost + additional_carbon_cost + periodic_maintenance_cost + 
                periodic_maintenance_carbon_cost + routine_inspection_cost + 
                repair_rehabilitation_cost + demolition_cost + recycling_cost + 
                reconstruction_cost
            )
        }
        
        self.results = results
        return results


# Route functions
@cost_calculations_bp.route('/api/calculate-all-costs', methods=['POST'])
def calculate_all_costs():
    """Calculate all LCC costs at once"""
    try:
        data = request.json
        
        # Create UserInputs object from the received data
        inputs = UserInputs()
        
        # Update inputs with received data
        if 'user_materials' in data:
            inputs.user_materials = data['user_materials']
        if 'road_user_inputs' in data:
            inputs.road_user_inputs = data['road_user_inputs']
        if 'financial_inputs' in data:
            financial = data['financial_inputs']
            inputs.analysis_period = financial.get('analysis_period', inputs.analysis_period)
            inputs.design_life = financial.get('design_life', inputs.design_life)
            inputs.discount_rate = financial.get('discount_rate', inputs.discount_rate)
            inputs.construction_time = financial.get('construction_time', inputs.construction_time)
            inputs.interest_rate = financial.get('interest_rate', inputs.interest_rate)
            inputs.investment_ratio = financial.get('investment_ratio', inputs.investment_ratio)
        if 'maintenance_inputs' in data:
            maintenance = data['maintenance_inputs']
            inputs.maintenance_cost_rate = maintenance.get('maintenance_cost_rate', inputs.maintenance_cost_rate)
            inputs.maintenance_period = maintenance.get('maintenance_period', inputs.maintenance_period)
            inputs.inspection_rate = maintenance.get('inspection_rate', inputs.inspection_rate)
            inputs.repair_cost_rate = maintenance.get('repair_cost_rate', inputs.repair_cost_rate)
            inputs.repair_period = maintenance.get('repair_period', inputs.repair_period)
        if 'demolition_recycling_inputs' in data:
            demolition = data['demolition_recycling_inputs']
            inputs.demolition_rate = demolition.get('demolition_rate', inputs.demolition_rate)
            inputs.scrap_value = demolition.get('scrap_value', inputs.scrap_value)
            inputs.scrap_rate = demolition.get('scrap_rate', inputs.scrap_rate)
            inputs.user_input_steel_quantity = demolition.get('user_input_steel_quantity', inputs.user_input_steel_quantity)
            inputs.user_input_steel_unit = demolition.get('user_input_steel_unit', inputs.user_input_steel_unit)
        
        # Create calculator and calculate all costs
        calculator = LCCCalculator(inputs)
        results = calculator.calculate_all_costs()
        
        # Store results for later retrieval
        project_id = data.get('project_id', 'default')
        calculation_storage[project_id] = results
        
        return jsonify({
            'success': True,
            'results': results,
            'message': 'All costs calculated successfully'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e),
            'traceback': traceback.format_exc()
        }), 500


@cost_calculations_bp.route('/api/calculate-initial-construction-cost', methods=['POST'])
def calculate_initial_construction_cost():
    """Calculate only initial construction cost"""
    try:
        data = request.json
        inputs = UserInputs()
        if 'user_materials' in data:
            inputs.user_materials = data['user_materials']
        
        calculator = LCCCalculator(inputs)
        cost = calculator.calculate_initial_construction_cost()
        
        return jsonify({
            'success': True,
            'initial_construction_cost': cost,
            'message': 'Initial construction cost calculated successfully'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@cost_calculations_bp.route('/api/calculate-carbon-emission-cost', methods=['POST'])
def calculate_carbon_emission_cost():
    """Calculate initial carbon emission cost"""
    try:
        data = request.json
        inputs = UserInputs()
        if 'user_materials' in data:
            inputs.user_materials = data['user_materials']
        
        calculator = LCCCalculator(inputs)
        cost = calculator.calculate_initial_carbon_emission_cost()
        
        return jsonify({
            'success': True,
            'initial_carbon_emission_cost': cost,
            'message': 'Carbon emission cost calculated successfully'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@cost_calculations_bp.route('/api/calculate-time-cost', methods=['POST'])
def calculate_time_cost():
    """Calculate time cost"""
    try:
        data = request.json
        inputs = UserInputs()
        
        # Update inputs with received data
        if 'user_materials' in data:
            inputs.user_materials = data['user_materials']
        if 'financial_inputs' in data:
            financial = data['financial_inputs']
            inputs.construction_time = financial.get('construction_time', inputs.construction_time)
            inputs.interest_rate = financial.get('interest_rate', inputs.interest_rate)
            inputs.investment_ratio = financial.get('investment_ratio', inputs.investment_ratio)
        
        calculator = LCCCalculator(inputs)
        construction_cost = calculator.calculate_initial_construction_cost()
        time_cost = calculator.calculate_time_cost(construction_cost)
        
        return jsonify({
            'success': True,
            'time_cost': time_cost,
            'construction_cost': construction_cost,
            'message': 'Time cost calculated successfully'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@cost_calculations_bp.route('/api/calculate-road-user-cost', methods=['POST'])
def calculate_road_user_cost():
    """Calculate road user cost"""
    try:
        data = request.json
        inputs = UserInputs()
        
        if 'road_user_inputs' in data:
            inputs.road_user_inputs = data['road_user_inputs']
        if 'financial_inputs' in data:
            financial = data['financial_inputs']
            inputs.construction_time = financial.get('construction_time', inputs.construction_time)
            inputs.reroute_distance = financial.get('reroute_distance', inputs.reroute_distance)
        
        calculator = LCCCalculator(inputs)
        cost = calculator.calculate_road_user_cost()
        
        return jsonify({
            'success': True,
            'road_user_cost': cost,
            'message': 'Road user cost calculated successfully'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@cost_calculations_bp.route('/api/calculate-maintenance-costs', methods=['POST'])
def calculate_maintenance_costs():
    """Calculate all maintenance related costs"""
    try:
        data = request.json
        inputs = UserInputs()
        
        # Update inputs with received data
        if 'user_materials' in data:
            inputs.user_materials = data['user_materials']
        if 'financial_inputs' in data:
            financial = data['financial_inputs']
            inputs.discount_rate = financial.get('discount_rate', inputs.discount_rate)
            inputs.design_life = financial.get('design_life', inputs.design_life)
        if 'maintenance_inputs' in data:
            maintenance = data['maintenance_inputs']
            inputs.maintenance_cost_rate = maintenance.get('maintenance_cost_rate', inputs.maintenance_cost_rate)
            inputs.maintenance_period = maintenance.get('maintenance_period', inputs.maintenance_period)
            inputs.inspection_rate = maintenance.get('inspection_rate', inputs.inspection_rate)
            inputs.repair_cost_rate = maintenance.get('repair_cost_rate', inputs.repair_cost_rate)
            inputs.repair_period = maintenance.get('repair_period', inputs.repair_period)
        
        calculator = LCCCalculator(inputs)
        construction_cost = calculator.calculate_initial_construction_cost()
        
        results = {
            'periodic_maintenance_cost': calculator.calculate_periodic_maintenance_cost(construction_cost),
            'periodic_maintenance_carbon_cost': calculator.calculate_periodic_maintenance_carbon_cost(),
            'routine_inspection_cost': calculator.calculate_routine_inspection_cost(construction_cost),
            'repair_rehabilitation_cost': calculator.calculate_repair_rehabilitation_cost(construction_cost),
            'construction_cost': construction_cost
        }
        
        return jsonify({
            'success': True,
            'results': results,
            'message': 'Maintenance costs calculated successfully'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@cost_calculations_bp.route('/api/calculate-demolition-recycling-costs', methods=['POST'])
def calculate_demolition_recycling_costs():
    """Calculate demolition and recycling costs"""
    try:
        data = request.json
        inputs = UserInputs()
        
        # Update inputs with received data
        if 'user_materials' in data:
            inputs.user_materials = data['user_materials']
        if 'financial_inputs' in data:
            financial = data['financial_inputs']
            inputs.discount_rate = financial.get('discount_rate', inputs.discount_rate)
            inputs.design_life = financial.get('design_life', inputs.design_life)
        if 'demolition_recycling_inputs' in data:
            demolition = data['demolition_recycling_inputs']
            inputs.demolition_rate = demolition.get('demolition_rate', inputs.demolition_rate)
            inputs.scrap_value = demolition.get('scrap_value', inputs.scrap_value)
            inputs.scrap_rate = demolition.get('scrap_rate', inputs.scrap_rate)
            inputs.user_input_steel_quantity = demolition.get('user_input_steel_quantity', inputs.user_input_steel_quantity)
            inputs.user_input_steel_unit = demolition.get('user_input_steel_unit', inputs.user_input_steel_unit)
        
        calculator = LCCCalculator(inputs)
        construction_cost = calculator.calculate_initial_construction_cost()
        
        results = {
            'demolition_cost': calculator.calculate_demolition_cost(construction_cost),
            'recycling_cost': calculator.calculate_recycling_cost(),
            'construction_cost': construction_cost
        }
        
        return jsonify({
            'success': True,
            'results': results,
            'message': 'Demolition and recycling costs calculated successfully'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@cost_calculations_bp.route('/api/get-calculation-results/<project_id>', methods=['GET'])
def get_calculation_results(project_id):
    """Get stored calculation results"""
    try:
        if project_id in calculation_storage:
            return jsonify({
                'success': True,
                'results': calculation_storage[project_id],
                'message': 'Results retrieved successfully'
            })
        else:
            return jsonify({
                'success': False,
                'message': 'No calculation results found for this project'
            }), 404
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@cost_calculations_bp.route('/api/get-all-stored-results', methods=['GET'])
def get_all_stored_results():
    """Get all stored calculation results"""
    try:
        return jsonify({
            'success': True,
            'results': calculation_storage,
            'message': 'All results retrieved successfully'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@cost_calculations_bp.route('/api/clear-calculation-storage', methods=['DELETE'])
def clear_calculation_storage():
    """Clear all stored calculation results"""
    try:
        calculation_storage.clear()
        return jsonify({
            'success': True,
            'message': 'All calculation results cleared successfully'
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500