import { useState } from "react";

export default function GeneralInfoForm({ formData, setFormData }) {
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  return (
    <div className="p-6 rounded-md flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <label className="w-1/5 text-sm">Company Name</label>
          <input
            type="text"
            name="companyName"
            // value={formData.companyName}
            // onChange={handleChange}
            className="w-4/5 border rounded px-3 py-1"
          />
        </div>

        <div className="flex flex-row  justify-between items-center">
          <label className="w-1/5 text-sm">Project Title</label>
          <input
            type="text"
            name="projectTitle"
            // value={formData.projectTitle}
            // onChange={handleChange}
            className="w-4/5 border rounded px-3 py-1"
          />
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <label className="w-1/5 text-sm">Project Description</label>
        <textarea
          name="projectDescription"
          // value={formData.projectDescription}
          // onChange={handleChange}
          className="w-4/5 border rounded px-3 py-1 h-24"
        />
      </div>

      <div className="flex flex-col gap-6">
    
        <div className="flex flex-row justify-between items-center">
          <label className=" mb-1 text-sm">Name of Valuer</label>
          <select
            name="valuerName"
            // value={formData.valuerName}
            // onChange={handleChange}
            className=" border rounded px-3 py-1"
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
        </div>

        <div className="flex flex-row justify-between items-center">
          <label className=" mb-1 text-sm">Country</label>
          <input
            name="country"
            // value={formData.country}
            // onChange={handleChange}
            className=" border rounded px-3 py-1"
          >
          </input>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-row justify-between  items-center">
          <label className="block mb-1 text-sm">Job Number</label>
          <input
            type="text"
            name="jobNumber"
            // value={formData.jobNumber}
            // onChange={handleChange}
            className=" border rounded px-3 py-1"
          />
        </div>

        <div className="flex flex-row justify-between items-center">
          <label className="block mb-1 text-sm">Client</label>
          <input
            type="text"
            name="client"
            // value={formData.client}
            // onChange={handleChange}
            className=" border rounded px-3 py-1"
          />
        </div>

        <div className="flex flex-row justify-between items-center">
          <label className="block mb-1 text-sm">Base Year</label>
          <input
            type="number"
            name="baseYear"
            // value={formData.baseYear}
            // onChange={handleChange}
            className="border rounded px-3 py-1"
          />
        </div>
      </div>
    </div>
  );
}
