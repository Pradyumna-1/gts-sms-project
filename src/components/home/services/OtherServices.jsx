// // Other Services

// import React, { useState } from "react";
// import axios from "axios";

// const OtherServices = () => {
//   const [requirement, setRequirement] = useState("");
//   const [appointmentDate, setAppointmentDate] = useState("");
//   const [appointmentAddress, setAppointmentAddress] = useState("");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!appointmentDate) {
//       alert("Please select a date for your appointment.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/services/submit",
//         {
//           serviceType: "OtherServices",
//           requirement,
//           appointmentAddress,
//           appointmentDate,
//         }
//       );

//       alert(response.data.message);
//       setRequirement("");
//       setAppointmentAddress("");
//       setAppointmentDate("");
//     } catch (error) {
//       alert("Error submitting data.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-bold text-center mb-4">
//         Welcome To Other Services
//       </h2>

//       <form onSubmit={handleSubmit} className="mt-6">
//         <label className="block font-semibold text-gray-700 mb-2">
//           Enter Your Requirements
//         </label>
//         <textarea
//           className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Describe your requirement..."
//           value={requirement}
//           onChange={(e) => setRequirement(e.target.value)}
//           required
//         ></textarea>

//         <label className="block font-semibold text-gray-700 mb-2">
//           Enter Your Address
//         </label>
//         <textarea
//           className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           placeholder="Enter Your Address..."
//           value={appointmentAddress}
//           onChange={(e) => setAppointmentAddress(e.target.value)}
//           required
//         ></textarea>

//         <label className="block font-semibold text-gray-700 mt-3">
//           Select Appointment Date
//         </label>
//         <input
//           type="date"
//           className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={appointmentDate}
//           onChange={(e) => setAppointmentDate(e.target.value)}
//           required
//         />

//         <button
//           type="submit"
//           className="w-full mt-3 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all"
//         >
//           Request Appointment
//         </button>
//       </form>
//     </div>
//   );
// };

// export default OtherServices;

import React, { useState } from "react";
import { db } from "../../../firebase/firebaseConfig"; // Adjusted import path
import { collection, addDoc } from "firebase/firestore";

const OtherServices = () => {
  const [formData, setFormData] = useState({
    requirement: "",
    appointmentAddress: "",
    appointmentDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.appointmentDate) {
      alert("Please select a date for your appointment.");
      return;
    }

    try {
      await addDoc(collection(db, "other_services"), formData);
      alert("Service request submitted!");
      setFormData({
        requirement: "",
        appointmentAddress: "",
        appointmentDate: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting data.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
        Welcome To Other Services
      </h2>

      <form onSubmit={handleSubmit} className="mt-6">
        {/* Requirement Input */}
        <label className="block font-semibold text-gray-700 mb-2">
          Enter Your Requirements
        </label>
        <textarea
          name="requirement"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe your requirement..."
          value={formData.requirement}
          onChange={handleChange}
          required
        ></textarea>

        {/* Appointment Address Input */}
        <label className="block font-semibold text-gray-700 mt-3">
          Enter Your Address
        </label>
        <textarea
          name="appointmentAddress"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Your Address..."
          value={formData.appointmentAddress}
          onChange={handleChange}
          required
        ></textarea>

        {/* Appointment Date Input */}
        <label className="block font-semibold text-gray-700 mt-3">
          Select Appointment Date
        </label>
        <input
          type="date"
          name="appointmentDate"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.appointmentDate}
          onChange={handleChange}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-3 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Request Appointment
        </button>
      </form>
    </div>
  );
};

export default OtherServices;
