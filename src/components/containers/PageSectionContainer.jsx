import React from "react";
import HeaderDefault from "../atoms/HeaderDefault";

export const PageSectionContainer = ({
  children,
  category = "Undefined",
  title = "Undefined",
  render = () => false,
}) => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-800 rounded-3xl min-h-screen">
      <HeaderDefault category={category} title={title} render={render} />
      {children}
    </div>
  );
};
