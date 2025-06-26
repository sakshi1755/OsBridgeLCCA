// import React, { useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import RadialChartsComponent from "./RadialChartsComponent";
// import SocialCostRadialChart from "./SocialCostRadialChart";
// import EnvironmentalCostRadialChart from "./EnvironmentalCostRadialChart";
// import EconomicCost100YearsRadialChart from "./EconomicCost100YearsRadialChart";
// import SocialCost100YearsRadialChart from "./SocialCost100YearsRadialChart";
// import EnvironmentalCost100YearsRadialChart from "./EnvironmentalCost100YearsRadialChart";
// import PieChart from "./PieChart";
// import BarChart from "./BarChart";
// import BubbleChart from "./BubbleChart";
// import HorizontalBarChart from "./HorizontalBarChart";

// const Results = () => {
//   const [currentPage, setCurrentPage] = useState(0);

//   const pages = [
//     {
//       topHalf: [
//         { component: <RadialChartsComponent /> },
//         { component: <SocialCostRadialChart /> },
//         { component: <EnvironmentalCostRadialChart /> }
//       ],
//       bottomHalf: { component: <BarChart /> }
//     },
//     {
//       topHalf: [
//         { component: <RadialChartsComponent /> },
//         { component: <SocialCostRadialChart /> },
//         { component: <EnvironmentalCostRadialChart /> }
//       ],
//       bottomHalf: { component: <PieChart /> }
//     },
//     {
//       topHalf: [
//         { component: <EconomicCost100YearsRadialChart /> },
//         { component: <SocialCost100YearsRadialChart /> },
//         { component: <EnvironmentalCost100YearsRadialChart /> }
//       ],
//       bottomHalf: { component: <HorizontalBarChart /> }
//     },
//     {
//       topHalf: [],
//       bottomHalf: { component: <BubbleChart />, fullPage: true }
//     }
//   ];

//   const currentPageData = pages[currentPage];

//   const handleNext = () => {
//     if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
//   };

//   const handleBack = () => {
//     if (currentPage > 0) setCurrentPage(currentPage - 1);
//   };
//  const colors = ['#273B5C', '#961818', '#5A003B', '#708090'];
//   const labels = ['Initial Stage', 'Use Stage', 'End-of-Life Stage', 'Beyond-Life Stage'];
//   return (
//     <div className="w-full">
//       {/* Result Window Tab */}
//       <div className="w-full  ">
//         <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
//           <div className="flex w-fit min-w-full">
//             <div
//               className="flex items-center px-4 py-2 rounded-sm border border-gray-300 whitespace-nowrap cursor-default bg-[#F0E6E6] border-b-[#522828b0] border-b-[0.25rem]"
//               style={{ fontSize: '1rem' }}
//             >
//               <span className="font-medium">Result Window</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Results Content */}
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="container mx-auto px-4">
//           <div className="min-h-[80vh] flex flex-col">
//             {currentPageData.topHalf.length > 0 && (
//               <div className="flex-1 mb-8">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
//                   {currentPageData.topHalf.map((chart, index) => (
//                     <div key={index} className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-center">
//                       {chart.component}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//               <div className="flex flex-wrap items-center justify-center gap-4 p-4 bg-white rounded-lg shadow-sm">
//       {colors.map((color, index) => (
//         <div key={index} className="flex items-center gap-2">
//           <div 
//             className="w-4 h-4 rounded-sm"
//             style={{ backgroundColor: color }}
//           ></div>
//           <span className="text-sm font-medium text-gray-700">
//             {labels[index]}
//           </span>
//         </div>
//       ))}
//     </div>

//             <div className="flex-1">
//               <div className="bg-white rounded-lg shadow-lg p-4 h-full flex items-center justify-center">
//                 {currentPageData.bottomHalf.component}
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-between items-center mt-8">
//             <button
//               onClick={handleBack}
//               disabled={currentPage === 0}
//               className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
//                 currentPage === 0
//                   ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700'
//               }`}
//             >
//               <ChevronLeft className="w-5 h-5 mr-2" />
//               Back
//             </button>

