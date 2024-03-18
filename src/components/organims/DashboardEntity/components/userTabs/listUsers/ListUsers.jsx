import React, { useContext, useEffect, useState } from "react";
import { Web3Context } from "../../../../../../contexts/Web3/Web3Context";
import {
  Users,
  deleteUser,
  getErUsers,
} from "../../../../../../utils/war/UsersSystem";
import { registeringEntity } from "../../../../../../utils/war/RegisteringEntities";
import Swal from "sweetalert2";
import { PreloaderContext } from "../../../../../../contexts/Preloader/PreloaderContext";

export const ListUsers = () => {
  const { web3 } = useContext(Web3Context);
  const [listUsers, setListUsers] = useState([]);
  const { handlePreloader } = useContext(PreloaderContext);
  const [max, setMax] = useState(0);
  const [filterSearchUsers, setFilterSearchUsers] = useState([]);

  // console.log(web3);

  const getUsers = async () => {
    setListUsers([]);

    try {
      const array = await getErUsers(web3.wallet, web3.account);
      const userPromises = array.map(async (address) => {
        try {
          const resolve = await Users(web3.wallet, address);

          if (resolve.data !== "") {
            resolve.data = JSON.parse(
              Buffer.from(resolve.data, "base64").toString()
            );
          }

          setListUsers((prevList) => [...prevList, { address, ...resolve }]);
        } catch (e) {
          console.log(e);
        }
      });

      await Promise.all(userPromises);
    } catch (error) {
      console.log(error);
    }
  };
  const getEr = async () => {
    try {
      const resolve = await registeringEntity(web3.wallet, web3.account);
      setMax(resolve.max);
    } catch (e) {
      setMax(0);
      console.log(e);
    }
  };

  const handleDelete = (event, address) => {
    handlePreloader(true);
    deleteUser(web3.wallet, web3.account, address)
      .then((resolve) => {
        console.log(resolve)
        if(!resolve) {
          handlePreloader(false);
          return Swal.fire("Error", "No se pudo eliminar el usuario", "error");
        }
        Swal.fire("Eliminado", "Usuario eliminado", "success");
        handlePreloader(false);
        getUsers();
        getEr();
      })
      .catch((e) => {
        handlePreloader(false);
        Swal.fire("Error", "No se pudo eliminar el usuario", "error");
        console.log(e);
      });
  };

  useEffect(() => {
    getUsers();
  }, [web3.account]);

  useEffect(() => {
    getEr();
  }, [web3.account]);

  return (
    <div className="flex flex-col gap-4">
      <h1>Lista de usuarios</h1>
      <div className="flex justify-between items-center">
        <p>
          Cantidad de Usuarios: {listUsers.length} / {max}
        </p>
        <div className="flex gap-3 items-center">
          <p>Buscar: </p>
          <input
            className="border border-black rounded-lg px-2"
            type="text"
            onChange={(e) => {
              if (e.target.value === "") return setFilterSearchUsers([]);
              const filter = listUsers.filter((user) => {
                return (
                  user.data.name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                  user.data.lastName
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                  user.address
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
                );
              });
              setFilterSearchUsers(filter);
            }}
          />
        </div>
      </div>
      <di className="flex flex-col gap-6 mt-5">
        {filterSearchUsers.length > 0
          ? filterSearchUsers.map((user, index) => (
              <div
                className="flex w-full justify-between items-center bg-gray-50 px-10 py-3 rounded-md shadow-xl"
                key={index}
              >
                <h3>
                  {user.address} <br />
                  Usuario:{" "}
                  {user.data.typePerson === "NATURAL" && user.data.name}{" "}
                  {user.data.typePerson === "JURIDIC"
                    ? user.data.local
                    : user.data.lastName}
                </h3>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded-md shadow-md hover:opacity-70 transition-opacity"
                  onClick={(e) => {
                    Swal.fire({
                      title: "¿Estas seguro?",
                      text: "No podrás revertir esto!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Si, borrar!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDelete(e, user.address);
                      }
                    });
                  }}
                >
                  Borrar
                </button>
              </div>
            ))
          : listUsers.map((user, index) => (
              <div
                className="flex w-full justify-between items-center bg-gray-50 px-10 py-3 rounded-md shadow-xl"
                key={index}
              >
                <h3>
                  {user.address} <br />
                  Usuario:{" "}
                  {user.data.typePerson === "NATURAL" && user.data.name}
                  {user.data.typePerson === "JURIDIC"
                    ? user.data.local
                    : user.data.lastName}
                </h3>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded-md shadow-md hover:opacity-70 transition-opacity"
                  onClick={(e) => {
                    Swal.fire({
                      title: "¿Estas seguro?",
                      text: "No podrás revertir esto!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Si, borrar!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDelete(e, user.address);
                      }
                    });
                  }}
                >
                  Borrar
                </button>
              </div>
            ))}
      </di>
    </div>
  );
};
