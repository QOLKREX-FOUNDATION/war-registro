import { useEffect } from "react";
import { FormPrint } from "./FormsManage/components/Modals/FormPrint";
import { useWeb3Context } from "../../contexts";
import { firuApi } from "../../../api";
import { useState } from "react";
import dayjs from "dayjs";
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export const FormCertificate = ({ formId, petValues, adopter }) => {
  const [form, setForm] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { web3 } = useWeb3Context();

//   console.log(adopter);
//   console.log(petValues);
  const date = dayjs.utc(adopter.date).format("YYYY/MM/DD");
  console.log(date);
  useEffect(() => {
    if (formId === "" || formId === undefined) {
      setLoading(true);
      return;
    }

    setLoading(false);
    firuApi
      .get(`/form/search/id/${formId}`, {
        // firuApi.get(`/form/search/id/6508b89d45958fc68184bd2b`, {
        headers: {
          "x-token": web3.authToken,
        },
      })
      .then((res) => {
        console.log(res);
        setForm(res.data.form);
        // console.log(form);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [formId]);

  // console.log({ formId })
  // console.log({ form })
  // console.log({ petValues })
  // console.log({ adopter })

  return (
    <>
      {!loading ? (
        <div className="text-center dark:text-white text-lg">Cargando...</div>
      ) : (
        <>
          {formId === "" ||
          formId === undefined ||
          form === undefined ||
          form.length === 0 ? (
            <div className="text-center dark:text-white text-lg">
              No hay datos
            </div>
          ) : (
            <FormPrint
              selectedForm={{
                ...form,
                pet: {
                  microchip: petValues.chip,
                  dateMicrochip: petValues.chipDate,
                  firstNamePet: petValues.name,
                  countryPet: petValues.country,
                  birthDatePet: petValues.date,
                  adoptionDate: petValues.dateAdoption,
                  genderPet: petValues.gender === "MALE" ? "M" : "H",
                  specie: petValues.type,
                  race: petValues.race,
                  color: petValues.colour,
                  isSterilized:
                    petValues.sterilized === "NO"
                      ? "isSterilized-no"
                      : "isSterilized-yes",
                  // isSterilized: form?.pet.isSterilized,
                  fatherMicrochip: form?.pet?.fatherMicrochip,
                  motherMicrochip: form?.pet?.motherMicrochip,
                },
                adopter: {
                  country: adopter.country,
                  person: adopter.person,
                  documentType: adopter.document,
                  documentNumber: adopter.documentNumber,
                  adopterType: adopter.type,
                  isAddressPublic: form?.adopter?.isAddressPublic,
                  addressPublic: form?.adopter?.addressPublic,
                  firstName: adopter.name,
                  secondName: adopter.secondName,
                  firstLastName: adopter.lastName,
                  secondLastName: adopter.mLastName,
                  birthDate: date,
                  gender: adopter.gender === "WOMAN" ? "H" : "M",
                  cellphone: adopter.phone,
                  email: adopter.email,
                  department: adopter.department,
                  province: adopter.province,
                  district: adopter.district,
                  address: adopter.direction,
                  registerEntity: form?.adopter?.registerEntity,
                  jurament1: form?.adopter?.jurament1,
                  isMicrochip: form?.adopter?.isMicrochip,
                  jurament3: form?.adopter?.jurament3,
                },
              }}
            />
          )}
        </>
      )}
    </>
  );
};
