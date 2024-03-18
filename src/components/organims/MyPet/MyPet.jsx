import { PageSectionContainer } from "../../containers/PageSectionContainer";
import { useMyPet } from "./hooks/useMyPet";
import { useEffect } from "react";
import { useWeb3Context } from "../../../contexts";
import { PetsData } from "./components/PetsData/PetsData";
import { PetData } from "./components/PetData/PetData";

export const MyPet = () => {
  const { web3 } = useWeb3Context();
  const { records, onePet, changePet, handleRecords } = useMyPet();

  useEffect(() => {
    handleRecords({ token: web3.authToken });
  }, [web3.authToken]);

  return (
    <PageSectionContainer category="opciones" title="ver mascota">
      <>
        {onePet !== null && <PetData onePet={onePet} changePet={changePet} />}
        {records?.pets?.length > 1 && (
          <PetsData records={records} changePet={changePet} />
        )}
      </>
    </PageSectionContainer>
  );
};
