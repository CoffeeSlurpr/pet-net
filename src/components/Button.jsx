import React from "react";

const Button = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border border-transparent bg-white px-4 py-2 text-center text-base font-semibold uppercase tracking-wider text-slate-700 shadow-lg drop-shadow-lg transition duration-150 ease-in-out hover:bg-slate-600 hover:text-white hover:shadow-slate-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
