import React from "react";
import image from "../../../images/about_logo.jpg";
const About = () => {




  return (
      <>
        {/* Inline Styles */}
        <style>
  {`
    @keyframes slow-bounce {
      0%, 100% {
        transform: translateY(-15%);
        animation-timing-function: ease-in-out; /* Same easing */
      }
      50% {
        transform: translateY(0);
        animation-timing-function: ease-in-out; /* Same easing */
      }
    }
    .animate-slow-bounce {
      animation: slow-bounce 2s infinite ease-in-out;
    }
  `}
</style>

    <div className="w-full flex flex-col items-center justify-center px-10 mt-10  overflow-hidden">
      <h1 className="text-zinc-800 text-center text-4xl font-bold mb-8 uppercase">
        About Us
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-8 ">
        <p className="lg:w-2/3 w-full text-left text-lg leading-relaxed mt-12  ">
          {/* We provide seamless access to legal, medical, and banking services for
          our clients. Whether you need a lawyer for legal consultations, a
          doctor for medical advice, or banking assistance for financial
          planning, our platform connects you with expert professionals quickly
          and efficiently. */}
          At <span className="font-semibold">GTS</span>, we provide seamless
          access to{" "}
          <span className="font-semibold">
            legal, medical, and banking services
          </span>
          to meet your needs. Whether you require expert{" "}
          <span className="font-semibold">legal consultation</span>,
          professional <span className="font-semibold">medical advice</span>, or
          reliable <span className="font-semibold">banking assistance</span>,
          our platform connects you with trusted professionals quickly and
          efficiently. We ensure a hassle-free experience, allowing you to
          access essential services with confidence and ease.
        </p>
        <img
          src={image}
          alt="about image"
          className="w-90 h-80 inline-block object-cover 
          
animate-slow-bounce

"
        />
      </div>
    </div>
    </>
  );
};

export default About;
