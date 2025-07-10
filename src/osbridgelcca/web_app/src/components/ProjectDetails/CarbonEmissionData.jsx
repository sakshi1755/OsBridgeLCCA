// import React, { useState } from "react";
// import {useFormNavigation, ConfirmationModal} from './UseFormNavigation'

// // Form sequence constant

 
// const CarbonEmissionData = ({ currentForm, onNavigate,onClose, setActiveTabs,Activetabs, onclicktabs }) => {
//   const navigation = useFormNavigation(currentForm, onNavigate);

//    const [showConfirmation, setShowConfirmation] = useState(false)
//   const [confirmationType, setConfirmationType] = useState(null)
//   const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
//   const [components, setComponents] = useState([
//     {
//       name: "",
//       materials: [
//         { type: "Concrete", quantity: "", unit: "m³", embeddedCarbonEnergy: "", carbonEmissionFactor: "", isCustomType: false, isCustomUnit: false },
//         { type: "Steel", quantity: "", unit: "kg", embeddedCarbonEnergy: "", carbonEmissionFactor: "", isCustomType: false, isCustomUnit: false },
//       ],
//     },
//     {
//       name: "",
//       materials: [
//         { type: "Concrete", quantity: "", unit: "m³", embeddedCarbonEnergy: "", carbonEmissionFactor: "", isCustomType: false, isCustomUnit: false },
//         { type: "", quantity: "", unit: "kg", embeddedCarbonEnergy: "", carbonEmissionFactor: "", isCustomType: false, isCustomUnit: false },
//       ],
//     },
//     {
//       name: "",
//       materials: [
//         { type: "Concrete", quantity: "", unit: "m³", embeddedCarbonEnergy: "", carbonEmissionFactor: "", isCustomType: false, isCustomUnit: false },
//         { type: "", quantity: "", unit: "kg", embeddedCarbonEnergy: "", carbonEmissionFactor: "", isCustomType: false, isCustomUnit: false },
//       ],
//     },
//   ]);

//   const materialOptions = ["Concrete", "Steel", "Aluminum", "Wood"];
//   const unitOptions = ["m³", "kg", "tons", "lbs"];
//    const handleNext = () => {
//     if (navigation.canGoNext) {
//       setConfirmationType('next');
//       setShowConfirmation(true);
//     }
//   };

//   // const handleBack = () => {
//   //   if (navigation.canGoBack) {
//   //     if (hasUnsavedChanges) {
//   //       setConfirmationType('back');
//   //       setShowConfirmation(true);
//   //     } else {
//   //       navigation.navigate(navigation.getPreviousForm());
//   //     }
//   //   }
//   // };
//     const handleBack = () => {
//   setConfirmationType('back')
//   setShowConfirmation(true)
// }


//   const handleConfirm = () => {
//     if (confirmationType === 'next') {
//       // Here you would typically save the form data to your context or API
//       console.log('Saving form data:',components);
//       setHasUnsavedChanges(false);
//       navigation.navigate(navigation.getNextForm());
//     } else if (confirmationType === 'back') {
//       navigation.navigate(navigation.getPreviousForm());
//     }
//     setShowConfirmation(false);
//     setConfirmationType(null);
//   };

//   const handleCloseConfirmation = () => {
//     setShowConfirmation(false);
//     setConfirmationType(null);
//   };

//   const handleMaterialChange = (
//     componentIndex,
//     materialIndex,
//     field,
//     value
//   ) => {
//     const updatedComponents = [...components];
//     const material = updatedComponents[componentIndex].materials[materialIndex];
    
//     if (field === "type") {
//       if (value === "Other") {
//         material.isCustomType = true;
//         material.type = "";
//       } else {
//         material.isCustomType = false;
//         material.type = value;
//       }
//     } else if (field === "unit") {
//       if (value === "Other") {
//         material.isCustomUnit = true;
//         material.unit = "";
//       } else {
//         material.isCustomUnit = false;
//         material.unit = value;
//       }
//     } else {
//       material[field] = value;
//     }
    
//     setComponents(updatedComponents);
//     setHasUnsavedChanges(true);
//   };

//   const handleComponentNameChange = (componentIndex, value) => {
//     const updatedComponents = [...components];
//     updatedComponents[componentIndex].name = value;
//     setComponents(updatedComponents);
//     setHasUnsavedChanges(true);
//   };

//   const addMaterial = (componentIndex) => {
//     const updatedComponents = [...components];
//     updatedComponents[componentIndex].materials.push({
//       type: "",
//       quantity: "",
//       unit: "",
//       embeddedCarbonEnergy: "",
//       carbonEmissionFactor: "",
//       isCustomType: false,
//       isCustomUnit: false,
//     });
//     setComponents(updatedComponents);
//   };

