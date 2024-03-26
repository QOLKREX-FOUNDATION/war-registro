import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../../../../contexts/Web3/Web3Context";
import { useUbigeo } from "../../../../hooks/useUbigeo";
import { dateStringYear } from "../../../../utils/date";
import { regexEmail, regexNum, regexText } from "../../../../utils/validations";
import { Error } from "../../../atoms/Error/Error";
import { Input, ReactSelect, Select } from "../../../atoms/Form";
import { countryLabel } from "../../../../config";
import { useCodePhone } from "../../../../hooks/useCodePhone";

export const DataSensitive = ({
  readOnly = false,
  adopterValues,
  setAdopter,
  watchAdopter,
  errorsAdopter,
  banderaEmail,
  handleEmail,
  update,
}) => {
  const { web3 } = useContext(Web3Context);
  const {
    departments,
    provinces,
    districts,
    handleDepartaments,
    handleProvinces,
    handleDistricts,
  } = useUbigeo(
    watchAdopter("country") || "PE"
  );

  const { codes, getCodes } = useCodePhone();
  useEffect(() => {
    getCodes();
  }, []);

  useEffect(() => {
    if (codes && !watchAdopter("phoneCode")) {
      setAdopter(
        "phoneCode",
        codes?.find(
          ({ countryCode }) => countryCode === watchAdopter("country")
        )?.id
      );
    }
  }, [codes]);

  useEffect(() => {
    handleEmail(watchAdopter("email"), web3.authToken, watchAdopter("_id"));
    // setAdopter("country", countryUbigeo?.value || 'PE')
  }, []);

  useEffect(() => {
    // !update && handleDepartaments();
    handleDepartaments();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mb-4">
        <div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-5">
          <Input
            readOnly={readOnly}
            type="date"
            name="fecha de nacimiento"
            required
            formInput={adopterValues("date", {
              required: {
                value: true,
                message: "Campo requerido",
              },
            })}
            error={errorsAdopter?.date}
          />
          <Select
            readOnly={readOnly}
            name="sexo"
            required
            value={watchAdopter("gender") || ""}
            formInput={adopterValues("gender", {
              required: {
                value: true,
                message: "Campo requerido",
              },
            })}
            options={[
              { label: "HOMBRE", value: "MAN" },
              { label: "MUJER", value: "WOMAN" },
            ]}
            error={errorsAdopter?.gender}
          />
          <ReactSelect
            name={"Código de País"}
            property="phoneCode"
            options={codes.map((values) => ({
              label: `${values?.name} (${values?.phoneCode})`,
              value: values?.id,
            }))}
            value={{
              label: `${
                codes.find(
                  ({ countryCode }) => countryCode === watchAdopter("country")
                )?.name
              } (${
                codes.find(
                  ({ countryCode }) => countryCode === watchAdopter("country")
                )?.phoneCode
              })`,
              value: watchAdopter("phoneCode"),
            }}
            onChange={(target) => {
              setAdopter("phoneCode", target.value);
            }}
            required
            id="phoneCode"
            readOnly={false}
          />
          <Input
            readOnly={readOnly}
            name="celular"
            required
            formInput={adopterValues("phone", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              minLength: { value: 6, message: "Formato incorrecto" },
              maxLength: { value: 15, message: "Formato incorrecto" },
              pattern: {
                value: regexNum,
                message: "Formato incorrecto",
              },
            })}
            error={errorsAdopter?.phone}
          />
          <div>
            <Input
              readOnly={readOnly}
              type="email"
              name="correo electronico"
              required
              formInput={adopterValues("email", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
                pattern: {
                  value: regexEmail,
                  message: "Formato incorrecto",
                },
              })}
              error={errorsAdopter?.email}
              onBlur={() =>
                handleEmail(
                  watchAdopter("email"),
                  web3.authToken,
                  watchAdopter("_id")
                )
              }
              id="email"
            />

            <Error
              bandera={banderaEmail}
              value={watchAdopter("email")}
              name="email"
              setValue={setAdopter}
              text={"Este E-mail ya está asignada a otro adoptante"}
            />
          </div>
        </div>
      </div>

      {/* LOCALIDAD */}
      <div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mt-14 mb-10 border-b">
        <h4 className="text-lg text-gray-400 dark:text-gray-400 mt-4 mb-4 uppercase">
          Localidad
        </h4>
      </div>

      <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
        <div className="col-span-3 grid grid-cols-3 gap-x-4 gap-y-5">
          {watchAdopter("country") === "PE" ||
          watchAdopter("country") === "EC" ||
          watchAdopter("country") === "CO" ||
          watchAdopter("country") === "CL" ||
          watchAdopter("country") === "ES" ||
          watchAdopter("country") === "HN" ? (
            <>
              <div>
                <ReactSelect
                  readOnly={readOnly}
                  options={departments}
                  value={{
                    label: watchAdopter("department"),
                    value: watchAdopter("department"),
                  }}
                  onChange={(target) => {
                    console.log(target);
                    setAdopter("department", target.value);
                    setAdopter("province", "");
                    setAdopter("district", "");
                    handleProvinces(target.value);
                  }}
                  name={
                    countryLabel[watchAdopter("country")].departmentsLabel ||
                    "departamento"
                  }
                  required
                />

                <input
                  type="hidden"
                  required
                  {...adopterValues("department", {
                    required: {
                      value: true,
                      message: "Campo requerido",
                    },
                  })}
                />
                {errorsAdopter?.department && (
                  <small className="text-red-400">
                    {errorsAdopter?.department.message}
                  </small>
                )}
              </div>
              <div>
                <ReactSelect
                  readOnly={readOnly}
                  options={provinces}
                  value={{
                    label: watchAdopter("province"),
                    value: watchAdopter("province"),
                  }}
                  onChange={(target) => {
                    setAdopter("province", target.value);
                    setAdopter("district", "");
                    handleDistricts(target.value);
                  }}
                  name={
                    countryLabel[watchAdopter("country")].provincesLabel ||
                    "provincia"
                  }
                  required
                />

                <input
                  type="hidden"
                  required
                  {...adopterValues("province", {
                    required: {
                      value: true,
                      message: "Campo requerido",
                    },
                  })}
                />
                {errorsAdopter?.province && (
                  <small className="text-red-400">
                    {errorsAdopter?.province.message}
                  </small>
                )}
              </div>
              <div>
                <ReactSelect
                  readOnly={watchAdopter("province") ? readOnly : true}
                  options={districts}
                  value={{
                    label: watchAdopter("district"),
                    value: watchAdopter("district"),
                  }}
                  onChange={(target) => {
                    setAdopter("district", target.value);
                  }}
                  name={
                    countryLabel[watchAdopter("country")].districtsLabel ||
                    "distrito"
                  }
                  required
                />

                <input
                  type="hidden"
                  required
                  {...adopterValues("district", {
                    required: {
                      value: true,
                      message: "Campo requerido",
                    },
                  })}
                />
                {errorsAdopter?.district && (
                  <small className="text-red-400">
                    {errorsAdopter?.district.message}
                  </small>
                )}
              </div>
            </>
          ) : null}
        </div>

        <div className="col-span-3 gap-y-5 mt-4">
          <Input
            readOnly={readOnly}
            name="direccion"
            required
            formInput={adopterValues("direction", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              minLength: { value: 5, message: "Direccion muy corta" },
              maxLength: { value: 100, message: "Direccion muy larga" },
              pattern: {
                value: regexText,
                message: "Formato incorrecto",
              },
            })}
            error={errorsAdopter?.direction}
          />
        </div>
      </div>

      {!readOnly && (
        <div
          className="mt-10"
          onClick={() => setAdopter("status", !watchAdopter("status"))}
        >
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <input
              checked={watchAdopter("status")}
              type="checkbox"
              className="checked:bg-orange-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              {...adopterValues("status")}
            />
            <label className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer dark:bg-gray-500"></label>
          </div>
          <span className="text-gray-400 font-xs">
            Acepto compartir mi informacion personal en las busquedas en la
            plataforma
          </span>
        </div>
      )}
    </>
  );
};
