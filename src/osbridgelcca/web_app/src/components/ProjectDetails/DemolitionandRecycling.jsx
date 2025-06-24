import React, { useState } from "react";
import {useFormNavigation, ConfirmationModal} from './UseFormNavigation'

// Form sequence constant

 



const DemolitionandRecycling = ({currentForm, onNavigate, onClose, setActiveTabs,Activetabs, onclicktabs }) => {
  const navigation = useFormNavigation(currentForm, onNavigate);

   const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationType, setConfirmationType] = useState(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [formData, setFormData] = useState({
    demolitionCostRate: "10",
    scrapValueOfStructuralSteel: "50000",
    structuralSteelScrap: "98"
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
   const handleNext = () => {
    if (navigation.canGoNext) {
      setConfirmationType('next');
      setShowConfirmation(true);
    }
  };
  
  const saveDemolitionRecyclingData = async (data) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/save-demolition-recycling-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving demolition recycling data:', error);
    throw error;
  }
};

const calculateDemolitionRecyclingCosts = async (data) => {
  try {
    const response = await fetch('http://127.0.0.1:5000/api/calculate-demolition-recycling-costs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error calculating demolition recycling costs:', error);
    throw error;
  }
};

  // New calculate function for the Calculate button
  const handleCalculate = async () => {
    try {
      console.log('Starting calculation with data:', formData);
      
      // Calculate demolition and recycling costs
      const calculationResult = await calculateDemolitionRecyclingCosts(formData);
      
      // Log the demolition and recycling costs to console
      console.log('Demolition and Recycling Costs:', calculationResult);
      
      // You can also log specific parts if the response has a specific structure
      if (calculationResult.demolitionCost) {
        console.log('Demolition Cost:', calculationResult.demolitionCost);
      }
      if (calculationResult.recyclingCost) {
        console.log('Recycling Cost:', calculationResult.recyclingCost);
      }
      if (calculationResult.totalCost) {
        console.log('Total Cost:', calculationResult.totalCost);
      }
      
    } catch (error) {
      console.error('Error calculating demolition and recycling costs:', error);
      alert('Error calculating costs. Please try again.');
    }
  };

  // const handleBack = () => {
  //   if (navigation.canGoBack) {
  //     if (hasUnsavedChanges) {
  //       setConfirmationType('back');
  //       setShowConfirmation(true);
  //     } else {
  //       navigation.navigate(navigation.getPreviousForm());
  //     }
  //   }
  // };
    const handleBack = () => {
  setConfirmationType('back')
  setShowConfirmation(true)
}


  const handleConfirm = async () => {
  if (confirmationType === 'next') {
    try {
      // Save form data to storage
      console.log('Saving demolition and recycling data:', formData);
      await saveDemolitionRecyclingData(formData);
      
      // Calculate demolition and recycling costs
      console.log('Calculating demolition and recycling costs...');
      const calculationResult = await calculateDemolitionRecyclingCosts(formData);
      console.log('Demolition and recycling costs calculated:', calculationResult);
      
      setHasUnsavedChanges(false);
      navigation.navigate(navigation.getNextForm());
    } catch (error) {
      console.error('Error processing demolition and recycling data:', error);
      // You might want to show an error message to the user here
      alert('Error processing demolition and recycling data. Please try again.');
      return; // Don't navigate if there's an error
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
  // Suggested indicator component
  const SuggestedTag = () => (
    <span className="text-xs text-gray-400 ml-2">Suggested</span>
  );

  return (
    <div className="w-full max-w-4xl mx-auto ">
      {/* Title bar */}
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


      {/* Form content */}
      <div className="bg-[#FFF9F9] p-6 border border-gray-300 rounded-b-sm">
        <div className="space-y-6">
          {/* Demolition Cost Rate */}
          <div className="flex items-start">
            <div className="w-1/2">
              <label className="block text-gray-700 leading-tight">
                Demolition Cost rate as percentage to total construction cost
              </label>
            </div>
            <div className="w-1/2">
              <div className="flex items-center">
                <input
                  type="text"
                  value={formData.demolitionCostRate}
                  onChange={(e) => handleChange("demolitionCostRate", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
                <span className="ml-2 text-sm text-gray-600">(%)</span>
                <SuggestedTag />
              </div>
            </div>
          </div>

          {/* Scrap Value of Structural Steel */}
          <div className="flex items-center">
            <div className="w-1/2">
              <label className="block text-gray-700">Scrap Value of Structural Steel</label>
            </div>
            <div className="w-1/2">
              <div className="flex items-center">
                <input
                  type="text"
                  value={formData.scrapValueOfStructuralSteel}
                  onChange={(e) => handleChange("scrapValueOfStructuralSteel", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
                <span className="ml-2 text-sm text-gray-600">(INR/MT)</span>
                <SuggestedTag />
              </div>
            </div>
          </div>

          {/* Structural Steel Scrap */}
          <div className="flex items-center">
            <div className="w-1/2">
              <label className="block text-gray-700">Structural Steel Scrap</label>
            </div>
            <div className="w-1/2">
              <div className="flex items-center">
                <input
                  type="text"
                  value={formData.structuralSteelScrap}
                  onChange={(e) => handleChange("structuralSteelScrap", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
                <span className="ml-2 text-sm text-gray-600">(%)</span>
                <SuggestedTag />
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
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
            <button onClick={handleCalculate} className="bg-white border border-gray-300 rounded-md px-8 py-1 text-sm hover:bg-gray-50 transition-colors">
              Calculate
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

export default DemolitionandRecycling;