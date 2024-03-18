import React from "react";
import { GroupPermit } from "./GroupPermit";
import { TextField } from "@mui/material";

export const InformationTab = ({ info, access }) => {
  console.log({ info, access });
  const data =
    info?.data != "" && info?.data != undefined
      ? JSON.parse(Buffer.from(info.data, "base64").toString())
      : "";
  console.log(data);
  return (
    <div>
      <div className="flex mb-10 mt-6">
        <p className="font-bold">
          ER: <span className="font-normal">{info.registeringEntity}</span>
        </p>
      </div>
      <h2 className="font-bold">Datos:</h2>
      <div>
        <div className="flex flex-col gap-6 mt-5">
          <div className="flex gap-6 w-1/2">
            <TextField
              label="Nombre:"
              value={data.name}
              onChange={() => false}
              variant="standard"
              className="w-full"
            />
            <TextField
              label="Apellido:"
              value={data.lastName}
              onChange={() => false}
              variant="standard"
              className="w-full"
            />
          </div>
          <div className="flex gap-6 w-1/2">
            <TextField
              label="local:"
              value={data.local}
              onChange={() => false}
              variant="standard"
              className="w-full"
            />
            <TextField
              label="Position:"
              value={data.position}
              onChange={() => false}
              variant="standard"
              className="w-full"
            />
          </div>
          <div className="flex gap-6 w-1/2">
            <TextField
              label="Permiso:"
              value={info.permission ? "ACTIVO" : "INACTIVO"}
              onChange={() => false}
              variant="standard"
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="my-10">
        <h2 className="font-bold">Registrar</h2>
        <GroupPermit
          accessValues={access}
          handleAccessValues={() => false}
          show={false}
        />
      </div>
    </div>
  );
};
