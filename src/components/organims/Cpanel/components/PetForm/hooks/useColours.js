import { useCallback, useContext, useEffect, useState } from "react";
import { WarContext } from "../../../../../../contexts/War/WarContext";

const lang = { locale: "es-Es" };

export const useColours = () => {
  const [colours, setColours] = useState([]);
  const { colorsData } = useContext(WarContext);

  const handleColours = useCallback(() => {
    const colours = [];
    for (let i = 0; i < colorsData?.length; i++) {
      colours.push({
        label:
          lang.locale === "es-Es"
            ? colorsData[i]["nameSpanish"]
            : colorsData[i]["nameEnglish"],
        value: colorsData[i]["name"],
      });
    }
    return colours;
  }, [colorsData]);

  useEffect(() => {
    setColours(handleColours());
  }, [handleColours]);

  return {
    colours,
  };
};
