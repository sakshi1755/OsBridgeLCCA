import { useState } from 'react';

const Tutorials = ({ onClose }) => {

  
  return ( 
    
  <div >
      {/* Header */}
      <div className="rounded-t-sm flex justify-between px-1.5 py-1 items-center border-t border-r border-l border-black bg-[#F0E6E6] w-40">
        <span className="font-semibold text-[13px]">Tutorials</span>
        <button onClick={onClose} className="text-sm font-bold">✕</button>
      </div>

    <div className="rounded-sm w-60 border border-black bg-white text-xs flex flex-col">

      {/* Scrollable Content */}
      <div className="overflow-y-auto py-1 px-1 h-96 bg-[#FFF9F9]">
        <div className="text-center text-base font-normal mt-1">1/4</div>
        <div className="text-center font-semibold text-base mb-2">Welcome to<br/>BLCCA Studio</div>
        <p className="text-justify leading-snug text-base px-1">
          BLCCA Studio has a lot of features to offer. In the next few minutes, you will learn how to use BLCCA Studio efficiently, from setting up and managing projects to navigating the user interface. This tutorial will guide you through essential features, including customization options, shortcuts, and export capabilities, ensuring a seamless workflow. Whether you’re a beginner or an advanced user, this guide will help you unlock the full potential of BLCCA Studio and enhance your productivity.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex px-3 justify-between border-t border-black h-12 items-center bg-[#F0E6E6]">
        <button className="bg-white py-1.5 px-5 text-sm rounded-md border border-[#D1D1D1]">Back</button>
        <button className="bg-white py-1.5 px-5 text-sm rounded-md border border-[#D1D1D1]">Next</button>
      </div>
    </div>
  </div>
  );
};

export default Tutorials;
