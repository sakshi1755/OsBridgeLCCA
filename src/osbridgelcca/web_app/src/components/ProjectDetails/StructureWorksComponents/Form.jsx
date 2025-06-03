"use client"

import { useState, useEffect } from "react"
import { useFormNavigation, ConfirmationModal } from '../UseFormNavigation'

const Form = ({ title, initialMaterials, componentOptions, materialOptions, onClose, currentForm, onNavigate,setActiveTabs,Activetabs,onclicktabs  }) => {
  const [materials, setMaterials] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationType, setConfirmationType] = useState(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const navigation = useFormNavigation(currentForm, onNavigate)
  

  useEffect(() => {
    if (materials.length === 0 && initialMaterials?.length > 0) {
      const updated = initialMaterials.map((mat, index) => ({
        ...mat,
        unit: index === 0 ? "m³" : index === 1 ? "kg" : mat.unit || "",
      }))
      setMaterials(updated)
    }
  }, [initialMaterials, materials.length])

  useEffect(() => {
    if (materials.length > 0) {
      setHasUnsavedChanges(true)
    }
  }, [materials])

  const groupedMaterials = materials.reduce((acc, material) => {
    if (!acc[material.component]) acc[material.component] = []
    acc[material.component].push(material)
    return acc
  }, {})

  const handleAddMaterial = (componentType) => {
    const newMaterial = {
      id: Math.max(0, ...materials.map((m) => m.id)) + 1,
      component: componentType,
      materialType: "",
      customMaterialType: "",
      quantity: "",
      unit: "",
      rate: "",
      rateDataSource: "",
    }
    setMaterials([...materials, newMaterial])
  }

  const handleMaterialChange = (id, field, value) => {
    setMaterials(materials.map((m) =>
      m.id === id ? { ...m, [field]: value } : m
    ))
  }

  const handleMaterialTypeChange = (id, value) => {
    if (value === "Other") {
      // Mark material as custom and set default custom material
      setMaterials(materials.map((m) =>
        m.id === id ? { 
          ...m, 
          materialType: "Other",
          customMaterialType: "Custom Material"
        } : m
      ))
    } else {
      // Remove custom material flag and update material type
      setMaterials(materials.map((m) =>
        m.id === id ? { 
          ...m, 
          materialType: value,
          customMaterialType: ""
        } : m
      ))
    }
  }

  const handleComponentChange = (oldComponent, newComponent) => {
    const updatedMaterials = materials.map((mat) =>
      mat.component === oldComponent ? { ...mat, component: newComponent } : mat
    )
    setMaterials(updatedMaterials)
  }

  const handleCustomComponentChange = (oldComponent, customComponent) => {
    const updatedMaterials = materials.map((mat) =>
      mat.component === oldComponent ? { ...mat, component: customComponent, customComponent: customComponent } : mat
    )
    setMaterials(updatedMaterials)
  }

  const handleAddSubComponent = (parentComponent) => {
    let baseName = parentComponent + "-Sub"
    let counter = 1
    let newComponentName = baseName

    while (materials.some((m) => m.component === newComponentName)) {
      newComponentName = `${baseName}${counter}`
      counter++
    }

    const newMaterial = {
      id: Math.max(0, ...materials.map((m) => m.id)) + 1,
      component: newComponentName,
      materialType: "",
      customMaterialType: "",
      quantity: "",
      unit: "",
      rate: "",
      rateDataSource: "",
    }

    setMaterials([...materials, newMaterial])
  }

  const handleNext = () => {
    if (navigation.canGoNext) {
      setConfirmationType('next')
      setShowConfirmation(true)
    }
  }

  // const handleBack = () => {
  //   if (navigation.canGoBack) {
  //     if (hasUnsavedChanges) {
  //       setConfirmationType('back')
  //       setShowConfirmation(true)
  //     } else {
  //       navigation.navigate(navigation.getPreviousForm())
  //     }
  //   }
  // }
  const handleBack = () => {
  setConfirmationType('back')
  setShowConfirmation(true)
}


  const handleConfirm = () => {
    if (confirmationType === 'next') {
      console.log('Saving form data:', materials)
      setHasUnsavedChanges(false)
      navigation.navigate(navigation.getNextForm())
    } else if (confirmationType === 'back') {
      navigation.navigate(navigation.getPreviousForm())
    }
    setShowConfirmation(false)
    setConfirmationType(null)
  }

  const handleCloseConfirmation = () => {
    setShowConfirmation(false)
    setConfirmationType(null)
  }

  const unitOptions = ["m³", "kg", "litre", "nos"]

  // Check if a component is using "Other" option
  const isComponentOther = (component) => {
    const componentMaterials = materials.filter(mat => mat.component === component)
    return componentMaterials.some(mat => mat.isCustomComponent)
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
   {/* TABS ROW — scrolls if needed, stays within form width, doesn't stretch or resize anything */}
<div
  className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
  style={{
    scrollbarWidth: 'thin', // for Firefox
  }}
>
  <div className="flex  w-fit min-w-full">
    {Activetabs.map((tab, index) => (
      <div
        onClick={() => onclicktabs(tab)}
        key={index}
        className={`flex items-center px-4 py-2 rounded-sm border border-gray-300 whitespace-nowrap cursor-pointer
          ${tab === currentForm ? 'bg-[#F0E6E6] border-b-[#522828b0] border-b-[0.25rem]' : 'bg-[#F0E6E6]'}
        `}
        style={{
          fontSize: Activetabs.length > 5 ? '0.85rem' : '1rem',
        }}
      >
        <span className="font-medium">{tab}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(tab);
          }}
          className="ml-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
    ))}
  </div>
