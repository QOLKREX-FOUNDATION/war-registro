import { useContext, useEffect } from "react";
import { Web3Context } from "../../../../contexts/Web3/Web3Context";
import { regexText, regexTextAndNumber } from "../../../../utils/validations";
import { Error } from "../../../atoms/Error/Error";
import { Input, Select } from "../../../atoms/Form";
import { useNewAddress } from "./hooks/useNewAddress";
import { useType } from "./hooks/useTypes";
import { useCodePhone } from "../../../../hooks/useCodePhone";

export const Data = ({
  adopterValues,
  setAdopter,
  watchAdopter,
  errorsAdopter,
  handleAddress,
  banderaAddress,
  update,
  showAddress = true,
  readOnly = false,
}) => {
  const { web3 } = useContext(Web3Context);
  const { types } = useType();
  const {
    addressBoolean,
    isAddress,
    setIsAddress,
    resetAddressBoolean,
    handleNewAddress,
  } = useNewAddress();

  const { codes, getCodes } = useCodePhone();
  useEffect(() => {
    getCodes();
  }, []);

  useEffect(() => {
    if (
      codes &&
      (!watchAdopter("nationality") ||
        watchAdopter("nationality") === undefined)
    ) {
      const selectedCountryId = codes.find(
        ({ countryCode }) => countryCode === watchAdopter("country")
      )?.id;
      selectedCountryId && setAdopter("nationality", selectedCountryId);
    }
  }, [codes, watchAdopter("nationality")]);

  useEffect(() => {
    showAddress && handleNewAddress(web3.wallet);
    handleAddress(watchAdopter("address"), web3.authToken, watchAdopter("_id"));
  }, []);

  useEffect(() => {
    if (watchAdopter("document") !== "PASSPORT" && watchAdopter("country")) {
      if (codes) {
        const selectedCountryId = codes.find(
          (values) => values.countryCode === watchAdopter("country")
        )?.id;
        if (selectedCountryId) {
          setAdopter("nationality", selectedCountryId);
        }
      }
    }
  }, [watchAdopter("document"), watchAdopter("country")]);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mb-4">
        {watchAdopter("document") === "PASSPORT" && (
          <Select
            name={"Nacionalidad"}
            property="nationality"
            options={codes.map((values) => ({
              label: `${values?.name} (${values?.countryCode})`,
              value: values?.id,
            }))}
            value={watchAdopter("nationality")}
            onChange={{
              onChange: ({ target }) => {
                setAdopter("nationality", target.value);
              },
            }}
            required
            id="nationality"
            readOnly={false}
          />
        )}
        <Select
          readOnly={readOnly}
          name="Tipo de Persona"
          required
          formInput={adopterValues("type", {
            required: {
              value: true,
              message: "Campo requerido",
            },
          })}
          options={types}
          error={errorsAdopter?.type}
        />
      </div>

      {showAddress && (
        <div
          className="mt-10 cursor-pointer"
          onClick={() => resetAddressBoolean(!addressBoolean, setAdopter)}
        >
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <input
              type="checkbox"
              checked={addressBoolean}
              {...adopterValues("addressBoolean")}
              className="checked:bg-orange-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer dark:bg-gray-500"></label>
          </div>
          <span className="text-gray-400 font-xs">
            ¿No tienes dirección pública (public address)? Clic para crear una
          </span>
        </div>
      )}
      <Input
        readOnly={readOnly ? readOnly : addressBoolean}
        name="Public Address"
        required
        formInput={adopterValues("address", {
          required: {
            value: true,
            message: "Campo requerido",
          },
          minLength: { value: 42, message: "Formato incorrecto" },
          maxLength: { value: 42, message: "Formato incorrecto" },
          pattern: {
            value: regexTextAndNumber,
            message: "Está address No tiene el formato correcto",
          },
        })}
        id="address"
        onBlur={() => {
          handleAddress(
            watchAdopter("address"),
            web3.authToken,
            watchAdopter("_id")
          );
          setIsAddress(web3?.wallet.utils.isAddress(watchAdopter("address")));
        }}
        onKeyUp={() => setIsAddress(true)}
        placeholder="0x..."
        error={errorsAdopter?.address}
      />
      <div>
        <Error
          bandera={!isAddress}
          value={watchAdopter("address")}
          name="address"
          setValue={setAdopter}
          text={"Está address no es válida"}
        />
      </div>

      <Error
        bandera={banderaAddress}
        value={watchAdopter("address")}
        name="address"
        setValue={setAdopter}
        text={"Está address ya está asignada a otro adoptante"}
      />

      {/* DATOS PERSONALES */}
      <div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mt-14 mb-10 border-b">
        <h4 className="text-lg text-gray-400 dark:text-gray-400 mt-4 mb-4 uppercase">
          Datos del propietario
        </h4>
      </div>

      <div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mb-4">
        <div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-5">
          <Input
            readOnly={readOnly}
            name="primer nombre"
            required
            formInput={adopterValues("name", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              minLength: { value: 2, message: "Nombre muy corto" },
              maxLength: { value: 20, message: "Nombre muy largo" },
              pattern: {
                value: regexText,
                message: "Formato incorrecto",
              },
            })}
            error={errorsAdopter?.name}
          />

          <Input
            readOnly={readOnly}
            name="segundo nombre"
            formInput={adopterValues("secondName", {
              minLength: { value: 2, message: "Nombre muy corto" },
              maxLength: { value: 20, message: "Nombre muy largo" },
              pattern: {
                value: regexText,
                message: "Formato incorrecto",
              },
            })}
            error={errorsAdopter?.secondName}
          />

          <Input
            readOnly={readOnly}
            name="primer apellido"
            required
            formInput={adopterValues("lastName", {
              required: {
                value: true,
                message: "Campo requerido",
              },
              minLength: { value: 2, message: "Apellido muy corto" },
              maxLength: { value: 20, message: "Apellido muy largo" },
              pattern: {
                value: regexText,
                message: "Formato incorrecto",
              },
            })}
            error={errorsAdopter?.lastName}
          />

          <Input
            readOnly={readOnly}
            name="segundo apellido"
            formInput={adopterValues("mLastName", {
              minLength: { value: 2, message: "Apellido muy corto" },
              maxLength: { value: 20, message: "Apellido muy largo" },
              pattern: {
                value: regexText,
                message: "Formato incorrecto",
              },
            })}
            error={errorsAdopter?.mLastName}
          />
        </div>
      </div>
    </>
  );
};
