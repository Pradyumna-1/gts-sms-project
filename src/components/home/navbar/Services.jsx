import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [selectedService, setSelectedService] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-300 p-6">
      <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">
        Select a Service
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-2xl w-96">
        <div className="space-y-5">
          {/* Banking Services */}
          <div
            className={`p-4 rounded-lg text-center text-lg font-semibold text-white cursor-pointer transition-all duration-300 bg-blue-500 hover:scale-105 hover:shadow-xl
            ${
              selectedService === "Banking Services"
                ? "border-4 border-yellow-300 shadow-lg scale-110"
                : ""
            }`}
            onClick={() => {
              setSelectedService("Banking Services");
              navigate("/bankingservices");
            }}
          >
            Banking Services
          </div>

          {
            /* Doctor Appointment */
          }
          <div
            className={`p-4 rounded-lg text-center text-lg font-semibold text-white cursor-pointer transition-all duration-300 bg-green-500 hover:scale-105 hover:shadow-xl
            ${
              selectedService === "Doctor Appointment"
                ? "border-4 border-yellow-300 shadow-lg scale-110"
                : ""
            }`}
            onClick={() => {
              setSelectedService("Doctor Appointment");
              navigate("/doctorappointment");
            }}
          >
            Doctor Appointment
          </div>

          {
            /* Lawyer Services */
          }
          <div
            className={`p-4 rounded-lg text-center text-lg font-semibold text-white cursor-pointer transition-all duration-300 bg-purple-500 hover:scale-105 hover:shadow-xl
            ${
              selectedService === "Lawyer Services"
                ? "border-4 border-yellow-300 shadow-lg scale-110"
                : ""
            }`}
            onClick={() => {
              setSelectedService("Lawyer Services");
              navigate("/lawyerservice");
            }}
          >
            Lawyer Services
          </div>

          {
            /* Other Services */
          }
          <div
            className={`p-4 rounded-lg text-center text-lg font-semibold text-white cursor-pointer transition-all duration-300 bg-red-500 hover:scale-105 hover:shadow-xl
            ${
              selectedService === "Other Services"
                ? "border-4 border-yellow-300 shadow-lg scale-110"
                : ""
            }`}
            onClick={() => {
              setSelectedService("Other Services");
              navigate("/otherservices");
            }}
          >
            Other Services
          </div>
        </div>

        {selectedService && (
          <p className="mt-6 text-xl font-medium text-gray-800 text-center">
            ✅ You selected:{" "}
            <strong className="text-blue-700">{selectedService}</strong>
          </p>
        )}
      </div>
    </div>
  );
};

export default Services;
