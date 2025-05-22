"use client"

import { useState } from "react"

// Generic reusable form component
const Form = ({ title, initialMaterials, componentOptions, materialOptions, onClose }) => {
  const [materials, setMaterials] = useState(initialMaterials)

  // Group materials by component for rendering
  const groupedMaterials = materials.reduce((acc, material) => {
    if (!acc[material.component]) {
      acc[material.component] = []
    }
    acc[material.component].push(material)
    return acc
  }, {})

  // Handle adding a new material to a component
  const handleAddMaterial = (componentType) => {
    const newMaterial = {
      id: Math.max(0, ...materials.map((m) => m.id)) + 1,
      component: componentType,
      materialType: "",
      quantity: "",
      unit: "",
      rate: "",
      rateDataSource: "",
    }
    setMaterials([...materials, newMaterial])
  }

  // Handle material field changes
  const handleMaterialChange = (id, field, value) => {
    setMaterials(materials.map((material) => (material.id === id ? { ...material, [field]: value } : material)))
  }

  // Handle adding a new sub-component
  const handleAddSubComponent = (parentComponent) => {
    console.log(`Adding sub-component to ${parentComponent}`)
  }

  return (
<div className="w-full max-w-4xl mx-auto mt-6">
  {/* Title bar aligned perfectly with component box */}
  <div className="flex justify-between items-center bg-[#F0E6E6] px-4 py-2 rounded-sm border border-gray-300 w-fit border-b-[#522828b0] border-b-[0.25rem]">
    <h3 className="text-lg font-medium">{title}</h3>
    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 ml-4">×</button>
  </div>

  {/* Component box (no extra margin/indent) */}
  <div className="bg-[#FFF9F9] p-6 border  border-gray-300 rounded-b-sm">

      <div className="px-6 py-4">
        {/* Render grouped materials by component */}
        {Object.entries(groupedMaterials).map(([component, componentMaterials], componentIndex) => (
          <div key={componentIndex} className="mb-8">
            {/* Component header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Component:</span>
                <div className="relative">
                  <select
                    className="border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm appearance-none bg-white"
                    value={component}
                    onChange={(e) => console.log(e.target.value)}
                  >
                    {componentOptions.map((option, idx) => (
                      <option key={idx} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">▼</span>
                </div>
              </div>
              <button
                onClick={() => handleAddSubComponent(component)}
                className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"
              >
                +Add Sub-Component
              </button>
            </div>

            {/* Table headers */}
            <div className="grid grid-cols-5 gap-4 mb-2 text-sm font-medium text-gray-600">
              <div>Material Type and Grade</div>
              <div>Quantity</div>
              <div>Unit</div>
              <div>Rate</div>
              <div>Rate Data Source</div>
            </div>

            {/* Material rows for this component */}
            {componentMaterials.map((material) => (
              <div key={material.id} className="grid grid-cols-5 gap-4 mb-3">
                <div>
                  <div className="relative">
                    <select
                      value={material.materialType}
                      onChange={(e) => handleMaterialChange(material.id, "materialType", e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm appearance-none"
                    >
                      <option value="">Select material</option>
                      {materialOptions[component]?.map((option, idx) => (
                        <option key={idx} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">▼</span>
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    value={material.quantity}
                    onChange={(e) => handleMaterialChange(material.id, "quantity", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                  />
                </div>
                <div className="flex items-center justify-center">
                  <span className="w-full border bg-white border-gray-300 rounded-md px-3 py-1 text-sm">{material.unit}</span>
                </div>
                <div>
                  <input
                    type="text"
                    value={material.rate}
                    onChange={(e) => handleMaterialChange(material.id, "rate", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={material.rateDataSource}
                    onChange={(e) => handleMaterialChange(material.id, "rateDataSource", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                  />
                </div>
              </div>
            ))}

            {/* Add Material button */}
            <div className="flex justify-center mt-4 mb-4">
              <button
                onClick={() => handleAddMaterial(component)}
                className="bg-white border border-gray-300 rounded-md px-4 py-1 text-sm w-48 text-gray-600 hover:bg-gray-50"
              >
                + Add Material
              </button>
            </div>

            {/* Separator line */}
            {componentIndex < Object.keys(groupedMaterials).length - 1 && (
              <div className="border-t border-gray-200 my-6"></div>
            )}
          </div>
        ))}

        {/* Navigation buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button className="bg-white border border-gray-300 rounded-md px-8 py-1 text-sm hover:bg-gray-50">
            Back
          </button>
          <button className="bg-white border border-gray-300 rounded-md px-8 py-1 text-sm hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Form
