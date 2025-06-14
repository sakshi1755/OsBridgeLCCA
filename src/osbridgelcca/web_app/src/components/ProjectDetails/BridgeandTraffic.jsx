import React, { useState } from "react";
import {useFormNavigation, ConfirmationModal} from './UseFormNavigation'

// Form sequence constant
const BridgeandTraffic = ({ currentForm, onNavigate, onClose, setActiveTabs,Activetabs, onclicktabs }) => {
  const navigation = useFormNavigation(currentForm, onNavigate);

   const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationType, setConfirmationType] = useState(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [formData, setFormData] = useState({
    numberOfLanes: "",
    additionalReRouteDistance: "",
    roadRoughness: "",
    roadRiseAndFall: "",
    typeOfRoad: "",
    annualIncreaseInTraffic: "",
    vehicleComposition: {
      cars: "",
      buses: "",
      hcv: "",
      mcv: "",
      lcv: ""
    }
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
  };

  const handleVehicleCompositionChange = (field, value) => {
    setFormData({
      ...formData,
      vehicleComposition: {
        ...formData.vehicleComposition,
        [field]: value
      }
    });
  };

  
  const handleNext = () => {
    if (navigation.canGoNext) {
      setConfirmationType('next');
      setShowConfirmation(true);
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


  const handleConfirm = () => {
    if (confirmationType === 'next') {
      // Here you would typically save the form data to your context or API
      console.log('Saving form data:', formData);
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
          {/* Number of Lanes */}
          <div className="flex items-center">
            <div className="w-1/2">
              <label className="block text-gray-700">Number of Lanes</label>
            </div>
            <div className="w-1/2">
              <div className="relative">
                <select
                //   type="text"
                  value={formData.numberOfLanes}
                  onChange={(e) => handleChange("numberOfLanes", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
               
              </div>
            </div>
          </div>

          {/* Additional Re-Route Distance */}
          <div className="flex items-center">
            <div className="w-1/2">
              <label className="block text-gray-700">Additional Re-Route Distance</label>
            </div>
            <div className="w-1/2">
              <div className="flex items-center">
                <input
                  type="text"
                  value={formData.additionalReRouteDistance}
                  onChange={(e) => handleChange("additionalReRouteDistance", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
                <span className="ml-2 text-sm text-gray-600">(km)</span>
              </div>
            </div>
          </div>

          {/* Road Roughness */}
          <div className="flex items-center">
            <div className="w-1/2">
              <label className="block text-gray-700">Road Roughness</label>
            </div>
            <div className="w-1/2">
              <div className="relative flex items-center">
                <select
                    // type="text"
                    value={formData.roadRoughness}
                    onChange={(e) => handleChange("roadRoughness", e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm pr-8"
                />
                <span className="ml-2 text-sm text-gray-600 whitespace-nowrap">
                    (mm/km)
                </span>
                </div>
            </div>
          </div>

          {/* Road Rise and Fall */}
          <div className="flex items-center">
            <div className="w-1/2">
              <label className="block text-gray-700">Road Rise and Fall (RF)</label>
            </div>
            <div className="w-1/2">
              <div className="flex items-center">
                <input
                  type="text"
                  value={formData.roadRiseAndFall}
                  onChange={(e) => handleChange("roadRiseAndFall", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
                <span className="ml-2 text-sm text-gray-600">(m/km)</span>
              </div>
            </div>
          </div>

          {/* Type of Road */}
          <div className="flex items-center">
            <div className="w-1/2">
              <label className="block text-gray-700">Type of Road</label>
            </div>
            <div className="w-1/2">
              <div className="relative">
                <select
                //  type="text"
                  value={formData.typeOfRoad}
                  onChange={(e) => handleChange("typeOfRoad", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
               
              </div>
            </div>
          </div>

          {/* Annual Increase in Traffic */}
          <div className="flex items-start">
            <div className="w-1/2">
              <label className="block text-gray-700 leading-tight">
                Annual Increase in Traffic if Re-Routing duration increases more than a year
              </label>
            </div>
            <div className="w-1/2">
              <div className="relative flex items-center">
                <slect
                //  type="text"
                  value={formData.annualIncreaseInTraffic}
                  onChange={(e) => handleChange("annualIncreaseInTraffic", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
               
                <span className="ml-2 text-sm text-gray-600">(%)</span>
              </div>
            </div>
          </div>

          {/* Composition of Various Vehicles */}
          <div className="flex items-start">
            <div className="w-1/2">
              <label className="block text-gray-700 mb-2">Composition of Various Vehicles</label>
            </div>
            <div className="w-1/2">
              <div className="space-y-2 border border-gray-200 rounded-md p-3">
                {/* Cars */}
                <div className="flex items-center">
                  <label className="w-20 block text-sm text-gray-700">Cars:</label>
                  <input
                    type="text"
                    value={formData.vehicleComposition.cars}
                    onChange={(e) => handleVehicleCompositionChange("cars", e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-1 text-sm"
                  />
                </div>
                
                {/* Buses */}
                <div className="flex items-center">
                  <label className="w-20 block text-sm text-gray-700">Buses:</label>
                  <input
                    type="text"
                    value={formData.vehicleComposition.buses}
                    onChange={(e) => handleVehicleCompositionChange("buses", e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-1 text-sm"
                  />
                </div>
                
                {/* HCV */}
                <div className="flex items-center">
                  <label className="w-20 block text-sm text-gray-700">HCV:</label>
                  <input
                    type="text"
                    value={formData.vehicleComposition.hcv}
                    onChange={(e) => handleVehicleCompositionChange("hcv", e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-1 text-sm"
                  />
                  <span className="ml-2 text-sm text-gray-600">(PCU/D)</span>
                </div>
                
                {/* MCV */}
                <div className="flex items-center">
                  <label className="w-20 block text-sm text-gray-700">MCV:</label>
                  <input
                    type="text"
                    value={formData.vehicleComposition.mcv}
                    onChange={(e) => handleVehicleCompositionChange("mcv", e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-1 text-sm"
                  />
                </div>
                
                {/* LCV */}
                <div className="flex items-center">
                  <label className="w-20 block text-sm text-gray-700">LCV:</label>
                  <input
                    type="text"
                    value={formData.vehicleComposition.lcv}
                    onChange={(e) => handleVehicleCompositionChange("lcv", e.target.value)}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-1 text-sm"
                  />
                </div>
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

export default BridgeandTraffic;