"use client"

import { useState } from "react"

const FinancialData = ({ onClose }) => {
  // Initial state for financial data fields
  const [financialData, setFinancialData] = useState({
    realDiscountRate: "4.2500",
    interestRate: "10",
    investmentRatio: "0.5000",
    durationOfStudy: "50 & 100",
    constructionTime: ""
  })

  // Handle field changes
  const handleChange = (field, value) => {
    setFinancialData({
      ...financialData,
      [field]: value
    })
  }

  // Info tooltip component
  const InfoTooltip = () => (
    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 text-gray-500 text-xs ml-1 cursor-help">
      ?
    </span>
  )

  // Suggested indicator component
  const SuggestedTag = () => (
    <span className="text-xs text-gray-400 ml-2">Suggested</span>
  )

  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      {/* Title bar */}
      <div className="flex justify-between items-center bg-[#F0E6E6] px-4 py-2 rounded-sm border border-gray-300 w-fit border-b-[#522828b0] border-b-[0.25rem]">
        <h3 className="text-lg font-medium">Financial Data</h3>
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
          {/* Real Discount Rate */}
          <div className="flex items-center">
            <div className="w-1/3">
              <label className="flex items-center text-gray-700">
                Real Discount Rate
                <InfoTooltip />
              </label>
            </div>
            <div className="w-1/3 flex items-center">
              <input
                type="text"
                value={financialData.realDiscountRate}
                onChange={(e) => handleChange("realDiscountRate", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
              />
              <span className="ml-2">(%)</span>
            </div>
            <div className="w-1/3">
              <SuggestedTag />
            </div>
          </div>

          {/* Interest Rate */}
          <div className="flex items-center">
            <div className="w-1/3">
              <label className="text-gray-700">Interest Rate</label>
            </div>
            <div className="w-1/3 flex items-center">
              <div className="relative w-full">
                <select
                 // type="text"
                  value={financialData.interestRate}
                  onChange={(e) => handleChange("interestRate", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm appearance-none"
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">▼</span>
              </div>
              <span className="ml-2">(%)</span>
            </div>
            <div className="w-1/3">
              <SuggestedTag />
            </div>
          </div>

          {/* Investment Ratio */}
          <div className="flex items-center">
            <div className="w-1/3">
              <label className="text-gray-700">Investment Ratio</label>
            </div>
            <div className="w-1/3">
              <div className="relative w-full">
                <select
                 // type="text"
                  value={financialData.investmentRatio}
                  onChange={(e) => handleChange("investmentRatio", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm appearance-none"
                />
                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">▼</span>
              </div>
            </div>
            <div className="w-1/3">
              <SuggestedTag />
            </div>
          </div>

          {/* Duration of Study */}
          <div className="flex items-center">
            <div className="w-1/3">
              <label className="text-gray-700">Duration of Study</label>
            </div>
            <div className="w-1/3 flex items-center">
              <input
                type="text"
                value={financialData.durationOfStudy}
                onChange={(e) => handleChange("durationOfStudy", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
              />
              <span className="ml-2">(years)</span>
            </div>
            <div className="w-1/3">
              <SuggestedTag />
            </div>
          </div>

          {/* Time for construction of Base Project */}
          <div className="flex items-center">
            <div className="w-1/3">
              <label className="text-gray-700 leading-tight">
                Time for construction of Base Project
              </label>
            </div>
            <div className="w-1/3 flex items-center">
              <input
                type="text"
                value={financialData.constructionTime}
                onChange={(e) => handleChange("constructionTime", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
              />
              <span className="ml-2">(years)</span>
            </div>
            <div className="w-1/3"></div>
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
  )
}

export default FinancialData