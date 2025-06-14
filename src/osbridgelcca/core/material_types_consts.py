import copy

# Updated template with Components -> Materials -> Sub-materials structure
MATERIAL_COSTS_TEMPLATE = {
    "foundation": {
        "components": {
            "Foundations": {
                "materials": {
                    "concrete": {
                        "units": ["cum", "kg"],
                        "sub_materials": {
                            "M15": {"cum": 0.0, "kg": 0.0},
                            "M20": {"cum": 0.0, "kg": 0.0},
                            "M25": {"cum": 0.0, "kg": 0.0},
                            "M30": {"cum": 0.0, "kg": 0.0},
                            "M35": {"cum": 0.0, "kg": 0.0},
                            "M40": {"cum": 0.0, "kg": 0.0},
                            "M45": {"cum": 0.0, "kg": 0.0},
                            "M50": {"cum": 0.0, "kg": 0.0},
                        }
                    },
                    "steel": {
                        "units": ["MT", "kg"],
                        "sub_materials": {
                            "E 165(Fe 290)": {"MT": 0.0, "kg": 0.0},
                            "E 250(Fe 410W)A": {"MT": 0.0, "kg": 0.0},
                            "E 250(Fe 410W)B": {"MT": 0.0, "kg": 0.0},
                            "E 250(Fe 410)C": {"MT": 0.0, "kg": 0.0},
                            "E 300(Fe 440)": {"MT": 0.0, "kg": 0.0},
                            "E 350(Fe 490)": {"MT": 0.0, "kg": 0.0},
                            "E 410(Fe 540)": {"MT": 0.0, "kg": 0.0},
                            "E 450(Fe 570)D": {"MT": 0.0, "kg": 0.0},
                        }
                    }
                }
            },
            "Foundation protection": {
                "materials": {
                    "concrete": {
                        "units": ["cum", "kg"],
                        "sub_materials": {
                            "M15": {"cum": 0.0, "kg": 0.0},
                            "M20": {"cum": 0.0, "kg": 0.0},
                            "M25": {"cum": 0.0, "kg": 0.0},
                            "M30": {"cum": 0.0, "kg": 0.0},
                        }
                    },
                    "steel": {
                        "units": ["MT", "kg"],
                        "sub_materials": {
                            "E 165(Fe 290)": {"MT": 0.0, "kg": 0.0},
                            "E 250(Fe 410W)A": {"MT": 0.0, "kg": 0.0},
                            "E 250(Fe 410W)B": {"MT": 0.0, "kg": 0.0},
                        }
                    }
                }
            }
        }
    },
    "sub-structure": {
        "components": {
            "Abutment": {
                "materials": {
                    "concrete": {
                        "units": ["cum", "kg"],
                        "sub_materials": {
                            "M15": {"cum": 0.0, "kg": 0.0},
                            "M20": {"cum": 0.0, "kg": 0.0},
                            "M25": {"cum": 0.0, "kg": 0.0},
                            "M30": {"cum": 0.0, "kg": 0.0},
                            "M35": {"cum": 0.0, "kg": 0.0},
                            "M40": {"cum": 0.0, "kg": 0.0},
                        }
                    },
                    "steel": {
                        "units": ["MT", "kg"],
                        "sub_materials": {
                            "E 165(Fe 290)": {"MT": 0.0, "kg": 0.0},
                            "E 250(Fe 410W)A": {"MT": 0.0, "kg": 0.0},
                            "E 250(Fe 410W)B": {"MT": 0.0, "kg": 0.0},
                            "E 250(Fe 410)C": {"MT": 0.0, "kg": 0.0},
                        }
                    }
                }
            },
            "Abutment protection works": {
                "materials": {
                    "concrete": {
                        "units": ["cum", "kg"],
                        "sub_materials": {
                            "M15": {"cum": 0.0, "kg": 0.0},
                            "M20": {"cum": 0.0, "kg": 0.0},
                            "M25": {"cum": 0.0, "kg": 0.0},
                        }
                    }
                }
            },
            "Pier": {
                "materials": {
                    "concrete": {
                        "units": ["cum", "kg"],
                        "sub_materials": {
                            "M20": {"cum": 0.0, "kg": 0.0},
                            "M25": {"cum": 0.0, "kg": 0.0},
                            "M30": {"cum": 0.0, "kg": 0.0},
                            "M35": {"cum": 0.0, "kg": 0.0},
                            "M40": {"cum": 0.0, "kg": 0.0},
                        }
                    },
                    "steel": {
                        "units": ["MT", "kg"],
                        "sub_materials": {
                            "E 250(Fe 410W)A": {"MT": 0.0, "kg": 0.0},
                            "E 250(Fe 410W)B": {"MT": 0.0, "kg": 0.0},
                            "E 300(Fe 440)": {"MT": 0.0, "kg": 0.0},
                            "E 350(Fe 490)": {"MT": 0.0, "kg": 0.0},
                        }
                    }
                }
            },
            "Pier cap": {
                "materials": {
                    "concrete": {
                        "units": ["cum", "kg"],
                        "sub_materials": {
                            "M25": {"cum": 0.0, "kg": 0.0},
                            "M30": {"cum": 0.0, "kg": 0.0},
                            "M35": {"cum": 0.0, "kg": 0.0},
                            "M40": {"cum": 0.0, "kg": 0.0},
                        }
                    },
                    "steel": {
                        "units": ["MT", "kg"],
                        "sub_materials": {
                            "E 250(Fe 410W)A": {"MT": 0.0, "kg": 0.0},
                            "E 250(Fe 410W)B": {"MT": 0.0, "kg": 0.0},
                            "E 300(Fe 440)": {"MT": 0.0, "kg": 0.0},
                        }
                    }
                }
            }
        }
    },
    "super-structure": {
        "components": {
            "Girders/Main beams": {
                "materials": {
                    "concrete": {
                        "units": ["cum", "kg"],
                        "sub_materials": {
                            "M30": {"cum": 0.0, "kg": 0.0},
                            "M35": {"cum": 0.0, "kg": 0.0},
                            "M40": {"cum": 0.0, "kg": 0.0},
                            "M45": {"cum": 0.0, "kg": 0.0},
                            "M50": {"cum": 0.0, "kg": 0.0},
                        }
                    },
                    "steel": {
                        "units": ["MT", "kg"],
                        "sub_materials": {
                            "E 300(Fe 440)": {"MT": 0.0, "kg": 0.0},
                            "E 350(Fe 490)": {"MT": 0.0, "kg": 0.0},
                            "E 410(Fe 540)": {"MT": 0.0, "kg": 0.0},
                            "E 450(Fe 570)D": {"MT": 0.0, "kg": 0.0},
                        }
                    }
                }
            },
            "Cross beams/diaphragms": {
                "materials": {
                    "concrete": {
                        "units": ["cum", "kg"],
                        "sub_materials": {
                            "M25": {"cum": 0.0, "kg": 0.0},
                            "M30": {"cum": 0.0, "kg": 0.0},
                            "M35": {"cum": 0.0, "kg": 0.0},
                            "M40": {"cum": 0.0, "kg": 0.0},
                        }
                    },
                    "steel": {
                        "units": ["MT", "kg"],
                        "sub_materials": {
                            "E 250(Fe 410W)A": {"MT": 0.0, "kg": 0.0},
                            "E 250(Fe 410W)B": {"MT": 0.0, "kg": 0.0},
                            "E 300(Fe 440)": {"MT": 0.0, "kg": 0.0},
                        }
                    }
                }
            },
            "Deck slab": {
                "materials": {
                    "concrete": {
                        "units": ["cum", "kg"],
                        "sub_materials": {
                            "M30": {"cum": 0.0, "kg": 0.0},
                            "M35": {"cum": 0.0, "kg": 0.0},
                            "M40": {"cum": 0.0, "kg": 0.0},
                        }
                    },
                    "steel": {
                        "units": ["MT", "kg"],
                        "sub_materials": {
                            "E 250(Fe 410W)A": {"MT": 0.0, "kg": 0.0},
                            "E 250(Fe 410W)B": {"MT": 0.0, "kg": 0.0},
                            "E 300(Fe 440)": {"MT": 0.0, "kg": 0.0},
                        }
                    }
                }
            },
            "Cantilever slab": {
                "materials": {
                    "concrete": {
                        "units": ["cum", "kg"],
                        "sub_materials": {
                            "M25": {"cum": 0.0, "kg": 0.0},
                            "M30": {"cum": 0.0, "kg": 0.0},
                            "M35": {"cum": 0.0, "kg": 0.0},
                        }
                    },
                    "steel": {
                        "units": ["MT", "kg"],
                        "sub_materials": {
                            "E 250(Fe 410W)A": {"MT": 0.0, "kg": 0.0},
                            "E 250(Fe 410W)B": {"MT": 0.0, "kg": 0.0},
                        }
                    }
                }
            },
            "Joints": {
                "materials": {
                    "steel": {
                        "units": ["MT", "kg"],
                        "sub_materials": {
                            "E 300(Fe 440)": {"MT": 0.0, "kg": 0.0},
                            "E 350(Fe 490)": {"MT": 0.0, "kg": 0.0},
                        }
                    }
                }
            }
        }
    },
    "miscellaneous": {
        "components": {
            "Wearing surface": {
                "materials": {
                    "mastic asphalt": {
                        "units": ["sqm"],
                        "sub_materials": {
                            "standard": {"sqm": 0.0}
                        }
                    }
                }
            },
            "Footpaths": {
                "materials": {
                    "concrete": {
                        "units": ["cum", "kg"],
                        "sub_materials": {
                            "M15": {"cum": 0.0, "kg": 0.0},
                            "M20": {"cum": 0.0, "kg": 0.0},
                        }
                    },
                    "paver blocks": {
                        "units": ["sqm"],
                        "sub_materials": {
                            "standard": {"sqm": 0.0}
                        }
                    }
                }
            },
            "Expansion joints": {
                "materials": {
                    "steel": {
                        "units": ["MT", "kg"],
                        "sub_materials": {
                            "E 250(Fe 410W)A": {"MT": 0.0, "kg": 0.0},
                            "E 300(Fe 440)": {"MT": 0.0, "kg": 0.0},
                        }
                    }
                }
            },
            "Painting system": {
                "materials": {
                    "paint": {
                        "units": ["ltr"],
                        "sub_materials": {
                            "white/yellow": {"ltr": 0.0},
                            "primer_epoxy": {"ltr": 0.0},
                            "oil": {"ltr": 0.0},
                            "alluminium": {"ltr": 0.0}
                        }
                    }
                }
            },
            "Bearings": {
                "materials": {
                    "steel": {
                        "units": ["MT", "kg"],
                        "sub_materials": {
                            "E 350(Fe 490)": {"MT": 0.0, "kg": 0.0},
                            "E 410(Fe 540)": {"MT": 0.0, "kg": 0.0},
                        }
                    }
                }
            }
        }
    }
}


