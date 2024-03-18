import React, { useContext, useEffect, useState } from "react";
import { FormModal } from "../../../molecules/modals/FormModal";
import { useForm } from "react-hook-form";
import { firuApi } from "../../../../../api";
import { Web3Context } from "../../../../contexts/Web3/Web3Context";
import Swal from "sweetalert2";
import { WarContext } from "../../../../contexts/War/WarContext";

export const Race = () => {
    const [show, setShow] = useState(false);
    const [races, setRaces] = useState([]);
    const [racesData, setRacesData] = useState({});
    const [searchChange, setSearchChange] = useState('');

    const { speciesData } = useContext(WarContext);
    console.log(speciesData)
    // const [selectedRace, setSelectedRace] = useState({});
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            id: "",
            animal: "",
            name: "",
            nameSpanish: "",
            nameEnglish: "",
        },
        mode: "onBlur",
    });

    const { web3 } = useContext(Web3Context);

    const getRaces = (limit = 10, offset = 0, search = '') => {

        if (search !== '') {
            firuApi.get(`/races?limit=${ limit }&offset=${ offset }&search=${ search }`, {
                headers: {
                    'x-token': web3.authToken
                },
            }).then((res) => {
                setRaces(res.data.races)
                console.log(res);
                setRacesData({
                    total: res.data.total,
                    pagination: res.data.pagination,
                })
            })
                .catch((err) => {
                    console.log(err);
                });
            return;
        }

        console.log("getRazas")
        firuApi.get(`/races?limit=${ limit }&offset=${ offset }`, {
            headers: {
                'x-token': web3.authToken
            },
        }).then((res) => {
            setRaces(res.data.races)
            console.log(res);
            setRacesData({
                total: res.data.total,
                pagination: res.data.pagination,
            })
        })
            .catch((err) => {
                console.log(err);
            });
    }

    const deleteRace = (id) => {
        console.log("deleteRaza")
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
                firuApi.delete(`/races/${ id }`, {
                    headers: {
                        'x-token': web3.authToken
                    },
                }).then((res) => {
                    console.log(res);
                    Swal.fire({
                        icon: "success",
                        title: "Raza eliminada correctamente",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    getRaces();
                })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    }


    const onSubmit = (data) => {
        // console.log(data);

        watch("id") ?
            firuApi.put(`/races/${ watch("id") }`, {
                animal: data.animal.toUpperCase(),
                name: data.name.toUpperCase(),
                nameSpanish: data.nameSpanish.toUpperCase(),
                nameEnglish: data.nameEnglish.toUpperCase(),
            }, {
                headers: {
                    'x-token': web3.authToken
                },
            })
                .then((res) => {
                    console.log(res);
                    reset();
                    Swal.fire({
                        icon: "success",
                        title: "Raza editada correctamente",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setShow(false);
                    getRaces();
                }
                )
                .catch((err) => {
                    console.log(err);
                }
                )
            :
            firuApi.post("/races", {
                animal: data.animal.toUpperCase(),
                name: data.name.toUpperCase(),
                nameSpanish: data.nameSpanish.toUpperCase(),
                nameEnglish: data.nameEnglish.toUpperCase(),
            }, {
                headers: {
                    'x-token': web3.authToken
                },
            })
                .then((res) => {
                    console.log(res);
                    reset();
                    Swal.fire({
                        icon: "success",
                        title: "Raza agregada correctamente",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setShow(false);
                    getRaces();
                }
                )
                .catch((err) => {
                    console.log(err);
                }
                );

    };

    // const handleSearchRace = (e) => {
    //     console.log(e.target.value)
    //     if (e.target.value === "") {
    //         getRaces(10, 0, e.target.value);
    //         return;
    //     }
    // }

    const handlePrev = () => {
        if (searchChange !== '') {
            getRaces(10, 10 * (racesData?.pagination?.prevPage - 1), searchChange)
            return;
        }
        getRaces(10, 10 * (racesData?.pagination?.prevPage - 1))
    }

    const handleNext = () => {
        if (racesData?.pagination?.currentPage === racesData?.pagination?.totalPages) return;
        if (searchChange !== '') {
            getRaces(10, 10 * (racesData?.pagination?.prevPage + 1), searchChange)
            return;
        }
        getRaces(10, 10 * (racesData?.pagination?.prevPage + 1))
    }

    useEffect(() => {
        getRaces();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full flex justify-between">

                <div className="flex flex-col gap-2">
                    <span>Total de Razas</span>
                    <span>
                        {
                            racesData.total
                        }
                    </span>
                </div>

                <div className="w-full max-w-xl flex">
                    <form
                        className="flex items-center justify-between w-full gap-2"
                        onSubmit={(e) => {
                            e.preventDefault();
                            getRaces(10, 0, searchChange);
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
                                setSearchChange('')
                                getRaces()
                            }}
                            className="flex items-center justify-center px-3 hover:bg-blue-600 py-1.5 rounded-md"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none">
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
                            console.log(e.target.value)
                            console.log(racesData?.pagination?.totalPages)
                            getRaces(10, 10 * (e.target.value - 1), searchChange)
                        }
                        }
                    >
                        {
                            [...Array(racesData?.pagination?.totalPages)].map((_, i) => {
                                return (
                                    <option
                                        value={i + 1} key={i + 1}
                                    >
                                        {i + 1}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <button
                        onClick={() => setShow(true)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md h-8"
                    >
                        Agregar Raza
                    </button>
                </div>
            </div>
            {/* list races */}
            <div className="w-full flex flex-col items-start justify-center">
                <table className="border mt-3 min-w-max w-full table-auto">
                    <thead>
                        <tr className="text-gray-600 uppercase text-sm leading-normal">
                            <th className="px-3 py-2 text-left text-gray-600 dark:text-white font-normal">
                                ANIMAL
                            </th>
                            <th className="px-3 py-2 text-left text-gray-600 dark:text-white font-normal">
                                Nombre
                            </th>
                            <th className="px-3 py-2 text-left text-gray-600 dark:text-white font-normal">
                                Nombre Español
                            </th>
                            <th className="px-3 py-2 text-left text-gray-600 dark:text-white font-normal">
                                Nombre Inglés
                            </th>
                            <th className="px-3 py-2 text-left text-gray-600 dark:text-white font-normal">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 dark:text-white">
                        {
                            races.map((race) => {
                                return (
                                    <tr
                                        key={race.id}
                                        className="bg-gray-100 dark:bg-gray-700">
                                        <td className="px-3 py-2">{race.animal}</td>
                                        <td className="px-3 py-2">{race.name}</td>
                                        <td className="px-3 py-2">{race.nameSpanish}</td>
                                        <td className="px-3 py-2">{race.nameEnglish}</td>
                                        <td className="px-3 py-2 flex gap-4">
                                            <button
                                                onClick={() => {
                                                    console.log(race)
                                                    setValue("id", race.id)
                                                    setValue("name", race.name)
                                                    setValue("nameEnglish", race.nameEnglish)
                                                    setValue("nameSpanish", race.nameSpanish)
                                                    setShow(true);
                                                }}
                                                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md flex gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                                </svg>

                                                Editar
                                            </button>
                                            <button
                                                onClick={() => {
                                                    deleteRace(race.id)
                                                }}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md flex gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>

                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        {
                            races.length === 0 && (
                                <tr className="bg-gray-100 dark:bg-gray-700">
                                    <td className="px-3 py-2 text-center" colSpan="5">No hay razas registradas</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
                {
                    racesData &&
                    <div className="w-full flex justify-center items-center gap-2 mt-3">
                        <span>paginación</span>
                        <button
                            disabled={racesData?.pagination?.currentPage === 1}
                            onClick={() => {
                                // console.log(racesData?.pagination?.prevPage)
                                // getRaces(10, 10 * (racesData?.pagination?.prevPage - 1))
                                handlePrev()
                            }}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        {/* <select name="" id="" className="input-text">
                            {
                                [...Array(racesData?.pagination?.totalPages)].map((_, i) => {
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
                            {racesData?.pagination?.currentPage} de
                            {racesData?.pagination?.totalPages}
                        </span>
                        <button
                            disabled={racesData?.pagination?.currentPage === racesData?.pagination?.totalPages}
                            onClick={() => {
                                // console.log(racesData?.pagination?.nextPage)
                                // if (racesData?.pagination?.currentPage === racesData?.pagination?.totalPages) return;
                                // getRaces(10, 10 * (racesData?.pagination?.prevPage + 1))
                                handleNext()
                            }}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md disabled:opacity-50"
                        >
                            Siguiente
                        </button>
                    </div>
                }
            </div>
            {show && (
                <div className="flex flex-col items-center justify-center fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 bg-blend-darken z-50">
                    {
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="flex flex-col gap-4 w-full max-w-md bg-white dark:bg-gray-800 px-5 py-5 relative"
                        >
                            <button
                                onClick={() => {
                                    setShow(false)
                                    reset()
                                }}
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
                            {
                                watch("id") ?
                                    <h1 className="text-2xl font-bold">Editar Raza</h1>
                                    :
                                    <h1 className="text-2xl font-bold">Agregar Raza</h1>
                            }
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">Animal</label>
                                <select
                                    id="animal"
                                    className="input-text uppercase"
                                    {
                                    ...register("animal", {
                                        required: {
                                            value: true,
                                            message: "La Animal es requerida"
                                        },
                                    })
                                    }
                                >
                                    <option value="">Selecciona una Animal</option>
                                    {
                                        speciesData?.map((species) => {
                                            return (
                                                <option
                                                    key={species.id}
                                                    value={species.name}
                                                >
                                                    {species.nameSpanish}
                                                </option>
                                            )
                                        })
                                    }
                                    {/* <option value="DOG">Perro</option>
                                    <option value="CAT">Gato</option>
                                    <option value="RABBIT">Conejo</option>
                                    <option value="MACAW">Guacamayo</option>
                                    <option value="FERRET">Hurón</option>
                                    <option value="GUINEA_PIG">COBAYA (CUY)</option>
                                    <option value="HAMSTER">Hamster</option>
                                    <option value="BIRD">Ave</option>
                                    <option value="TURTLE">Tortuga</option>
                                    <option value="FISH">Pez</option>
                                    <option value="VICUGNA">Vicuña</option>
                                    <option value="OTHER">Otro</option> */}
                                </select>
                                {
                                    errors.animal && <span className="text-red-500 text-sm">{errors.animal.message}</span>
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="input-text uppercase"
                                    {
                                    ...register("name", {
                                        required: {
                                            value: true,
                                            message: "El nombre es requerido"
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "El nombre debe tener al menos 3 caracteres"
                                        }
                                    })
                                    }
                                    placeholder="Ej. Poodle"
                                />
                                {
                                    errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="nameSpanish">Nombre Español</label>
                                <input
                                    type="text"
                                    id="nameSpanish"
                                    className="input-text uppercase"
                                    {
                                    ...register("nameSpanish", {
                                        required: {
                                            value: true,
                                            message: "El nombre es requerido"
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "El nombre debe tener al menos 3 caracteres"
                                        }
                                    })
                                    }
                                    placeholder="Ej. Poodle"
                                />
                                {
                                    errors.nameSpanish && <span className="text-red-500 text-sm">{errors.nameSpanish.message}</span>
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="nameEnglish">Nombre Inglés</label>
                                <input
                                    type="text"
                                    id="nameEnglish"
                                    className="input-text uppercase"
                                    {
                                    ...register("nameEnglish", {
                                        required: {
                                            value: true,
                                            message: "El nombre es requerido"
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "El nombre debe tener al menos 3 caracteres"
                                        }
                                    })
                                    }
                                    placeholder="Ej. Poodle"
                                />
                                {
                                    errors.nameEnglish && <span className="text-red-500 text-sm">{errors.nameEnglish.message}</span>
                                }
                            </div>
                            {/* button save */}
                            {
                                watch("id") ?
                                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md">
                                        Editar
                                    </button>
                                    :
                                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md">
                                        Guardar
                                    </button>
                            }
                        </form>
                    }
                </div>
            )}
        </div>
    );
};