//   return (
//     <div className="w-full max-w-4xl mx-auto ">
// <div
//   className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
//   style={{
//     scrollbarWidth: 'thin', // for Firefox
//   }}
// >
//   <div className="flex  w-fit min-w-full">
//     {Activetabs.map((tab, index) => (
//       <div
//         onClick={() => onclicktabs(tab)}
//         key={index}
//         className={`flex items-center px-4 py-2 rounded-sm border border-gray-300 whitespace-nowrap cursor-pointer
//           ${tab === currentForm ? 'bg-[#F0E6E6] border-b-[#522828b0] border-b-[0.25rem]' : 'bg-[#F0E6E6]'}
//         `}
//         style={{
//           fontSize: Activetabs.length > 5 ? '0.85rem' : '1rem',
//         }}
//       >
//         <span className="font-medium">{tab}</span>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             onClose(tab);
//           }}
//           className="ml-2 text-gray-500 hover:text-gray-700"
//         >
//           ×
//         </button>
//       </div>
//     ))}
//   </div>
// </div>

//       <div className="bg-[#FFF9F9] p-6 border border-gray-300 rounded-b-sm">
//         <div className="space-y-6">
//           {components.map((component, componentIndex) => (
//             <div key={componentIndex} className="mb-8">
//               <div className="mb-2">
//                 <label className="block text-gray-700 mb-1">Component:</label>
//                 <input
//                   type="text"
//                   value={component.name}
//                   onChange={(e) =>
//                     handleComponentNameChange(componentIndex, e.target.value)
//                   }
//                   className="border border-gray-300 rounded-md px-3 py-1 text-sm w-48"
//                 />
//               </div>

//               <div className="w-full overflow-x-auto">
//                 <table className="w-full mb-2">
//                   <thead>
//                     <tr className="text-sm text-gray-600">
//                       <th className="text-left pb-2 font-normal">Material Type and Grade</th>
//                       <th className="text-left pb-2 font-normal">Quantity</th>
//                       <th className="text-left pb-2 font-normal">Unit</th>
//                       <th className="text-left pb-2 font-normal">Embedded Carbon Energy</th>
//                       <th className="text-left pb-2 font-normal">Carbon Emission Factor</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {component.materials.map((material, materialIndex) => (
//                       <tr key={materialIndex} className="align-middle">
//                         <td className="pr-2 py-1">
//                           {material.isCustomType ? (
//                             <input
//                               type="text"
//                               value={material.type}
//                               onChange={(e) =>
//                                 handleMaterialChange(
//                                   componentIndex,
//                                   materialIndex,
//                                   "type",
//                                   e.target.value
//                                 )
//                               }
//                               placeholder="Enter custom material type"
//                               className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full"
//                             />
//                           ) : (
//                             <select
//                               value={material.type}
//                               onChange={(e) =>
//                                 handleMaterialChange(
//                                   componentIndex,
//                                   materialIndex,
//                                   "type",
//                                   e.target.value
//                                 )
//                               }
//                               className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full bg-white"
//                             >
//                               <option value="">Select Material</option>
//                               {materialOptions.map((opt, i) => (
//                                 <option key={i} value={opt}>{opt}</option>
//                               ))}
//                               <option value="Other">Other</option>
//                             </select>
//                           )}
//                         </td>
//                         <td className="px-2 py-1">
//                           <input
//                             type="text"
//                             value={material.quantity}
//                             onChange={(e) =>
//                               handleMaterialChange(
//                                 componentIndex,
//                                 materialIndex,
//                                 "quantity",
//                                 e.target.value
//                               )
//                             }
//                             className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full"
//                           />
//                         </td>
//                         <td className="px-2 py-1">
//                           {material.isCustomUnit ? (
//                             <input
//                               type="text"
//                               value={material.unit}
//                               onChange={(e) =>
//                                 handleMaterialChange(
//                                   componentIndex,
//                                   materialIndex,
//                                   "unit",
//                                   e.target.value
//                                 )
//                               }
//                               placeholder="Enter custom unit"
//                               className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full"
//                             />
//                           ) : (
//                             <select
//                               value={material.unit}
//                               onChange={(e) =>
//                                 handleMaterialChange(
//                                   componentIndex,
//                                   materialIndex,
//                                   "unit",
//                                   e.target.value
//                                 )
//                               }
//                               className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full bg-white"
//                             >
//                               <option value="">Select Unit</option>
//                               {unitOptions.map((unit, idx) => (
//                                 <option key={idx} value={unit}>{unit}</option>
//                               ))}
//                               <option value="Other">Other</option>
//                             </select>
//                           )}
//                         </td>
//                         <td className="px-2 py-1">
//                           <div className="flex items-center">
//                             <input
//                               type="text"
//                               value={material.embeddedCarbonEnergy}
//                               onChange={(e) =>
//                                 handleMaterialChange(
//                                   componentIndex,
//                                   materialIndex,
//                                   "embeddedCarbonEnergy",
//                                   e.target.value
//                                 )
//                               }
//                               className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full"
//                             />
//                             <span className="ml-2 text-sm text-gray-600">(MJ/kg)</span>
//                           </div>
//                         </td>
//                         <td className="pl-2 py-1">
//                           <div className="flex items-center">
//                             <input
//                               type="text"
//                               value={material.carbonEmissionFactor}
//                               onChange={(e) =>
//                                 handleMaterialChange(
//                                   componentIndex,
//                                   materialIndex,
//                                   "carbonEmissionFactor",
//                                   e.target.value
//                                 )
//                               }
//                               className="border border-gray-300 rounded-md px-3 py-1 text-sm w-full"
//                             />
//                             <span className="ml-2 text-sm text-gray-600">kg CO₂e/kg</span>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <button
//                 onClick={() => addMaterial(componentIndex)}
//                 className="w-full border border-gray-300 rounded-md py-1 text-sm bg-white hover:bg-gray-50 transition-colors mt-2"
//               >
//                 + Add Material
//               </button>

