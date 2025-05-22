import FoundationForm from './StructureWorksComponents/FoundationForm';
import SuperStructureForm from './StructureWorksComponents/SuperStructureForm';
import SubStructureForm from './StructureWorksComponents/SubStructureForm';
import MiscellaneousForm from './StructureWorksComponents/MiscellaneousForm';
import { useState } from 'react';
import Accordion from '../Accordion';
import GeneralInfoForm from '../InputForms/GeneralInfoForm';
import StructureWorksData from './StructureWorksData';

const ProjectDetails = ({ selectedStructureForm, setSelectedStructureForm, setShowTutorials }) => {
  return (
    <div className="flex gap-4 mx-4">

      {/* Left Panel - Project Details */}
      <div
        className={`rounded-t-sm px-1.5 border border-black font-semibold text-[13px] py-1 text-sm bg-[#F0E6E6]
          ${selectedStructureForm ? 'w-1/4' : 'w-full'}`}
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
                  setSelectedStructureForm(formName);
                  setShowTutorials(false); // close tutorials
                }}
              />
            </Accordion>
            <Accordion title="Financial Data" level={1}>xyz</Accordion>
            <Accordion title="Carbon Emission Data" level={1}>xyz</Accordion>
            <Accordion title="Bridge and Traffic Data" level={1}>xyz</Accordion>
            <Accordion title="Maintainence and Repair" level={1}>xyz</Accordion>
            <Accordion title="Disposal and Recycling" level={1}>xyz</Accordion>
          </Accordion>

          <Accordion title="Outputs">Placeholder content for Outputs.</Accordion>
        </div>
      </div>

      {/* Right Panel - Selected Form */}
      {selectedStructureForm && (
        <div className="w-3/4 border border-black bg-white p-4 rounded shadow overflow-auto" style={{ maxHeight: '80vh' }}>
          {selectedStructureForm === 'Foundation' && <FoundationForm />}
          {selectedStructureForm === 'Sub-Structure' && <SubStructureForm />}
          {selectedStructureForm === 'Super-Structure' && <SuperStructureForm />}
          {selectedStructureForm === 'Miscellaneous' && <MiscellaneousForm />}
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
