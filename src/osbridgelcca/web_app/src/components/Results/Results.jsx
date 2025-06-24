import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RadialChartsComponent from "./RadialChartsComponent";
import SocialCostRadialChart from "./SocialCostRadialChart";
import EnvironmentalCostRadialChart from "./EnvironmentalCostRadialChart";
import EconomicCost100YearsRadialChart from "./EconomicCost100YearsRadialChart";
import SocialCost100YearsRadialChart from "./SocialCost100YearsRadialChart";
import EnvironmentalCost100YearsRadialChart from "./EnvironmentalCost100YearsRadialChart";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
import BubbleChart from "./BubbleChart";
import HorizontalBarChart from "./HorizontalBarChart";

const Results = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      topHalf: [
        { component: <RadialChartsComponent /> },
        { component: <SocialCostRadialChart /> },
        { component: <EnvironmentalCostRadialChart /> }
      ],
      bottomHalf: { component: <BarChart /> }
    },
    {
      topHalf: [
        { component: <RadialChartsComponent /> },
        { component: <SocialCostRadialChart /> },
        { component: <EnvironmentalCostRadialChart /> }
      ],
      bottomHalf: { component: <PieChart /> }
    },
    {
      topHalf: [
        { component: <EconomicCost100YearsRadialChart /> },
        { component: <SocialCost100YearsRadialChart /> },
        { component: <EnvironmentalCost100YearsRadialChart /> }
      ],
      bottomHalf: { component: <HorizontalBarChart /> }
    },
    {
      topHalf: [],
      bottomHalf: { component: <BubbleChart />, fullPage: true }
    }
  ];

  const currentPageData = pages[currentPage];

  const handleNext = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const handleBack = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="min-h-[80vh] flex flex-col">
          {currentPageData.topHalf.length > 0 && (
            <div className="flex-1 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                {currentPageData.topHalf.map((chart, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-center">
                    {chart.component}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-lg p-4 h-full flex items-center justify-center">
              {currentPageData.bottomHalf.component}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handleBack}
            disabled={currentPage === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              currentPage === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <div className="flex space-x-2">
            {pages.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === currentPage ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === pages.length - 1}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              currentPage === pages.length - 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
