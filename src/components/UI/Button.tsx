import React from "react";

const ButtonCom = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      className="bg-blue-700 hover:bg-transparent hover:border-2 hover:border-blue-700 text-white w-full border-0 my-1 py-2 rounded-md hover:text-blue-600"
    >
      {children}
    </button>
  );
};

export default ButtonCom;
