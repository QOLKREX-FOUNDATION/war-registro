import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../../../../contexts/Web3/Web3Context";
import { useCountry } from "../../../../hooks/useCountry";
import { regexTextAndNumber, regexNum } from "../../../../utils/validations";
import { Error } from "../../../atoms/Error/Error";
import { Input, ReactSelect, Select } from "../../../atoms/Form";
import { useDocuments } from "./hooks/useDocuments";
import { usePerson } from "./hooks/usePerson";
import { getInfoByIp } from "../../../../utils/getInfoByIp";

export const Search = ({
  adopterValues,
  setAdopter,
  watchAdopter,
  errorsAdopter,
  adopterReset,
  getAdopter,
  banderaAdopter,
  update = false,
  search,
}) => {
  const { web3 } = useContext(Web3Context);
  const { countries } = useCountry();
  const { persons } = usePerson();
  const { documents, handleDocuments } = useDocuments();
  // const [arrayDocuments, setArrayDocuments] = useState([]);

  const onKeyUp = (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      getAdopter({
        web3: web3.wallet,
        watchAdopter,
        adopterReset,
        token: web3.authToken,
      });
    }
  };

  useEffect(() => {
    handleDocuments(
      setAdopter,
      watchAdopter("country") !== "" ? watchAdopter("country") : "PE",
      watchAdopter("person")
    );
  }, [watchAdopter("country")]);

  useEffect(() => {
    if (watchAdopter("country") === "") {
      const countryER = JSON.parse(
        sessionStorage.getItem("entity_" + String(web3.account).toUpperCase())
      )?.country;
      setAdopter("country", countryER);
      localStorage.setItem("countryCode", countryER);
    }
  }, [watchAdopter("country")]);

  // useEffect(() => {
  // 	getAdopter({
  // 		web3: web3.wallet,
  // 		watchAdopter,
  // 		adopterReset,
  // 		token: web3.authToken,
  // 	});
  // }, []);
  // console.log({ country: country });
  console.log({ countryWatch: watchAdopter("country") });

  return (
    <>
      <div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mt-14 mb-10 border-b">
        <h4 className="text-lg text-gray-400 dark:text-gray-400 mt-4 mb-4 uppercase">
          Identificación
        </h4>
      </div>

      <div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mb-4">
        <div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-5">
          <div>
            <ReactSelect
              options={countries}
              value={countries.find(
                (values) => values.value == watchAdopter("country")
              )}
              onChange={(target) => {
                setAdopter("country", target.value);
                getAdopter({
                  web3: web3.wallet,
                  watchAdopter,
                  adopterReset,
                  token: web3.authToken,
                });

                handleDocuments(
                  setAdopter,
                  watchAdopter("country") != ""
                    ? watchAdopter("country")
                    : localStorage.getItem("countryCode") ?? "PE",
                  watchAdopter("person")
                );
              }}
              name="País"
              required
              readOnly={watchAdopter("country") === "" ? false : true}
            />
            <input
              type="hidden"
              required
              {...adopterValues("country", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            />
            {errorsAdopter?.country && (
              <small className="text-red-400">
                {errorsAdopter?.country.message}
              </small>
            )}
          </div>
          <Select
            name="tipo persona"
            required
            formInput={adopterValues("person", {
              required: {
                value: true,
                message: "Campo requerido",
              },
            })}
            options={persons}
            onChange={{
              onChange: ({ target }) => {
                setAdopter("person", target.value);
                handleDocuments(
                  setAdopter,
                  watchAdopter("country"),
                  target.value
                );
              },
            }}
            onBlur={() =>
              getAdopter({
                web3: web3.wallet,
                watchAdopter,
                adopterReset,
                token: web3.authToken,
              })
            }
            error={errorsAdopter?.person}
            readOnly={search ? false : true}
          />

          {/* {arrayDocuments.map((document, index) => (
            <div key={index} className="flex">
              <div className="w-1/2">
                <Select
                  name="documento de Identidad"
                  required
                  formInput={adopterValues("document", {
                    required: {
                      value: true,
                      message: "Campo requerido",
                    },
                  })}
                  defaultValue={documents[0]?.value}
                  value={watchAdopter("document")}
                  onBlur={() =>
                    getAdopter({
                      web3: web3.wallet,
                      watchAdopter,
                      adopterReset,
                      token: web3.authToken,
                    })
                  }
                  options={documents}
                  error={errorsAdopter?.document}
                  readOnly={search ? false : true}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="text-gray-400 dark:text-gray-400 text-xs">
                  Número de documento
                </label>
                <div className="flex justify-between gap-2">
                  <input
                    type="text"
                    className="w-3/4 ml-2 dark:bg-gray-700 dark:text-gray-400 dark:border dark:border-white bg-gray-100 text-gray-500 font-semibold py-1 px-4 rounded-lg mt-2 text-[14px]"
                    name="numero documento"
                  />
                </div>
              </div>
              <button
                className="flex-shrink-0 flex-grow-0 bg-red-500 text-white text-xs font-semibold py-2 px-4 rounded-lg mt-2"
                type="button"
                title="quitar documento"
                onClick={() => {
                  setArrayDocuments((prevArray) =>
                    prevArray.filter((item, i) => i !== index)
                  );
                }}
              >
                x
              </button>
            </div>
          ))}
          <div className="flex">
            <button
              className="flex-shrink-0 flex-grow-0 bg-blue-500 text-white text-xs font-semibold py-2 px-4 rounded-lg mt-2"
              type="button"
              title="Agregar documento"
              onClick={() => {
                setArrayDocuments([
                  ...arrayDocuments,
                  watchAdopter("document"),
                ]);
                console.log(arrayDocuments);
              }}
            >
              Agregar Documento
            </button>
          </div> */}

          <Select
            name="documento de Identidad"
            required
            formInput={adopterValues("document", {
              required: {
                value: true,
                message: "Campo requerido",
              },
            })}
            defaultValue={documents[0]?.value}
            value={watchAdopter("document")}
            onBlur={() =>
              getAdopter({
                web3: web3.wallet,
                watchAdopter,
                adopterReset,
                token: web3.authToken,
              })
            }
            options={documents}
            error={errorsAdopter?.document}
            readOnly={search ? false : true}
          />
          <div>
            <Input
              name="numero documento"
              required
              formInput={adopterValues("documentNumber", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
                minLength: { value: 5, message: "Formato incorrecto" },
                maxLength: { value: 20, message: "Formato incorrecto" },
                pattern: {
                  // value: regexTextAndNumber,
                  value:
                    watchAdopter("document") === "D.N.I."
                      ? regexNum
                      : regexTextAndNumber,
                  message: "Formato incorrecto",
                },
              })}
              type={watchAdopter("document") === "D.N.I." ? "number" : "text"}
              onBlur={() =>
                getAdopter({
                  web3: web3.wallet,
                  watchAdopter,
                  adopterReset,
                  token: web3.authToken,
                })
              }
              onKeyUp={onKeyUp}
              error={errorsAdopter?.documentNumber}
              readOnly={search ? false : true}
            />
            {search && (
              <Error
                bandera={update ? !banderaAdopter : banderaAdopter}
                value={watchAdopter("documentNumber")}
                name="documentNumber"
                setValue={setAdopter}
                text={
                  update
                    ? "Este Documento no esta registrado"
                    : "Este Documento pertenece a otro adoptante ya registrado"
                }
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
