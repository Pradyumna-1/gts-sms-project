// /// Banking services Component

// import React, { useState } from "react";

// const BankingServices = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     date: "",
//     bank: "",
//     accountType: "",
//     address: "",
//   });
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     localStorage.setItem("bankingFormData", JSON.stringify(formData));
//     alert("Form data saved successfully!");
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
//       <div className="w-full max-w-lg bg-white shadow-2xl rounded-lg p-8">
//         <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
//           Banking Services
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Name */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Enter Your Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Enter Your Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter Email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           </div>

//           {/* Phone Number */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Enter Your Phone Number
//             </label>
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Enter Phone Number"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           </div>

//           {/* Date */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Select Date
//             </label>
//             <input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             />
//           </div>

//           {/* Account Type */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Select Account Type
//             </label>
//             <select
//               name="accountType"
//               value={formData.accountType}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             >
//               <option value="">Select</option>
//               <option value="savings">Savings</option>
//               <option value="checking">Current</option>
//             </select>
//           </div>

//           {/* Bank Selection */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Select Bank
//             </label>
//             <select
//               name="bank"
//               value={formData.bank}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             >
//               <option value="">Select Bank</option>
//               <option value="SBI">State Bank Of India</option>
//               <option value="BOI">Bank Of India</option>
//               <option value="UBIN">Union Bank Of India</option>
//             </select>
//           </div>

//           {/* Address */}
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Enter Your Address
//             </label>
//             <textarea
//               name="address"
//               placeholder="Enter Address"
//               value={formData.address}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
//             ></textarea>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition duration-300 shadow-md"
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BankingServices;



/// Banking services Component


import React, { useState } from "react";


/*
Required dependencies are
-> npm i axios
-> npm init -y
-> npm install express cors body-parser
*/


const BankingServices = () => {
    const [formData, setFormData] = useState({
        serviceType:"BankingService",
        name: "",
        email: "",
        phone: "",
        date: "",
        bank: "",
        accountType: "",
        address: "",
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.bank) {
            alert("Please select a bank.");
            return;
        }
   
        // Generate Unique ID for the bank
        const bankPrefix = formData.bank.substring(0, 3).toLowerCase();
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const bankID = `#${bankPrefix}${randomNum}`;
   
        const finalData = { ...formData, uniqueID: bankID };
   
        // create a new post
        try {
            const response = await fetch("http://localhost:5000/services/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalData),
            });
   
            if (response.ok) {
                alert(`Form submitted successfully!\nYour Bank ID: ${bankID}`);
                setFormData({
                    serviceType: "BankingService",
                    name: "",
                    email: "",
                    phone: "",
                    date: "",
                    bank: "",
                    accountType: "",
                    address: "",
                });
            } else {
                alert("Error submitting form.");
            }
        } catch (error) {
            alert("Error connecting to server.");
        }
    };
   


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-lg bg-white shadow-2xl rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Welcome To Our Banking Services
                </h1>


                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Enter Your Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>


                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Enter Your Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>


                    {/* Phone Number */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Enter Your Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>


                    {/* Date */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Select Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>




                    {/* Account Type */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Select Account Type</label>
                        <select
                            name="accountType"
                            value={formData.accountType}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        >
                            <option value="">Select</option>
                            <option value="savings">Savings</option>
                            <option value="current">Current</option>
                        </select>
                    </div>




                    {/* Bank Selection */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Select Bank</label>
                        <select
                            name="bank"
                            value={formData.bank}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        >
                            <option value="">Select Bank</option>
                            <option value="SBI">State Bank Of India</option>
                            <option value="BOI">Bank Of India</option>
                            <option value="UBIN">Union Bank Of India</option>
                        </select>
                    </div>


                    {/* Address */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Enter Your Address</label>
                        <textarea
                            name="address"
                            placeholder="Enter Address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        ></textarea>
                    </div>


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition duration-300 shadow-md"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};


export default BankingServices;