def get_material_cost_template():
    return copy.deepcopy(MATERIAL_COSTS_TEMPLATE)


# Get all form names
def get_forms():
    return list(MATERIAL_COSTS_TEMPLATE.keys())


# Get components for a specific form
def get_components(form_name):
    form_data = MATERIAL_COSTS_TEMPLATE.get(form_name, {})
    return list(form_data.get("components", {}).keys())


# Get materials for a specific form and component
def get_materials(form_name, component_name):
    form_data = MATERIAL_COSTS_TEMPLATE.get(form_name, {})
    component_data = form_data.get("components", {}).get(component_name, {})
    return list(component_data.get("materials", {}).keys())


# Get sub-materials (grades) for a specific material
def get_sub_materials(form_name, component_name, material_name):
    form_data = MATERIAL_COSTS_TEMPLATE.get(form_name, {})
    component_data = form_data.get("components", {}).get(component_name, {})
    material_data = component_data.get("materials", {}).get(material_name, {})
    return list(material_data.get("sub_materials", {}).keys())


# Get units for a specific material
def get_units(form_name, component_name, material_name):
    form_data = MATERIAL_COSTS_TEMPLATE.get(form_name, {})
    component_data = form_data.get("components", {}).get(component_name, {})
    material_data = component_data.get("materials", {}).get(material_name, {})
    return material_data.get("units", [])


