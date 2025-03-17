import React, { useState } from "react";

const OtherServices = () => {
  const [requirement, setRequirement] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!appointmentDate) {
      alert("Please select a date for your appointment.");
      return;
    }

    const appointmentData = { requirement, appointmentDate };
    localStorage.setItem("appointment", JSON.stringify(appointmentData)); // Store in local storage

    alert(
      `Appointment request received! \nRequirement: ${requirement} \nDate: ${appointmentDate}`
    );

    setRequirement(""); // Clear input
    setAppointmentDate(""); // Clear date
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center mb-4">
        Welcome To Other Services
      </h2>

      {/* Requirement Form */}
      <form onSubmit={handleSubmit} className="mt-6">
        <label className="block font-semibold text-gray-700 mb-2">
          Enter Your Requirements
        </label>
        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe your requirement..."
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
          required
        ></textarea>

        <label className="block font-semibold text-gray-700 mt-3">
          Select Appointment Date
        </label>
        <input
          type="date"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full mt-3 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Request Appointment
        </button>
      </form>

      {/* OR Section */}
      <p className="mt-2 text-center text-gray-700 font-semibold">Or</p>
      <p className="text-center text-blue-500 font-semibold cursor-pointer ">
        Visit Our SMS Center!
      </p>
    </div>
  );
};

export default OtherServices;