//             <div className="flex space-x-2">
//               {pages.map((_, index) => (
//                 <div
//                   key={index}
//                   className={`w-3 h-3 rounded-full ${
//                     index === currentPage ? 'bg-blue-600' : 'bg-gray-300'
//                   }`}
//                 />
//               ))}
//             </div>

//             <button
//               onClick={handleNext}
//               disabled={currentPage === pages.length - 1}
//               className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
//                 currentPage === pages.length - 1
//                   ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                   : 'bg-blue-600 text-white hover:bg-blue-700'
//               }`}
//             >
//               Next
//               <ChevronRight className="w-5 h-5 ml-2" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Results;
// #version 2
// import React, { useState } from "react";
// import { useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import RadialChartsComponent from "./RadialChartsComponent";
// import SocialCostRadialChart from "./SocialCostRadialChart";
// import EnvironmentalCostRadialChart from "./EnvironmentalCostRadialChart";
// import EconomicCost100YearsRadialChart from "./EconomicCost100YearsRadialChart";
// import SocialCost100YearsRadialChart from "./SocialCost100YearsRadialChart";
// import EnvironmentalCost100YearsRadialChart from "./EnvironmentalCost100YearsRadialChart";
// import PieChart from "./PieChart";
// import BarChart from "./BarChart";
// import BubbleChart from "./BubbleChart";
// import HorizontalBarChart from "./HorizontalBarChart";

// const Results = ( { setSelectedProjectDetailWindow,
//   setShowTutorials}) => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [sidebarVisible, setSidebarVisible] = useState(true);
//     useEffect(() => {
//     setShowTutorials(false);
//     setSelectedProjectDetailWindow("results");
//   }, [setShowTutorials, setSelectedProjectDetailWindow]); 
//   const pages = [
//     {
//       topCharts: [
//         { component: <RadialChartsComponent width={280} height={220} /> },
//         { component: <SocialCostRadialChart width={280} height={220} /> },
//         { component: <EnvironmentalCostRadialChart width={280} height={220} /> }
//       ],
//       bottomChart: { component: <BarChart /> },
//       showLegend: true
//     },
//     {
//       topCharts: [
//         { component: <RadialChartsComponent width={280} height={220} /> },
//         { component: <SocialCostRadialChart width={280} height={220} /> },
//         { component: <EnvironmentalCostRadialChart width={280} height={220} /> }
//       ],
//       bottomChart: { component: <PieChart /> },
//       showLegend: true
//     },
//     {
//       topCharts: [
//         { component: <EconomicCost100YearsRadialChart width={280} height={220} /> },
//         { component: <SocialCost100YearsRadialChart width={280} height={220} /> },
//         { component: <EnvironmentalCost100YearsRadialChart width={280} height={220} /> }
//       ],
//       bottomChart: { component: <HorizontalBarChart /> },
//       showLegend: true
//     },
//     {
//       topCharts: [],
//       bottomChart: { component: <BubbleChart />, fullPage: true },
//       showLegend: false
//     }
//   ];

//   const currentPageData = pages[currentPage];

//   const handleNext = () => {
//     if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
//   };

//   const handleBack = () => {
//     if (currentPage > 0) setCurrentPage(currentPage - 1);
//   };

//   const colors = ['#273B5C', '#961818', '#5A003B', '#708090'];
//   const labels = ['Initial Stage', 'Use Stage', 'End-of-Life Stage', 'Beyond-Life Stage'];

