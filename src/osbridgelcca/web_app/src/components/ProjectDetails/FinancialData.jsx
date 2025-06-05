"use client"
import {useFormNavigation, ConfirmationModal} from './UseFormNavigation'

// Form sequence constant


import { useState } from "react"

const FinancialData = ({ currentForm, onNavigate,onClose, setActiveTabs,Activetabs, onclicktabs }) => {
  const navigation = useFormNavigation(currentForm, onNavigate);

  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationType, setConfirmationType] = useState(null)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
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
      console.log('Saving form data:', financialData);
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

export default FinancialData