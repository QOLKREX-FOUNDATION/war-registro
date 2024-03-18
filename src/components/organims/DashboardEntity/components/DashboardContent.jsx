import React from "react";
import { FormModal } from "../../../molecules/modals/FormModal";
import { RegistryCorrection, Reports, Stadistics } from "./";
import { NewUser } from "./NewUser";

export const DashboardContent = ({ modalType, setShow }) => {
  return (
    <div className="dark:text-white">
      {modalType === "reports" && (
        <FormModal
          title="Generar Reportes"
          handleClose={setShow}
          isFullScreen
          height={`85vh`}
        >
          <Reports />
        </FormModal>
      )}
      {modalType === "stadistics" && (
        <FormModal title="Ver Estadísticas" handleClose={setShow} isFullScreen>
          <Stadistics />
        </FormModal>
      )}
      {modalType === "registry-correction" && (
        <FormModal
          title="Correción de Registro"
          handleClose={setShow}
          isFullScreen
        >
          <RegistryCorrection />
        </FormModal>
      )}
      {modalType === "create-user" && (
        <FormModal title="Crear Usuario" handleClose={setShow} isFullScreen>
          <NewUser />
        </FormModal>
      )}
      {modalType === "er" && (
        <FormModal title="ER" handleClose={setShow} isFullScreen>
          <h1 className="p-20">En construccion</h1>
        </FormModal>
      )}
    </div>
  );
};
