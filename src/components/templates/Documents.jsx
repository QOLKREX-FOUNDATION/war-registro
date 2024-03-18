import { useEffect, useState } from "react";
import { usePreloaderContext, useWeb3Context } from "../../contexts";
import { useStateContext } from "../../contexts/ContextProvider";
import { Carnet } from "../organims/Carnet";
import { Certificate } from "../organims/Certificate";
import { registeringEntity } from "../../utils/war/RegisteringEntities";
import { getRecordPet } from "../../utils/war/pets";
import { formatDataPet } from "../organims/Cpanel/components/PetForm/utils/formatDataPet";
import { FormPrint } from "../organims/FormsManage/components/Modals/FormPrint";
import { FormCertificate } from "../organims/FormCertificate";
import { GenealogyCertification } from "../organims/GenealogyCertification";

export const Documents = ({ chip = "" }) => {
  const { web3 } = useWeb3Context();
  const { currentColor } = useStateContext();

  const { handlePreloader } = usePreloaderContext();
  const [petValues, setPetValues] = useState({});
  const [adopter, setAdopter] = useState({});

  const [carnet, setCarnet] = useState(true);
  const [certificate, setCertificate] = useState(false);
  const [certificateImplant, setCertificateImplant] = useState(false);
  const [certificateGenealogy, setCertificateGenealogy] = useState(false);
  const [entityRegister, setEntityRegister] = useState(false);

  const view = (value) => {
    if (value === "carnet") {
      setCarnet(true);
      setCertificate(false);
      setCertificateImplant(false);
      setCertificateGenealogy(false);
      return;
    }
    if (value === "certificate") {
      setCarnet(false);
      setCertificate(true);
      setCertificateImplant(false);
      setCertificateGenealogy(false);
      return;
    }
    if (value === "certificateImplant") {
      setCarnet(false);
      setCertificate(false);
      setCertificateImplant(true);
      setCertificateGenealogy(false);
      return;
    }
    if (value === "certificateGenealogy") {
      setCarnet(false);
      setCertificate(false);
      setCertificateImplant(false);
      setCertificateGenealogy(true);
      return;
    }
  };

  useEffect(() => {
    handlePreloader(true);
    getRecordPet(`chip=${chip}`, web3.authToken)
      .then((response) => {
        response.pet = formatDataPet(response.pet);
        setPetValues(response.pet);
        console.log(response.adopter);
        setAdopter(response.adopter);
        handlePreloader(false);
      })
      .catch((e) => {
        console.log(e);
        handlePreloader(false);
      });
  }, []);

  useEffect(() => {
    petValues?.addressEr &&
      registeringEntity(web3.wallet, petValues?.addressEr)
        .then((response) => {
          response.data =
            JSON.parse(Buffer.from(response?.data, "base64").toString()) ?? "";
          setEntityRegister(response.data);
        })
        .catch((e) => console.log(e));
  }, [petValues?.addressEr]);

  return (
    <>
      {petValues.chip && petValues.chip != "" && (
        <div className="flex justify-center mb-4 gap-4">
          <div className="w-2/6">
            <button
              onClick={() => view("carnet")}
              type="submit"
              className={`${
                !carnet && "opacity-50"
              } py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md rounded-lg`}
              style={{ backgroundColor: currentColor }}
            >
              Carnet
            </button>
          </div>
          <div className="w-2/6">
            <button
              onClick={() => view("certificate")}
              type="submit"
              className={`${
                !certificate && "opacity-50"
              } py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md rounded-lg `}
              style={{ backgroundColor: currentColor }}
            >
              Certificado
            </button>
          </div>
          <div className="w-2/6">
            <button
              onClick={() => view("certificateImplant")}
              type="submit"
              className={`${
                !certificateImplant && "opacity-50"
              } py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md rounded-lg `}
              style={{ backgroundColor: currentColor }}
            >
              Certificado de Implantación
            </button>
          </div>
          <div className="w-2/6">
            <button
              onClick={() => view("certificateGenealogy")}
              type="submit"
              className={`${
                !certificateImplant && "opacity-50"
              } py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md rounded-lg `}
              style={{ backgroundColor: currentColor }}
            >
              Certificado de Genealogía
            </button>
          </div>
        </div>
      )}

      {carnet && (
        <Carnet
          petValues={petValues}
          adopter={adopter}
          entityRegister={entityRegister}
        />
      )}

      {certificate && (
        <Certificate
          petValues={petValues}
          adopter={adopter}
          entityRegister={entityRegister}
        />
      )}

      {certificateImplant && (
        <FormCertificate
          // formId={"6514887403b8e60823554e75"}
          formId={petValues?.formId}
          petValues={petValues}
          adopter={adopter}
        />
      )}
      {certificateGenealogy && (
        <GenealogyCertification
          // formId={"6514887403b8e60823554e75"}
          // formId={petValues?.formId}
          petValues={petValues}
          adopter={adopter}
        />
      )}
    </>
  );
};