# Get cost for specific material, sub-material, and unit
def get_material_cost(form_name, component_name, material_name, sub_material_name, unit):
    form_data = MATERIAL_COSTS_TEMPLATE.get(form_name, {})
    component_data = form_data.get("components", {}).get(component_name, {})
    material_data = component_data.get("materials", {}).get(material_name, {})
    sub_material_data = material_data.get("sub_materials", {}).get(sub_material_name, {})
    return sub_material_data.get(unit, None)


# Set cost for specific material, sub-material, and unit
def set_material_cost(form_name, component_name, material_name, sub_material_name, unit, cost):
    try:
        form_data = MATERIAL_COSTS_TEMPLATE.get(form_name, {})
        component_data = form_data.get("components", {}).get(component_name, {})
        material_data = component_data.get("materials", {}).get(material_name, {})
        sub_material_data = material_data.get("sub_materials", {}).get(sub_material_name, {})
        
        if unit in sub_material_data:
            sub_material_data[unit] = cost
            return True
        return False
    except (KeyError, AttributeError):
        return False


# Validation helpers
def is_valid_form(form_name):
    return form_name in MATERIAL_COSTS_TEMPLATE


def is_valid_component(form_name, component_name):
    return component_name in MATERIAL_COSTS_TEMPLATE.get(form_name, {}).get("components", {})


def is_valid_material(form_name, component_name, material_name):
    form_data = MATERIAL_COSTS_TEMPLATE.get(form_name, {})
    component_data = form_data.get("components", {}).get(component_name, {})
    return material_name in component_data.get("materials", {})


def is_valid_sub_material(form_name, component_name, material_name, sub_material_name):
    form_data = MATERIAL_COSTS_TEMPLATE.get(form_name, {})
    component_data = form_data.get("components", {}).get(component_name, {})
    material_data = component_data.get("materials", {}).get(material_name, {})
    return sub_material_name in material_data.get("sub_materials", {})


def is_valid_unit(form_name, component_name, material_name, unit):
    form_data = MATERIAL_COSTS_TEMPLATE.get(form_name, {})
    component_data = form_data.get("components", {}).get(component_name, {})
    material_data = component_data.get("materials", {}).get(material_name, {})
    return unit in material_data.get("units", [])