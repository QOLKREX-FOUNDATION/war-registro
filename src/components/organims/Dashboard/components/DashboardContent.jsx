import React from "react";
import { FormModal } from "../../../molecules/modals/FormModal";
import { Race, Animal, Color } from "./";
import { Reports } from "./Reports";
import { Stadistics } from "./Stadistics";
import { Forms } from "./Forms";
import { CodePhone } from "./CodePhone";
import { DocumentsManage } from "./Forms/DocumentsManage";
import { UpdateUser } from "./UpdateUser";

export const DashboardContent = ({ modalType, setShow }) => {
  return (
    <div className="dark:text-white">
      {modalType === "bath" && (
        <FormModal title="Gestión de Baños" handleClose={setShow}>
          <div className="flex flex-col items-center justify-center"></div>
        </FormModal>
      )}
      {modalType === "points" && (
        <FormModal title="Gestión de Puntos" handleClose={setShow}>
          <div className="flex flex-col items-center justify-center"></div>
        </FormModal>
      )}
      {modalType === "cuts" && (
        <FormModal title="Gestión de Cortes" handleClose={setShow}>
          <div className="flex flex-col items-center justify-center"></div>
        </FormModal>
      )}
      {modalType === "reports" && (
        <FormModal title="Generar Reportes" handleClose={setShow}>
          <Reports />
        </FormModal>
      )}
      {modalType === "stadistics" && (
        <FormModal title="Ver Estadísticas" handleClose={setShow}>
          <Stadistics />
        </FormModal>
      )}
      {modalType === "race" && (
        <FormModal title="Gestión de Razas" handleClose={setShow}>
          <Race />
        </FormModal>
      )}
      {modalType === "animal" && (
        <FormModal title="Gestión de Animales" handleClose={setShow}>
          <Animal />
        </FormModal>
      )}
      {modalType === "colors" && (
        <FormModal title="Gestión de Colores" handleClose={setShow}>
          <Color />
        </FormModal>
      )}
      {modalType === "forms" && (
        <FormModal
          title="Gestión de Formularios"
          handleClose={setShow}
          height="h-[90vh]"
          isFullScreen
        >
          <Forms />
        </FormModal>
      )}
      {modalType === "code_phone" && (
        <FormModal
          title="Gestión de Países y Códigos"
          handleClose={setShow}
          isFullScreen
        >
          <CodePhone />
        </FormModal>
      )}
      {modalType === "documents" && (
        <FormModal
          title="Gestión de Documentos"
          handleClose={setShow}
          isFullScreen
        >
          <DocumentsManage />
        </FormModal>
      )}
      {modalType === "update-user" && (
        <FormModal
          title="Actualizar Usuario"
          handleClose={setShow}
          isFullScreen
        >
          <UpdateUser />
        </FormModal>
      )}
    </div>
  );
};
