import React, { useState } from 'react';

import Accordion from '../Accordion';
import FoundationForm from './StructureWorksComponents/FoundationForm';
import SuperStructureForm from './StructureWorksComponents/SuperStructureForm';
import SubStructureForm from './StructureWorksComponents/SubStructureForm';
import MiscellaneousForm from './StructureWorksComponents/MiscellaneousForm';

const StructureWorksData = ({ onSelectForm }) => {
  return (
    <div className="flex flex-col gap-2 text-sm">
      <button 
        onClick={() => onSelectForm('Foundation')} 
        className="mb-2 bg-[#F0E6E6] border border-black rounded-sm w-full text-left text-base px-4 py-2"
      >
        ► Foundation
      </button>
      <button 
        onClick={() => onSelectForm('Sub-Structure')} 
        className="mb-2 bg-[#F0E6E6] border border-black rounded-sm w-full text-left text-base px-4 py-2"
      >
        ► Sub-Structure
      </button>
      <button 
        onClick={() => onSelectForm('Super-Structure')} 
        className="mb-2 bg-[#F0E6E6] border border-black rounded-sm w-full text-left text-base px-4 py-2"
      >
        ► Super-Structure
      </button>
      <button 
        onClick={() => onSelectForm('Miscellaneous')} 
        className="mb-2 bg-[#F0E6E6] border border-black rounded-sm w-full text-left text-base px-4 py-2"
      >
        ► Miscellaneous
      </button>
    </div>
  );
};

export default StructureWorksData;