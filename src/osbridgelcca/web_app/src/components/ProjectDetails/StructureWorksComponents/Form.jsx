"use client"

import { useState, useEffect } from "react"
import {useNavigationForm, ConfirmationModal} from '../UseFormNavigation'

// Form sequence constant
// const FORM_SEQUENCE = [
//   'Foundation',
//   'Sub-Structure',
//   'Super-Structure',
//   'Miscellaneous',
//   'FinancialData',
//   'CarbonEmissionData',
//   'CarbonEmissionCostData',
//   'BridgeandTraffic',
//   'MaintenanceandRepairData',
//   'DemolitionandRecycling',
// ];

// // Navigation Hook
// const useFormNavigation = (currentForm, onNavigate) => {
//   const getCurrentIndex = () => FORM_SEQUENCE.indexOf(currentForm);
//   const canGoNext = () => getCurrentIndex() < FORM_SEQUENCE.length - 1;
//   const canGoBack = () => getCurrentIndex() > 0;
  
//   const getNextForm = () => {
//     const nextIndex = getCurrentIndex() + 1;
//     return nextIndex < FORM_SEQUENCE.length ? FORM_SEQUENCE[nextIndex] : null;
//   };
  
//   const getPreviousForm = () => {
//     const prevIndex = getCurrentIndex() - 1;
//     return prevIndex >= 0 ? FORM_SEQUENCE[prevIndex] : null;
//   };

//   return {
//     canGoNext: canGoNext(),
//     canGoBack: canGoBack(),
//     getNextForm,
//     getPreviousForm,
//     navigate: onNavigate
//   };
// };

// // Confirmation Modal Component
// const ConfirmationModal = ({ isOpen, onClose, onConfirm, type, nextForm }) => {
//   if (!isOpen) return null;

//   const isNext = type === 'next';
//   const title = isNext ? 'Save and Continue?' : 'Go Back?';
//   const message = isNext 
//     ? `Do you want to save your current progress and navigate to ${nextForm}?`
//     : 'Are you sure you want to go back? Any unsaved changes will be lost.';
//   const confirmText = isNext ? 'Save & Continue' : 'Go Back';
//   const cancelText = 'Cancel';

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//         <h3 className="text-lg font-semibold mb-4">{title}</h3>
//         <p className="text-gray-600 mb-6">{message}</p>
//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
//           >
//             {cancelText}
//           </button>
//           <button
//             onClick={onConfirm}
//             className={`px-4 py-2 rounded text-white ${
//               isNext 
//                 ? 'bg-blue-600 hover:bg-blue-700' 
//                 : 'bg-red-600 hover:bg-red-700'
//             }`}
//           >
//             {confirmText}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

const Form = ({ title, initialMaterials, componentOptions, materialOptions, onClose, currentForm, onNavigate }) => {
  const [materials, setMaterials] = useState([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationType, setConfirmationType] = useState(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const navigation = useFormNavigation(currentForm, onNavigate);

  // Set default values with unit prefilled for first two entries
  useEffect(() => {
    if (materials.length === 0 && initialMaterials?.length > 0) {
      const updated = initialMaterials.map((mat, index) => ({
        ...mat,
        unit: index === 0 ? "m³" : index === 1 ? "kg" : mat.unit || "",
      }))
      setMaterials(updated)
    }
  }, [initialMaterials, materials.length])

  // Track changes to detect unsaved data
  useEffect(() => {
    if (materials.length > 0) {
      setHasUnsavedChanges(true);
    }
  }, [materials]);

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
      quantity: "",
      unit: "",
      rate: "",
      rateDataSource: "",
    }
    setMaterials([...materials, newMaterial])
  }

  const handleMaterialChange = (id, field, value) => {
    setMaterials(materials.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
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
      quantity: "",
      unit: "",
      rate: "",
      rateDataSource: "",
    }

    setMaterials([...materials, newMaterial])
  }

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
      console.log('Saving form data:', materials);
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

  const unitOptions = ["m³", "kg", "litre", "nos"]

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      <div className="flex justify-between items-center bg-[#F0E6E6] px-4 py-2 rounded-sm border border-gray-300 w-fit border-b-[#522828b0] border-b-[0.25rem]">
        <h3 className="text-lg font-medium">{title}</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 ml-4">×</button>
      </div>

      <div className="bg-[#FFF9F9] p-6 border border-gray-300 rounded-b-sm">
        <div className="px-6 py-4">
          {Object.entries(groupedMaterials).map(([component, componentMaterials], componentIndex) => (
            <div key={componentIndex} className="mb-8">
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
                        <option key={idx} value={option.value}>{option.label}</option>
                      ))}
                      <option value={component}>{component}</option>
                    </select>
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">▼</span>
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
                    <div className="relative">
                      <select
                        value={material.materialType}
                        onChange={(e) => handleMaterialChange(material.id, "materialType", e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm appearance-none"
                      >
                        <option value="">Select material</option>
                        {materialOptions[component]?.map((option, idx) => (
                          <option key={idx} value={option.value}>{option.label}</option>
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
        onClose={handleCloseConfirmation}
        onConfirm={handleConfirm}
        type={confirmationType}
        nextForm={confirmationType === 'next' ? navigation.getNextForm() : navigation.getPreviousForm()}
      />
    </div>
  )
}

export default Form