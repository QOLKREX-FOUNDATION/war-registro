import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { firuApi } from "../../../../../../api";
import { Web3Context } from "../../../../../contexts/Web3/Web3Context";
import { FormSelect } from "./FormSelect";

export const DocumentsManage = () => {
  const [show, setShow] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [countries, setCountries] = useState([]);
  const [documentsData, setDocumentsData] = useState({});
  const [searchChange, setSearchChange] = useState("");
  // const [imageURL, setImageURL] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      id: "",
      name: "",
      minDigits: "",
      maxDigits: "",
      countries: "",
    },
    mode: "onBlur",
  });

  const { web3 } = useContext(Web3Context);

  const getDocuments = (limit = 10, offset = 0, search = "") => {
    if (search !== "") {
      firuApi
        .get(`/document?limit=${limit}&offset=${offset}&search=${search}`, {
          headers: {
            "x-token": web3.authToken,
          },
        })
        .then((res) => {
          console.log(res);
          setDocuments(res.data.documents);
          setDocumentsData({
            total: res.data.total,
            pagination: res.data.pagination,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }

    console.log("getCodes");
    firuApi
      .get(`/document?limit=${limit}&offset=${offset}`, {
        headers: {
          "x-token": web3.authToken,
        },
      })
      .then((res) => {
        setDocuments(res.data.documents);
        console.log(res);
        setDocumentsData({
          total: res.data.total,
          pagination: res.data.pagination,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteDocument = (id) => {
    console.log("delete document");
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        firuApi
          .delete(`/document/${id}`, {
            headers: {
              "x-token": web3.authToken,
            },
          })
          .then((res) => {
            console.log(res);
            Swal.fire({
              icon: "success",
              title: "Documento eliminado correctamente",
              showConfirmButton: false,
              timer: 1500,
            });
            getDocuments();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const onSubmit = (data) => {
    // console.log(data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("minDigits", data.minDigits);
    formData.append("maxDigits", data.maxDigits);
    formData.append("countries", data.countries);

    watch("id")
      ? firuApi
          .put(`/document/${watch("id")}`, formData, {
            headers: {
              "x-token": web3.authToken,
            },
          })
          .then((res) => {
            console.log(res);
            reset();
            Swal.fire({
              icon: "success",
              title: "Documento editado correctamente",
              showConfirmButton: false,
              timer: 1500,
            });
            setShow(false);
            getDocuments();
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Error al editar documento",
              showConfirmButton: false,
              timer: 1500,
            });
          })
      : firuApi
          .post("/document", formData, {
            headers: {
              "x-token": web3.authToken,
            },
          })
          .then((res) => {
            console.log(res);
            reset();
            Swal.fire({
              icon: "success",
              title: "Documento agregado correctamente",
              showConfirmButton: false,
              timer: 1500,
            });
            setShow(false);
            getDocuments();
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              icon: "error",
              title: "Error al agregar documento",
              showConfirmButton: false,
              timer: 1500,
            });
          });

    window.onbeforeunload = undefined;
  };

  const handlePrev = () => {
    if (searchChange !== "") {
      getDocuments(
        10,
        10 * (documentsData?.pagination?.prevPage - 1),
        searchChange
      );
      return;
    }
    getDocuments(10, 10 * (documentsData?.pagination?.prevPage - 1));
  };

  const handleNext = () => {
    if (
      documentsData?.pagination?.currentPage ===
      documentsData?.pagination?.totalPages
    )
      return;
    if (searchChange !== "") {
      getDocuments(
        10,
        10 * (documentsData?.pagination?.prevPage + 1),
        searchChange
      );
      return;
    }
    getDocuments(10, 10 * (documentsData?.pagination?.prevPage + 1));
  };

  // const handleImageChange = (e) => {
  //     const file = e.target.files[0];
  //     if (file) {
  //         const url = URL.createObjectURL(file);
  //         setImageURL(url);
  //     }
  // };

  const getCountries = (limit = 100, offset = 0, search = "") => {
    firuApi
      .get(`/code?limit=${limit}&offset=${offset}`, {
        headers: {
          "x-token": web3.authToken,
        },
      })
      .then((res) => {
        console.log({ countries: res.data.codes });
        const formatCountries = res.data.codes.map((country) => {
          return {
            value: country.id,
            label: country.name,
          };
        });
        setCountries(formatCountries);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCountries();
    getDocuments();
  }, []);

  useEffect(() => {
    if (isDirty) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = undefined; // Restablece el evento
    }
  }, [isDirty]);

  const handleCloseModal = () => {
    if (isDirty) {
      // Si el formulario se ha modificado, muestra una confirmación antes de cerrar el modal
      Swal.fire({
        title: "¿Guardar cambios?",
        text: "¿Deseas guardar los cambios antes de salir?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Salir sin guardar",
      }).then((result) => {
        if (result.isConfirmed) {
          // Guarda los cambios
          handleSubmit(onSubmit)();
        } else {
          setShow(false);
          reset();
        }
      });
    }

    setShow(false);
    reset();
  };

  // console.log({ image: watch("image")[0] })

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex justify-between">
        <div className="flex flex-col gap-2">
          <span>Total de Documento</span>
          <span>{documentsData.total}</span>
        </div>

        <div className="w-full max-w-xl flex">
          <form
            className="flex items-center justify-between w-full gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              getDocuments(10, 0, searchChange);
            }}
          >
            <input
              type="text"
              placeholder="Buscar"
              className="input-text w-full px-10"
              onChange={(e) => setSearchChange(e.target.value)}
              value={searchChange}
            />
            <button
              type="submit"
              className="flex items-center justify-center px-3 hover:bg-blue-600 py-1.5 rounded-md"
              title="Buscar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.5 15.5l5.5 5.5"
                />
                <circle
                  cx={11}
                  cy={11}
                  r={7}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                />
              </svg>
            </button>
            <button
              type="button"
              title="Limpiar"
              onClick={() => {
                setSearchChange("");
                getDocuments();
              }}
              className="flex items-center justify-center px-3 hover:bg-blue-600 py-1.5 rounded-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5.039 5.062a7 7 0 0 0 9.91 9.89m1.584 -2.434a7 7 0 0 0 -9.038 -9.057"></path>
                <path d="M3 3l18 18"></path>
              </svg>
            </button>
          </form>
        </div>

        <div className="flex items-center gap-2">
          <select
            name=""
            id=""
            className="input-text"
            onChange={(e) => {
              console.log(e.target.value);
              getDocuments(10, 10 * (e.target.value - 1));
            }}
          >
            {[...Array(documentsData?.pagination?.totalPages)].map((_, i) => {
              return (
                <option value={i + 1} key={i + 1}>
                  {i + 1}
                </option>
              );
            })}
          </select>
          <button
            onClick={() => setShow(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md h-8"
          >
            Agregar Documento
          </button>
        </div>
      </div>
      {/* list documents */}
      <div className="w-full flex flex-col items-start justify-center">
        <table className="border mt-3 min-w-max w-full table-auto">
          <thead>
            <tr className="text-gray-600 uppercase text-sm leading-normal">
              <th className="px-3 py-2 text-left text-gray-600 dark:text-white font-normal">
                Indice
              </th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-white font-normal">
                Nombre
              </th>

              <th className="px-3 py-2 text-left text-gray-600 dark:text-white font-normal">
                Mínimo Número de Dígitos
              </th>

              <th className="px-3 py-2 text-left text-gray-600 dark:text-white font-normal">
                Máximo Número de Dígitos
              </th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-white font-normal">
                Países
              </th>
              <th className="px-3 py-2 text-left text-gray-600 dark:text-white font-normal">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 dark:text-white">
            {documents.map((document, i) => {
              return (
                <tr key={document.id} className="bg-gray-100 dark:bg-gray-700">
                  <td className="px-3 py-2">{i + 1}</td>
                  <td className="px-3 py-2">
                    <div className="flex max-w-sm">
                      <span>{document.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">{document?.minDigits}</td>
                  <td className="px-3 py-2">{document?.maxDigits}</td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2 flex-wrap max-w-sm">
                      {document?.countries?.map((country) => {
                        return (
                          <span
                            key={country._id}
                            className="text-sm bg-gray-500 rounded-xl py-2 px-3"
                          >
                            {country.name}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-3 py-2 flex gap-4">
                    <button
                      onClick={() => {
                        console.log(document);
                        setValue("id", document.id);
                        setValue("name", document.name);
                        setValue("phoneCode", document.phoneCode);
                        setValue("countryCode", document.countryCode);
                        setValue("minDigits", document.minDigits);
                        setValue("maxDigits", document.maxDigits);
                        setValue(
                          "countries",
                          document.countries
                            .map((country) => country._id)
                            .join(",")
                        );
                        setShow(true);
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md flex gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                      Editar
                    </button>
                    <button
                      onClick={() => {
                        deleteDocument(document.id);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
            {documents.length === 0 && (
              <tr className="bg-gray-100 dark:bg-gray-700">
                <td className="px-3 py-2 text-center" colSpan="5">
                  No hay Documento registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {documentsData && (
          <div className="w-full flex justify-center items-center gap-2 mt-3">
            <span>paginación</span>
            <button
              disabled={documentsData?.pagination?.currentPage === 1}
              onClick={() => {
                // console.log(animalsData?.pagination?.prevPage)
                // getAnimals(10, 10 * (animalsData?.pagination?.prevPage - 1))
                handlePrev();
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md disabled:opacity-50"
            >
              Anterior
            </button>
            {/* <select name="" id="" className="input-text">
                            {
                                [...Array(animalsData?.pagination?.totalPages)].map((_, i) => {
                                    return (
                                        <option value={i + 1} key={i + 1}>{i + 1}</option>
                                    )
                                })
                            }
                        </select>
                        <span>
                            de
                        </span> */}
            <span>
              {documentsData?.pagination?.currentPage} de
              {documentsData?.pagination?.totalPages}
            </span>
            <button
              disabled={
                documentsData?.pagination?.currentPage ===
                documentsData?.pagination?.totalPages
              }
              onClick={() => {
                // console.log(animalsData?.pagination?.nextPage)
                // if (animalsData?.pagination?.currentPage === animalsData?.pagination?.totalPages) return;
                // getAnimals(10, 10 * (animalsData?.pagination?.prevPage + 1))
                handleNext();
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
      {show && (
        <>
          <div
            onClick={handleCloseModal}
            className="flex flex-col items-center justify-center fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 bg-blend-darken z-50"
          ></div>
          {
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="fixed flex flex-col gap-4 w-full max-w-md bg-white dark:bg-gray-800 px-5 py-5 z-[100] mt-20"
            >
              <button
                onClick={handleCloseModal}
                type="button"
                className="self-end absolute top-7 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500 hover:text-red-600 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              {watch("id") ? (
                <h1 className="text-2xl font-bold">Editar Documento</h1>
              ) : (
                <h1 className="text-2xl font-bold">Agregar Documento</h1>
              )}

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  className="input-text uppercase"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "El nombre es requerido",
                    },
                    minLength: {
                      value: 3,
                      message: "El nombre debe tener al menos 3 caracteres",
                    },
                  })}
                  placeholder="Ej. DNI"
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="minDigits">Mínimo de Dígitos</label>
                <input
                  type="text"
                  className="input-text uppercase"
                  {...register("minDigits", {
                    required: {
                      value: true,
                      message: "La nacionalidad es requerido",
                    },
                  })}
                  placeholder="Ej. 7"
                />
                {errors.minDigits && (
                  <span className="text-red-500 text-sm">
                    {errors.minDigits.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="maxDigits">Máximo de Dígitos</label>
                <input
                  type="text"
                  className="input-text uppercase"
                  {...register("maxDigits", {
                    required: {
                      value: true,
                      message: "La nacionalidad es requerido",
                    },
                  })}
                  placeholder="Ej. 9"
                />
                {errors.maxDigits && (
                  <span className="text-red-500 text-sm">
                    {errors.maxDigits.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {/* <label htmlFor="countries">Nacionalidad</label>
                                <input
                                    type="text"
                                    className="input-text uppercase"
                                    {
                                    ...register("countries", {
                                        required: {
                                            value: true,
                                            message: "La nacionalidad es requerido"
                                        },
                                    })
                                    }
                                    placeholder="Ej. Peruano"
                                /> */}
                <FormSelect
                  label="Países"
                  property="countries"
                  options={countries}
                  value={countries.filter((country) =>
                    watch("countries")?.split(",").includes(country.value)
                  )}
                  values={register}
                  watch={watch}
                  setValue={setValue}
                  error={errors}
                  onChange={(target) => {
                    console.log({ target });
                    const arr = target.map((t) => t.value);
                    // setValue("countries", target.value);
                    setValue("countries", arr.join(","));
                    // if (target.length < 4) {
                    // }
                  }}
                  required
                  isMulti
                />
                {errors.countries && (
                  <span className="text-red-500 text-sm">
                    {errors.countries.message}
                  </span>
                )}
              </div>
              {/* button save */}
              {watch("id") ? (
                <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md">
                  Editar
                </button>
              ) : (
                <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md">
                  Guardar
                </button>
              )}
            </form>
          }
        </>
      )}
    </div>
  );
};
