import React, { useState } from "react";

const MaintenanceandRepairData = ({ onClose }) => {
  const [formData, setFormData] = useState({
    periodicMaintenanceCost: "0.5500",
    annualRoutineInspectionCost: "1",
    repairRehabilitationCost: "10",
    frequencyOfPeriodicMaintenance: "5",
    frequencyOfRoutineInspection: "1"
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
        <h3 className="text-lg font-medium">Maintenance and Repair Data </h3>
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
          {/* Periodic Maintenance Cost */}
          <div className="flex items-start">
            <div className="w-1/2">
              <label className="block text-gray-700 leading-tight">
                Periodic Maintenance Cost rate as percentage to total construction cost
              </label>
            </div>
            <div className="w-1/2">
              <div className="flex items-center">
                <input
                  type="text"
                  value={formData.periodicMaintenanceCost}
                  onChange={(e) => handleChange("periodicMaintenanceCost", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
                <span className="ml-2 text-sm text-gray-600">(%)</span>
                <SuggestedTag />
              </div>
            </div>
          </div>

          {/* Annual Routine Inspection Cost */}
          <div className="flex items-start">
            <div className="w-1/2">
              <label className="block text-gray-700 leading-tight">
                Annual Routine Inspection cost rate as percentage to total construction cost
              </label>
            </div>
            <div className="w-1/2">
              <div className="flex items-center">
                <input
                  type="text"
                  value={formData.annualRoutineInspectionCost}
                  onChange={(e) => handleChange("annualRoutineInspectionCost", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
                <span className="ml-2 text-sm text-gray-600">(%)</span>
                <SuggestedTag />
              </div>
            </div>
          </div>

          {/* Repair and Rehabilitation Cost */}
          <div className="flex items-start">
            <div className="w-1/2">
              <label className="block text-gray-700 leading-tight">
                Repair and Rehabilitation cost rate as percentage of total construction cost
              </label>
            </div>
            <div className="w-1/2">
              <div className="flex items-center">
                <input
                  type="text"
                  value={formData.repairRehabilitationCost}
                  onChange={(e) => handleChange("repairRehabilitationCost", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
                <span className="ml-2 text-sm text-gray-600">(%)</span>
                <SuggestedTag />
              </div>
            </div>
          </div>

          {/* Frequency of Periodic Maintenance */}
          <div className="flex items-center">
            <div className="w-1/2">
              <label className="block text-gray-700">Frequency of Periodic Maintenance</label>
            </div>
            <div className="w-1/2">
              <div className="flex items-center">
                <input
                  type="text"
                  value={formData.frequencyOfPeriodicMaintenance}
                  onChange={(e) => handleChange("frequencyOfPeriodicMaintenance", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
                <span className="ml-2 text-sm text-gray-600">(years)</span>
                <SuggestedTag />
              </div>
            </div>
          </div>

          {/* Frequency of Routine Inspection */}
          <div className="flex items-center">
            <div className="w-1/2">
              <label className="block text-gray-700">Frequency of Routine Inspection</label>
            </div>
            <div className="w-1/2">
              <div className="flex items-center">
                <input
                  type="text"
                  value={formData.frequencyOfRoutineInspection}
                  onChange={(e) => handleChange("frequencyOfRoutineInspection", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                />
                <span className="ml-2 text-sm text-gray-600">(years)</span>
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

export default MaintenanceandRepairData;