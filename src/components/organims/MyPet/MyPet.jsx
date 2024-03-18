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
        <div className="relative w-full">
          <button
            onClick={() => changePet(null)}
            className="absolute -top-24 right-0 z-50 mt-4 ml-4 flex bg-blue-800 text-white font-bold py-2 px-4 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            atrás
          </button>
        </div>
        {onePet !== null && <PetData onePet={onePet} changePet={changePet} />}
        {records?.pets?.length > 1 && (
          <>
            <PetsData records={records} changePet={changePet} />
          </>
        )}
      </>
    </PageSectionContainer>
  );
};
