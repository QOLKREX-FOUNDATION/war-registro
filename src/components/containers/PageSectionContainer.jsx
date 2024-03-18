import React from "react";
import HeaderDefault from "../atoms/HeaderDefault";

export const PageSectionContainer = ({
  children,
  category = "Undefined",
  title = "Undefined",
  render = () => false,
}) => {
  return (
    <div className="m-2 md:m-10 mt-14 p-2  bg-white dark:bg-gray-800 rounded-3xl min-h-screen">
      {
        title !== "" && category !== "" ? <HeaderDefault category={category} title={title} render={render} /> : null
      }
      {/* <HeaderDefault category={category} title={title} render={render} /> */}
      {children}
    </div>
  );
};
