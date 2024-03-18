import React from 'react'
import { useForm } from 'react-hook-form';

export const Reports = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({
        defaultValues: {
            startDate: '',
            endDate: '',
            created_at: true,
            name: true,
            surname: true,
            email: true,
            country: true,
            phone: true,
            dni: true,
            pet: true,
            race: true,
            gender: true,
            chip: true,
            chip_date: true,
            type_pet: true,
            date: true,
            colour: true,
            sterilized: true,
            registeringEntity: true,
            registeringUser: true,
        }
    })

    const onSubmit = () => {
        console.log('Enviando datos')
        handleGenerateReport();
    }

    const handleGenerateReport = async () => {
        try {
            const response = await fetch('https://firulaix-api-test.vercel.app/api/reports/create-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    startDate: watch('startDate'),
                    endDate: watch('endDate'),
                    created_at: watch("created_at"),
                    name: watch("name"),
                    surname: watch("surname"),
                    email: watch("email"),
                    country: watch("country"),
                    phone: watch("phone"),
                    dni: watch("dni"),
                    pet: watch("pet"),
                    race: watch("race"),
                    gender: watch("gender"),
                    chip: watch("chip"),
                    chip_date: watch("chip_date"),
                    type_pet: watch("type_pet"),
                    date: watch("date"),
                    colour: watch("colour"),
                    sterilized: watch("sterilized"),
                    registeringEntity: watch("registeringEntity"),
                    registeringUser: watch("registeringUser"),
                })
            })

            // const data = await response;
            const arrayBuffer = await response.arrayBuffer();
            console.log(arrayBuffer);
            const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', "reporte.xlsx");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-col'>
            <h2 className='text-xl font-semibold'>Elija los campos que desea generar el reporte:</h2>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-row flex-wrap gap-3 mt-4'>
                <div className='flex flex-col'>
                    <label htmlFor='startDate'>Fecha de inicio</label>
                    <input
                        name='startDate'
                        {...register('startDate', { required: true })}
                        type='date' className='dark:bg-gray-700 dark:text-white p-2' />
                    <div className='flex'>
                        {
                            errors.startDate && errors.startDate.type === 'required' &&
                            <span className='text-red-500'>Este campo es requerido</span>
                        }
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='endDate'>Fecha de fin</label>
                    <input
                        name='endDate'
                        {...register('endDate', { required: true })}
                        type='date' className='dark:bg-gray-700 dark:text-white p-2' />
                    <div className='flex'>
                        {
                            errors.endDate && errors.endDate.type === 'required' &&
                            <span className='text-red-500'>Este campo es requerido</span>
                        }
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    <div className="flex flex-col">
                        <h2 className='pb-1'>Datos del Usuario</h2>
                        <hr className='py-1' />
                        <label className='flex justify-between gap-2'>
                            <span className="text-gray-700 dark:text-gray-400">Fecha de Registro</span>
                            <input type="checkbox"
                                {
                                ...register("created_at")
                                }
                                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300" />
                        </label>
                        <label className='flex justify-between gap-2'>
                            <span className="text-gray-700 dark:text-gray-400">Nombre</span>
                            <input type="checkbox"
                                {
                                ...register("name")
                                }
                                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300" />
                        </label>
                        <label className='flex justify-between gap-2'>
                            <span className="text-gray-700 dark:text-gray-400">Apellido</span>
                            <input type="checkbox"
                                {
                                ...register("surname")
                                }
                                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300" />
                        </label>
                        <label className='flex justify-between gap-2'>
                            <span className="text-gray-700 dark:text-gray-400">Correo Electrónico</span>
                            <input type="checkbox"
                                {
                                ...register("email")
                                }
                                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300" />
                        </label>
                        <label className='flex justify-between gap-2'>
                            <span className="text-gray-700 dark:text-gray-400">País</span>
                            <input type="checkbox"
                                {
                                ...register("country")
                                }
                                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300" />
                        </label>
                        <label className='flex justify-between gap-2'>
                            <span className="text-gray-700 dark:text-gray-400">Teléfono</span>
                            <input type="checkbox"
                                {
                                ...register("phone")
                                }
                                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300" />
                        </label>
                        <label className='flex justify-between gap-2'>
                            <span className="text-gray-700 dark:text-gray-400">DNI</span>
                            <input type="checkbox"
                                {
                                ...register("dni")
                                }
                                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300" />
                        </label>
                    </div>
                    <div className="flex flex-col">
                        <h2 className='pb-1'>Datos de las mascotas</h2>
                        <hr className='py-1' />
                        <label className='flex justify-between gap-2'>
                            <span className="text-gray-700 dark:text-gray-400">Mascota</span>
                            <input type="checkbox"
                                {
                                ...register("pet")
                                }
                                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300" />
                        </label>
                        <label className='flex justify-between gap-2'>
                            <span className="text-gray-700 dark:text-gray-400">Raza</span>
                            <input type="checkbox"
                                {
                                ...register("race")
                                }
                                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300" />
                        </label>
                        <label className='flex justify-between gap-2'>
                            <span className="text-gray-700 dark:text-gray-400">Género</span>
                            <input type="checkbox"
                                {
                                ...register("gender")
                                }
                                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300" />
                        </label>
                        <label className='flex justify-between gap-2'>
                            <span className="text-gray-700 dark:text-gray-400">Chip</span>
                            <input type="checkbox"
                                {
                                ...register("chip")
                                }
                                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300" />
                        </label>
                        <label className='flex justify-between gap-2'>
                            <span className="text-gray-700 dark:text-gray-400">Fecha del Chip</span>
                            <input type="checkbox"
                                {
                                ...register("chip_date")
                                }
                                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300" />
                        </label>
                        <label className='flex justify-between gap-2'>
                            <span className="text-gray-700 dark:text-gray-400">Tipo de Mascota</span>
                            <input type="checkbox"
                                {
                                ...register("type_pet")
                                }
                                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300" />
                        </label>
                        <label className='flex justify-between gap-2'>
                            <span className="text-gray-700 dark:text-gray-400">Fecha de nacimiento</span>
                            <input type="checkbox"
                                {
                                ...register("date")
                                }
                                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300" />
                        </label>
                        <label className='flex justify-between gap-2'>
                            <span className="text-gray-700 dark:text-gray-400">Color de mascota</span>
                            <input type="checkbox"
                                {
                                ...register("colour")
                                }
                                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300" />
                        </label>
                        <label className='flex justify-between gap-2'>
                            <span className="text-gray-700 dark:text-gray-400">Esterilizado</span>
                            <input type="checkbox"
                                {
                                ...register("sterilized")
                                }
                                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300" />
                        </label>
                    </div>
                    <div className="flex flex-col">
                        <h2 className='pb-1'>Datos de la entidad registradora</h2>
                        <hr className='py-1' />
                        <label className='flex justify-between gap-2' >
                            <span className="text-gray-700 dark:text-gray-400">Entidad registradora</span>
                            <input type="checkbox"
                                {
                                ...register("registeringEntity")
                                }
                                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300" />
                        </label>
                        <label className='flex justify-between gap-2'>
                            <span className="text-gray-700 dark:text-gray-400">encargado de la entidad registradora</span>
                            <input type="checkbox"
                                {
                                ...register("registeringUser")
                                }
                                className="form-checkbox h-5 w-5 text-gray-600 dark:bg-gray-700 dark:text-gray-300" />
                        </label>
                    </div>
                </div>

                <div className='flex flex-col justify-end'>
                    <button
                        type='submit'
                        className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md'>
                        Generar reporte
                    </button>
                </div>

                {/* <div className='flex flex-col'>
                    <label htmlFor=''>Raza</label>
                    <select name='' id='' className='dark:bg-gray-700 dark:text-white p-2'>
                        <option value=''>Seleccione una raza</option>
                        <option value=''>Raza 1</option>
                        <option value=''>Raza 2</option>
                        <option value=''>Raza 3</option>
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor=''>Tipo de mascota</label>
                    <select name='' id='' className='dark:bg-gray-700 dark:text-white p-2'>
                        <option value=''>Seleccione un tipo de mascota</option>
                        <option value=''>Tipo 1</option>
                        <option value=''>Tipo 2</option>
                        <option value=''>Tipo 3</option>
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor=''>Servicio</label>
                    <select name='' id='' className='dark:bg-gray-700 dark:text-white p-2'>
                        <option value=''>Seleccione un servicio</option>
                        <option value=''>Servicio 1</option>
                        <option value=''>Servicio 2</option>
                    </select>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor=''>Mascota</label>
                    <select name='' id='' className='dark:bg-gray-700 dark:text-white p-2'>
                        <option value=''>Seleccione una mascota</option>
                        <option value=''>Mascota 1</option>
                        <option value=''>Mascota 2</option>
                    </select>
                </div> */}
            </form>
        </div>
    )
}
