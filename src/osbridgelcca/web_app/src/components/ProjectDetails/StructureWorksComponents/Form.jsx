
"use client"

import { useState, useEffect } from "react"
import { useFormNavigation, ConfirmationModal } from '../UseFormNavigation'

const Form = ({ 
  title, 
  initialMaterials, 
  componentOptions, 
  onClose, 
  currentForm, 
  onNavigate, 
  setActiveTabs, 
  Activetabs, 
  onclicktabs 
}) => {
  const [materials, setMaterials] = useState([])
  const [formData, setFormData] = useState({})
  const [materialOptions, setMaterialOptions] = useState({})
  const [subMaterialOptions, setSubMaterialOptions] = useState({})
  const [unitOptions, setUnitOptions] = useState({})
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationType, setConfirmationType] = useState(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  
  // New state for cost calculations
  const [initialConstructionCost, setInitialConstructionCost] = useState(0)
  const [costBreakdown, setCostBreakdown] = useState([])
  const [totalCosts, setTotalCosts] = useState({
    foundation: 0,
    subStructure: 0,
    superStructure: 0,
    miscellaneous: 0
  })
  const [isCalculating, setIsCalculating] = useState(false)

  const navigation = useFormNavigation(currentForm, onNavigate)

  // Map form names to API form names
  const getFormApiName = (formName) => {
    const mapping = {
      'Foundation': 'foundation',
      'Sub-Structure': 'sub-structure', 
      'Super-Structure': 'super-structure',
      'Miscellaneous': 'miscellaneous'
    }
    return mapping[formName] || formName.toLowerCase()
  }

  // Fetch form data on component mount or when currentForm changes
  useEffect(() => {
    const apiFormName = getFormApiName(currentForm)
    
    fetch(`http://127.0.0.1:5000/api/form-data/${apiFormName}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data)
        console.log('Form data loaded:', data)
      })
      .catch(err => console.error("Error fetching form data:", err))
  }, [currentForm])

  // Initialize materials from backend data
  useEffect(() => {
    const initializeFromBackend = async () => {
      if (materials.length === 0 && Object.keys(formData).length > 0) {
        const availableComponents = Object.keys(formData)
        const firstTwoComponents = availableComponents.slice(0, 2)
        
        const initialMaterials = []
        
        for (let i = 0; i < firstTwoComponents.length; i++) {
          const component = firstTwoComponents[i]
          const componentData = formData[component]
          const firstMaterial = Object.keys(componentData)[0]
          
          if (firstMaterial) {
            const materialData = componentData[firstMaterial]
            const firstUnit = materialData.units?.[0] || ""
            
            initialMaterials.push({
              id: i + 1,
              component: component,
              materialType: firstMaterial,
              subMaterialType: materialData.sub_materials?.[0] || "",
              customMaterialType: "",
              quantity: "",
              unit: firstUnit,
              rate: "",
              rateDataSource: "",
            })
          }
        }
        
        if (initialMaterials.length > 0) {
          setMaterials(initialMaterials)
        }
      }
    }
    
    initializeFromBackend()
  }, [formData, materials.length])

  // Track unsaved changes
  useEffect(() => {
    if (materials.length > 0) {
      setHasUnsavedChanges(true)
    }
  }, [materials])

  // Load initial construction cost on component mount
  useEffect(() => {
    loadInitialConstructionCost()
  }, [])

  

  // Function to calculate current form cost
  const calculateCurrentFormCost = async (materialsData) => {
    try {
      const validMaterials = materialsData.filter(mat => 
        mat.quantity && mat.rate && !isNaN(parseFloat(mat.quantity)) && !isNaN(parseFloat(mat.rate))
      )

      if (validMaterials.length === 0) return 0

      const response = await fetch('http://127.0.0.1:5000/api/calculate-initial-construction-cost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          materials: validMaterials.map(mat => ({
            material: mat.materialType,
            grade: mat.subMaterialType,
            quantity: parseFloat(mat.quantity),
            unit: mat.unit,
            rate: parseFloat(mat.rate)
          }))
        })
      })

      if (response.ok) {
        const costData = await response.json()
        return costData.total_initial_construction_cost || 0
      }
    } catch (error) {
      console.error('Error calculating current form cost:', error)
    }
    return 0
  }

  // Fetch materials when component changes
  const fetchMaterials = async (componentName) => {
    const apiFormName = getFormApiName(currentForm)
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/materials/${apiFormName}/${encodeURIComponent(componentName)}`)
      const materials = await response.json()
      return materials
    } catch (err) {
      console.error("Error fetching materials:", err)
      return []
    }
  }

  // Fetch sub-materials when material changes
  const fetchSubMaterials = async (componentName, materialName) => {
    const apiFormName = getFormApiName(currentForm)
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/sub-materials/${apiFormName}/${encodeURIComponent(componentName)}/${encodeURIComponent(materialName)}`)
      const subMaterials = await response.json()
      return subMaterials
    } catch (err) {
      console.error("Error fetching sub-materials:", err)
      return []
    }
  }

  // Fetch units when material changes
  const fetchUnits = async (componentName, materialName) => {
    const apiFormName = getFormApiName(currentForm)
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/units/${apiFormName}/${encodeURIComponent(componentName)}/${encodeURIComponent(materialName)}`)
      const units = await response.json()
      return units
    } catch (err) {
      console.error("Error fetching units:", err)
      return []
    }
  }

  // Group materials by component
  const groupedMaterials = materials.reduce((acc, material) => {
    if (!acc[material.component]) acc[material.component] = []
    acc[material.component].push(material)
    return acc
  }, {})

  // Get available components from form data
  const availableComponents = Object.keys(formData)

  const handleAddMaterial = async (componentType) => {
    const materialsForComponent = await fetchMaterials(componentType)
    setMaterialOptions(prev => ({
      ...prev,
      [componentType]: materialsForComponent
    }))

    const newMaterial = {
      id: Math.max(0, ...materials.map((m) => m.id)) + 1,
      component: componentType,
      materialType: "",
      subMaterialType: "",
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

  const handleMaterialTypeChange = async (id, value) => {
    const material = materials.find(m => m.id === id)
    
    if (value === "Other") {
      setMaterials(materials.map((m) =>
        m.id === id ? {
          ...m,
          materialType: "Other",
          customMaterialType: "Custom Material",
          subMaterialType: "",
          unit: ""
        } : m
      ))
    } else {
      const subMaterials = await fetchSubMaterials(material.component, value)
      const units = await fetchUnits(material.component, value)
      
      setMaterials(materials.map((m) =>
        m.id === id ? {
          ...m,
          materialType: value,
          customMaterialType: "",
          subMaterialType: "",
          unit: units.length > 0 ? units[0] : ""
        } : m
      ))
      
      setSubMaterialOptions(prev => ({
        ...prev,
        [`${material.component}-${value}`]: subMaterials
      }))
      
      setUnitOptions(prev => ({
        ...prev,
        [`${material.component}-${value}`]: units
      }))
    }
  }

  const handleSubMaterialTypeChange = (id, value) => {
    setMaterials(materials.map((m) =>
      m.id === id ? { ...m, subMaterialType: value } : m
    ))
  }

  const handleComponentChange = async (oldComponent, newComponent) => {
    const materialsForComponent = await fetchMaterials(newComponent)
    
    const updatedMaterials = materials.map((mat) =>
      mat.component === oldComponent ? { 
        ...mat, 
        component: newComponent,
        materialType: "",
        subMaterialType: "",
        unit: ""
      } : mat
    )
    setMaterials(updatedMaterials)
    
    setMaterialOptions(prev => ({
      ...prev,
      [newComponent]: materialsForComponent
    }))
  }

  const handleCustomComponentChange = (oldComponent, customComponent) => {
    const updatedMaterials = materials.map((mat) =>
      mat.component === oldComponent ? { 
        ...mat, 
        component: customComponent, 
        customComponent: customComponent,
        materialType: "",
        subMaterialType: "",
        unit: ""
      } : mat
    )
    setMaterials(updatedMaterials)
  }

  const handleAddSubComponent = async (parentComponent) => {
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
      subMaterialType: "",
      customMaterialType: "",
      quantity: "",
      unit: "",
      rate: "",
      rateDataSource: "",
      isCustomComponent: true,
    }
    setMaterials([...materials, newMaterial])
  }

  const handleNext = () => {
    if (navigation.canGoNext) {
      setConfirmationType('next')
      setShowConfirmation(true)
    }
  }

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

  // Enhanced save function with cost calculation
  // Add this function to your existing Form.js component
// This should replace or enhance your existing handleSave function

const handleSave = async () => {
  try {
    setIsCalculating(true)
    const apiFormName = getFormApiName(currentForm)
    
    // Prepare form data for saving
    const formDataToSave = {
      form_name: currentForm,
      materials: materials,
      timestamp: new Date().toISOString()
    }
    
    // Save form data to backend
    const response = await fetch(`http://127.0.0.1:5000/api/save-form-data/${apiFormName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formDataToSave)
    })
    
    if (response.ok) {
      const result = await response.json()
      console.log('Form saved successfully:', result)
      setHasUnsavedChanges(false)
      
      // Calculate initial construction cost for current form
      await calculateAndLogInitialCost()
      
      // Display success message
      alert('Form saved successfully!')
      
    } else {
      console.error('Failed to save form data')
      alert('Failed to save form data')
    }
  } catch (error) {
    console.error('Error saving form:', error)
    alert('Error saving form')
  } finally {
    setIsCalculating(false)
  }
}

// Add this new function to calculate and log initial construction cost
const calculateAndLogInitialCost = async () => {
  try {
    const apiFormName = getFormApiName(currentForm)
    
    // Prepare materials data for cost calculation
    const validMaterials = materials.filter(mat => 
      mat.quantity && mat.rate && 
      !isNaN(parseFloat(mat.quantity)) && 
      !isNaN(parseFloat(mat.rate))
    )

    if (validMaterials.length === 0) {
      console.log('No valid materials found for cost calculation')
      return
    }

    // Send materials to backend for cost calculation
    const costCalculationData = {
      form_name: currentForm,
      materials: validMaterials.map(mat => ({
        material: mat.materialType || mat.customMaterialType || '',
        grade: mat.subMaterialType || '',
        quantity: parseFloat(mat.quantity) || 0,
        unit: mat.unit || '',
        rate: parseFloat(mat.rate) || 0,
        component: mat.component || ''
      }))
    }

    const response = await fetch('http://127.0.0.1:5000/api/calculate-initial-cost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(costCalculationData)
    })

    if (response.ok) {
      const costData = await response.json()
      
      // Log the initial construction cost to console
      console.log('=== INITIAL CONSTRUCTION COST CALCULATION ===')
      console.log(`Form: ${currentForm}`)
      console.log(`Total Initial Construction Cost: ₹${costData.total_initial_cost?.toFixed(2) || 0}`)
      console.log('Cost Breakdown:')
      
      if (costData.cost_breakdown && costData.cost_breakdown.length > 0) {
        costData.cost_breakdown.forEach((item, index) => {
          console.log(`  ${index + 1}. ${item.material} (${item.grade}) - Qty: ${item.quantity} ${item.unit} @ ₹${item.rate} = ₹${item.total_cost?.toFixed(2) || 0}`)
        })
      }
      
      console.log('===============================================')
      
      // Update state if needed
      setInitialConstructionCost(costData.total_initial_cost || 0)
      setCostBreakdown(costData.cost_breakdown || [])
      
    } else {
      console.error('Failed to calculate initial construction cost')
    }
  } catch (error) {
    console.error('Error calculating initial construction cost:', error)
  }
}

// Add this function to calculate cost whenever materials change (optional)
const calculateCostOnChange = async () => {
  // Only calculate if there are valid materials
  const validMaterials = materials.filter(mat => 
    mat.quantity && mat.rate && 
    !isNaN(parseFloat(mat.quantity)) && 
    !isNaN(parseFloat(mat.rate))
  )

  if (validMaterials.length > 0) {
    await calculateAndLogInitialCost()
  }
}

// You can also add this useEffect to calculate cost when materials change
useEffect(() => {
  const debounceTimer = setTimeout(() => {
    if (materials.length > 0) {
      calculateCostOnChange()
    }
  }, 1000) // Debounce for 1 second

  return () => clearTimeout(debounceTimer)
}, [materials])

// Update your existing loadInitialConstructionCost function to also log results
const loadInitialConstructionCost = async () => {
  try {
    setIsCalculating(true)
    
    // Fetch saved data from all forms
    const formNames = ['foundation', 'sub-structure', 'super-structure', 'miscellaneous']
    const allMaterials = []
    const formCosts = { foundation: 0, subStructure: 0, superStructure: 0, miscellaneous: 0 }
    
    for (const formName of formNames) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/api/calculate-initial-cost?form=${formName}`)
        if (response.ok) {
          const data = await response.json()
          if (data.materials && data.materials.length > 0) {
            allMaterials.push(...data.materials.map(mat => ({
              ...mat,
              form: formName
            })))
            
            // Update form-specific costs
            if (formName === 'foundation') formCosts.foundation = data.total_initial_cost || 0
            if (formName === 'sub-structure') formCosts.subStructure = data.total_initial_cost || 0
            if (formName === 'super-structure') formCosts.superStructure = data.total_initial_cost || 0
            if (formName === 'miscellaneous') formCosts.miscellaneous = data.total_initial_cost || 0
          }
        }
      } catch (error) {
        console.error(`Error fetching data for ${formName}:`, error)
      }
    }

    // Calculate total initial construction cost from all forms
    if (allMaterials.length > 0) {
      const totalCost = formCosts.foundation + formCosts.subStructure + formCosts.superStructure + formCosts.miscellaneous
      
      // Log total costs from all forms
      console.log('=== TOTAL INITIAL CONSTRUCTION COST (ALL FORMS) ===')
      console.log(`Foundation: ₹${formCosts.foundation.toFixed(2)}`)
      console.log(`Sub-Structure: ₹${formCosts.subStructure.toFixed(2)}`)
      console.log(`Super-Structure: ₹${formCosts.superStructure.toFixed(2)}`)
      console.log(`Miscellaneous: ₹${formCosts.miscellaneous.toFixed(2)}`)
      console.log(`TOTAL: ₹${totalCost.toFixed(2)}`)
      console.log('===================================================')
      
      setInitialConstructionCost(totalCost)
      setTotalCosts(formCosts)
    }
  } catch (error) {
    console.error('Error calculating initial construction cost:', error)
  } finally {
    setIsCalculating(false)
  }
}

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        <div className="flex w-fit min-w-full">
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

      <div className="bg-[#FFF9F9] border border-gray-300 rounded-b-sm">
        <div className="px-6 py-4">
          {Object.entries(groupedMaterials).map(([component, componentMaterials], componentIndex) => (
            <div key={componentIndex} className="mb-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Component:</span>
                  <div className="relative">
                    {componentMaterials[0]?.isCustomComponent ? (
                      <input
                        type="text"
                        placeholder="Enter custom component"
                        value={componentMaterials[0]?.customComponent || component}
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
                              const updatedMaterials = materials.map((mat) =>
                                mat.component === component ? { 
                                  ...mat, 
                                  component: "Custom Component", 
                                  isCustomComponent: true,
                                  customComponent: "Custom Component",
                                  materialType: "",
                                  subMaterialType: "",
                                  unit: ""
                                } : mat
                              )
                              setMaterials(updatedMaterials)
                            } else {
                              handleComponentChange(component, e.target.value)
                            }
                          }}
                        >
                          {availableComponents.map((comp, idx) => (
                            <option key={idx} value={comp}>{comp}</option>
                          ))}
                          {!availableComponents.includes(component) && component !== "Other" && component !== "Custom Component" && (
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

              <div className="grid grid-cols-6 gap-4 mb-2 text-sm font-medium text-gray-600">
                <div>Material Type</div>
                <div>Grade/Sub-material</div>
                <div>Quantity</div>
                <div>Unit</div>
                <div>Rate</div>
                <div>Rate Data Source</div>
              </div>

              {componentMaterials.map((material) => {
                // Get materials for this component
                const materialOptionsForComponent = materialOptions[component] || 
                  (formData[component] ? Object.keys(formData[component]) : [])
                
                // Get sub-materials for selected material
                const subMaterialOptionsForMaterial = subMaterialOptions[`${component}-${material.materialType}`] || 
                  (formData[component]?.[material.materialType]?.sub_materials || [])
                
                // Get units for selected material
                const unitOptionsForMaterial = unitOptions[`${component}-${material.materialType}`] || 
                  (formData[component]?.[material.materialType]?.units || [])

                return (
                  <div key={material.id} className="grid grid-cols-6 gap-4 mb-3">
                    {/* Material Type Dropdown */}
                    <div>
                      {material.materialType === "Other" ? (
                        <input
                          type="text"
                          placeholder="Enter custom material"
                          value={material.customMaterialType || ""}
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
                            {materialOptionsForComponent.map((mat, idx) => (
                              <option key={idx} value={mat}>{mat}</option>
                            ))}
                            <option value="Other">Other</option>
                          </select>
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">▼</span>
                        </div>
                      )}
                    </div>

                    {/* Sub-material/Grade Dropdown */}
                    <div>
                      <div className="relative">
                        <select
                          value={material.subMaterialType}
                          onChange={(e) => handleSubMaterialTypeChange(material.id, e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm appearance-none"
                          disabled={!material.materialType || material.materialType === "Other"}
                        >
                          <option value="">Select grade</option>
                          {subMaterialOptionsForMaterial.map((subMat, idx) => (
                            <option key={idx} value={subMat}>{subMat}</option>
                          ))}
                        </select>
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">▼</span>
                      </div>
                    </div>

                    {/* Quantity Input */}
                    <input 
                      type="text" 
                      value={material.quantity} 
                      onChange={(e) => handleMaterialChange(material.id, "quantity", e.target.value)} 
                      className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm" 
                      placeholder="Enter quantity"
                    />

                    {/* Unit Dropdown */}
                    <select 
                      value={material.unit} 
                      onChange={(e) => handleMaterialChange(material.id, "unit", e.target.value)} 
                      className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                      disabled={!material.materialType || material.materialType === "Other"}
                    >
                      <option value="">Select unit</option>
                      {unitOptionsForMaterial.map((unit, i) => (
                        <option key={i} value={unit}>{unit}</option>
                      ))}
                    </select>

                    {/* Rate Input */}
                    <input 
                      type="text" 
                      value={material.rate} 
                      onChange={(e) => handleMaterialChange(material.id, "rate", e.target.value)} 
                      className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm" 
                      placeholder="Enter rate"
                    />

                    {/* Rate Data Source Input */}
                    <input 
                      type="text" 
                      value={material.rateDataSource} 
                      onChange={(e) => handleMaterialChange(material.id, "rateDataSource", e.target.value)} 
                      className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm" 
                      placeholder="Enter source"
                    />
                  </div>
                )
              })}

              <div className="flex justify-center mt-4 ">
                <button 
                  onClick={() => handleAddMaterial(component)} 
                  className="w-full border border-gray-300 rounded-md py-1 text-sm bg-white hover:bg-gray-50 transition-colors mt-2"
                >
                  + Add Material
                </button>
              </div>

              {componentIndex < Object.keys(groupedMaterials).length - 1 && (
                <div className="border-t border-gray-200 my-6"></div>
              )}
            </div>
          ))}

          {/* Add Component Button */}
          {availableComponents.length > 0 && (
            <div className="flex justify-center mb-6">
              <div className="relative">
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleAddMaterial(e.target.value)
                      e.target.value = ""
                    }
                  }}
                  className="bg-white border border-gray-300 rounded-md px-4 py-1 text-sm w-48 text-gray-600 hover:bg-gray-50"
                >
                  <option value="">+ Add Component</option>
                  {availableComponents.filter(comp => !Object.keys(groupedMaterials).includes(comp)).map((comp, idx) => (
                    <option key={idx} value={comp}>{comp}</option>
                  ))}
                </select>
             
              </div>
            </div>
          )}

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
             onClick={() => {
                  handleSave()
                  handleNext()
                }}

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