import React, { useState, useEffect } from "react";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
  InfoOutlined as InfoIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
  FilterAltOff as FilterAltOffIcon,
} from "@mui/icons-material";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { MaterialTable } from "../../../atoms/tables/MaterialTable";
import { useWeb3Context } from "../../../../contexts";
import { firuApi } from "../../../../../api";
import { CustomSelect } from "./CustomSelect";
import { set, useForm } from "react-hook-form";
import { useUbigeo } from "../../../../hooks/useUbigeo";
import { useSpecie } from "../../Cpanel/components/PetForm/hooks/useSpecie";
import { Users, getErUsers } from "../../../../utils/war/UsersSystem";
import { CustomInputDate } from "./CustomInputDate";
import dayjs from "dayjs";
import { API } from "../../../../config";

export const PetTableReport = ({ data, getData, setGetRecords = () => {} }) => {
  const { web3 } = useWeb3Context();
  // se usa para almacenar los usuarios de la blockchain y los usuarios de mongo
  const [filterEntity, setFilterEntity] = useState([]);
  // se usa para almacenar los usuarios de la blockchain
  const [listUsers, setListUsers] = useState([]);
  // se usa para almacenar mi usuario de la blockchain
  const [defaultUser, setDefaultUser] = useState([]);
  console.log({ defaultUser });

  const [filter, setFilter] = useState({
    filter: "chip",
    search: "",
  });
  const [dataSearch, setDataSearch] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    setError,
    control,
  } = useForm({
    defaultValues: {
      typeAnimal: "",
      typeRace: "",
      choose_search: true,
      choose_date: true,
      choose_animal: true,
      choose_race: true,
      choose_district: true,
      choose_entity: true,
      choose_user: true,
      entity: "",
      department: "",
      province: "",
      district: "",
      startDate: "",
      endDate: "",
      startDate2: dayjs().startOf("month"),
      endDate2: dayjs(),
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
    mode: "onChange",
  });

  const {
    departments,
    provinces,
    districts,
    handleDepartaments,
    handleProvinces,
    handleDistricts,
  } = useUbigeo();

  const { races, species } = useSpecie(watch("typeAnimal"));

  const [dateInput, setDateInput] = useState({
    dateStart: "",
    dateEnd: "",
  });

  const [activeIndex, setActiveIndex] = useState(1);
  const [typeOfSearch, setTypeOfSearch] = useState("date");

  // obtiene los usuarios de mongo y asigna los usuarios de la blockchain si existen
  const handleEntity = async () => {
    try {
      // const response = await fetch('http://localhost:5000/api/entity-register/list')

      const dataList = firuApi
        .get(`/entity-register/list?address=${web3.account}`)
        .then((response) => {
          console.log(response.data);
          return response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      const data = await dataList;

      if (!data.ok) {
        setFilterEntity([]);
        return;
      }

      const { entityRegister } = data;
      console.log({ entityRegister });

      const entityList = listUsers.map((entity) => ({
        label: `${entity?.data?.name} - ${entity?.data?.lastName}`,
        // value: `${entity?.data?.name} - ${entity?.data?.lastName}`,
        value: `${entity?.address}`,
      }));

      console.log({ entityList });

      setFilterEntity([
        {
          label: "Todos",
          value: null,
        },
        ...entityList,
      ]);

      setDefaultUser([
        {
          label: "Todos",
          value: null,
        },
        {
          label: `${entityRegister[0]?.name} - ${entityRegister[0]?.lastName}`,
          value: `${entityRegister[0]?.address}`,
        },
      ]);

      if (entityList.length === 0) {
        setFilterEntity([
          ...entityList,
          {
            label: `${entityRegister[0]?.name} - ${entityRegister[0]?.lastName}`,
            value: `${entityRegister[0]?.address}`,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // obtiene los usuarios de la blockchain
  const getList = async () => {
    try {
      const array = await getErUsers(web3.wallet, web3.account);

      const promises = array.map(async (address) => {
        const resolve2 = await Users(web3.wallet, address);
        if (resolve2.data !== "") {
          resolve2.data = JSON.parse(
            Buffer.from(resolve2.data, "base64").toString()
          );
        }
        return { address, ...resolve2 };
      });

      const users = await Promise.all(promises);
      setListUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    handleEntity();
  }, [listUsers]);

  // console.log({ data })
  // console.log({ getData })
  // console.log({ defaultUser });
  // console.log({ filter });

  const handleDateChange = () => {
    const startDate = watch("startDate");
    const endDate = watch("endDate");
    console.log({ startDate, endDate });

    // Validar si el rango es mayor a tres años y ajustar si es necesario
    const maxStartDate = new Date(endDate);
    maxStartDate.setFullYear(maxStartDate.getFullYear() - 3);

    if (startDate && endDate) {
      if (new Date(startDate) < maxStartDate) {
        setValue("startDate", maxStartDate.toISOString().split("T")[0]);
        setError("startDate", {
          type: "manual",
          message: "El rango máximo es de 3 años",
        });
      }
    }
  };

  useEffect(() => {
    handleDateChange();
  }, [watch("startDate"), watch("endDate")]);

  // Función para establecer el rango predeterminado de un año
  const setDefaultDateRange = () => {
    const defaultStartDate = new Date();
    const defaultEndDate = new Date();
    defaultStartDate.setFullYear(defaultStartDate.getFullYear() - 1);

    setValue("startDate", defaultStartDate.toISOString().split("T")[0]);
    setValue("endDate", defaultEndDate.toISOString().split("T")[0]);
  };

  // Llamada inicial para establecer el rango predeterminado
  useEffect(() => {
    setDefaultDateRange();
  }, []);
  console.log(data);
  console.log(listUsers);
  console.log(defaultUser);
  console.log(filterEntity);
  console.log(watch("entity"));
  console.log(typeOfSearch);

  console.log(watch("choose_search"));

  return (
    <>
      <div className="flex flex-wrap justify-between">
        <div className="flex flex-wrap w-full">
          <div className="flex flex-col gap-2 justify-center flex-wrap pb-4 w-full">
            <h2 className="text-xl dark:text-white">Ingrese su búsqueda:</h2>

            <div className="flex justify-between">
              {typeOfSearch === "date" ? (
                <div className="pt-1 pr-4 flex gap-2">
                  <label
                    htmlFor="choose_search"
                    data-tooltip="Filtrar por fecha"
                    onClick={() => {
                      setActiveIndex(1);
                      setFilter({
                        filter: "chip",
                        search: "",
                      });
                      setDateInput({
                        dateStart: "",
                        dateEnd: "",
                      });
                      setTypeOfSearch("adopter");
                      setValue("entity", "");
                      setValue("department", "");
                      setValue("province", "");
                      setValue("district", "");
                    }}
                    className={`w-12 h-12 4 bg-blue-700 hover:bg-blue-800 hover:cursor-pointer rounded-md flex justify-center items-center text-white tooltip`}
                  >
                    <CalendarMonthIcon />
                  </label>
                  <label
                    htmlFor="choose_user"
                    data-tooltip="Filtrar por entidad"
                    onClick={() => {
                      setValue("entity", "");
                    }}
                    className={`w-12 h-12 4 ${
                      watch("choose_user") ? "bg-blue-700" : "bg-blue-500"
                    } hover:bg-blue-800 hover:cursor-pointer rounded-md flex justify-center items-center text-white tooltip`}
                  >
                    {watch("choose_user") ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-users-group"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                        <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" />
                        <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                        <path d="M17 10h2a2 2 0 0 1 2 2v1" />
                        <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                        <path d="M3 13v-1a2 2 0 0 1 2 -2h2" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-user-x"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
                        <path d="M22 22l-5 -5" />
                        <path d="M17 22l5 -5" />
                      </svg>
                    )}
                    <input
                      name="choose_user"
                      id="choose_user"
                      {...register("choose_user")}
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hidden"
                    />
                  </label>
                  <label
                    htmlFor="choose_district"
                    data-tooltip="Filtrar por Ubicación"
                    onClick={() => {
                      setValue("department", "");
                      setValue("province", "");
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
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
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
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
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
                </div>
              ) : (
                typeOfSearch === "adopter" && (
                  <>
                    <div className="pt-1 pr-4 flex gap-2">
                      <label
                        htmlFor="choose_date"
                        data-tooltip="Filtrar por Adoptante"
                        onClick={() => {
                          setActiveIndex(1);
                          setFilter({
                            filter: "chip",
                            search: "",
                          });
                          setDateInput({
                            dateStart: "",
                            dateEnd: "",
                          });
                          setTypeOfSearch("date");
                        }}
                        className={`w-12 h-12 4 bg-blue-700 hover:bg-blue-800 hover:cursor-pointer rounded-md flex justify-center items-center text-white tooltip`}
                      >
                        <SearchIcon />
                      </label>
                    </div>
                  </>
                )
              )}

              <div className="flex gap-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (typeOfSearch === "adopter") {
                      fetch(`${API.war}pets/report-adopter`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          idRegisteringEntity: 2,
                          [filter.filter]: filter.search,
                        }),
                      })
                        .then((resp) => resp.json())
                        .then((data) => {
                          // console.log(data);
                          setDataSearch(data);
                        });
                    } else {
                      fetch(`${API.war}pets/report-pet`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          startDate: watch("startDate2").format("YYYY-MM-DD"),
                          endDate: watch("endDate2").format("YYYY-MM-DD"),
                          idRegisteringEntity: JSON.parse(
                            sessionStorage.getItem(
                              "idsEntity_" + String(web3.account).toUpperCase()
                            )
                          ).map(Number),
                          userAddress: watch("entity"),
                          department: watch("department"),
                          province: watch("province"),
                          district: watch("district"),
                        }),
                      })
                        .then((resp) => resp.json())
                        .then((data) => {
                          console.log(data);
                          setDataSearch(data);
                        });
                    }
                    // if (dateInput?.dateStart > dateInput?.dateEnd) return;
                    console.log({ filter });
                    getData({
                      id: sessionStorage.getItem(
                        "idsEntity_" + String(web3.account).toUpperCase()
                      ),
                      token: web3.authToken,
                      params: {
                        filter: watch("choose_search") ? filter?.filter : "",
                        search: filter?.search,
                        // dateStart: dateInput?.dateStart,
                        // dateEnd: dateInput?.dateEnd,
                        dateStart: watch("choose_date")
                          ? watch("startDate")
                          : undefined,
                        dateEnd: watch("choose_date")
                          ? watch("endDate")
                          : undefined,
                        // created_for: watch("choose_user")
                        //   ? watch("entity")
                        //   : undefined,
                        created_for: watch("choose_user")
                          ? undefined
                          : undefined,
                        limit: false,
                        department: watch("choose_district")
                          ? watch("department")
                          : "",
                        province: watch("choose_district")
                          ? watch("province")
                          : "",
                        district: watch("choose_district")
                          ? watch("district")
                          : "",
                        typeAnimal: watch("choose_animal")
                          ? watch("typeAnimal")
                          : "",
                        typeRace: watch("choose_race") ? watch("typeRace") : "",
                        address:
                          watch("choose_user") && defaultUser.label === "Todos"
                            ? watch("entity")
                            : undefined,
                        // envia el address de la entidad registradora
                        // userAddress: listUsers.length === 0 && web3.account,
                        userAddress:
                          watch("choose_user") || defaultUser.label === "Todos"
                            ? web3.account
                            : undefined,
                        // userAddress:
                        //   "0XE8A2A2C0FA6E62568F5DC389CAD421CDB06962D9",
                      },
                    });
                  }}
                  className="flex flex-wrap justify-center items-center gap-2 dark:text-white"
                >
                  <button
                    title="Buscar"
                    className="h-14 w-14 text-gray-400 hover:text-gray-600 transition duration-300 bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1 focus:outline-none"
                    type="submit"
                  >
                    <SearchIcon className="" />
                  </button>
                  <button
                    title="Limpiar Filtros"
                    className="h-14 w-14 text-gray-400 hover:text-gray-600 transition duration-300 bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1 focus:outline-none"
                    type="button"
                    onClick={() => {
                      setFilter({
                        filter: "chip",
                        search: "",
                      });
                      setDateInput({
                        dateStart: "",
                        dateEnd: "",
                      });
                      setGetRecords([]);
                      reset();
                      // getData({
                      //     id: sessionStorage.getItem(
                      //         "idsEntity_" + String(web3.account).toUpperCase()
                      //     ),
                      //     token: web3.authToken,
                      // })
                    }}
                  >
                    <FilterAltOffIcon />
                  </button>
                </form>
                <button
                  title="Actualizar"
                  className="bg-black px-3 h-14 hover:bg-gray-700 transition rounded-md shadow-md focus:outline-none group"
                  onClick={() => {
                    console.log("actualizando");
                    getData({
                      id: sessionStorage.getItem(
                        "idsEntity_" + String(web3.account).toUpperCase()
                      ),
                      token: web3.authToken,
                    });
                  }}
                >
                  <RefreshIcon className="group-hover:text-white text-gray-400 duration-300 " />
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-10 items-start flex-wrap md:flex-nowrap gap-2 w-full min-h-[220px] py-2">
              <div className="flex flex-col w-full md:w-1/2 z-10">
                <h2 className="text-xl font-semibold">Filtros Generales</h2>
                {typeOfSearch === "adopter" && (
                  <div className="flex justify-start gap-3 w-full mt-2">
                    <FormControl
                      variant="outlined"
                      className="w-40 h-14 dark:text-white bg-gray-200 text-lg dark:bg-gray-700 rounded-md px-4 py-1 focus:outline-none transition duration-300"
                    >
                      <InputLabel
                        id="demo-simple-select-label"
                        className="dark:text-white"
                      >
                        Filtro
                      </InputLabel>
                      <Select
                        className="w-40 h-14 dark:text-white bg-gray-200 text-lg dark:bg-gray-700 rounded-md px-4 py-1 focus:outline-none transition duration-300"
                        value={filter?.filter}
                        onChange={(e) => {
                          setFilter({
                            ...filter,
                            filter: e.target.value,
                          });
                        }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Filtro"
                        // defaultChecked
                        defaultValue
                        // defaultOpen
                        // onChange={handleChange}
                      >
                        {/* <MenuItem value="adopter">Adoptante</MenuItem>
                        <MenuItem value="pet">Mascota</MenuItem> */}
                        <MenuItem value="chip">Chip</MenuItem>
                        <MenuItem value="dni">DNI</MenuItem>
                        <MenuItem value="address">Adoptante</MenuItem>
                      </Select>
                    </FormControl>
                    <input
                      type="text"
                      placeholder="buscar"
                      className="h-14 bg-gray-200 text-lg dark:bg-gray-700 text-black dark:text-white rounded-md px-4 py-1 focus:outline-none transition duration-300"
                      onChange={(e) => {
                        setFilter({
                          ...filter,
                          search: e.target.value,
                        });
                      }}
                      value={filter?.search}
                    />
                  </div>
                )}

                {typeOfSearch === "date" && (
                  <>
                    <div className="flex mt-5">
                      <CustomInputDate setValue={setValue} watch={watch} />
                    </div>
                    {watch("choose_user") && (
                      <div className="flex justify-start gap-2 w-full">
                        <div className="flex flex-col w-full">
                          <label htmlFor="entity">Usuarios</label>
                          {listUsers.length === 0 ? (
                            <>
                              <CustomSelect
                                readOnly={false}
                                options={defaultUser}
                                value={defaultUser.filter(
                                  (item) => item.value === watch("entity")
                                )}
                                onChange={(target) => {
                                  console.log(target);
                                  setValue("entity", target.value);
                                }}
                                defaultValue={defaultUser[0]}
                                name={false}
                                required={false}
                              />
                              {/* <span className="text-red-500">
                              No hay usuarios registrados {defaultUser.length}
                            </span> */}
                            </>
                          ) : (
                            <>
                              <CustomSelect
                                readOnly={false}
                                options={filterEntity}
                                value={{ label: watch("entity") }}
                                onChange={(target) => {
                                  console.log(target);
                                  setValue("entity", target.value);
                                }}
                                defaultValue={filterEntity[0]}
                                name={false}
                                required={false}
                              />
                              {/* {errors.entity &&
                              errors.entity.type === "required" && (
                                <span className="text-red-500">
                                  Este campo es requerido
                                </span>
                              )} */}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {typeOfSearch === "date" && watch("choose_district") && (
                <div className="flex flex-col w-full md:w-1/2 z-10">
                  <h2 className="text-xl font-semibold">
                    Filtros de Ubicación
                  </h2>
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
                </div>
              )}

              <div className="flex-col w-1/4 z-10 hidden">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold">Filtros de Mascotas</h2>
                  <span>(-------Aún no funciona--------)</span>
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
                      <div className="w-full flex justify-start gap-2">
                        <span className="font-bold">
                          Se Filtrarán todos los registros
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex w-full">
                    {watch("choose_race") ? (
                      <div className="flex flex-col w-full">
                        <label className="flex justify-start gap-2">
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
                      <div className="w-full flex justify-start gap-2">
                        <span className="font-bold">
                          Se Filtrarán todos los registros
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {dateInput?.dateStart > dateInput?.dateEnd && (
              <div className="flex text-balance w-[170px]">
                <span className="text-red-500 text-balance flex">
                  La fecha de inicio no puede ser mayor a la fecha de fin
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap ">
          {/* <button
            title="Historial"
            className="bg-black mb-2 p-3 flex justify-center items-center right-0 top-0 mr-4 mt-4 hover:bg-gray-700 transition rounded-md shadow-md focus:outline-none group md:h-20"
            onClick={() => {
              getData({
                id: sessionStorage.getItem(
                  "idsEntity_" + String(web3.account).toUpperCase()
                ),
                token: web3.authToken,
              });
              // if (!showHistorial) setGetRecords([]);
            }}
          ></button> */}
        </div>
      </div>
      {/* <MaterialTable data={data} handleGetRecords={getData} /> */}
      <MaterialTable data={dataSearch} />
    </>
  );
};
