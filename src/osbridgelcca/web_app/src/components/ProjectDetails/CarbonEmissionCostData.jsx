import React, { useState } from "react";

const CarbonEmissionCostData = ({ onClose }) => {
  const [formData, setFormData] = useState({
    socioeconomicPathway: "SSP2",
    concentrationPathway: "RCP60",
    socialCostOfCarbon: "6.3936"
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  // Suggested indicator component
  const SuggestedTag = () => (
    <span className="text-xs text-gray-400 ml-2">Suggested</span>
  );

  return (
     <div className="w-full max-w-4xl mx-auto mt-6">
      {/* Title bar */}
      <div className="flex justify-between items-center bg-[#F0E6E6] px-4 py-2 rounded-sm border border-gray-300 w-fit border-b-[#522828b0] border-b-[0.25rem]">
        <h3 className="text-lg font-medium">Carbon Emission Cost Data</h3>
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
          {/* Shared Socioeconomic Pathway Type */}
          <div className="flex items-start">
            <div className="w-1/2">
              <label className="block text-gray-700 leading-tight">
                Shared Socioeconomic Pathway Type
              </label>
            </div>
            <div className="w-1/2">
              <div className="relative">
                <input
                  type="text"
                  value={formData.socioeconomicPathway}
                  onChange={(e) => handleChange("socioeconomicPathway", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
              
              </div>
            </div>
          </div>

          {/* Representative Concentration Pathway Type */}
          <div className="flex items-start">
            <div className="w-1/2">
              <label className="block text-gray-700 leading-tight">
                Representative Concentration Pathway Type
              </label>
            </div>
            <div className="w-1/2">
              <div className="relative">
                <input
                  type="text"
                  value={formData.concentrationPathway}
                  onChange={(e) => handleChange("concentrationPathway", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
               
              </div>
            </div>
          </div>

          {/* Social Cost of Carbon */}
          <div className="flex items-start">
            <div className="w-1/2">
              <label className="block text-gray-700">
                Social Cost of Carbon
              </label>
            </div>
            <div className="w-1/2">
              <div className="flex items-center">
                <input
                  type="text"
                  value={formData.socialCostOfCarbon}
                  onChange={(e) => handleChange("socialCostOfCarbon", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
                <span className="ml-2 text-sm text-gray-600">(INR/kgCO₂e)</span>
                <SuggestedTag />
              </div>
            </div>
          </div>

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

export default CarbonEmissionCostData;