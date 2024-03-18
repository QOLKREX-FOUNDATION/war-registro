import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useEffect } from "react";
import { FiSettings } from "react-icons/fi";
import { useStateContext } from "../../contexts/ContextProvider";
import ThemeSettings from "../molecules/ThemeSettings";

export const ThemeSettingsContainer = ({ children }) => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      {children}
      <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
        {/* <TooltipComponent position="Top"> */}
        <button
          type="button"
          onClick={() => setThemeSettings(true)}
          style={{ background: currentColor, borderRadius: "50%" }}
          className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
        >
          <FiSettings />
        </button>
        {/* </TooltipComponent> */}
      </div>

      {themeSettings && <ThemeSettings />}
    </div>
  );
};
