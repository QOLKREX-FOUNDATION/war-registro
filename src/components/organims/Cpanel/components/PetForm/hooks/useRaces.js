import { useEffect, useState } from "react";
import { firuApi } from "../../../../../../../api";

export const useRaces = () => {
  const [race, setRace] = useState({
    animal: "",
    name: "",
    nameEnglish: "",
    nameSpanish: "",
  });

  const getRace = (pet) => {
    console.log(pet);
    try {
      firuApi
        .get(`races/type-search?type=${pet.type}&search=${pet.race}`)
        .then((res) => {
          console.log(res);
          setRace(res.data.race);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //     getRace();
  // }, [])

  return {
    getRace,
    race,
  };
};