//   return (
//     <div className="w-full h-[calc(100vh*11/14)] flex flex-col overflow-hidden">
//       {/* Result Window Tab */}
//       <div className="flex-shrink-0">
//         <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
//           <div className="flex w-fit min-w-full">
//             <div
//               className="flex items-center px-4 py-2 rounded-sm border border-gray-300 whitespace-nowrap cursor-default bg-[#F0E6E6] border-b-[#522828b0] border-b-[0.25rem]"
//               style={{ fontSize: '1rem' }}
//             >
//               <span className="font-medium">Result Window</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content Container */}
//       <div className="flex-1 bg-gray-50 overflow-hidden relative">
//         <div className="h-full flex flex-col">
//           {/* Charts Container */}
//           <div className="flex-1 flex flex-col min-h-0">
//             {/* Top Charts Row */}
//             {currentPageData.topCharts.length > 0 && (
//               <div className="h-64 ">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2 h-full">
//                   {currentPageData.topCharts.map((chart, index) => (
//                     <div key={index} className="bg-white rounded-lg shadow-lg pt-1  flex items-center justify-center overflow-hidden">
//                       <div className="w-full h-full flex items-center justify-center">
//                         {chart.component}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Legend */}
//             {currentPageData.showLegend && (
//               <div className="flex-shrink-0 ">
//                 <div className="flex flex-wrap items-center justify-center gap-4 p-2 rounded-lg shadow-sm">
//                   {colors.map((color, index) => (
//                     <div key={index} className="flex items-center gap-2">
//                       <div 
//                         className="w-3 h-3 rounded-sm"
//                         style={{ backgroundColor: color }}
//                       ></div>
//                       <span className="text-xs font-medium text-gray-700">
//                         {labels[index]}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Bottom Chart */}
//             <div className={`${currentPageData.bottomChart.fullPage ? 'flex-1' : 'flex-1'} min-h-0 overflow-hidden`}>
//               <div className="bg-white rounded-lg shadow-lg  h-full overflow-hidden">
//                 <div className="w-full h-full overflow-hidden">
//                   {currentPageData.bottomChart.component}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Controls - Positioned in bottom right */}
//         <div className="absolute bottom-6 right-6 flex items-center gap-4">
//           {/* Page Indicators */}
         

//           {/* Navigation Buttons */}
//           <div className="flex gap-2">
//             <button
//               onClick={handleBack}
//               disabled={currentPage === 0}
//               className={`flex items-center px-4 py-2 rounded-lg font-medium shadow-md ${
//                 currentPage === 0
//                   ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                   : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
//               }`}
//             >
            
//               Back
//             </button>

//             <button
//               onClick={handleNext}
//               disabled={currentPage === pages.length - 1}
//               className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors shadow-md ${
//                 currentPage === pages.length - 1
//                   ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                   : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
//               }`}
//             >
//               Next
             
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Results;

// import React, { useState } from "react";
// import { useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import RadialChartsComponent from "./RadialChartsComponent";
// import SocialCostRadialChart from "./SocialCostRadialChart";
// import EnvironmentalCostRadialChart from "./EnvironmentalCostRadialChart";
// import EconomicCost100YearsRadialChart from "./EconomicCost100YearsRadialChart";
// import SocialCost100YearsRadialChart from "./SocialCost100YearsRadialChart";
// import EnvironmentalCost100YearsRadialChart from "./EnvironmentalCost100YearsRadialChart";
// import PieChart from "./PieChart";
// import BarChart from "./BarChart";
// import BubbleChart from "./BubbleChart";
// import HorizontalBarChart from "./HorizontalBarChart";
// import ProjectSidebar from "./ResultsSideBar"; // Import the new sidebar component

// const Results = ({ 
//   setSelectedProjectDetailWindow,
//   setShowTutorials,
//   selectedProjectDetailWindow, // Add this prop
//   setActiveTabs, // Add this prop
//   activeTabs // Add this prop
// }) => {
//   const [currentPage, setCurrentPage] = useState(0);
//   const [sidebarVisible, setSidebarVisible] = useState(true);

//   useEffect(() => {
//     setShowTutorials(false);
//     setSelectedProjectDetailWindow("results");
//   }, [setShowTutorials, setSelectedProjectDetailWindow]); 

