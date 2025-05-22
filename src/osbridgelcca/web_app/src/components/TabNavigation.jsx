import React from 'react';

const tabs = ["Tutorials", "Project Details", "Results", "Compare"];

const TabNavigation = ({ activeTab, onTabChange, setShowTutorials, showTutorials }) => {
  return (
    <>
      <div className='flex items-center justify-center border-b py-1.5 '>
        <span>Windows :&nbsp; </span>
        <nav className="flex text-xs">
          {tabs.map((tab) => {
            if (tab === "Tutorials") {
              return (
                 <button
              key={tab}
              onClick={() =>{if(!showTutorials) {
                setShowTutorials(true);
              }}}
              className={`px-2 py-1 border border-gray-400 font-bold text-black  ${activeTab === tab ? 'bg-gray-300 ' : 'bg-gray-200'
                }`}
            >
              {tab}
            </button>
              ) // Skip rendering the "Tutorials" tab
            }
            else {
              return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`px-2 py-1 border border-gray-400 font-bold text-black  ${activeTab === tab ? 'bg-gray-300 ' : 'bg-gray-200'
                }`}
            >
              {tab}
            </button>
              )
            }
})}
        </nav>
      </div>
    </>
  );
};

export default TabNavigation;
