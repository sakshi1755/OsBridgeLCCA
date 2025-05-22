import React, { useState } from "react";

const CarbonEmissionData = ({ onClose }) => {
  const [components, setComponents] = useState([
    {
      name: "",
      materials: [
        { type: "Concrete", quantity: "", unit: "", embeddedCarbonEnergy: "", carbonEmissionFactor: "" },
        { type: "Steel", quantity: "", unit: "kg", embeddedCarbonEnergy: "", carbonEmissionFactor: "" },
      ],
    },
    {
      name: "",
      materials: [
        { type: "Concrete", quantity: "", unit: "m³", embeddedCarbonEnergy: "", carbonEmissionFactor: "" },
        { type: "", quantity: "", unit: "kg", embeddedCarbonEnergy: "", carbonEmissionFactor: "" },
      ],
    },
    {
      name: "",
      materials: [
        { type: "Concrete", quantity: "", unit: "m³", embeddedCarbonEnergy: "", carbonEmissionFactor: "" },
        { type: "", quantity: "", unit: "kg", embeddedCarbonEnergy: "", carbonEmissionFactor: "" },
      ],
    },
  ]);

  const handleMaterialChange = (
    componentIndex,
    materialIndex,
    field,
    value
  ) => {
    const updatedComponents = [...components];
    updatedComponents[componentIndex].materials[materialIndex][field] = value;
    setComponents(updatedComponents);
  };

  const handleComponentNameChange = (componentIndex, value) => {
    const updatedComponents = [...components];
    updatedComponents[componentIndex].name = value;
    setComponents(updatedComponents);
  };

  const addMaterial = (componentIndex) => {
    const updatedComponents = [...components];
    updatedComponents[componentIndex].materials.push({
      type: "",
      quantity: "",
      unit: "",
      embeddedCarbonEnergy: "",
      carbonEmissionFactor: "",
    });
    setComponents(updatedComponents);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      {/* Title bar */}
      <div className="flex justify-between items-center bg-[#F0E6E6] px-4 py-2 rounded-sm border border-gray-300 w-fit border-b-[#522828b0] border-b-[0.25rem]">
        <h3 className="text-lg font-medium">Carbon Emission Data </h3>
        <button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700 ml-4 transition-colors"
        >
          ×
        </button>
      </div>

      {/* Form content */}
      <div className="bg-[#FFF9F9] p-6 border border-gray-300 rounded-b-sm">
        <div className="space-y-6">
          {components.map((component, componentIndex) => (
            <div key={componentIndex} className="mb-8">
              <div className="mb-2">
                <label className="block text-gray-700 mb-1">Component:</label>
                <input
                  type="text"
                  value={component.name}
                  onChange={(e) => handleComponentNameChange(componentIndex, e.target.value)}
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
                          <div className="relative">
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
                              className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full"
                            />
                            {material.type && (
                              <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                                ▼
                              </span>
                            )}
                          </div>
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
                            className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full"
                          />
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

          {/* Navigation buttons */}
          <div className="flex justify-end gap-4 mt-8">
            <button className="bg-white border border-gray-300 rounded-md px-8 py-1 text-sm hover:bg-gray-50 transition-colors">
              Back
            </button>
            <button className="bg-white border border-gray-300 rounded-md px-8 py-1 text-sm hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonEmissionData;