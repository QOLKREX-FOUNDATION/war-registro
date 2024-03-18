import React from "react";

export const HomeSectionContainer = ({ children }) => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-gray-800 rounded-3xl min-h-screen">
      {children}
    </div>
  );
};