//   const pages = [
//     {
//       topCharts: [
//         { component: <RadialChartsComponent width={280} height={220} /> },
//         { component: <SocialCostRadialChart width={280} height={220} /> },
//         { component: <EnvironmentalCostRadialChart width={280} height={220} /> }
//       ],
//       bottomChart: { component: <BarChart /> },
//       showLegend: true
//     },
//     {
//       topCharts: [
//         { component: <RadialChartsComponent width={280} height={220} /> },
//         { component: <SocialCostRadialChart width={280} height={220} /> },
//         { component: <EnvironmentalCostRadialChart width={280} height={220} /> }
//       ],
//       bottomChart: { component: <PieChart /> },
//       showLegend: true
//     },
//     {
//       topCharts: [
//         { component: <EconomicCost100YearsRadialChart width={280} height={220} /> },
//         { component: <SocialCost100YearsRadialChart width={280} height={220} /> },
//         { component: <EnvironmentalCost100YearsRadialChart width={280} height={220} /> }
//       ],
//       bottomChart: { component: <HorizontalBarChart /> },
//       showLegend: true
//     },
//     {
//       topCharts: [],
//       bottomChart: { component: <BubbleChart />, fullPage: true },
//       showLegend: false
//     }
//   ];

//   const currentPageData = pages[currentPage];

//   const handleNext = () => {
//     if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
//   };

//   const handleBack = () => {
//     if (currentPage > 0) setCurrentPage(currentPage - 1);
//   };

//   const colors = ['#273B5C', '#961818', '#5A003B', '#708090'];
//   const labels = ['Initial Stage', 'Use Stage', 'End-of-Life Stage', 'Beyond-Life Stage'];

//   return (
//     <div className="flex gap-4 mx-4">
//       {/* Left Panel - Project Sidebar */}
//       {sidebarVisible && (
//         <div className="w-1/6">
//           <ProjectSidebar 
//             selectedWindow={selectedProjectDetailWindow}
//             setSelectedWindow={setSelectedProjectDetailWindow}
//             setShowTutorials={setShowTutorials}
//             setActiveTabs={setActiveTabs}
//             activeTabs={activeTabs}
//             showResultsOutput={true} // This will show the checkboxes in output
//           />
//         </div>
//       )}

//       {/* Right Panel - Charts */}
//       <div className={`${sidebarVisible ? 'w-5/6' : 'w-full'} h-[calc(100vh*11/14)] flex flex-col overflow-hidden`}>
//         {/* Result Window Tab */}
//         <div className="flex-shrink-0">
//           <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
//             <div className="flex w-fit min-w-full">
//               <div
//                 className="flex items-center px-4 py-2 rounded-sm border border-gray-300 whitespace-nowrap cursor-default bg-[#F0E6E6] border-b-[#522828b0] border-b-[0.25rem]"
//                 style={{ fontSize: '1rem' }}
//               >
//                 <span className="font-medium">Result Window</span>
//                 {/* Toggle sidebar button */}
               
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content Container */}
//         <div className="flex-1 bg-gray-50 overflow-hidden relative">
//           <div className="h-full flex flex-col">
//             {/* Charts Container */}
//             <div className="flex-1 flex flex-col min-h-0">
//               {/* Top Charts Row */}
//               {currentPageData.topCharts.length > 0 && (
//                 <div className="h-64">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2 h-full">
//                     {currentPageData.topCharts.map((chart, index) => (
//                       <div key={index} className="bg-white rounded-lg shadow-lg pt-1 flex items-center justify-center overflow-hidden">
//                         <div className="w-full h-full flex items-center justify-center">
//                           {chart.component}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Legend */}
//               {currentPageData.showLegend && (
//                 <div className="flex-shrink-0">
//                   <div className="flex flex-wrap items-center justify-center gap-4 p-2 rounded-lg shadow-sm">
//                     {colors.map((color, index) => (
//                       <div key={index} className="flex items-center gap-2">
//                         <div 
//                           className="w-3 h-3 rounded-sm"
//                           style={{ backgroundColor: color }}
//                         ></div>
//                         <span className="text-xs font-medium text-gray-700">
//                           {labels[index]}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Bottom Chart */}
//               <div className={`${currentPageData.bottomChart.fullPage ? 'flex-1' : 'flex-1'} min-h-0 overflow-hidden`}>
//                 <div className="bg-white rounded-lg shadow-lg h-full overflow-hidden">
//                   <div className="w-full h-full overflow-hidden">
//                     {currentPageData.bottomChart.component}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Navigation Controls - Positioned in bottom right */}
//           <div className="absolute bottom-6 right-6 flex items-center gap-4">
//             {/* Navigation Buttons */}
//             <div className="flex gap-2">
//               <button
//                 onClick={handleBack}
//                 disabled={currentPage === 0}
//                 className={`flex items-center px-4 py-2 rounded-lg font-medium shadow-md ${
//                   currentPage === 0
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                     : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
//                 }`}
//               >
//                 Back
//               </button>

