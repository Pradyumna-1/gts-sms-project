import React, { useState } from "react";
import axios from "axios";

const DoctorAppointment = () => {
  const [formData, setFormData] = useState({
    serviceType: "DoctorServices",
    name: "",
    age: "",
    contact: "",
    date: "",
    doctor: "",
    problem: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/services/submit",
        formData
      );
      alert(response.data.message);

      // Reset form fields after submission
      setFormData({
        serviceType: "DoctorServices",
        name: "",
        age: "",
        contact: "",
        date: "",
        doctor: "",
        problem: "",
      });
    } catch (error) {
      alert("Error submitting appointment.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
      <fieldset className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-lg border-2 border-gray-300">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-semibold mb-6">Doctor Appointment</h1>

          <label className="block text-left mb-2">Applicant Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            required
          />

          <label className="block text-left mb-2">Age:</label>
          <input
            type="number"
            name="age"
            placeholder="Enter your age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            required
          />

          <label className="block text-left mb-2">Contact:</label>
          <input
            type="tel"
            name="contact"
            placeholder="Enter contact number"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            required
          />

          <label className="block text-left mb-2">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            required
          />

          <label className="block text-left mb-2">Doctor Name:</label>
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            required
          >
            {" "}
            <option value="">Select</option>
            <option value="Dr Rahul">Dr Rahul</option>
            <option value="Dr Prithvi">Dr Prithvi</option>
            <option value="Dr Ramakrishna">Dr Ramakrishna</option>
          </select>

          <label className="block text-left mb-2">Problem:</label>
          <textarea
            name="problem"
            placeholder="Describe your problem"
            value={formData.problem}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            style={{ minHeight: "80px" }}
            required
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </fieldset>
    </div>
  );
};

export default DoctorAppointment;
