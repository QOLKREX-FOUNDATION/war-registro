import { useCallback, useContext, useEffect, useState } from "react";
import { WarContext } from "../../../../../../contexts/War/WarContext";
const lang = { locale: "es-Es" };

export const useSpecie = (type) => {
  const { speciesData, racesData } = useContext(WarContext);
  console.log("speciesData", speciesData);
  console.log("racesData", racesData);

  const [species, setSpecies] = useState([]);
  const [races, setRaces] = useState([]);

  const handleSpecies = useCallback(() => {
    console.log("speciesData", speciesData);
    const animals = [];
    for (let i = 0; i < speciesData?.length; i++) {
      animals.push({
        label:
          lang.locale === "es-Es"
            ? speciesData[i]["nameSpanish"]
            : speciesData[i]["nameEnglish"],
        value: speciesData[i]["name"],
      });
    }
    return animals;
  }, [speciesData]);

  const handleRaces = useCallback(
    (type) => {
      const races = [];
      console.log("type", type);
      console.log("racesData", racesData);
      const racesFilter = racesData.filter((race) => race.animal === type);
      console.log("racesFilter", racesFilter);
      try {
        for (let i = 0; i < racesFilter?.length; i++) {
          races.push({
            label:
              lang.locale === "es-Es"
                ? racesFilter[i]["nameSpanish"]
                : racesFilter[i]["nameEnglish"],
            value: racesFilter[i]["nameEnglish"],
          });
        }
        return races;
      } catch (error) {
        console.log(error);
        return races;
      }
    },
    [racesData]
  );

  useEffect(() => {
    setSpecies(handleSpecies());
  }, [type, handleSpecies]);

  useEffect(() => {
    setRaces(handleRaces(type));
  }, [type, handleRaces]);

  return {
    species,
    races,
  };
};
