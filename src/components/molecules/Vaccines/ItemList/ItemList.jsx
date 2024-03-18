import { useState } from "react";
import { useEffect } from "react";
import { IPFS } from "../../../../config";
import { useWeb3Context } from "../../../../contexts";
import { formatDate } from "../../../../utils/date";
import { permisionActive } from "../../../../utils/war/permissionVerifi";
import { Informative } from "../../modals/Informative/Informative";
import { useRaceVaccines } from "../hooks/useRaceVacines";

export const ItemList = ({
  petValues,
  item,
  resetVaccine,
  handleSelection,
  handleFinish,
  setUpdate,
  index,
}) => {
  const { web3 } = useWeb3Context();
  const { listVaccines, handleListVaccines } = useRaceVaccines();

  const [illness, setIllness] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    handleListVaccines(petValues.type);
  }, [petValues.type]);

  useEffect(() => {
    const temp = [];
    listVaccines.map((value) => {
      item.illness[value.value] && temp.push(value["es-Es"]);
    });
    setIllness(temp);
  }, [listVaccines]);

  return (
    <>
      <div className="flex items-center bg-white justify-between shadow-xl	px-4 py-2 text-sm">
        <p className="uppercase">
          {item.type === "VACCINES" ? "Vacuna" : "Desparasitación"} -{" "}
          {item.product}
          <br className="marginPaddingNone" />
          <span className="font-bold">
            Fecha de Colocación: {formatDate(item.date)}-{" "}
          </span>
          <span className="font-bold">Próxima dosis: </span>
          {formatDate(item.next)}
          <br className="marginPaddingNone" />
          <span className="text-xs">{illness.join(", ")}</span>
        </p>

        <div className="flex gap-3">
          <a
            className="flex justify-center py-2 px-4   w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-sky-700"
            href={`${IPFS}${item.image}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            <img
              className="h-4"
              src="/img/icons/buttons/pet.png"
              alt="pet"
              title="Ver Comprobante"
            />
          </a>

          {permisionActive(web3.account, 5, 2) && (
            <button
              className="flex justify-center py-2 px-4   w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-green-500"
              onClick={() => {
                setUpdate({ index, image: item.image });
                delete item.image;
                resetVaccine(item);
                handleSelection("register");
              }}
            >
              <img
                className="h-4"
                src="/img/icons/buttons/see.png"
                alt="SEE"
                title="Editar Vacuna"
              />
            </button>
          )}
          {permisionActive(web3.account, 5, 3) && (
            <button
              className="flex justify-center py-2 px-4  w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-red-500"
              onClick={() => setOpen(true)}
            >
              <img
                className="h-4"
                src="/img/icons/buttons/delete.png"
                alt="delete"
                title="Eliminar Vacuna"
              />
            </button>
          )}
        </div>
      </div>

      {open && (
        <Informative handleClose={() => setOpen(false)}>
          <div>
            <h5>¿Está seguro de que desea eliminar el Registro del animal?</h5>
          </div>
          <hr />
          <p className="mb-4">
            Una vez borrado, no podra recuperarse la vacuna
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="flex justify-center py-2 px-4  w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-slate-500 text-white"
              onClick={() => setOpen(false)}
            >
              Cerrar
            </button>
            <button
              className="flex justify-center py-2 px-4  w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-red-500 text-white"
              onClick={() => {
                handleFinish({
                  web3: web3.wallet,
                  account: web3.account,
                  token: web3.authToken,
                  petValues,
                  vaccine: {},
                  resetVaccineVaccine: resetVaccine,
                  index,
                  method: "delete",
                });
                setOpen(false);
              }}
            >
              Eliminar
            </button>
          </div>
        </Informative>
      )}
    </>
  );
};