//               <button
//                 onClick={handleNext}
//                 disabled={currentPage === pages.length - 1}
//                 className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors shadow-md ${
//                   currentPage === pages.length - 1
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                     : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
//                 }`}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Results;
import React, { useState, useEffect } from "react";
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
import ReusableSidebar from "./ResultsSideBar";

// Import your form components
// ...existing code...
// Import your form components
// ...existing code...
// Import your form components
import FoundationForm from "../ProjectDetails/StructureWorksComponents/FoundationForm";
import SuperStructureForm from "../ProjectDetails/StructureWorksComponents/SuperStructureForm";
import SubStructureForm from "../ProjectDetails/StructureWorksComponents/SubStructureForm";
import MiscellaneousForm from "../ProjectDetails/StructureWorksComponents/MiscellaneousForm";
import FinancialData from "../ProjectDetails/FinancialData";
import CarbonEmissionData from "../ProjectDetails/CarbonEmissionData";
import CarbonEmissionCostData from "../ProjectDetails/CarbonEmissionCostData";
import BridgeandTraffic from "../ProjectDetails/BridgeandTraffic";
import MaintenanceandRepairData from "../ProjectDetails/MaintenanceandRepairData";
import DemolitionandRecycling from "../ProjectDetails/DemolitionandRecycling";
// ...existing code...

