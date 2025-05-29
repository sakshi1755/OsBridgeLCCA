import FoundationForm from "./StructureWorksComponents/FoundationForm";
import SuperStructureForm from "./StructureWorksComponents/SuperStructureForm";
import SubStructureForm from "./StructureWorksComponents/SubStructureForm";
import MiscellaneousForm from "./StructureWorksComponents/MiscellaneousForm";
import { useState } from "react";
import Accordion from "../Accordion";
import GeneralInfoForm from "../InputForms/GeneralInfoForm";
import StructureWorksData from "./StructureWorksData";
import FinancialData from "./FinancialData";
import MaintenanceandRepairData from "./MaintenanceandRepairData";
import BridgeandTraffic from "./BridgeandTraffic";
import DemolitionandRecycling from "./DemolitionandRecycling";
import CarbonEmissionData from "./CarbonEmissionData";
import CarbonEmissionCostData from "./CarbonEmissionCostData";
import Accordionp from "../Accordianp";

const ProjectDetails = ({
  SelectedProjectDetailWindow,
  setSelectedProjectDetailWindow,
  setShowTutorials,
}) => {
  // Navigation handler for forms
  const handleFormNavigation = (formName) => {
    setSelectedProjectDetailWindow(formName);
    setActiveTabs((tabs) => [...tabs, formName]);
  };
  const [Activetabs, setActiveTabs] = useState([]);

  const handleTabClose = (tabToRemove) => {
    setActiveTabs((prevTabs) => {
      const index = prevTabs.indexOf(tabToRemove);
      const newTabs = prevTabs.filter((tab) => tab !== tabToRemove);

      // Choose the next selected tab
      let nextTab = null;
      if (newTabs.length > 0) {
        if (index < newTabs.length) {
          nextTab = newTabs[index]; // Tab to the right
        } else {
          nextTab = newTabs[index - 1]; // Or tab to the left
        }
      }

      setSelectedProjectDetailWindow(nextTab);
      return newTabs;
    });
  };

  const onclicktabs = (tab) => {
    setSelectedProjectDetailWindow(tab);
  };

  return (
    
    <div className="flex gap-4 mx-4">
      {/* Left Panel - Project Details */}
      <div
        className={`flex flex-col
          ${SelectedProjectDetailWindow ? "w-1/4" : "w-full"}`}
      >
        <span className="bg-[#F0E6E6] border border-black rounded-t-sm px-2 py-2 text-sm font-semibold max-w-[200px]">
          Project Details Window
          <button className=" ml-3 text-sm font-bold">✕</button>
        </span>

        {/* Content only shrinks when a form is selected */}
        <div
          className={`bg-[#FFf9F9] m-30 rounded-sm overflow-auto  space-y-4  rounded-t-sm border border-black font-semibold text-[13px] p-5 text-smbg-[#FFF9F9]`}
          style={{ maxHeight: "80vh" }}
        >
          {SelectedProjectDetailWindow === null && (
            <div className="bg-[#F0E6E6]  border border-black">
              <Accordion title="General Information">
                <GeneralInfoForm />
              </Accordion>
            </div>
          )}
          <div className="bg-[#F0E6E6]  border border-black">
            <Accordion title="Input Parameters">
              <Accordionp title="Structure Works Data" level={1}>
                <StructureWorksData
                  setActiveTabs={setActiveTabs}
                  Activetabs={Activetabs}
                  onSelectForm={(formName) => {
                    setActiveTabs((tabs) => {
                      if (!tabs.includes(formName)) {
                        return [...tabs, formName];
                      }
                      return tabs;
                    });
                    setSelectedProjectDetailWindow(formName);
                    setShowTutorials(false); // close tutorials
                  }}
                />
              </Accordionp>

              <button
                onClick={() => {
                  setSelectedProjectDetailWindow("Financial Data");
                  setShowTutorials(false);
                  setActiveTabs((tabs) => {
                    if (!tabs.includes("Financial Data")) {
                      return [...tabs, "Financial Data"];
                    }
                    return tabs;
                  });
                }}
                className=" rounded-sm w-full text-left text-sm  ml-12"
              >
                {"\u2BC8"} &nbsp; Financial Data
              </button>

              <Accordionp
                title={
                  <span
                    onClick={() => {
                      setSelectedProjectDetailWindow("Carbon Emission Data");
                      setShowTutorials(false);
                      setActiveTabs((tabs) => {
                        if (!tabs.includes("Carbon Emission Data")) {
                          return [...tabs, "Carbon Emission Data"];
                        }
                        return tabs;
                      });
                    }}
                  >
                    {" "}
                    Carbon Emission Data
                  </span>
                }
                level={1}
              >
                <button
                  onClick={() => {
                    setSelectedProjectDetailWindow("Carbon Emission Cost Data");
                    setShowTutorials(false);
                    setActiveTabs((tabs) => {
                      if (!tabs.includes("Carbon Emission Cost Data")) {
                        return [...tabs, "Carbon Emission Cost Data"];
                      }
                      return tabs;
                    });
                  }}
                  className="rounded-sm w-full text-left text-sm  ml-20"
                >
                  {"\u2BC8"} &nbsp;Carbon Emission Cost Data
                </button>
              </Accordionp>

              <button
                onClick={() => {
                  setSelectedProjectDetailWindow("Bridge and Traffic");
                  setShowTutorials(false);
                  setActiveTabs((tabs) => {
                    if (!tabs.includes("Bridge and Traffic")) {
                      return [...tabs, "Bridge and Traffic"];
                    }
                    return tabs;
                  });
                }}
                className=" rounded-sm w-full text-left text-sm  ml-12"
              >
                {"\u2BC8"} &nbsp; Bridge and Traffic Data
              </button>

              <button
                onClick={() => {
                  setSelectedProjectDetailWindow("Maintenance and Repair Data");
                  setShowTutorials(false);
                  setActiveTabs((tabs) => {
                    if (!tabs.includes("Maintenance and Repair Data")) {
                      return [...tabs, "Maintenance and Repair Data"];
                    }
                    return tabs;
                  });
                }}
                className=" rounded-sm w-full text-left text-sm  ml-12"
              >
                {"\u2BC8"} &nbsp; Maintenance and Repair
              </button>

              <button
                onClick={() => {
                  setSelectedProjectDetailWindow("Demolition and Recycling");
                  setShowTutorials(false);
                  setActiveTabs((tabs) => {
                    if (!tabs.includes("Demolition and Recycling")) {
                      return [...tabs, "Demolition and Recycling"];
                    }
                    return tabs;
                  });
                }}
                className=" rounded-sm w-full text-left text-sm  ml-12"
              >
                {"\u2BC8"} &nbsp; Disposal and Recycling
              </button>
            </Accordion>
          </div>
          <div className="bg-[#F0E6E6]  border border-black">
            <Accordion title="Outputs">
              Placeholder content for Outputs.
            </Accordion>
          </div>
        </div>
      </div>

      {/* Right Panel - Selected Form */}
      {SelectedProjectDetailWindow && (
        <div className="w-3/4  overflow-auto" style={{ maxHeight: "80vh" }}>
          {SelectedProjectDetailWindow === "Foundation" && (
            <FoundationForm
              setActiveTabs={setActiveTabs}
              Activetabs={Activetabs}
              currentForm="Foundation"
              onNavigate={handleFormNavigation}
              onClose={handleTabClose}
              onclicktabs={onclicktabs}
            />
          )}
          {SelectedProjectDetailWindow === "Sub-Structure" && (
            <SubStructureForm
              setActiveTabs={setActiveTabs}
              Activetabs={Activetabs}
              currentForm="Sub-Structure"
              onNavigate={handleFormNavigation}
              onClose={handleTabClose}
              onclicktabs={onclicktabs}
            />
          )}
          {SelectedProjectDetailWindow === "Super-Structure" && (
            <SuperStructureForm
              setActiveTabs={setActiveTabs}
              Activetabs={Activetabs}
              currentForm="Super-Structure"
              onNavigate={handleFormNavigation}
              onClose={handleTabClose}
              onclicktabs={onclicktabs}
            />
          )}
          {SelectedProjectDetailWindow === "Miscellaneous" && (
            <MiscellaneousForm
              setActiveTabs={setActiveTabs}
              Activetabs={Activetabs}
              currentForm="Miscellaneous"
              onNavigate={handleFormNavigation}
              onClose={handleTabClose}
              onclicktabs={onclicktabs}
            />
          )}
          {SelectedProjectDetailWindow === "Financial Data" && (
            <FinancialData
              currentForm="Financial Data"
              onNavigate={handleFormNavigation}
              onClose={handleTabClose}
              onclicktabs={onclicktabs}
              setActiveTabs={setActiveTabs}
              Activetabs={Activetabs}
            />
          )}
          {SelectedProjectDetailWindow === "Carbon Emission Data" && (
            <CarbonEmissionData
              currentForm="Carbon Emission Data"
              onNavigate={handleFormNavigation}
              onClose={handleTabClose}
              onclicktabs={onclicktabs}
              setActiveTabs={setActiveTabs}
              Activetabs={Activetabs}
            />
          )}
          {SelectedProjectDetailWindow === "Carbon Emission Cost Data" && (
            <CarbonEmissionCostData
              currentForm="Carbon Emission Cost Data"
              onNavigate={handleFormNavigation}
              onClose={handleTabClose}
              onclicktabs={onclicktabs}
              setActiveTabs={setActiveTabs}
              Activetabs={Activetabs}
            />
          )}
          {SelectedProjectDetailWindow === "Bridge and Traffic" && (
            <BridgeandTraffic
              currentForm="Bridge and Traffic"
              onNavigate={handleFormNavigation}
              onClose={handleTabClose}
              onclicktabs={onclicktabs}
              setActiveTabs={setActiveTabs}
              Activetabs={Activetabs}
            />
          )}
          {SelectedProjectDetailWindow === "Maintenance and Repair Data" && (
            <MaintenanceandRepairData
              currentForm="Maintenance and Repair Data"
              onNavigate={handleFormNavigation}
              onClose={handleTabClose}
              onclicktabs={onclicktabs}
              setActiveTabs={setActiveTabs}
              Activetabs={Activetabs}
            />
          )}
          {SelectedProjectDetailWindow === "Demolition and Recycling" && (
            <DemolitionandRecycling
              currentForm="Demolition and Recycling"
              onNavigate={handleFormNavigation}
              onClose={handleTabClose}
              onclicktabs={onclicktabs}
              setActiveTabs={setActiveTabs}
              Activetabs={Activetabs}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