//               {componentIndex < components.length - 1 && (
//                 <div className="my-4 border-t border-gray-200"></div>
//               )}
//             </div>
//           ))}

//           <div className="flex justify-end gap-4 mt-8">
//           <button 
//               onClick={handleBack}
//               disabled={!navigation.canGoBack}
//               className={`px-8 py-1 text-sm rounded-md border ${
//                 navigation.canGoBack 
//                   ? 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700' 
//                   : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
//               }`}
//             >
//               Back
//             </button>
//            <button 
//               onClick={handleNext}
//               disabled={!navigation.canGoNext}
//               className={`px-8 py-1 text-sm rounded-md border ${
//                 navigation.canGoNext 
//                   ? 'bg-white border-gray-300 hover:bg-gray-50 text-gray-700' 
//                   : 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       </div>
//   <ConfirmationModal
//         isOpen={showConfirmation}
//         onClose={handleCloseConfirmation}
//         onConfirm={handleConfirm}
//         type={confirmationType}
//         nextForm={confirmationType === 'next' ? navigation.getNextForm() : navigation.getPreviousForm()}
//       />

//     </div>
//   );
// };

// export default CarbonEmissionData;
import React, { useState, useEffect } from "react";
import { useFormNavigation, ConfirmationModal } from './UseFormNavigation';

