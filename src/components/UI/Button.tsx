import React from "react";

type ButtonProps = {
  children:  React.ReactNode,
  onclick?: any
}

const ButtonCom = ({ children, onclick }: ButtonProps) => {
  return (
    <button
      onClick={onclick}
      className="bg-blue-700 hover:bg-transparent hover:border-blue-700 text-white w-full border-2 my-1 py-1 px-3 rounded-md hover:text-blue-600"
    >
      {children}
    </button>
  );
};

export default ButtonCom;
