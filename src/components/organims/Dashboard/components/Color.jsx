import React, { useContext, useEffect, useState } from "react";
import { FormModal } from "../../../molecules/modals/FormModal";
import { useForm } from "react-hook-form";
import { firuApi } from "../../../../../api";
import { Web3Context } from "../../../../contexts/Web3/Web3Context";
import Swal from "sweetalert2";

export const Color = () => {
    const [show, setShow] = useState(false);
    const [colors, setColors] = useState([]);
    const [colorsData, setColorsData] = useState({});
    const [searchChange, setSearchChange] = useState('');
    // const [selectedColor, setSelectedColor] = useState({});
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
            color: "",
            name: "",
            nameSpanish: "",
            nameEnglish: "",
            hex: "",
        },
        mode: "onBlur",
    });

    const { web3 } = useContext(Web3Context);

    const getColors = (limit = 10, offset = 0, search = '') => {

        if (search !== '') {
            firuApi.get(`/colors?limit=${ limit }&offset=${ offset }&search=${ search }`, {
                headers: {
                    'x-token': web3.authToken
                },
            }).then((res) => {
                console.log(res);
                setColors(res.data.colors)
                setColorsData({
                    total: res.data.total,
                    pagination: res.data.pagination,
                })
            })
                .catch((err) => {
                    console.log(err);
                });
            return;
        }

        console.log("getColors")
        firuApi.get(`/colors?limit=${ limit }&offset=${ offset }`, {
            headers: {
                'x-token': web3.authToken
            },
        }).then((res) => {
            setColors(res.data.colors)
            console.log(res);
            setColorsData({
                total: res.data.total,
                pagination: res.data.pagination,
            })
        })
            .catch((err) => {
                console.log(err);
            });
    }

    const deleteColor = (id) => {
        console.log("deleteColor")
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
                firuApi.delete(`/colors/${ id }`, {
                    headers: {
                        'x-token': web3.authToken
                    },
                }).then((res) => {
                    console.log(res);
                    Swal.fire({
                        icon: "success",
                        title: "Color eliminada correctamente",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    getColors();
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
            firuApi.put(`/colors/${ watch("id") }`, {
                name: data.name.toUpperCase(),
                nameSpanish: data.nameSpanish.toUpperCase(),
                nameEnglish: data.nameEnglish.toUpperCase(),
                hex: data.hex.toUpperCase(),
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
                        title: "Color editada correctamente",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setShow(false);
                    getColors();
                }
                )
                .catch((err) => {
                    console.log(err);
                }
                )
            :
            firuApi.post("/colors", {
                name: data.name.toUpperCase(),
                nameSpanish: data.nameSpanish.toUpperCase(),
                nameEnglish: data.nameEnglish.toUpperCase(),
                hex: data.hex.toUpperCase(),
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
                        title: "Color agregada correctamente",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setShow(false);
                    getColors();
                }
                )
                .catch((err) => {
                    console.log(err);
                }
                );

    };

    const handlePrev = () => {
        if (searchChange !== '') {
            getColors(10, 10 * (colorsData?.pagination?.prevPage - 1), searchChange)
            return;
        }
        getColors(10, 10 * (colorsData?.pagination?.prevPage - 1))
    }

    const handleNext = () => {
        if (colorsData?.pagination?.currentPage === colorsData?.pagination?.totalPages) return;
        if (searchChange !== '') {
            getColors(10, 10 * (colorsData?.pagination?.prevPage + 1), searchChange)
            return;
        }
        getColors(10, 10 * (colorsData?.pagination?.prevPage + 1))
    }

    useEffect(() => {
        getColors();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full flex justify-between">

                <div className="flex flex-col gap-2">
                    <span>Total de Colors</span>
                    <span>
                        {
                            colorsData.total
                        }
                    </span>
                </div>

                <div className="w-full max-w-xl flex">
                    <form
                        className="flex items-center justify-between w-full gap-2"
                        onSubmit={(e) => {
                            e.preventDefault();
                            getColors(10, 0, searchChange);
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
                                getColors()
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
                            getColors(10, 10 * (e.target.value - 1))
                        }
                        }
                    >
                        {
                            [...Array(colorsData?.pagination?.totalPages)].map((_, i) => {
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
                        Agregar Color
                    </button>
                </div>
            </div>
            {/* list colors */}
            <div className="w-full flex flex-col items-start justify-center">
                <table className="border mt-3 min-w-max w-full table-auto">
                    <thead>
                        <tr className="text-gray-600 uppercase text-sm leading-normal">
                            <th className="px-3 py-2 text-left text-gray-600 dark:text-white font-normal">
                                Número
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
                                Color Hexadecimal
                            </th>
                            <th className="px-3 py-2 text-left text-gray-600 dark:text-white font-normal">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 dark:text-white">
                        {
                            colors.map((color, i) => {
                                return (
                                    <tr
                                        key={color.id}
                                        className="bg-gray-100 dark:bg-gray-700">
                                        <td className="px-3 py-2">
                                            {i + 1}
                                        </td>
                                        <td className="px-3 py-2">{color.name}</td>
                                        <td className="px-3 py-2">{color.nameSpanish}</td>
                                        <td className="px-3 py-2">{color.nameEnglish}</td>
                                        <td className="px-3 py-2">
                                            <div className="flex gap-4 pl-6 items-center">
                                                <span className="text-xs">
                                                    {color.hex}
                                                </span>
                                                <div
                                                    className="w-6 h-6 rounded-full"
                                                    style={{ backgroundColor: color.hex }}
                                                ></div>
                                            </div>
                                        </td>
                                        <td className="px-3 py-2 flex gap-4">
                                            <button
                                                onClick={() => {
                                                    console.log(color)
                                                    setValue("id", color.id)
                                                    setValue("name", color.name)
                                                    setValue("nameEnglish", color.nameEnglish)
                                                    setValue("nameSpanish", color.nameSpanish)
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
                                                    deleteColor(color.id)
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
                            colors.length === 0 && (
                                <tr className="bg-gray-100 dark:bg-gray-700">
                                    <td className="px-3 py-2 text-center" colSpan="6">No hay Colores registradas</td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
                {
                    colorsData &&
                    <div className="w-full flex justify-center items-center gap-2 mt-3">
                        <span>paginación</span>
                        <button
                            disabled={colorsData?.pagination?.currentPage === 1}
                            onClick={() => {
                                // console.log(colorsData?.pagination?.prevPage)
                                // getColors(10, 10 * (colorsData?.pagination?.prevPage - 1))
                                handlePrev()
                            }}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md disabled:opacity-50"
                        >
                            Anterior
                        </button>
                        <span>
                            {colorsData?.pagination?.currentPage} de
                            {colorsData?.pagination?.totalPages}
                        </span>
                        <button
                            disabled={colorsData?.pagination?.currentPage === colorsData?.pagination?.totalPages}
                            onClick={() => {
                                // console.log(colorsData?.pagination?.nextPage)
                                // if (colorsData?.pagination?.currentPage === colorsData?.pagination?.totalPages) return;
                                // getColors(10, 10 * (colorsData?.pagination?.prevPage + 1))
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
                <>
                    <div
                        onClick={() => {
                            setShow(false)
                            reset()
                        }}
                        className="flex flex-col items-center justify-center fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 bg-blend-darken z-50">
                    </div>
                    {
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="fixed flex flex-col gap-4 w-full max-w-md bg-white dark:bg-gray-800 px-5 py-5 z-[100] mt-20"
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
                                    <h1 className="text-2xl font-bold">Editar Color</h1>
                                    :
                                    <h1 className="text-2xl font-bold">Agregar Color</h1>
                            }

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
                                    placeholder="Ej. SILVER FERRET"
                                />
                                {
                                    errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="nameSpanish">Nombre Español</label>
                                <input
                                    type="text"
                                    id="name"
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
                                    placeholder="Ej. HURÓN PLATA"
                                />
                                {
                                    errors.nameSpanish && <span className="text-red-500 text-sm">{errors.nameSpanish.message}</span>
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="nameEnglish">Nombre Inglés</label>
                                <input
                                    type="text"
                                    id="name"
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
                                    placeholder="Ej. SILVER FERRET"
                                />
                                {
                                    errors.nameEnglish && <span className="text-red-500 text-sm">{errors.nameEnglish.message}</span>
                                }
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="hex">Color Hexdecimal</label>
                                <input
                                    type="color"
                                    id="hex"
                                    className="input-text uppercase"
                                    {
                                    ...register("hex", {
                                        required: {
                                            value: true,
                                            message: "El color es requerido"
                                        },
                                        minLength: {
                                            value: 3,
                                            message: "El color debe tener al menos 3 caracteres"
                                        }
                                    })
                                    }
                                    placeholder="Ej. #111111"
                                />
                                {
                                    errors.hex && <span className="text-red-500 text-sm">{errors.hex.message}</span>
                                }
                                <span>
                                    {
                                        watch("hex")
                                    }
                                </span>
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
                </>
            )}
        </div>
    );
};
