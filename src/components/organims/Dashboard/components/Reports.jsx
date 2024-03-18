import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CustomSelect } from "./CustomSelect";
import Swal from "sweetalert2";
// import { ReactSelect } from "../../../atoms/Form";
import { useSpecie } from "../../Cpanel/components/PetForm/hooks/useSpecie";
import { useUbigeo } from "../../../../hooks/useUbigeo";
import { firuApi } from "../../../../../api";
import { toast } from "react-toastify";

export const Reports = () => {
  const [filterEntity, setFilterEntity] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      typeAnimal: "",
      typeRace: "",
      choose_date: true,
      choose_animal: true,
      choose_race: true,
      choose_district: true,
      choose_entity: true,
      entity: "",
      department: "",
      province: "",
      district: "",
      startDate: "",
      endDate: "",
      created_at: true,
      name: true,
      surname: true,
      email: true,
      country: true,
      phone: true,
      dni: true,
      pet: true,
      race: true,
      gender: true,
      chip: true,
      chip_date: true,
      type_pet: true,
      date: true,
      colour: true,
      sterilized: true,
      registeringEntity: true,
      registeringUser: true,
    },
  });
  const { races, species } = useSpecie(watch("typeAnimal"));

  const handleEntity = async () => {
    try {
      // const response = await fetch(
      //   "http://localhost:5000/api/entity-register/list"
      // );
      const response = await fetch(
        "https://firulaix-api-test.vercel.app/api/entity-register/list"
      );
      const data = await response.json();

      if (!data.ok) {
        setFilterEntity([]);
        return;
      }

      const { entityRegister } = data;

      const entityList = entityRegister.map((entity) => ({
        label: `${entity.name} - ${entity.lastName}`,
        value: `${entity.name} - ${entity.lastName}`,
        // value: `${entity.address}`,
      }));
      setFilterEntity(entityList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleEntity();
  }, []);

  const {
    departments,
    provinces,
    districts,
    handleDepartaments,
    handleProvinces,
    handleDistricts,
  } = useUbigeo();

  const onSubmit = () => {
    if (
      watch("choose_date") &&
      watch("startDate") === "" &&
      watch("endDate") === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe seleccionar un rango de fechas",
      });
      return;
    }

    if (watch("choose_district") && watch("district") === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe seleccionar un distrito",
      });
      return;
    }

    console.log("Enviando datos");
    handleGenerateReport();
  };

  useEffect(() => {
    handleDepartaments();
  }, []);

  const handleGenerateReport = async () => {
    try {
      setLoading(true);
      console.log(watch("district"));
      // const response = await fetch('https://firulaix-api-test.vercel.app/api/reports/create-report', {

      const response = await firuApi.post(
        "/reports/create-report",
        {
          startDate: watch("startDate"),
          endDate: watch("endDate"),
          created_at: watch("created_at"),
          name: watch("name"),
          surname: watch("surname"),
          email: watch("email"),
          country: watch("country"),
          phone: watch("phone"),
          dni: watch("dni"),
          pet: watch("pet"),
          race: watch("race"),
          gender: watch("gender"),
          chip: watch("chip"),
          chip_date: watch("chip_date"),
          type_pet: watch("type_pet"),
          date: watch("date"),
          colour: watch("colour"),
          sterilized: watch("sterilized"),
          registeringEntity: watch("registeringEntity"),
          registeringUser: watch("registeringUser"),
          district: watch("district"),
          entity: watch("entity"),
          department: watch("department"),
          province: watch("province"),
          typeAnimal: watch("typeAnimal"),
          typeRace: watch("typeRace"),
        },
        {
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            // const totalSize =
            //   parseInt(progressEvent.headers.get("content-length"), 10) || 1;
            // const progress = (progressEvent.loaded / totalSize) * 100;
          },
        }
      );

      // const response = await fetch(
      //   "http://localhost:5000/api/reports/create-report",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       startDate: watch("startDate"),
      //       endDate: watch("endDate"),
      //       created_at: watch("created_at"),
      //       name: watch("name"),
      //       surname: watch("surname"),
      //       email: watch("email"),
      //       country: watch("country"),
      //       phone: watch("phone"),
      //       dni: watch("dni"),
      //       pet: watch("pet"),
      //       race: watch("race"),
      //       gender: watch("gender"),
      //       chip: watch("chip"),
      //       chip_date: watch("chip_date"),
      //       type_pet: watch("type_pet"),
      //       date: watch("date"),
      //       colour: watch("colour"),
      //       sterilized: watch("sterilized"),
      //       registeringEntity: watch("registeringEntity"),
      //       registeringUser: watch("registeringUser"),
      //       district: watch("district"),
      //       entity: watch("entity"),
      //       department: watch("department"),
      //       province: watch("province"),
      //       typeAnimal: watch("typeAnimal"),
      //       typeRace: watch("typeRace"),
      //     }),
      //   }
      // );

      // const data = await response;
      const arrayBuffer = await response.data.arrayBuffer();
      console.log(arrayBuffer);
      const blob = new Blob([arrayBuffer], {
        type: "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "reporte.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success("Reporte generado con éxito");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error al generar el reporte");
      setLoading(false);
    }
  };

  console.log(watch("entity"));

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold">
        Elija los filtros para generar el reporte:
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-wrap gap-3 mt-4"
      >
        <div className="flex flex-col">
          <span className="w-full">Seleccione los Filtros</span>
          <div className="pt-1 pr-4 flex gap-2">
            <label
              htmlFor="choose_date"
              data-tooltip="Filtrar por fecha"
              onClick={() => {
                setValue("startDate", "");
                setValue("endDate", "");
              }}
              className={`w-12 h-12 4 ${
                watch("choose_date") ? "bg-blue-700" : "bg-blue-500"
              } hover:bg-blue-800 hover:cursor-pointer rounded-md flex justify-center items-center text-white tooltip`}
            >
              {watch("choose_date") ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                  <path d="M16 3l0 4"></path>
                  <path d="M8 3l0 4"></path>
                  <path d="M4 11l16 0"></path>
                  <path d="M8 15h2v2h-2z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M9 5h9a2 2 0 0 1 2 2v9m-.184 3.839a2 2 0 0 1 -1.816 1.161h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 1.158 -1.815"></path>
                  <path d="M16 3v4"></path>
                  <path d="M8 3v1"></path>
                  <path d="M4 11h7m4 0h5"></path>
                  <path d="M3 3l18 18"></path>
                </svg>
              )}
              <input
                name="choose_date"
                id="choose_date"
                {...register("choose_date")}
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hidden"
              />
            </label>

            <label
              htmlFor="choose_district"
              data-tooltip="Filtrar por distrito"
              onClick={() => {
                setValue("district", "");
              }}
              className={`w-12 h-12 4 ${
                watch("choose_district") ? "bg-blue-700" : "bg-blue-500"
              } hover:bg-blue-800 hover:cursor-pointer rounded-md flex justify-center items-center text-white tooltip`}
            >
              {watch("choose_district") ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                  <path d="M11.87 21.48a1.992 1.992 0 0 1 -1.283 -.58l-4.244 -4.243a8 8 0 1 1 13.355 -3.474"></path>
                  <path d="M15 19l2 2l4 -4"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M9.442 9.432a3 3 0 0 0 4.113 4.134m1.445 -2.566a3 3 0 0 0 -3 -3"></path>
                  <path d="M17.152 17.162l-3.738 3.738a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 0 1 -.476 -10.794m2.18 -1.82a8.003 8.003 0 0 1 10.91 10.912"></path>
                  <path d="M3 3l18 18"></path>
                </svg>
              )}
              <input
                name="choose_district"
                id="choose_district"
                {...register("choose_district")}
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hidden"
              />
            </label>

            <label
              htmlFor="choose_animal"
              data-tooltip="Filtrar por tipo de mascota"
              onClick={() => {
                setValue("animal", "");
              }}
              className={`w-12 h-12 4 ${
                watch("choose_animal") ? "bg-blue-700" : "bg-blue-500"
              } hover:bg-blue-800 hover:cursor-pointer rounded-md flex justify-center items-center text-white tooltip`}
            >
              {watch("choose_animal") ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M14.7 13.5c-1.1 -2 -1.441 -2.5 -2.7 -2.5c-1.259 0 -1.736 .755 -2.836 2.747c-.942 1.703 -2.846 1.845 -3.321 3.291c-.097 .265 -.145 .677 -.143 .962c0 1.176 .787 2 1.8 2c1.259 0 3 -1 4.5 -1s3.241 1 4.5 1c1.013 0 1.8 -.823 1.8 -2c0 -.285 -.049 -.697 -.146 -.962c-.475 -1.451 -2.512 -1.835 -3.454 -3.538z"></path>
                  <path d="M20.188 8.082a1.039 1.039 0 0 0 -.406 -.082h-.015c-.735 .012 -1.56 .75 -1.993 1.866c-.519 1.335 -.28 2.7 .538 3.052c.129 .055 .267 .082 .406 .082c.739 0 1.575 -.742 2.011 -1.866c.516 -1.335 .273 -2.7 -.54 -3.052z"></path>
                  <path d="M9.474 9c.055 0 .109 0 .163 -.011c.944 -.128 1.533 -1.346 1.32 -2.722c-.203 -1.297 -1.047 -2.267 -1.932 -2.267c-.055 0 -.109 0 -.163 .011c-.944 .128 -1.533 1.346 -1.32 2.722c.204 1.293 1.048 2.267 1.933 2.267z"></path>
                  <path d="M16.456 6.733c.214 -1.376 -.375 -2.594 -1.32 -2.722a1.164 1.164 0 0 0 -.162 -.011c-.885 0 -1.728 .97 -1.93 2.267c-.214 1.376 .375 2.594 1.32 2.722c.054 .007 .108 .011 .162 .011c.885 0 1.73 -.974 1.93 -2.267z"></path>
                  <path d="M5.69 12.918c.816 -.352 1.054 -1.719 .536 -3.052c-.436 -1.124 -1.271 -1.866 -2.009 -1.866c-.14 0 -.277 .027 -.407 .082c-.816 .352 -1.054 1.719 -.536 3.052c.436 1.124 1.271 1.866 2.009 1.866c.14 0 .277 -.027 .407 -.082z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M11.168 11.154c-.71 .31 -1.184 1.107 -2 2.593c-.942 1.703 -2.846 1.845 -3.321 3.291c-.097 .265 -.145 .677 -.143 .962c0 1.176 .787 2 1.8 2c1.259 0 3 -1 4.5 -1s3.241 1 4.5 1c.927 0 1.664 -.689 1.783 -1.708"></path>
                  <path d="M20.188 8.082a1.039 1.039 0 0 0 -.406 -.082h-.015c-.735 .012 -1.56 .75 -1.993 1.866c-.519 1.335 -.28 2.7 .538 3.052c.129 .055 .267 .082 .406 .082c.739 0 1.575 -.742 2.011 -1.866c.516 -1.335 .273 -2.7 -.54 -3.052h0z"></path>
                  <path d="M11 6.992a3.608 3.608 0 0 0 -.04 -.725c-.203 -1.297 -1.047 -2.267 -1.932 -2.267a1.237 1.237 0 0 0 -.758 .265"></path>
                  <path d="M16.456 6.733c.214 -1.376 -.375 -2.594 -1.32 -2.722a1.164 1.164 0 0 0 -.162 -.011c-.885 0 -1.728 .97 -1.93 2.267c-.214 1.376 .375 2.594 1.32 2.722c.054 .007 .108 .011 .162 .011c.885 0 1.73 -.974 1.93 -2.267z"></path>
                  <path d="M5.69 12.918c.816 -.352 1.054 -1.719 .536 -3.052c-.436 -1.124 -1.271 -1.866 -2.009 -1.866c-.14 0 -.277 .027 -.407 .082c-.816 .352 -1.054 1.719 -.536 3.052c.436 1.124 1.271 1.866 2.009 1.866c.14 0 .277 -.027 .407 -.082z"></path>
                  <path d="M3 3l18 18"></path>
                </svg>
              )}
              <input
                name="choose_animal"
                id="choose_animal"
                {...register("choose_animal")}
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hidden"
              />
            </label>

            <label
              htmlFor="choose_race"
              data-tooltip="Filtrar por raza"
              onClick={() => {
                setValue("typeRace", "");
              }}
              className={`w-12 h-12 4 ${
                watch("choose_race") ? "bg-blue-700" : "bg-blue-500"
              } hover:bg-blue-800 hover:cursor-pointer rounded-md flex justify-center items-center text-white tooltip`}
            >
              {watch("choose_race") ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M19 3h-4a2 2 0 0 0 -2 2v12a4 4 0 0 0 8 0v-12a2 2 0 0 0 -2 -2"></path>
                  <path d="M13 7.35l-2 -2a2 2 0 0 0 -2.828 0l-2.828 2.828a2 2 0 0 0 0 2.828l9 9"></path>
                  <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12"></path>
                  <path d="M17 17l0 .01"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M13 13v4a4 4 0 0 0 6.832 2.825m1.168 -2.825v-12a2 2 0 0 0 -2 -2h-4a2 2 0 0 0 -2 2v4"></path>
                  <path d="M13 7.35l-2 -2a2 2 0 0 0 -2.11 -.461m-2.13 1.874l-1.416 1.415a2 2 0 0 0 0 2.828l9 9"></path>
                  <path d="M7.3 13h-2.3a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h12"></path>
                  <path d="M17 17v.01"></path>
                  <path d="M3 3l18 18"></path>
                </svg>
              )}
              <input
                name="choose_race"
                id="choose_race"
                {...register("choose_race")}
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hidden"
              />
            </label>

            <label
              htmlFor="choose_entity"
              data-tooltip="Filtrar por entidad"
              onClick={() => {
                setValue("entity", "");
              }}
              className={`w-12 h-12 4 ${
                watch("choose_entity") ? "bg-blue-700" : "bg-blue-500"
              } hover:bg-blue-800 hover:cursor-pointer rounded-md flex justify-center items-center text-white tooltip`}
            >
              {watch("choose_entity") ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M5 3m0 3a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-8a3 3 0 0 1 -3 -3z"></path>
                  <path d="M12 13m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                  <path d="M10 6h4"></path>
                  <path d="M9 18h6"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M7.141 3.125a3 3 0 0 1 .859 -.125h8a3 3 0 0 1 3 3v9m-.13 3.874a3 3 0 0 1 -2.87 2.126h-8a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 .128 -.869"></path>
                  <path d="M11.179 11.176a2 2 0 1 0 2.635 2.667"></path>
                  <path d="M10 6h4"></path>
                  <path d="M9 18h6"></path>
                  <path d="M3 3l18 18"></path>
                </svg>
              )}
              <input
                name="choose_entity"
                id="choose_entity"
                {...register("choose_entity")}
                type="checkbox"
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hidden"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-row gap-3">
          <div className="flex flex-col gap-2 h-[380px] w-1/2">
            <div className="flex flex-col gap-2 w-80">
              {watch("choose_date") ? (
                <div className="flex gap-2">
                  <div className="flex flex-col">
                    <label htmlFor="startDate">Fecha de inicio</label>
                    <input
                      name="startDate"
                      {...register("startDate", {
                        required: watch("choose_date"),
                      })}
                      type="date"
                      className="dark:bg-gray-700 dark:text-white p-2"
                    />
                    <div className="flex">
                      {errors.startDate &&
                        errors.startDate.type === "required" && (
                          <span className="text-red-500">
                            Este campo es requerido
                          </span>
                        )}
                    </div>
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="endDate">Fecha de fin</label>
                    <input
                      name="endDate"
                      {...register("endDate", {
                        required: watch("choose_date"),
                      })}
                      type="date"
                      className="dark:bg-gray-700 dark:text-white p-2"
                    />
                    <div className="flex">
                      {errors.endDate && errors.endDate.type === "required" && (
                        <span className="text-red-500">
                          Este campo es requerido
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-start py-2 gap-2">
                  <span className="font-bold">
                    Se Filtrarán todos los registros
                  </span>
                </div>
              )}
            </div>

            {/* filtro por departamento */}
            <div className="flex w-full pr-2">
              {watch("choose_district") ? (
                <div className="flex flex-col w-full">
                  <label className="flex justify-between gap-2">
                    <span className="text-gray-700 dark:text-gray-400">
                      Departamento
                    </span>
                  </label>
                  <div className="w-full flex">
                    <CustomSelect
                      readOnly={false}
                      options={departments}
                      value={{ label: watch("department") }}
                      onChange={(target) => {
                        setValue("department", target.value);
                        handleProvinces(target.value);
                      }}
                      name={false}
                      required={watch("choose_district") === ""}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-start py-2 gap-2">
                  <span className="font-bold">
                    Se Filtrarán todos los registros
                  </span>
                </div>
              )}
            </div>

            {/* filtro por provincia */}
            <div className="flex w-full pr-2">
              {watch("choose_district") ? (
                <div className="flex flex-col w-full">
                  <label className="flex justify-between gap-2">
                    <span className="text-gray-700 dark:text-gray-400">
                      Provincia
                    </span>
                  </label>
                  <div className="w-full flex">
                    <CustomSelect
                      readOnly={false}
                      options={provinces}
                      value={{ label: watch("province") }}
                      onChange={(target) => {
                        setValue("province", target.value);
                        handleDistricts(target.value);
                      }}
                      name={false}
                      required={watch("choose_district") === ""}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-start py-2 gap-2">
                  <span className="font-bold">
                    Se Filtrarán todos los registros
                  </span>
                </div>
              )}
            </div>

            {/* filtro por distritos */}
            <div className="flex w-full pr-2">
              {watch("choose_district") ? (
                <div className="flex flex-col w-full">
                  <label className="flex justify-between gap-2">
                    <span className="text-gray-700 dark:text-gray-400">
                      Distritos
                    </span>
                  </label>
                  <div className="w-full flex">
                    <CustomSelect
                      readOnly={false}
                      options={districts}
                      value={{ label: watch("district") }}
                      onChange={(target) => {
                        setValue("district", target.value);
                      }}
                      name={false}
                      required={watch("choose_district") === ""}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-start py-2 gap-2">
                  <span className="font-bold">
                    Se Filtrarán todos los registros
                  </span>
                </div>
              )}
            </div>
            {/* 
                        <span>-------Aún no funciona--------</span>

                        <div className="flex w-full">
                            {
                                watch('choose_animal') ?
                                    <div className="flex flex-col w-full">
                                        <label className='flex justify-between gap-2'>
                                            <span className="text-gray-700 dark:text-gray-400">Tipo de Mascota</span>
                                        </label>
                                        <div className="w-full flex">

                                            <CustomSelect
                                                readOnly={false}
                                                options={species}
                                                value={{ label: watch("animal") }}
                                                onChange={(target) => {
                                                    console.log(target)
                                                    setValue("animal", target.value);
                                                }}
                                                name={false}
                                                required={false}
                                            />
                                        </div>
                                    </div>

                                    :
                                    <div className="w-full flex justify-start py-2 gap-2">
                                        <span className='font-bold'>Se Filtrarán todos los registros</span>
                                    </div>
                            }
                        </div>

                        <div className="flex w-full">
                            {
                                watch("choose_race") ?
                                    <div className="flex flex-col w-full">
                                        <label className='flex justify-between gap-2'>
                                            <span className="text-gray-700 dark:text-gray-400">Razas</span>
                                        </label>
                                        <div className="w-full flex">

                                            <CustomSelect
                                                readOnly={false}
                                                options={races}
                                                value={{ label: watch("race") }}
                                                onChange={(target) => {
                                                    setValue("race", target.value);
                                                }}
                                                name={false}
                                                required={false}
                                            />
                                        </div>
                                    </div>

                                    :
                                    <div className="w-full flex justify-start py-2 gap-2">
                                        <span className='font-bold'>Se Filtrarán todos los registros</span>
                                    </div>
                            }
                        </div> */}
          </div>

          <div className="flex flex-col gap-2 h-96 w-1/2">
            <span>-------Aún no funciona--------</span>
            <div className="flex w-full">
              {watch("choose_animal") ? (
                <div className="flex flex-col w-full">
                  <label className="flex justify-between gap-2">
                    <span className="text-gray-700 dark:text-gray-400">
                      Tipo de Mascota
                    </span>
                  </label>
                  <div className="w-full flex">
                    <CustomSelect
                      readOnly={false}
                      options={species}
                      value={{ label: watch("typeAnimal") }}
                      onChange={(target) => {
                        console.log(target);
                        setValue("typeAnimal", target.value);
                      }}
                      name={false}
                      required={false}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-center gap-2">
                  <span className="font-bold">
                    Se Filtrarán todos los registros
                  </span>
                </div>
              )}
            </div>

            <div className="flex w-full">
              {watch("choose_race") ? (
                <div className="flex flex-col w-full">
                  <label className="flex justify-between gap-2">
                    <span className="text-gray-700 dark:text-gray-400">
                      Razas
                    </span>
                  </label>
                  <div className="w-full flex">
                    <CustomSelect
                      readOnly={false}
                      options={races}
                      value={{ label: watch("typeRace") }}
                      onChange={(target) => {
                        setValue("typeRace", target.value);
                      }}
                      name={false}
                      required={false}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-center gap-2">
                  <span className="font-bold">
                    Se Filtrarán todos los registros
                  </span>
                </div>
              )}
            </div>

            <div className="flex w-full">
              {watch("choose_entity") ? (
                <div className="flex flex-col w-full">
                  <label className="flex justify-between gap-2">
                    <span className="text-gray-700 dark:text-gray-400">
                      Entidad Registradora
                    </span>
                  </label>
                  <div className="w-full flex">
                    <CustomSelect
                      readOnly={false}
                      options={filterEntity}
                      value={{ label: watch("entity") }}
                      onChange={(target) => {
                        console.log(target);
                        setValue("entity", target.value);
                      }}
                      name={false}
                      required={false}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full flex justify-start py-2 gap-2">
                  <span className="font-bold">
                    Se Filtrarán todos los registros
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <hr />

        <h2 className="text-xl font-semibold">
          Elija los campos que desea generar el reporte:
        </h2>

        <div className="flex flex-wrap gap-2">
          <div className="flex flex-col">
            <h2 className="pb-1">Datos del Usuario</h2>
            <hr className="py-1" />
            <label className="flex justify-between gap-2">
              <span className="text-gray-700 dark:text-gray-400">
                Fecha de Registro
              </span>
              <input
                type="checkbox"
                {...register("created_at")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              />
            </label>
            <label className="flex justify-between gap-2">
              <span className="text-gray-700 dark:text-gray-400">Nombre</span>
              <input
                type="checkbox"
                {...register("name")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              />
            </label>
            <label className="flex justify-between gap-2">
              <span className="text-gray-700 dark:text-gray-400">Apellido</span>
              <input
                type="checkbox"
                {...register("surname")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              />
            </label>
            <label className="flex justify-between gap-2">
              <span className="text-gray-700 dark:text-gray-400">
                Correo Electrónico
              </span>
              <input
                type="checkbox"
                {...register("email")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              />
            </label>
            <label className="flex justify-between gap-2">
              <span className="text-gray-700 dark:text-gray-400">País</span>
              <input
                type="checkbox"
                {...register("country")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              />
            </label>
            <label className="flex justify-between gap-2">
              <span className="text-gray-700 dark:text-gray-400">Teléfono</span>
              <input
                type="checkbox"
                {...register("phone")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              />
            </label>
            <label className="flex justify-between gap-2">
              <span className="text-gray-700 dark:text-gray-400">DNI</span>
              <input
                type="checkbox"
                {...register("dni")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              />
            </label>
          </div>
          <div className="flex flex-col">
            <h2 className="pb-1">Datos de las mascotas</h2>
            <hr className="py-1" />
            <label className="flex justify-between gap-2">
              <span className="text-gray-700 dark:text-gray-400">Mascota</span>
              <input
                type="checkbox"
                {...register("pet")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              />
            </label>
            <label className="flex justify-between gap-2">
              <span className="text-gray-700 dark:text-gray-400">Raza</span>
              <input
                type="checkbox"
                {...register("race")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              />
            </label>
            <label className="flex justify-between gap-2">
              <span className="text-gray-700 dark:text-gray-400">Género</span>
              <input
                type="checkbox"
                {...register("gender")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              />
            </label>
            <label className="flex justify-between gap-2">
              <span className="text-gray-700 dark:text-gray-400">Chip</span>
              <input
                type="checkbox"
                {...register("chip")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              />
            </label>
            <label className="flex justify-between gap-2">
              <span className="text-gray-700 dark:text-gray-400">
                Fecha del Chip
              </span>
              <input
                type="checkbox"
                {...register("chip_date")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              />
            </label>
            <label className="flex justify-between gap-2">
              <span className="text-gray-700 dark:text-gray-400">
                Tipo de Mascota
              </span>
              <input
                type="checkbox"
                {...register("type_pet")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              />
            </label>
            <label className="flex justify-between gap-2">
              <span className="text-gray-700 dark:text-gray-400">
                Fecha de nacimiento
              </span>
              <input
                type="checkbox"
                {...register("date")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              />
            </label>
            <label className="flex justify-between gap-2">
              <span className="text-gray-700 dark:text-gray-400">
                Color de mascota
              </span>
              <input
                type="checkbox"
                {...register("colour")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              />
            </label>
            <label className="flex justify-between gap-2">
              <span className="text-gray-700 dark:text-gray-400">
                Esterilizado
              </span>
              <input
                type="checkbox"
                {...register("sterilized")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              />
            </label>
          </div>
          <div className="flex flex-col">
            <h2 className="pb-1">Datos de la entidad registradora</h2>
            <hr className="py-1" />
            <label className="flex justify-between gap-2">
              <span className="text-gray-700 dark:text-gray-400">
                Entidad registradora
              </span>
              <input
                type="checkbox"
                {...register("registeringEntity")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              />
            </label>
            <label className="flex justify-between gap-2">
              <span className="text-gray-700 dark:text-gray-400">
                encargado de la entidad registradora
              </span>
              <input
                type="checkbox"
                {...register("registeringUser")}
                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <button
            type="submit"
            disabled={
              (!watch("choose_date") &&
                !watch("choose_district") &&
                !watch("choose_animal") &&
                !watch("choose_race") &&
                !watch("choose_entity")) ||
              loading
            }
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md flex justify-center items-center gap-2  disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generar reporte
            {loading && (
              <span className="w-5 h-5 border-4 border-l-transparent border-white rounded-full px-2 animate-spin"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
