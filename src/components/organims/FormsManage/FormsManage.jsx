import React, { useContext, useEffect, useState } from 'react'
import { HomeSectionContainer } from '../../containers/HomeSectionContainer'
import { DocumentScannerOutlined } from '@mui/icons-material'
import Swal from "sweetalert2";
import { firuApi } from '../../../../api';
import { useForm } from 'react-hook-form';
import { Web3Context } from '../../../contexts/Web3/Web3Context';
import { FormModal } from '../../molecules/modals/FormModal';
import { FormTable } from './components/FormTable/FormTable';
import QRCode from 'react-qr-code';
// import { useWeb3Context } from '../../../contexts';

export const FormsManage = ({
    isQr = false
}) => {
    const [show, setShow] = useState(false);
    const [forms, setForms] = useState([]);
    const [formssData, setFormData] = useState({});
    const [searchChange, setSearchChange] = useState('');
    const [loading, setLoading] = useState(false);
    const [showHistorial, setShowHistorial] = useState(false);

    const { web3 } = useContext(Web3Context);

    const formUrl = `https://registro.worldanimalregistry.org/formulario/solicitud-de-registro?address=${ web3.account }`;

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


    const handleCopy = () => {
        Swal.fire({
            icon: "success",
            title: "Link copiado",
            showConfirmButton: false,
            timer: 1500,
        });
        navigator.clipboard.writeText(formUrl)
    }

    const getForms = (limit = 10, offset = 0, search = {}) => {
        setLoading(true)

        console.log({ search })

        const params = new URLSearchParams({
            limit,
            offset,
        });

        if (search?.search?.length > 0) {
            console.log("getForms search")
            firuApi.get(`/form?${ params.toString() }&${ search.filter }=${ search.search }`, {
                headers: {
                    'x-token': web3.authToken
                },
            }).then((res) => {
                console.log(res);
                setForms(res.data.forms)
                setFormData({
                    total: res.data.total,
                    pagination: res.data.forms.length,
                })
                setLoading(false)
            })
                .catch((err) => {
                    console.log(err);
                    setLoading(false)
                });
            return;
        }

        // console.log("getForms")
        firuApi.get(`/form`, {
            headers: {
                'x-token': web3.authToken
            },
        }).then((res) => {
            setForms(res.data.forms)
            // console.log(res);
            setFormData({
                total: res.data.total,
                pagination: res.data.forms.length,
            })
            setLoading(false)
        })
            .catch((err) => {
                console.log(err);
                setLoading(false)
            });
    }

    const deleteForms = (id) => {
        // console.log("deleteAnimal")
        // console.log(web3)
        // console.log(web3.authToken)
        // console.log(sessionStorage.getItem(`auth_token_${ web3.account }`))
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
                console.log("borrar")
                firuApi.delete(`/form/${ id }`, {
                    headers: {
                        'x-token': web3.authToken
                    },
                }).then((res) => {
                    console.log(res);
                    Swal.fire({
                        icon: "success",
                        title: "Formulario eliminada correctamente",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    getForms();
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
            firuApi.put(`/animals/${ watch("id") }`, {
                name: data.name.toUpperCase(),
                nameSpanish: data.nameSpanish.toUpperCase(),
                nameEnglish: data.nameEnglish.toUpperCase(),
            }, {
                headers: {
                    'x-token': web3.authToken
                },
            })
                .then((res) => {
                    // console.log(res);
                    reset();
                    Swal.fire({
                        icon: "success",
                        title: "Animal editada correctamente",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setShow(false);
                    getForms();
                }
                )
                .catch((err) => {
                    console.log(err);
                }
                )
            :
            firuApi.post("/animals", {
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
                        title: "Animal agregada correctamente",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    setShow(false);
                    getForms();
                }
                )
                .catch((err) => {
                    console.log(err);
                }
                );

    };

    // const handlePrev = () => {
    //     if (searchChange !== '') {
    //         getForms(10, 10 * (formssData?.pagination?.prevPage - 1), searchChange)
    //         return;
    //     }
    //     getForms(10, 10 * (formssData?.pagination?.prevPage - 1))
    // }

    // const handleNext = () => {
    //     if (formssData?.pagination?.currentPage === formssData?.pagination?.totalPages) return;
    //     if (searchChange !== '') {
    //         getForms(10, 10 * (formssData?.pagination?.prevPage + 1), searchChange)
    //         return;
    //     }
    //     getForms(10, 10 * (formssData?.pagination?.prevPage + 1))
    // }

    useEffect(() => {
        getForms();
    }, []);

    return (
        <HomeSectionContainer>
            <div className="text-start w-full mx-auto z-20">
                <h2 className="font-extrabold text-black dark:text-white">
                    <span className="block text-4xl">
                        Gestionar Formularios
                    </span>
                    <span className="block text-3xl text-sky-500">
                        Aqui podrás administrar los formularios de registro que se hayan hecho a tu entidad.
                    </span>
                </h2>

                {
                    loading &&
                    <div className="relative w-full flex justify-center">
                        <div className="flex flex-col justify-center items-center gap-2 absolute top-32 z-10">
                            <span className="text-2xl font-bold dark:text-white">Cargando...</span>
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
                        </div>
                    </div>
                }

                {
                    showHistorial ?
                        <>
                            <FormTable
                                forms={forms}
                                deleteForms={deleteForms}
                                getForms={getForms}
                                setShowHistorial={setShowHistorial}
                                showHistorial={showHistorial}
                                setForms={setForms}
                            />
                        </>
                        :
                        <FormTable
                            forms={forms}
                            deleteForms={deleteForms}
                            getForms={getForms}
                            setShowHistorial={setShowHistorial}
                            showHistorial={showHistorial}
                            setForms={setForms}
                        />
                }


                {
                    isQr &&
                    (
                        <div className="flex flex-col mt-4 gap-2 text-white">

                            <h2
                                className="text-2xl font-bold"
                            >
                                Comparta su link de registro
                            </h2>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">Link de Reigstro</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        id="name"
                                        className="input-text w-full max-w-2xl py-3 px-3"
                                        // value={`https://war-dashboard-seven.vercel.app/formulario/solicitud-de-registro/${ web3.account }`}
                                        value={formUrl}
                                        readOnly
                                    />
                                    <button
                                        onClick={handleCopy}
                                        className='bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md flex gap-2'
                                    >
                                        Copiar
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                                        </svg>

                                    </button>
                                </div>
                                <div className="flex">
                                    <div className="p-5 bg-white w-auto">
                                        <QRCode
                                            value={formUrl}
                                            size={250}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }


                {/* <div className="w-full flex flex-wrap gap-x-5 gap-y-7 grid-flow-row-dense mt-20 dark:text-white text-black">
                    <div className="w-full flex flex-col items-center justify-center">
                        <div className="w-full flex justify-between">

                            <div className="flex flex-col gap-2">
                                <span>Total de Animals</span>
                                <span>
                                    {
                                        animalsData.total
                                    }
                                </span>
                            </div>

                            <div className="w-full max-w-xl flex">
                                <form
                                    className="flex items-center justify-between w-full gap-2"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        getForms(10, 0, searchChange);
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
                                            getForms()
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
                                        getForms(10, 10 * (e.target.value - 1))
                                    }
                                    }
                                >
                                    {
                                        [...Array(animalsData?.pagination?.totalPages)].map((_, i) => {
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
                            </div>
                        </div>
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
                                        animals.map((animal, i) => {
                                            return (
                                                <tr
                                                    key={animal.id}
                                                    className="bg-gray-100 dark:bg-gray-700">
                                                    <td className="px-3 py-2">
                                                        {i + 1}
                                                    </td>
                                                    <td className="px-3 py-2">{animal.name}</td>
                                                    <td className="px-3 py-2">{animal.nameSpanish}</td>
                                                    <td className="px-3 py-2">{animal.nameEnglish}</td>
                                                    <td className="px-3 py-2 flex gap-4">
                                                        <button
                                                            onClick={() => {
                                                                console.log(animal)
                                                                setValue("id", animal.id)
                                                                setValue("name", animal.name)
                                                                setValue("nameEnglish", animal.nameEnglish)
                                                                setValue("nameSpanish", animal.nameSpanish)
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
                                                                deleteForms(animal.id)
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
                                        animals.length === 0 && (
                                            <tr className="bg-gray-100 dark:bg-gray-700">
                                                <td className="px-3 py-2 text-center" colSpan="5">No hay Animals registradas</td>
                                            </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                            {
                                animalsData &&
                                <div className="w-full flex justify-center items-center gap-2 mt-3">
                                    <span>paginación</span>
                                    <button
                                        disabled={animalsData?.pagination?.currentPage === 1}
                                        onClick={() => {
                                            handlePrev()
                                        }}
                                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md disabled:opacity-50"
                                    >
                                        Anterior
                                    </button>
                                    <span>
                                        {animalsData?.pagination?.currentPage} de
                                        {animalsData?.pagination?.totalPages}
                                    </span>
                                    <button
                                        disabled={animalsData?.pagination?.currentPage === animalsData?.pagination?.totalPages}
                                        onClick={() => {
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
                                                <h1 className="text-2xl font-bold">Editar Animal</h1>
                                                :
                                                <h1 className="text-2xl font-bold">Agregar Animal</h1>
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
                                                placeholder="Ej. DOG"
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
                                                placeholder="Ej. PERRO"
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
                                                placeholder="Ej. DOG"
                                            />
                                            {
                                                errors.nameEnglish && <span className="text-red-500 text-sm">{errors.nameEnglish.message}</span>
                                            }
                                        </div>
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

                </div> */}
            </div>
        </HomeSectionContainer>
    )
}
