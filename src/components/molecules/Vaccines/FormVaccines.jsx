import { useEffect } from "react";
import { API, IPFS } from "../../../config";
import { usePreloaderContext, useWeb3Context } from "../../../contexts";
import { regexText } from "../../../utils/validations";
import { toFileWeb3Storage } from "../../../utils/war/toFileWe3Storage";
import { Checkbox, FileInput, Input, Select } from "../../atoms/Form";
import { Option } from "../../atoms/Form/Option";
import { useRaceVaccines } from "./hooks/useRaceVacines";
import { initValuesVaccines } from "./initValuesVaccines";

export const FormVaccines = ({
  petValues,
  update,
  handleFinish,
  image,
  setImage,
  reset,
  register,
  handleSubmit,
  watch,
  setValue,
  errors,
  resetVaccine,
}) => {
  const { web3 } = useWeb3Context();
  const { handlePreloader } = usePreloaderContext();
  const { listVaccines, handleListVaccines } = useRaceVaccines();

  const onClick = (vaccine) => {
    vaccine.image = image;
    handleFinish({
      web3: web3.wallet,
      account: web3.account,
      token: web3.authToken,
      petValues,
      vaccine,
      resetVaccine,
      index: update.index,
      method: update.index === -1 ? "save" : "update",
    });
  };

  useEffect(() => {
    handleListVaccines(petValues.type);
  }, [petValues.type]);

  useEffect(() => {
    if (watch("image").length > 0) {
      handlePreloader(true);
      toFileWeb3Storage(watch("image")[0], `vaccines.jpg`)
        .then((cid) => {
          setImage(cid);
          handlePreloader(false);
        })
        .catch((e) => {
          console.log(e);
          handlePreloader(false);
        });
    } else {
      update.index === -1 && setImage("");
    }
  }, [watch("image")]);

  useEffect(() => {
    !!update.image && setImage(update.image);
  }, [update]);

  return (
    <form onSubmit={handleSubmit(onClick)}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="flex justify-center">
          <Option
            name="type"
            checked={watch("type") == "DEWORMING" ? true : false}
            onChange={(e) => {
              const illness = {};
              for (const item of listVaccines) {
                illness[item.value] = false;
              }

              resetVaccine({
                ...initValuesVaccines,
                type: e.target.checked ? "DEWORMING" : "VACCINES",
                illness: illness,
              });
            }}
            label1="Vacunas"
            label2="Desparasitación"
          />
        </div>

        <div className="w-full mb-4">
          <>
            {watch("type") == "VACCINES" && (
              <>
                <Input
                  name="Producto"
                  required
                  formInput={register("product", {
                    required: {
                      value: true,
                      message: "Campo requerido",
                    },
                    minLength: { value: 2, message: "Producto muy corto" },
                    maxLength: { value: 50, message: "Nombre muy largo" },
                    pattern: {
                      value: regexText,
                      message: "Formato incorrecto",
                    },
                  })}
                  error={errors?.product}
                  placeholder="Producto"
                />
              </>
            )}
            {watch("type") == "DEWORMING" && (
              <>
                <Select
                  name="Desparasitación"
                  formInput={register("product", {
                    required: {
                      value: true,
                      message: "Campo requerido",
                    },
                  })}
                  onChange={(target) => setPet("product", target.value)}
                  required
                  options={[
                    {
                      value: "",
                      label: "SELECCIONAR",
                    },
                    {
                      value: "INTERNAL",
                      label: "INTERNO",
                    },
                    {
                      value: "EXTERNAL",
                      label: "EXTERNO",
                    },
                  ]}
                />
              </>
            )}
          </>
        </div>

        <div className="w-full grid grid-cols-12 gap-x-1 grid-flow-row-dense">
          <div className="col-span-3 gap-x-3 ">
            <Input
              name="Fecha de la Dosis"
              type="date"
              required
              formInput={register("date", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
              error={errors?.date}
            />
          </div>
          <div className="col-span-3 gap-x-3 ">
            <Input
              name="Próxima Dosis"
              type="date"
              required
              formInput={register("next", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
                minLength: { value: 2, message: "Producto muy corto" },
                maxLength: { value: 30, message: "Nombre muy largo" },
                pattern: {
                  value: regexText,
                  message: "Formato incorrecto",
                },
              })}
              error={errors?.next}
            />
          </div>
          <div className="col-span-6 gap-x-4  mb-8">
            <Input
              name="Observación"
              formInput={register("observation", {
                pattern: {
                  value: regexText,
                  message: "Formato incorrecto",
                },
              })}
              error={errors.observation}
              placeholder="Observación"
            />
          </div>
        </div>
        {watch("type") == "VACCINES" && (
          <div className=" w-full mb-8">
            <h4 className="font-bold mb-4"> Listado de Vacunas </h4>
            <div className="flex flex-wrap gap-8">
              {listVaccines.map((item) => (
                <div className="w-1/3 md:w-1/5" key={item.value}>
                  <Checkbox
                    name={item.value}
                    checked={watch("illness")[item.value] ? true : false}
                    onChange={(e) => {
                      setValue("illness", {
                        ...watch("illness"),
                        [e.target.name]: !watch("illness")[e.target.name],
                      });
                    }}
                    label={item["es-Es"]}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="w-full mb-4">
          <div>
            {update?.index != -1 && update?.image != "" && (
              <a
                className="flex justify-center py-1 px-4   w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-sky-700  w-48 text-white items-center gap-2 mb-2"
                href={`${IPFS}${update.image}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  className="h-4"
                  src="/img/icons/buttons/pet.png"
                  alt="pet"
                  title="Ver Comprobante"
                />{" "}
                Ver Comprobante
              </a>
            )}
          </div>
          <FileInput
            name="Comprobante:"
            required
            formInput={register("image", {
              required: {
                value: update.index === -1 ? true : false,
                message: "Campo requerido",
              },
            })}
            error={errors.image}
          />
        </div>

        <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
          <div className="col-span-2 grid grid-cols-1 gap-x-4 gap-y-5">
            <div className=" flex justify-center gap-4">
              {update.index != -1 && (
                <button
                  className="py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-yellow-500"
                  onClick={() => reset()}
                >
                  Cancelar
                </button>
              )}
              {!!image && (
                <button className="py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-green-500">
                  {update.index != -1 ? "Actualizar" : "Registrar"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
