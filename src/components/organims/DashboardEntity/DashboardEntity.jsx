import React, { useState } from "react";
import {
  // Pets as PetsIcon,
  PetsOutlined as PetsIcon,
  ColorLensOutlined as ColorLensOutlinedIcon,
  FormatListNumberedRtlOutlined as FormatListNumberedRtlOutlinedIcon,
  Bathroom as BathroomIcon,
  DocumentScannerOutlined as DocumentScannerOutlinedIcon,
  BarChartOutlined as BarChartOutlinedIcon,
  InfoOutlined as InfoOutlinedIcon,
  Payment as PaymentIcon,
  ContentCut as ContentCutIcon,
  PhoneIphoneSharp as PhoneIphoneSharpIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { HomeSectionContainer } from "../../containers/HomeSectionContainer";
// import { FormModal } from '../../molecules/modals/FormModal';
import { DashboardContent } from "./components";

export const DashboardEntity = () => {
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("");
  return (
    <HomeSectionContainer>
      <div className="text-start w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
        <h2 className="font-extrabold text-black dark:text-white">
          <span className="block text-4xl">Administrar la Entidad</span>
          <span className="block text-3xl text-sky-500">
            Aqui podrás administrar la información de su entidad registradora
          </span>
        </h2>
        <div className="flex flex-wrap gap-x-5 gap-y-7 grid-flow-row-dense mt-20 dark:text-white text-black">
          <button
            onClick={() => {
              setShow(true);
              setModalType("er");
            }}
            className="flex items-center w-full max-w-[250px] border border-gray-200 hover:border-white px-3 py-1 rounded-md dark:hover:bg-gray-500 transition hover:bg-gray-300"
          >
            <PersonIcon className="text-4xl" />
            <div className="flex flex-col items-start pl-2">
              <h2 className="text-xl font-bold">ER</h2>
              <p className="text-gray-500 dark:text-white text-left">
                Entidad Registradora
              </p>
            </div>
          </button>
          <button
            onClick={() => {
              setShow(true);
              setModalType("create-user");
            }}
            className="flex items-center w-full max-w-[250px] border border-gray-200 hover:border-white px-3 py-1 rounded-md dark:hover:bg-gray-500 transition hover:bg-gray-300"
          >
            <PersonIcon className="text-4xl" />
            <div className="flex flex-col items-start pl-2">
              <h2 className="text-xl font-bold">Crear Usuario</h2>
              <p className="text-gray-500 dark:text-white text-left">
                Creación de un nuevo usuario
              </p>
            </div>
          </button>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-7 grid-flow-row-dense mt-20 dark:text-white text-black">
          <button
            onClick={() => {
              setShow(true);
              setModalType("reports");
            }}
            className="flex items-center w-full max-w-[250px] border border-gray-200 hover:border-white px-3 py-1 rounded-md dark:hover:bg-gray-500 transition hover:bg-gray-300"
          >
            <DocumentScannerOutlinedIcon className="text-4xl" />
            <div className="flex flex-col items-start pl-2">
              <h2 className="text-xl font-bold">Reportes</h2>
              <p className="text-gray-500 dark:text-white">
                Generación de reportes
              </p>
            </div>
          </button>
          <button
            onClick={() => {
              setShow(true);
              setModalType("stadistics");
            }}
            className="flex items-center w-full max-w-[250px] border border-gray-200 hover:border-white px-3 py-1 rounded-md dark:hover:bg-gray-500 transition hover:bg-gray-300"
          >
            <BarChartOutlinedIcon className="text-4xl" />
            <div className="flex flex-col items-start pl-2">
              <h2 className="text-xl font-bold">Estadísticas</h2>
              <p className="text-gray-500 dark:text-white text-left">
                Visualización de estadísticas
              </p>
            </div>
          </button>
          <button
            onClick={() => {
              setShow(true);
              setModalType("registry-correction");
            }}
            className="flex items-center w-full max-w-[250px] border border-gray-200 hover:border-white px-3 py-1 rounded-md dark:hover:bg-gray-500 transition hover:bg-gray-300"
          >
            <InfoOutlinedIcon className="text-4xl" />
            <div className="flex flex-col items-start pl-2">
              <h2 className="text-xl font-bold">Correción de Registro</h2>
              <p className="text-gray-500 dark:text-white text-left">
                Corregir información de la mascota
              </p>
            </div>
          </button>
        </div>
      </div>
      {show && <DashboardContent modalType={modalType} setShow={setShow} />}
    </HomeSectionContainer>
  );
};