const CarbonEmissionData = ({ 
  currentForm, 
  onNavigate, 
  onClose, 
  setActiveTabs, 
  Activetabs, 
  onclicktabs 
}) => {
  const navigation = useFormNavigation(currentForm, onNavigate);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationType, setConfirmationType] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load materials from other forms on component mount
  useEffect(() => {
    loadMaterialsFromForms();
  }, []);

  const loadMaterialsFromForms = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fix: Use the correct Flask route
      const response = await fetch('http://127.0.0.1:5000/api/get-carbon-materials');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setMaterials(data.materials || []);
        console.log('Loaded materials for carbon emission:', data.materials);
      } else {
        setError(data.error || 'Failed to load materials');
      }
    } catch (err) {
      console.error('Error loading materials:', err);
      setError('Failed to load materials from other forms');
    } finally {
      setLoading(false);
    }
  };

  const handleMaterialChange = (materialId, field, value) => {
    setMaterials(prevMaterials => 
      prevMaterials.map(material => 
        material.id === materialId 
          ? { ...material, [field]: value }
          : material
      )
    );
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('http://127.0.0.1:5000/api/save-carbon-emission-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          materials: materials,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Carbon emission data saved successfully:', result);
        setHasUnsavedChanges(false);
        alert('Carbon emission data saved successfully!');
      } else {
        throw new Error('Failed to save carbon emission data');
      }
    } catch (error) {
      console.error('Error saving carbon emission data:', error);
      alert('Failed to save carbon emission data');
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('http://127.0.0.1:5000/api/calculate-carbon-emissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          materials: materials
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Carbon emission calculation results:', result);
        
        if (result.success) {
          alert(`Total Carbon Emission: ${result.total_carbon_emission.toFixed(2)} kg CO₂e`);
        } else {
          alert('Failed to calculate carbon emissions');
        }
      } else {
        throw new Error('Failed to calculate carbon emissions');
      }
    } catch (error) {
      console.error('Error calculating carbon emissions:', error);
      alert('Failed to calculate carbon emissions');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (navigation.canGoNext) {
      setConfirmationType('next');
      setShowConfirmation(true);
    }
  };

  const handleBack = () => {
    setConfirmationType('back');
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    if (confirmationType === 'next') {
      // Save carbon emission data before navigating
      try {
        const response = await fetch('http://127.0.0.1:5000/api/save-carbon-emission-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            materials: materials,
            timestamp: new Date().toISOString()
          })
        });

        if (response.ok) {
          console.log('Carbon emission data saved successfully');
          setHasUnsavedChanges(false);
          navigation.navigate(navigation.getNextForm());
        } else {
          throw new Error('Failed to save carbon emission data');
        }
      } catch (error) {
        console.error('Error saving carbon emission data:', error);
        alert('Failed to save carbon emission data');
        return;
      }
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

  const groupMaterialsByForm = (materials) => {
    return materials.reduce((acc, material) => {
      const form = material.form_name || 'Other';
      if (!acc[form]) {
        acc[form] = [];
      }
      acc[form].push(material);
      return acc;
    }, {});
  };

  const groupedMaterials = groupMaterialsByForm(materials);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-[#FFF9F9] p-6 border border-gray-300 rounded-b-sm">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading materials...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-[#FFF9F9] p-6 border border-gray-300 rounded-b-sm">
          <div className="flex items-center justify-center h-64">
            <div className="text-red-500">Error: {error}</div>
            <button 
              onClick={loadMaterialsFromForms}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
        style={{
          scrollbarWidth: 'thin',
        }}
      >
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

      <div className="bg-[#FFF9F9] p-6 border border-gray-300 rounded-b-sm">
        <div className="space-y-6">
          {/* Action buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Data'}
            </button>
            <button
              onClick={handleCalculate}
              disabled={loading || materials.length === 0}
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Calculating...' : 'Calculate Emissions'}
            </button>
            <button
              onClick={loadMaterialsFromForms}
              disabled={loading}
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Refresh Materials'}
            </button>
          </div>

          {materials.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No materials found from other forms. Please ensure you have saved data in Foundation, Sub-Structure, Super-Structure, or Miscellaneous forms.
            </div>
          ) : (
            Object.entries(groupedMaterials).map(([formName, formMaterials]) => (
              <div key={formName} className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                  {formName.charAt(0).toUpperCase() + formName.slice(1)} ({formMaterials.length} materials)
                </h3>
                
                <div className="w-full overflow-x-auto">
                  <table className="w-full mb-2">
                    <thead>
                      <tr className="text-sm text-gray-600 bg-gray-50">
                        <th className="text-left p-2 font-medium border">Component</th>
                        <th className="text-left p-2 font-medium border">Material Type</th>
                        <th className="text-left p-2 font-medium border">Sub Material</th>
                        <th className="text-left p-2 font-medium border">Quantity</th>
                        <th className="text-left p-2 font-medium border">Unit</th>
                        <th className="text-left p-2 font-medium border">Embedded Carbon Energy (MJ/kg)</th>
                        <th className="text-left p-2 font-medium border">Carbon Emission Factor (kg CO₂e/kg)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formMaterials.map((material) => (
                        <tr key={material.id} className="align-middle hover:bg-gray-50">
                          <td className="p-2 border">
                            <div className="text-sm">
                              {material.component}
                            </div>
                          </td>
                          <td className="p-2 border">
                            <div className="text-sm">
                              {material.material_type}
                            </div>
                          </td>
                          <td className="p-2 border">
                            <div className="text-sm">
                              {material.sub_material_type || '-'}
                            </div>
                          </td>
                          <td className="p-2 border">
                            <div className="text-sm">
                              {material.quantity}
                            </div>
                          </td>
                          <td className="p-2 border">
                            <div className="text-sm">
                              {material.unit}
                            </div>
                          </td>
                          <td className="p-2 border">
                            <input
                              type="number"
                              step="0.01"
                              value={material.embedded_carbon_energy || ''}
                              onChange={(e) =>
                                handleMaterialChange(
                                  material.id,
                                  'embedded_carbon_energy',
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
                              placeholder="Enter value"
                            />
                          </td>
                          <td className="p-2 border">
                            <input
                              type="number"
                              step="0.01"
                              value={material.carbon_emission_factor || ''}
                              onChange={(e) =>
                                handleMaterialChange(
                                  material.id,
                                  'carbon_emission_factor',
                                  e.target.value
                                )
                              }
                              className="border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
                              placeholder="Enter value"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          )}

          <div className="flex justify-end gap-4 mt-8">
            <button 
              onClick={handleBack}
              disabled={!navigation.canGoBack}
              className={`px-8 py-2 text-sm rounded-md border ${
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
              className={`px-8 py-2 text-sm rounded-md border ${
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