const Results = ({ setSelectedProjectDetailWindow, setShowTutorials }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedWindow, setSelectedWindow] = useState(null);
  const [activeTabs, setActiveTabs] = useState([]);

  useEffect(() => {
    setShowTutorials(false);
    setSelectedProjectDetailWindow("results");
  }, [setShowTutorials, setSelectedProjectDetailWindow]);

  const pages = [
    {
      topCharts: [
        { component: <RadialChartsComponent width={280} height={220} /> },
        { component: <SocialCostRadialChart width={280} height={220} /> },
        { component: <EnvironmentalCostRadialChart width={280} height={220} /> }
      ],
      bottomChart: { component: <BarChart /> },
      showLegend: true
    },
    {
      topCharts: [
        { component: <RadialChartsComponent width={280} height={220} /> },
        { component: <SocialCostRadialChart width={280} height={220} /> },
        { component: <EnvironmentalCostRadialChart width={280} height={220} /> }
      ],
      bottomChart: { component: <PieChart /> },
      showLegend: true
    },
    {
      topCharts: [
        { component: <EconomicCost100YearsRadialChart width={280} height={220} /> },
        { component: <SocialCost100YearsRadialChart width={280} height={220} /> },
        { component: <EnvironmentalCost100YearsRadialChart width={280} height={220} /> }
      ],
      bottomChart: { component: <HorizontalBarChart /> },
      showLegend: true
    },
    {
      topCharts: [],
      bottomChart: { component: <BubbleChart />, fullPage: true },
      showLegend: false
    }
  ];

  const currentPageData = pages[currentPage];

  const handleNext = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const handleBack = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const colors = ['#273B5C', '#961818', '#5A003B', '#708090'];
  const labels = ['Initial Stage', 'Use Stage', 'End-of-Life Stage', 'Beyond-Life Stage'];

  // Output items for checkbox display
  const outputItems = [
    { text: "Initial Construction Cost", color: "#CC9933" },
    { text: "Initial Carbon Emission Cost", color:  "#CC9933" }, 
    { text: "Time Cost", color:  "#CC9933" },
    { text: "Road User Cost", color:  "#CC9933" },
    { text: "Carbon Emission due to Re-Routing", color:  "#CC9933" },
    { text: "Periodic Maintenance Costs", color:  "#CC9933"},
    { text: "Maintenance Emission Costs", color:  "#CC9933" },
    { text: "Routine Inspection Costs", color:  "#CC9933" },
    { text: "Repair & Rehabilitation Costs", color: "#CC9933" },
    { text: "Reconstruction Costs", color:  "#CC9933" },
    { text: "Recycling Cost", color:  "#CC9933" },
    { text: "Total Life-Cycle Cost", color:  "#CC9933" },
  ];

  // Navigation handler for forms
  const handleFormNavigation = (formName) => {
    setSelectedWindow(formName);
    setActiveTabs((tabs) => {
      if (!tabs.includes(formName)) {
        return [...tabs, formName];
      }
      return tabs;
    });
  };

  const handleTabClose = (tab) => {
    setActiveTabs((prevTabs) => {
      const index = prevTabs.indexOf(tab);
      const newTabs = prevTabs.filter((t) => t !== tab);
      
      let nextTab = null;
      if (newTabs.length > 0) {
        if (index < newTabs.length) {
          nextTab = newTabs[index];
        } else {
          nextTab = newTabs[index - 1];
        }
      }
      
      setSelectedWindow(nextTab);
      return newTabs;
    });
  };

  const onClickTabs = (tab) => {
    setSelectedWindow(tab);
  };

  return (
    <div className="w-full h-[calc(100vh*11/14)] flex overflow-hidden">
      {/* Sidebar */}
      {sidebarVisible && (
        <ReusableSidebar
          selectedWindow={selectedWindow}
          setSelectedWindow={setSelectedWindow}
          setShowTutorials={setShowTutorials}
          setActiveTabs={setActiveTabs}
          activeTabs={activeTabs}
          showOutputAsCheckboxes={true}
          outputItems={outputItems}
        />
      )}

      {/* Main Content */}
      <div className={`flex flex-col ml-2 overflow-hidden ${selectedWindow ? 'w-3/4' : 'w-full'}`}>
        {/* Result Window Tab */}
        <div className="flex-shrink-0">
          <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
            <div className="flex w-fit min-w-full">
              <div
                className="flex items-center px-4 py-2 rounded-sm border border-gray-300 whitespace-nowrap cursor-default bg-[#F0E6E6] border-b-[#522828b0] border-b-[0.25rem]"
                style={{ fontSize: '1rem' }}
              >
                <span className="font-medium">Result Window</span>
                
                  
              </div>
            </div>
          </div>
        </div>

        {/* Charts Container - Only show when no form is selected */}
        {!selectedWindow && (
          <div className="flex-1 bg-gray-50 overflow-hidden relative">
            <div className="h-full flex flex-col">
              <div className="flex-1 flex flex-col min-h-0">
                {/* Top Charts Row */}
                {currentPageData.topCharts.length > 0 && (
                  <div className="h-64">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-2 h-full">
                      {currentPageData.topCharts.map((chart, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-lg pt-1 flex items-center justify-center overflow-hidden">
                          <div className="w-full h-full flex items-center justify-center">
                            {chart.component}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Legend */}
                {currentPageData.showLegend && (
                  <div className="flex-shrink-0">
                    <div className="flex flex-wrap items-center justify-center gap-4 p-2 rounded-lg shadow-sm">
                      {colors.map((color, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-sm"
                            style={{ backgroundColor: color }}
                          ></div>
                          <span className="text-xs font-medium text-gray-700">
                            {labels[index]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Chart */}
                <div className={`${currentPageData.bottomChart.fullPage ? 'flex-1' : 'flex-1'} min-h-0 overflow-hidden`}>
                  <div className="bg-white rounded-lg shadow-lg h-full overflow-hidden">
                    <div className="w-full h-full overflow-hidden">
                      {currentPageData.bottomChart.component}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls - Positioned in bottom right */}
            <div className="absolute bottom-6 right-6 flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={handleBack}
                  disabled={currentPage === 0}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium shadow-md ${
                    currentPage === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentPage === pages.length - 1}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors shadow-md ${
                    currentPage === pages.length - 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Form Display Area - Show when a form is selected */}
        {selectedWindow && (
          <div className="flex-1 overflow-auto bg-gray-50" style={{ maxHeight: "80vh" }}>
            {selectedWindow === "Foundation" && (
              <FoundationForm
                setActiveTabs={setActiveTabs}
                Activetabs={activeTabs}
                currentForm="Foundation"
                onNavigate={handleFormNavigation}
                onClose={handleTabClose}
                onclicktabs={onClickTabs}
              />
            )}
            {selectedWindow === "Sub-Structure" && (
              <SubStructureForm
                setActiveTabs={setActiveTabs}
                Activetabs={activeTabs}
                currentForm="Sub-Structure"
                onNavigate={handleFormNavigation}
                onClose={handleTabClose}
                onclicktabs={onClickTabs}
              />
            )}
            {selectedWindow === "Super-Structure" && (
              <SuperStructureForm
                setActiveTabs={setActiveTabs}
                Activetabs={activeTabs}
                currentForm="Super-Structure"
                onNavigate={handleFormNavigation}
                onClose={handleTabClose}
                onclicktabs={onClickTabs}
              />
            )}
            {selectedWindow === "Miscellaneous" && (
              <MiscellaneousForm
                setActiveTabs={setActiveTabs}
                Activetabs={activeTabs}
                currentForm="Miscellaneous"
                onNavigate={handleFormNavigation}
                onClose={handleTabClose}
                onclicktabs={onClickTabs}
              />
            )}
            {selectedWindow === "Financial Data" && (
              <FinancialData
                currentForm="Financial Data"
                onNavigate={handleFormNavigation}
                onClose={handleTabClose}
                onclicktabs={onClickTabs}
                setActiveTabs={setActiveTabs}
                Activetabs={activeTabs}
              />
            )}
            {selectedWindow === "Carbon Emission Data" && (
              <CarbonEmissionData
                currentForm="Carbon Emission Data"
                onNavigate={handleFormNavigation}
                onClose={handleTabClose}
                onclicktabs={onClickTabs}
                setActiveTabs={setActiveTabs}
                Activetabs={activeTabs}
              />
            )}
            {selectedWindow === "Carbon Emission Cost Data" && (
              <CarbonEmissionCostData
                currentForm="Carbon Emission Cost Data"
                onNavigate={handleFormNavigation}
                onClose={handleTabClose}
                onclicktabs={onClickTabs}
                setActiveTabs={setActiveTabs}
                Activetabs={activeTabs}
              />
            )}
            {selectedWindow === "Bridge and Traffic" && (
              <BridgeandTraffic
                currentForm="Bridge and Traffic"
                onNavigate={handleFormNavigation}
                onClose={handleTabClose}
                onclicktabs={onClickTabs}
                setActiveTabs={setActiveTabs}
                Activetabs={activeTabs}
              />
            )}
            {selectedWindow === "Maintenance and Repair Data" && (
              <MaintenanceandRepairData
                currentForm="Maintenance and Repair Data"
                onNavigate={handleFormNavigation}
                onClose={handleTabClose}
                onclicktabs={onClickTabs}
                setActiveTabs={setActiveTabs}
                Activetabs={activeTabs}
              />
            )}
            {selectedWindow === "Demolition and Recycling" && (
              <DemolitionandRecycling
                currentForm="Demolition and Recycling"
                onNavigate={handleFormNavigation}
                onClose={handleTabClose}
                onclicktabs={onClickTabs}
                setActiveTabs={setActiveTabs}
                Activetabs={activeTabs}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;