</div>


      <div className="bg-[#FFF9F9]  border border-gray-300 rounded-b-sm">
        <div className="px-6 py-4">
          {Object.entries(groupedMaterials).map(([component, componentMaterials], componentIndex) => (
            <div key={componentIndex} className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Component:</span>
                  <div className="relative">
                    {/* Check if this component is using "Other" option */}
                    {componentMaterials[0]?.isCustomComponent ? (
                      <input
                        type="text"
                        placeholder="Enter custom component"
                        value=""
                        onChange={(e) => handleCustomComponentChange(component, e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white min-w-[150px]"
                      />
                    ) : (
                      <>
                        <select
                          className="border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm appearance-none bg-white"
                          value={component}
                          onChange={(e) => {
                            if (e.target.value === "Other") {
                              // Mark materials as custom component and set a default name
                              const updatedMaterials = materials.map((mat) =>
                                mat.component === component ? { ...mat, component: "Custom Component", isCustomComponent: true } : mat
                              )
                              setMaterials(updatedMaterials)
                            } else {
                              // Remove custom component flag and update component
                              const updatedMaterials = materials.map((mat) =>
                                mat.component === component ? { ...mat, component: e.target.value, isCustomComponent: false } : mat
                              )
                              setMaterials(updatedMaterials)
                            }
                          }}
                        >
                          {componentOptions.map((option, idx) => (
                            <option key={idx} value={option.value}>{option.label}</option>
                          ))}
                          {/* Only show current component if it's not in the options */}
                          {!componentOptions.find(opt => opt.value === component) && component !== "Other" && (
                            <option value={component}>{component}</option>
                          )}
                          <option value="Other">Other</option>
                        </select>
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">▼</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleAddSubComponent(component)}
                  className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-600 hover:bg-gray-50"
                >
                  + Add Sub-Component
                </button>
              </div>

              <div className="grid grid-cols-5 gap-4 mb-2 text-sm font-medium text-gray-600">
                <div>Material Type and Grade</div>
                <div>Quantity</div>
                <div>Unit</div>
                <div>Rate</div>
                <div>Rate Data Source</div>
              </div>

              {componentMaterials.map((material) => (
                <div key={material.id} className="grid grid-cols-5 gap-4 mb-3">
                  <div>
                    {/* Check if this material is using "Other" option */}
                    {material.materialType === "Other" ? (
                      <input
                        type="text"
                        placeholder="Enter custom material"
                        value= ""
                        onChange={(e) => handleMaterialChange(material.id, "customMaterialType", e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                      />
                    ) : (
                      <div className="relative">
                        <select
                          value={material.materialType}
                          onChange={(e) => handleMaterialTypeChange(material.id, e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm appearance-none"
                        >
                          <option value="">Select material</option>
                          {(materialOptions[component] || []).map((option, idx) => (
                            <option key={idx} value={option.value}>{option.label}</option>
                          ))}
                          <option value="Other">Other</option>
                        </select>
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">▼</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <input
                      type="text"
                      value={material.quantity}
                      onChange={(e) => handleMaterialChange(material.id, "quantity", e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                    />
                  </div>
                  <div>
                    <select
                      value={material.unit}
                      onChange={(e) => handleMaterialChange(material.id, "unit", e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                    >
                      {unitOptions.map((unit, i) => (
                        <option key={i} value={unit}>{unit}</option>
                      ))}
                    </select>
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

              <div className="flex justify-center mt-4 mb-4">
                <button
                  onClick={() => handleAddMaterial(component)}
                  className="bg-white border border-gray-300 rounded-md px-4 py-1 text-sm w-48 text-gray-600 hover:bg-gray-50"
                >
                  + Add Material
                </button>
              </div>

              {componentIndex < Object.keys(groupedMaterials).length - 1 && (
                <div className="border-t border-gray-200 my-6"></div>
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
        onConfirm={handleConfirm}
        onClosed={handleCloseConfirmation}
        type={confirmationType}
        nextForm={navigation.getNextForm()}
      />
    </div>
  )
}

export default Form