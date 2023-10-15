import React from "react";

type DetailsTabProps = {
  title?: string;
  children?: React.ReactElement | React.ReactNode;
};

const DetailsTab = ({ title, children }: DetailsTabProps) => {
  return (
    <div>
      <h1
        style={{
          fontFamily: "cursive",
        }}
        className="text-xl md:text-3xl font-bold my-5"
      >
        {title}
      </h1>
      <div>{children}</div>
    </div>
  );
};

export default DetailsTab;
