import FoundationForm from './StructureWorksComponents/FoundationForm';
import SuperStructureForm from './StructureWorksComponents/SuperStructureForm';
import SubStructureForm from './StructureWorksComponents/SubStructureForm';
import MiscellaneousForm from './StructureWorksComponents/MiscellaneousForm';
import { useState } from 'react';
import Accordion from '../Accordion';
import GeneralInfoForm from '../InputForms/GeneralInfoForm';
import StructureWorksData from './StructureWorksData';
import FinancialData from './FinancialData';
import MaintenanceandRepairData from './MaintenanceandRepairData';
import BridgeandTraffic from './BridgeandTraffic';
import DemolitionandRecycling from './DemolitionandRecycling';
import CarbonEmissionData from './CarbonEmissionData';
import CarbonEmissionCostData from './CarbonEmissionCostData';

const ProjectDetails = ({ SelectedProjectDetailWindow, setSelectedProjectDetailWindow, setShowTutorials }) => {
  return (
    <div className="flex gap-4 mx-4">

      {/* Left Panel - Project Details */}
      <div
        className={`rounded-t-sm px-1.5 border border-black font-semibold text-[13px] py-1 text-smbg-[#FFF9F9]
          ${SelectedProjectDetailWindow ? 'w-1/4' : 'w-full'}`}
      >
        <div>Project Details Window</div>

        {/* Content only shrinks when a form is selected */}
        <div className={`bg-[#FFF9F9] p-4 rounded-sm overflow-auto`} style={{ maxHeight: '80vh' }}>
          <Accordion title="General Information">
            <GeneralInfoForm />
          </Accordion>

          <Accordion title="Input Parameters">
            <Accordion title="Structure Works Data" level={1}>
              <StructureWorksData 
                onSelectForm={(formName) => {
                  setSelectedProjectDetailWindow(formName);
                  setShowTutorials(false); // close tutorials
                }}
              />
            </Accordion>
           <button 
           onClick={() =>
             {setSelectedProjectDetailWindow('FinancialData');
              setShowTutorials(false);
           }} 
            className="mb-2 bg-[#F0E6E6] border border-black rounded-sm w-full text-left text-sm px-4 py-2 ml-4"
            >
           {'\u2BC8'}  &nbsp; Financial Data
           </button>


            <Accordion
              title={
                <span
                  onClick={() => {
                    setSelectedProjectDetailWindow('CarbonEmissionData');
                    setShowTutorials(false);
                  }}
                 
                > Carbon Emission Data
                </span>
              }
              level={1}
            >
              <button 
                onClick={() => {
                  setSelectedProjectDetailWindow('CarbonEmissionCostData');
                  setShowTutorials(false);
                }}
                className="mb-2 bg-[#F0E6E6] border border-black rounded-sm w-full text-left text-sm px-4 py-2 ml-4"
              >
                ►  Carbon Emission Cost Data
              </button>
            </Accordion>

            
           <button 
           onClick={() =>
             {setSelectedProjectDetailWindow('BridgeandTraffic');
              setShowTutorials(false);
           }} 
            className="mb-2 bg-[#F0E6E6] border border-black rounded-sm w-full text-left text-sm px-4 py-2 ml-4"
            >
           {'\u2BC8'}  &nbsp; Bridge and Traffic Data
           </button>

           <button 
           onClick={() =>
             {setSelectedProjectDetailWindow('MaintenanceandRepairData');
              setShowTutorials(false);
           }} 
            className="mb-2 bg-[#F0E6E6] border border-black rounded-sm w-full text-left text-sm px-4 py-2 ml-4"
            >
           {'\u2BC8'}  &nbsp; Maintenance and Repair
           </button>


           
           <button 
           onClick={() =>
             {setSelectedProjectDetailWindow('DemolitionandRecycling');
              setShowTutorials(false);
           }} 
            className="mb-2 bg-[#F0E6E6] border border-black rounded-sm w-full text-left text-sm px-4 py-2 ml-4"
            >
           {'\u2BC8'}  &nbsp; Disposal and Recycling
           </button>
          </Accordion>

          <Accordion title="Outputs">Placeholder content for Outputs.</Accordion>
        </div>
      </div>

      {/* Right Panel - Selected Form */}
      {SelectedProjectDetailWindow && (
        <div className="w-3/4  overflow-auto" style={{ maxHeight: '80vh' }}>
          {SelectedProjectDetailWindow === 'Foundation' && <FoundationForm />}
          {SelectedProjectDetailWindow === 'Sub-Structure' && <SubStructureForm />}
          {SelectedProjectDetailWindow === 'Super-Structure' && <SuperStructureForm />}
          {SelectedProjectDetailWindow === 'FinancialData' && <FinancialData />}
          {SelectedProjectDetailWindow === 'Miscellaneous' && <MiscellaneousForm />}
          {SelectedProjectDetailWindow === 'CarbonEmissionData' && < CarbonEmissionData />}
          {SelectedProjectDetailWindow === 'BridgeandTraffic' && <BridgeandTraffic />}
          {SelectedProjectDetailWindow === 'MaintenanceandRepairData' && <MaintenanceandRepairData />}
          {SelectedProjectDetailWindow === 'DemolitionandRecycling' && <DemolitionandRecycling />}
          {SelectedProjectDetailWindow === 'CarbonEmissionCostData' && <CarbonEmissionCostData />}
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
