import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import Navbar from "../../components/molecules/Navbar";
import Footer from "../../components/atoms/Footer";
import Sidebar from "../../components/molecules/Sidebar";

export const DashboardView = ({ children }) => {
  const { activeMenu } = useStateContext();

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      {/* {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white z-40">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg z-40">
          <Sidebar />
        </div>
      )} */}
      {
        <div className={`${ activeMenu ? 'translate-x-0 ' : '-translate-x-80' } transition w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white z-40`}>
          <Sidebar />
        </div>
      }
      <div
        className={
          activeMenu
            ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:pl-72 w-full"
            : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
        }
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full z-30">
          <Navbar />
        </div>
        {children}
        <Footer />
      </div>
    </div>
  );
};
