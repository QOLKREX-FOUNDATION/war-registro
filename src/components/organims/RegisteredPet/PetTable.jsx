import React, { useState } from "react";
import { MaterialTable } from "../../atoms/tables/MaterialTable";
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
import { useWeb3Context } from "../../../contexts";

export const PetTable = ({
  data,
  getData,
  setShowHistorial,
  showHistorial,
  setGetRecords = () => {},
}) => {
  const { web3 } = useWeb3Context();
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState({
    filter: "chip",
    search: "",
  });

  const [dateInput, setDateInput] = useState({
    dateStart: "",
    dateEnd: "",
  });

  const [activeIndex, setActiveIndex] = useState(1);

  // console.log({ data })
  // console.log({ getData })

  return (
    <>
      <div className="flex flex-wrap justify-between">
        <div className="flex flex-wrap">
          {showHistorial && (
            <div className="flex flex-col gap-2 justify-center flex-wrap pb-4">
              <h2 className="text-xl dark:text-white">Ingrese su búsqueda:</h2>

              <div className="border-b border-gray-200 dark:border-gray-700 mb-2">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                  <li className="mr-2">
                    <a
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
                      }}
                      href="#"
                      className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg group ${
                        activeIndex == 1 ? "active-tab" : "inactive-tab"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 mr-2 ${
                          activeIndex == 1 ? "svg-active" : "svg-inactive"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 20"
                      >
                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                      </svg>
                      Buscar por filtros
                    </a>
                  </li>
                  <li className="mr-2">
                    <a
                      onClick={() => {
                        setActiveIndex(2);
                        setFilter({
                          filter: "chip",
                          search: "",
                        });
                        setDateInput({
                          dateStart: "",
                          dateEnd: "",
                        });
                      }}
                      href="#"
                      className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg group ${
                        activeIndex == 2 ? "active-tab" : "inactive-tab"
                      }`}
                    >
                      <svg
                        className={`w-4 h-4 mr-2 ${
                          activeIndex == 2 ? "svg-active" : "svg-inactive"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 20"
                      >
                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                      </svg>
                      Reporte por fechas
                    </a>
                  </li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeIndex === 1 ? (
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
                      <MenuItem value="adopter">Adoptante</MenuItem>
                      <MenuItem value="pet">Mascota</MenuItem>
                      <MenuItem value="chip">Chip</MenuItem>
                      <MenuItem value="dni">DNI</MenuItem>
                      <MenuItem value="address">Address</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <>
                    <label
                      htmlFor=""
                      className="flex relative flex-col dark:text-white"
                    >
                      <span className="absolute text-sm -top-2 left-2">
                        Fecha de Inicio
                      </span>
                      <input
                        type="date"
                        className="w-40 h-14 dark:text-white bg-gray-200 text-lg dark:bg-gray-700 rounded-md px-4 py-1 focus:outline-none transition duration-300"
                        onChange={(e) => {
                          setDateInput({
                            ...dateInput,
                            dateStart: e.target.value,
                          });
                        }}
                        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                        value={dateInput?.dateStart}
                      />
                    </label>

                    <label
                      htmlFor=""
                      className="flex relative flex-col dark:text-white"
                    >
                      <span className="absolute text-sm -top-2 left-2">
                        Fecha de Fin
                      </span>
                      <input
                        type="date"
                        className="w-40 h-14 dark:text-white bg-gray-200 text-lg dark:bg-gray-700 rounded-md px-4 py-1 focus:outline-none transition duration-300"
                        onChange={(e) => {
                          setDateInput({
                            ...dateInput,
                            dateEnd: e.target.value,
                          });
                        }}
                        pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"
                        value={dateInput?.dateEnd}
                      />
                    </label>
                  </>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (dateInput?.dateStart > dateInput?.dateEnd) return;
                    getData({
                      id: sessionStorage.getItem(
                        "idsEntity_" + String(web3.account).toUpperCase()
                      ),
                      token: web3.authToken,
                      params: {
                        filter: filter?.filter,
                        search: filter?.search,
                        dateStart: dateInput?.dateStart,
                        dateEnd: dateInput?.dateEnd,
                        limit: false,
                      },
                    });
                  }}
                  className="flex flex-wrap justify-center items-center gap-2 dark:text-white"
                >
                  {activeIndex === 1 && (
                    <input
                      type="text"
                      placeholder="buscar"
                      className="h-14 bg-gray-200 text-lg dark:bg-gray-700 rounded-md px-4 py-1 focus:outline-none transition duration-300"
                      onChange={(e) => {
                        setFilter({
                          ...filter,
                          search: e.target.value,
                        });
                      }}
                      value={filter?.search}
                    />
                  )}
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
                {dateInput?.dateStart > dateInput?.dateEnd && (
                  <div className="flex text-balance w-[170px]">
                    <span className="text-red-500 text-balance flex">
                      La fecha de inicio no puede ser mayor a la fecha de fin
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-wrap ">
          <button
            title="Historial"
            className="bg-black mb-2 p-3 flex justify-center items-center right-0 top-0 mr-4 mt-4 hover:bg-gray-700 transition rounded-md shadow-md focus:outline-none group md:h-20"
            onClick={() => {
              setShowHistorial(!showHistorial);
              if (showHistorial)
                getData({
                  id: sessionStorage.getItem(
                    "idsEntity_" + String(web3.account).toUpperCase()
                  ),
                  token: web3.authToken,
                });
              if (!showHistorial) setGetRecords([]);
            }}
          >
            {showHistorial ? (
              <>
                <span className="text-base font-semibold group-hover:text-white text-gray-400 duration-300 ">
                  Volver a Registros de Mascotas
                </span>
                <ChevronRightIcon className="group-hover:text-white text-gray-400 duration-300 " />
              </>
            ) : (
              <>
                <span className="text-base font-semibold group-hover:text-white text-gray-400 duration-300 ">
                  Buscar Registros en Historial
                </span>
                <ChevronRightIcon className="group-hover:text-white text-gray-400 duration-300 " />
              </>
            )}
          </button>
          <button
            title="Actualizar"
            className="bg-black mb-2 p-3 right-0 top-0 mr-4 mt-4 hover:bg-gray-700 transition rounded-md shadow-md focus:outline-none group md:h-20"
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
      <MaterialTable data={data} handleGetRecords={getData} />
    </>
  );
};
