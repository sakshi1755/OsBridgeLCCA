import React, { useState } from "react";
import {useFormNavigation, ConfirmationModal} from './UseFormNavigation'

// Form sequence constant

 
const CarbonEmissionData = ({ currentForm, onNavigate,onClose }) => {
  const navigation = useFormNavigation(currentForm, onNavigate);

   const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationType, setConfirmationType] = useState(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [components, setComponents] = useState([
    {
      name: "",
      materials: [
        { type: "Concrete", quantity: "", unit: "m³", embeddedCarbonEnergy: "", carbonEmissionFactor: "", isCustomType: false, isCustomUnit: false },
        { type: "Steel", quantity: "", unit: "kg", embeddedCarbonEnergy: "", carbonEmissionFactor: "", isCustomType: false, isCustomUnit: false },
      ],
    },
    {
      name: "",
      materials: [
        { type: "Concrete", quantity: "", unit: "m³", embeddedCarbonEnergy: "", carbonEmissionFactor: "", isCustomType: false, isCustomUnit: false },
        { type: "", quantity: "", unit: "kg", embeddedCarbonEnergy: "", carbonEmissionFactor: "", isCustomType: false, isCustomUnit: false },
      ],
    },
    {
      name: "",
      materials: [
        { type: "Concrete", quantity: "", unit: "m³", embeddedCarbonEnergy: "", carbonEmissionFactor: "", isCustomType: false, isCustomUnit: false },
        { type: "", quantity: "", unit: "kg", embeddedCarbonEnergy: "", carbonEmissionFactor: "", isCustomType: false, isCustomUnit: false },
      ],
    },
  ]);

  const materialOptions = ["Concrete", "Steel", "Aluminum", "Wood"];
  const unitOptions = ["m³", "kg", "tons", "lbs"];
   const handleNext = () => {
    if (navigation.canGoNext) {
      setConfirmationType('next');
      setShowConfirmation(true);
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack) {
      if (hasUnsavedChanges) {
        setConfirmationType('back');
        setShowConfirmation(true);
      } else {
        navigation.navigate(navigation.getPreviousForm());
      }
    }
  };

  const handleConfirm = () => {
    if (confirmationType === 'next') {
      // Here you would typically save the form data to your context or API
      console.log('Saving form data:',components);
      setHasUnsavedChanges(false);
      navigation.navigate(navigation.getNextForm());
    } else if (confirmationType === 'back') {
      navigation.navigate(navigation.getPreviousForm());
    }
    setShowConfirmation(false);
    setConfirmationType(null);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setConfirmationType(null);
  };

  const handleMaterialChange = (
    componentIndex,
    materialIndex,
    field,
    value
  ) => {
    const updatedComponents = [...components];
    const material = updatedComponents[componentIndex].materials[materialIndex];
    
    if (field === "type") {
      if (value === "Other") {
        material.isCustomType = true;
        material.type = "";
      } else {
        material.isCustomType = false;
        material.type = value;
      }
    } else if (field === "unit") {
      if (value === "Other") {
        material.isCustomUnit = true;
        material.unit = "";
      } else {
        material.isCustomUnit = false;
        material.unit = value;
      }
    } else {
      material[field] = value;
    }
    
    setComponents(updatedComponents);
    setHasUnsavedChanges(true);
  };

  const handleComponentNameChange = (componentIndex, value) => {
    const updatedComponents = [...components];
    updatedComponents[componentIndex].name = value;
    setComponents(updatedComponents);
    setHasUnsavedChanges(true);
  };

  const addMaterial = (componentIndex) => {
    const updatedComponents = [...components];
    updatedComponents[componentIndex].materials.push({
      type: "",
      quantity: "",
      unit: "",
      embeddedCarbonEnergy: "",
      carbonEmissionFactor: "",
      isCustomType: false,
      isCustomUnit: false,
    });
    setComponents(updatedComponents);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      <div className="flex justify-between items-center bg-[#F0E6E6] px-4 py-2 rounded-sm border border-gray-300 w-fit border-b-[#522828b0] border-b-[0.25rem]">
        <h3 className="text-lg font-medium">Carbon Emission Data</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 ml-4 transition-colors"
        >
          ×
        </button>
      </div>

      <div className="bg-[#FFF9F9] p-6 border border-gray-300 rounded-b-sm">
        <div className="space-y-6">
          {components.map((component, componentIndex) => (
            <div key={componentIndex} className="mb-8">
              <div className="mb-2">
                <label className="block text-gray-700 mb-1">Component:</label>
                <input
                  type="text"
                  value={component.name}
                  onChange={(e) =>
                    handleComponentNameChange(componentIndex, e.target.value)
                  }
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm w-48"
                />
              </div>

              <div className="w-full overflow-x-auto">
                <table className="w-full mb-2">
                  <thead>
                    <tr className="text-sm text-gray-600">
                      <th className="text-left pb-2 font-normal">Material Type and Grade</th>
                      <th className="text-left pb-2 font-normal">Quantity</th>
                      <th className="text-left pb-2 font-normal">Unit</th>
                      <th className="text-left pb-2 font-normal">Embedded Carbon Energy</th>
                      <th className="text-left pb-2 font-normal">Carbon Emission Factor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {component.materials.map((material, materialIndex) => (
                      <tr key={materialIndex} className="align-middle">
                        <td className="pr-2 py-1">
                          {material.isCustomType ? (
                            <input
                              type="text"
                              value={material.type}
                              onChange={(e) =>
                                handleMaterialChange(
                                  componentIndex,
                                  materialIndex,
                                  "type",
                                  e.target.value
                                )
                              }
                              placeholder="Enter custom material type"
                              className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full"
                            />
                          ) : (
                            <select
                              value={material.type}
                              onChange={(e) =>
                                handleMaterialChange(
                                  componentIndex,
                                  materialIndex,
                                  "type",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full bg-white"
                            >
                              <option value="">Select Material</option>
                              {materialOptions.map((opt, i) => (
                                <option key={i} value={opt}>{opt}</option>
                              ))}
                              <option value="Other">Other</option>
                            </select>
                          )}
                        </td>
                        <td className="px-2 py-1">
                          <input
                            type="text"
                            value={material.quantity}
                            onChange={(e) =>
                              handleMaterialChange(
                                componentIndex,
                                materialIndex,
                                "quantity",
                                e.target.value
                              )
                            }
                            className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full"
                          />
                        </td>
                        <td className="px-2 py-1">
                          {material.isCustomUnit ? (
                            <input
                              type="text"
                              value={material.unit}
                              onChange={(e) =>
                                handleMaterialChange(
                                  componentIndex,
                                  materialIndex,
                                  "unit",
                                  e.target.value
                                )
                              }
                              placeholder="Enter custom unit"
                              className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full"
                            />
                          ) : (
                            <select
                              value={material.unit}
                              onChange={(e) =>
                                handleMaterialChange(
                                  componentIndex,
                                  materialIndex,
                                  "unit",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full bg-white"
                            >
                              <option value="">Select Unit</option>
                              {unitOptions.map((unit, idx) => (
                                <option key={idx} value={unit}>{unit}</option>
                              ))}
                              <option value="Other">Other</option>
                            </select>
                          )}
                        </td>
                        <td className="px-2 py-1">
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={material.embeddedCarbonEnergy}
                              onChange={(e) =>
                                handleMaterialChange(
                                  componentIndex,
                                  materialIndex,
                                  "embeddedCarbonEnergy",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full"
                            />
                            <span className="ml-2 text-sm text-gray-600">(MJ/kg)</span>
                          </div>
                        </td>
                        <td className="pl-2 py-1">
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={material.carbonEmissionFactor}
                              onChange={(e) =>
                                handleMaterialChange(
                                  componentIndex,
                                  materialIndex,
                                  "carbonEmissionFactor",
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full"
                            />
                            <span className="ml-2 text-sm text-gray-600">kg CO₂e/kg</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                onClick={() => addMaterial(componentIndex)}
                className="w-full border border-gray-300 rounded-md py-1 text-sm bg-white hover:bg-gray-50 transition-colors mt-2"
              >
                + Add Material
              </button>

              {componentIndex < components.length - 1 && (
                <div className="my-4 border-t border-gray-200"></div>
              )}
            </div>
          ))}

          <div className="flex justify-end gap-4 mt-8">
          <button 
              onClick={handleBack}
              disabled={!navigation.canGoBack}
              className={`px-8 py-1 text-sm rounded-md border ${
                navigation.canGoBack 
                  ? 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700' 
                  : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Back
            </button>
           <button 
              onClick={handleNext}
              disabled={!navigation.canGoNext}
              className={`px-8 py-1 text-sm rounded-md border ${
                navigation.canGoNext 
                  ? 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700' 
                  : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
  <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
        type={confirmationType}
        nextForm={confirmationType === 'next' ? navigation.getNextForm() : navigation.getPreviousForm()}
      />

    </div>
  );
};

export default CarbonEmissionData;