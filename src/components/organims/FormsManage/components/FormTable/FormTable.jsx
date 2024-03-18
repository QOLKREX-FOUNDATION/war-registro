import React, { useState, useContext } from "react";
import { FormModal } from "../../../../molecules/modals/FormModal";
import { FaEdit, FaFilter } from "react-icons/fa";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  Tooltip,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { firuApi } from "../../../../../../api";
import { useStateContext } from "../../../../../contexts/ContextProvider";
import MaterialReactTable from "material-react-table";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Print as PrintIcon,
  Refresh as RefreshIcon,
  InfoOutlined as InfoIcon,
  ChevronRight as ChevronRightIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { darkTheme } from "../../../../../theme/darkTheme";
import { lightTheme } from "../../../../../theme/lightTheme";
import { FormEdit } from "../Modals/FormEdit";
import { FormPrint } from "../Modals/FormPrint";
import { Web3Context } from "../../../../../contexts/Web3/Web3Context";

export const FormTable = ({
  forms,
  deleteForms,
  getForms,
  setShowHistorial,
  showHistorial,
  setForms = () => {},
}) => {
  const { web3 } = useContext(Web3Context);

  const [openEdit, setOpenEdit] = useState(false);
  const [openPrint, setOpenPrint] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState({
    filter: "chip",
    search: "",
  });

  const columns = [
    {
      accessorKey: "createdAt",
      header: "Día de registro",
      emptyValue: () => <em></em>,
      type: "date",
      Cell: ({ cell }) => {
        // console.log(cell)
        const date = new Intl.DateTimeFormat("es-ES", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date(cell.row.original.createdAt));
        return date;
      },
    },
    {
      header: "Correlativo",
      accessorKey: "correlativeNumber",
      emptyValue: () => <em></em>,
      Cell: ({ cell }) => {
        const correlativeNumber = cell.row.original.correlativeNumber
          .toString()
          .padStart(8, "0");
        return `${correlativeNumber}`;
      },
    },
    {
      header: "Micro Chip",
      accessorKey: "pet.microchip",
      // emptyValue: () => <em></em>,
      Cell: ({ cell }) => {
        return `${
          cell.row.original.pet.microchip
            ? cell.row.original.pet.microchip
            : "No Disponible"
        }`;
      },
    },
    {
      header: "Mascota",
      accessorKey: "pet.firstNamePet",
      emptyValue: () => <em></em>,
    },
    {
      header: "Adoptante",
      accessorKey: "adopter.firstName",
      emptyValue: () => <em></em>,
      Cell: ({ cell }) => {
        // console.log(cell)
        return `${cell.row.original.adopter.firstName} ${cell.row.original.adopter.firstLastName}`;
      },
    },
    {
      header: "Doc. de identidad",
      accessorKey: "adopter.documentNumber",
      emptyValue: () => <em>null</em>,
      Cell: ({ cell }) => {
        return `${
          cell.row.original.adopter.documentNumber
            ? cell.row.original.adopter.documentNumber
            : "No Disponible"
        }`;
      },
    },
    {
      header: "Pago de registro",
      accessorKey: "isPayment",
      emptyValue: () => <em>null</em>,
      Cell: ({ cell }) => {
        return `${
          cell.row.original.isPayment ? "Se realizó" : "No Se realizó"
        }`;
      },
    },
    {
      header: "Estado del Formulario",
      accessorKey: "status",
      emptyValue: () => <em>null</em>,
      Cell: ({ cell }) => {
        return (
          <>
            {cell.row.original.status === "pending" ? (
              <div className="flex items-center">
                <span className="px-2 text-xs leading-5 font-semibold rounded-full gap-2 w-[90px]">
                  pendiente
                </span>
                <div className="w-4 h-4 bg-yellow-300 rounded-full"></div>
              </div>
            ) : cell.row.original.status === "completed" ? (
              <div className="flex items-center">
                <span className="px-2 text-xs leading-5 font-semibold rounded-full gap-2 w-[90px]">
                  completado
                </span>
                <div className="w-4 h-4 bg-green-300 rounded-full"></div>
              </div>
            ) : cell.row.original.status === "registered-adopter" ? (
              <div className="flex items-center">
                <span className="px-2 flex items-center text-xs leading-5 font-semibold rounded-full gap-2 w-[90px]">
                  adoptante registrado
                </span>
                <div className="w-4 h-4 bg-purple-300 rounded-full"></div>
              </div>
            ) : cell.row.original.status === "registered-pet" ? (
              <div className="flex items-center">
                <span className="px-2 text-xs leading-5 font-semibold rounded-full gap-2 w-[90px]">
                  mascota registrada
                </span>
                <div className="w-4 h-4 bg-orange-300 rounded-full"></div>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="px-2 text-xs leading-5 font-semibold rounded-full gap-2 w-[90px]">
                  registrado
                </span>
                <div className="w-4 h-4 bg-blue-300 rounded-full"></div>
              </div>
            )}
          </>
        );
      },
    },
  ];

  const { currentMode } = useStateContext();

  // console.log(forms[0])

  return (
    <>
      <div className="text-xs	relative dark:text-white mt-10">
        <div className="flex flex-wrap justify-between">
          <div className="flex flex-wrap">
            {showHistorial && (
              <div className="flex gap-2 justify-center items-center flex-wrap">
                <h2 className="text-xl">Ingrese su búsqueda</h2>
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
                    <MenuItem value="correlative">Correlativo</MenuItem>
                  </Select>
                </FormControl>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // getForms(10, 0, e.target[0].value)
                    // getForms(10, 0, filter?.filter, filter?.search)
                    getForms(10, 0, filter);
                  }}
                  className="flex h-full justify-center items-center gap-2"
                >
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
                  <button
                    title="Buscar"
                    className="h-14 w-14 text-gray-400 hover:text-gray-600 transition duration-300 bg-gray-200 dark:bg-gray-700 rounded-full px-2 py-1 focus:outline-none"
                    type="submit"
                  >
                    <SearchIcon className="" />
                  </button>
                </form>
              </div>
            )}
          </div>
          <div className="flex flex-wrap ">
            <button
              title="Historial"
              className="bg-black mb-2 p-3 flex justify-center items-center right-0 top-0 mr-4 mt-4 hover:bg-gray-700 transition rounded-md shadow-md focus:outline-none group"
              onClick={() => {
                setShowHistorial(!showHistorial);
                if (showHistorial) getForms(100);
                if (!showHistorial) setForms([]);
              }}
            >
              {showHistorial ? (
                <>
                  <span className="text-base font-semibold group-hover:text-white text-gray-400 duration-300 ">
                    Volver a Formularios
                  </span>
                  <ChevronRightIcon className="group-hover:text-white text-gray-400 duration-300 " />
                </>
              ) : (
                <>
                  <span className="text-base font-semibold group-hover:text-white text-gray-400 duration-300 ">
                    Buscar Formularios en Historial
                  </span>
                  <ChevronRightIcon className="group-hover:text-white text-gray-400 duration-300 " />
                </>
              )}
            </button>
            <button
              title="Actualizar"
              className="bg-black mb-2 p-3 right-0 top-0 mr-4 mt-4 hover:bg-gray-700 transition rounded-md shadow-md focus:outline-none group"
              onClick={() => {
                getForms();
              }}
            >
              <RefreshIcon className="group-hover:text-white text-gray-400 duration-300 " />
            </button>
            <button
              title="Información"
              className="bg-black mb-2 p-3 right-0 top-0 mr-4 mt-4 hover:bg-gray-700 transition rounded-md shadow-md focus:outline-none group"
              onClick={() => {
                setShow(!show);
              }}
            >
              <InfoIcon className="group-hover:text-white text-gray-400 duration-300 " />
            </button>
          </div>
        </div>
        {show && (
          <div className="relative">
            <div className="absolute right-0 bg-blue-600 bg-opacity-70 rounded-lg px-4 py-4 flex flex-col gap-2 z-50 w-72 h-[430px]">
              <button
                onClick={() => {
                  setShow(!show);
                }}
                className="absolute right-2 top-2 bg-red-500 hover:bg-red-600 transition rounded-full shadow-md focus:outline-none group w-8 h-8 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h1 className="text-lg font-bold">
                Tabla de Estados del Formulario
              </h1>
              <div className="flex items-center">
                <span className="text-base w-56 mr-2">
                  <b>pendiente</b>
                  {` -> cuando el usuario llena el formulario`}
                </span>
                <div className="w-4 h-4 bg-yellow-300 rounded-full"></div>
              </div>
              <div className="flex items-center">
                <span className="text-base w-56 mr-2">
                  <b>completado</b>
                  {` -> cuando el usuario completa el formulario`}
                </span>
                <div className="w-4 h-4 bg-green-300 rounded-full"></div>
              </div>
              <div className="flex items-center">
                <span className="text-base w-56 mr-2">
                  <b>registrado</b>
                  {` -> cuando el usuario es registrado`}
                </span>
                <div className="w-4 h-4 bg-blue-300 rounded-full"></div>
              </div>
              <div className="flex items-center">
                <span className="text-base w-56 mr-2">
                  <b>adoptante registrado</b>
                  {` -> cuando el usuario es registrado y se registra el adoptante`}
                </span>
                <div className="w-4 h-4 bg-purple-300 rounded-full"></div>
              </div>
              <div className="flex items-center">
                <span className="text-base w-56 mr-2">
                  <b>mascota registrada</b>
                  {` -> cuando el usuario es registrado y se registra la mascota`}
                </span>
                <div className="w-4 h-4 bg-orange-300 rounded-full"></div>
              </div>
            </div>
          </div>
        )}
        <ThemeProvider theme={currentMode === "Dark" ? darkTheme : lightTheme}>
          <MaterialReactTable
            header=""
            columns={columns}
            data={forms}
            enableRowSelection={false}
            enableColumnFilterMode
            positionToolbarAlertBanner="bottom"
            enableRowActions={true}
            renderRowActions={({ row, table }) => (
              <>
                <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
                  <Tooltip title="Editar" placement="top">
                    <IconButton
                      color="secondary"
                      onClick={() => {
                        setOpenEdit(true);
                        setSelectedForm(row.original);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  {(web3?.account ===
                    "0x365665cD4D15887314E608a0E6db0A9C1C922710" ||
                    web3?.account ===
                      "0x11c3e8eDCEd034cFCbCF88be14Dc19cB169d9951") && (
                    <Tooltip title="Eliminar" placement="top">
                      <IconButton
                        color="primary"
                        // title='Documentos'
                        onClick={() => {
                          deleteForms(row.original.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  <Tooltip title="Imprimir" placement="top">
                    <IconButton
                      color="success"
                      // title='Documentos'
                      onClick={() => {
                        // firuApi.forms.printForm(row.original.id);
                        // console.log(row.original.id)
                        setOpenPrint(true);
                        setSelectedForm(row.original);
                      }}
                    >
                      <PrintIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </>
            )}
            positionActionsColumn="first"
            actions
          />
        </ThemeProvider>
      </div>

      {openEdit && (
        <FormModal
          isFullScreen={true}
          isButtonTop={true}
          handleClose={setOpenEdit}
          title="Editar Solicitud de Registro de Mascota"
        >
          <FormEdit selectedForm={selectedForm} getForms={getForms} />
        </FormModal>
      )}
      {openPrint && (
        <FormModal
          isFullScreen={true}
          isButtonTop={true}
          handleClose={setOpenPrint}
          title="Impresión"
        >
          <FormPrint selectedForm={selectedForm} />
        </FormModal>
      )}
    </>
  );
};
