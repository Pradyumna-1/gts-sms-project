import React from 'react'

const ContactUs = () => {
  return (
    <div className="w-full py-10 flex flex-col text-center items-center  w-full">
      <h1 className="text-4xl font-bold capitalize mb-8">
        Get In Touch with Us
      </h1>
      <div className="w-full max-w-md  flex flex-col gap-4  rounded-md p-6 w-96 rounded-lg shadow-lg ">
        <input
          name="name"
          type="text"
          placeholder="Enter your name"
          className="w-full p-2 border border-zinc-400 rounded-sm  outline-none "
        />
        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border border-zinc-400 rounded-sm  outline-none "
        />
        <input
          name="number"
          type="tel"
          placeholder="Enter your Mobile"
          className="w-full p-2 border border-zinc-400 rounded-sm  outline-none "
        />
        <textarea
          name="message"
          placeholder="Write your message.... "
          id=""
          className="resize-none w-full p-4 border border-zinc-400 rounded-sm  outline-none "
        ></textarea>
        <button
          className="px-3 py-2 border rounded-md bg-blue-500 text-white font-semibold"
          type="submit"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}

export default ContactUs
