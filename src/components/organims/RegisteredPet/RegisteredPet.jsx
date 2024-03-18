import { useEffect, useState } from "react";
import { useWeb3Context } from "../../../contexts";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useGetPet } from "../../../hooks/useGetPet";
import { FormModal } from "../../molecules/modals/FormModal";
import { MainTable } from "../../atoms/tables/MainTable";
import { PageSectionContainer } from "../../containers/PageSectionContainer";
import { AdopterRegister } from "../../molecules/Adopter/AdopterRegister";
import { Pet } from "../../templates/PetWizard/Pet";
import { render, renderButtonsAdopter } from "./renderButtons";
import { MaterialTable } from "../../atoms/tables/MaterialTable";
import { CorrelativeProvider } from "../../../contexts/CorrelativeContext";
import { PetTable } from "./PetTable";

export const RegisteredPet = () => {
  const { web3 } = useWeb3Context();
  const { currentColor } = useStateContext();

  const { getRecords, handleGetRecords, setGetRecords } = useGetPet();
  const [openPet, setOpenPet] = useState(false);
  const [openAdopter, setOpenAdopter] = useState(false);

  const [showHistorial, setShowHistorial] = useState(false);
  const [adopter, setAdopter] = useState(false);

  useEffect(() => {
    !!web3.account &&
      !!web3.authToken &&
      handleGetRecords({
        id: sessionStorage.getItem(
          "idsEntity_" + String(web3.account).toUpperCase()
        ),
        token: web3.authToken,
      }).then();
    // console.log("useEffect RegisteredPet")
  }, [web3.account, web3.authToken]);
  console.log(
    sessionStorage.getItem("idsEntity_" + String(web3.account).toUpperCase())
  );
  console.log("web3", web3.authToken);

  return (
    <>
      <PageSectionContainer
        category="opciones"
        title="mascotas registradas"
        render={() =>
          render({
            account: web3.account,
            openAdopter,
            setOpenAdopter,
            openPet,
            setOpenPet,
            currentColor,
          })
        }
      >
        {/* <TableTailwind /> */}
        {/* <section className="mt-20">
          <MainTable data={getRecords} handleGetRecords={handleGetRecords} />
        </section> */}
        <section className="mt-20">
          <PetTable
            data={getRecords}
            getData={handleGetRecords}
            showHistorial={showHistorial}
            setShowHistorial={setShowHistorial}
            setGetRecords={setGetRecords}
          />
          {/* <MaterialTable data={getRecords} handleGetRecords={handleGetRecords} /> */}
        </section>
      </PageSectionContainer>
      {openPet && (
        <FormModal
          handleClose={setOpenPet}
          title="Nueva Mascota"
          isFullScreen={true}
        >
          <Pet handleClose={setOpenPet} handleGetRecords={handleGetRecords} />
        </FormModal>
      )}

      {openAdopter && (
        <FormModal
          handleClose={setOpenAdopter}
          title="Adoptantes"
          render={() =>
            renderButtonsAdopter({
              account: web3.account,
              adopter,
              setAdopter,
              currentColor,
            })
          }
          isFullScreen={true}
        >
          <CorrelativeProvider>
            <>
              {!adopter && <AdopterRegister handleClose={setOpenAdopter} />}
              {adopter && (
                <AdopterRegister
                  handleClose={setOpenAdopter}
                  update={true}
                  showAddress={false}
                />
              )}
            </>
          </CorrelativeProvider>
        </FormModal>
      )}
    </>
  );
};
