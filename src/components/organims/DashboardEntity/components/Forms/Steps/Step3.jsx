import React from 'react'
import { FormCheckbox } from '../FormCheckbox'
import { FormSelect } from '../FormSelect'
import { FormInput } from '../FormInput'
import { useEntities } from '../../../../../../hooks/useEntities'
import { useUbigeo } from '../../../../../../hooks/useUbigeo'
import { useEffect } from 'react'
import { CustomAsyncSelect } from '../CustomAsyncSelect'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { InfoByIpContext } from '../../../../../../contexts/InfoByIp/InfoByIpContext'
import { countryLabel } from '../../../../../../config'

export const Step3 = ({
    register,
    setValue,
    watch,
    errors,
    dataRegister,
    isEdit
}) => {

    const {
        query: { id, address },
    } = useRouter();
    console.log(id)

    const { country } = useContext(InfoByIpContext)
    console.log(country)

    const {
        departments,
        provinces,
        districts,
        handleDepartaments,
        handleProvinces,
        handleDistricts,
    } = useUbigeo((country?.value || watch("country")) || "NONE");
    console.log(watch("country"))

    console.log({ departments })

    const { entitiesRegister, entitiesRegisterById, loading } = useEntities(watch("district"), id, isEdit);

    console.log(entitiesRegisterById)

    useEffect(() => {
        console.log(loading)
        if (entitiesRegisterById.length > 0 && id) {
            console.log(loading)
            console.log(
                entitiesRegisterById[0]?.department,
                entitiesRegisterById[0]?.province,
                entitiesRegisterById[0]?.district,
            )
            setValue("department", entitiesRegisterById[0]?.department)
            setValue("province", entitiesRegisterById[0]?.province)
            setValue("district", entitiesRegisterById[0]?.district)
        }
    }, [loading])

    // useEffect(() => {
    //     console.log(loading)
    //     if (dataRegister.adopter?.registerEntity && !loading) {
    //         console.log(dataRegister.adopter?.registerEntity)
    //         setValue("registerEntity", dataRegister.adopter?.registerEntity)
    //     }
    // }, [watch("registerEntity"), loading, watch("district")])

    useEffect(() => {
        handleDepartaments();
    }, []);
    useEffect(() => {
        handleProvinces(entitiesRegisterById.length > 0 ? entitiesRegisterById[0]?.department : watch("department"));
    }, [watch("department")]);

    useEffect(() => {
        handleDistricts(entitiesRegisterById.length > 0 ? entitiesRegisterById[0]?.province : watch("province"));
    }, [watch("province")]);

    console.log({ dataRegister })

    return (
        <>

            <h2 className='pb-3 pt-3 text-xl font-semibold mt-3'>
                LOCALIDAD
            </h2>
            <hr />

            <div className="flex justify-center w-full flex-wrap gap-2 max-w-5xl pt-3">
                {
                    entitiesRegisterById.length > 0 ?
                        <>
                            <div className="w-full flex flex-col items-start justify-center gap-2">

                                <FormSelect
                                    label={countryLabel[country.value].departmentsLabel || "Departamento"}
                                    property="department"
                                    options={
                                        [{
                                            value: entitiesRegisterById[0]?.department.trim(),
                                            label: entitiesRegisterById[0]?.department.trim(),
                                        }]
                                        // departments
                                    }
                                    value={departments.filter(
                                        (values) => values.value === entitiesRegisterById[0]?.department.trim()
                                    )}
                                    values={register}
                                    watch={watch}
                                    setValue={setValue}
                                    error={errors}
                                    onChange={(target) => {
                                        console.log(target.value)
                                        setValue("department", target.value)
                                        handleProvinces(target.value);
                                    }}
                                    required
                                    id="department"
                                />

                            </div>

                            <div className="w-full flex flex-col items-start justify-center gap-2">

                                <FormSelect
                                    label={countryLabel[country.value]?.provincesLabel || "Provincia"}
                                    property="province"
                                    options={[{
                                        value: entitiesRegisterById[0]?.province.trim(),
                                        label: entitiesRegisterById[0]?.province.trim(),
                                    }]}
                                    value={provinces.filter(
                                        (values) => values.value.trim() === entitiesRegisterById[0]?.province.trim()
                                    )}
                                    values={register}
                                    watch={watch}
                                    setValue={setValue}
                                    error={errors}
                                    onChange={(target) => {
                                        console.log(target.value)
                                        setValue("province", target.value)
                                        setValue("district", "")
                                        handleDistricts(target.value);
                                    }}
                                    required
                                    id="province"
                                />

                            </div>

                            <div className="w-full flex flex-col items-start justify-center gap-2">

                                <FormSelect
                                    label={countryLabel[country?.value]?.districtsLabel || "Distrito"}
                                    property="district"
                                    options={[{
                                        value: entitiesRegisterById[0]?.district.trim(),
                                        label: entitiesRegisterById[0]?.district.trim(),
                                    }]}
                                    value={districts.filter(
                                        (distric) => {
                                            return distric.value === entitiesRegisterById[0]?.district.trim()
                                        }
                                    )}
                                    values={register}
                                    watch={watch}
                                    setValue={setValue}
                                    error={errors}
                                    onChange={(target) => {
                                        console.log(target.value)
                                        setValue("district", target.value)
                                    }}
                                    required
                                    id="district"
                                />

                            </div>
                        </>
                        :
                        <>
                            <div className="w-full flex flex-col items-start justify-center gap-2">

                                <FormSelect
                                    label={countryLabel[country?.value]?.departmentsLabel || "Departamento"}
                                    property="department"
                                    options={departments}
                                    value={departments.filter(
                                        (values) => values.value.trim() === watch("department")
                                    )}
                                    values={register}
                                    watch={watch}
                                    setValue={setValue}
                                    error={errors}
                                    onChange={(target) => {
                                        console.log(target.value)
                                        setValue("department", target.value)
                                        handleProvinces(watch("department"));
                                    }}
                                    required
                                    id="department"
                                />

                            </div>

                            <div className="w-full flex flex-col items-start justify-center gap-2">

                                <FormSelect
                                    label={countryLabel[country?.value]?.provincesLabel || "Provincia"}
                                    property="province"
                                    options={provinces}
                                    value={provinces.filter(
                                        (values) => values.value.trim() === watch("province")
                                    )}
                                    values={register}
                                    watch={watch}
                                    setValue={setValue}
                                    error={errors}
                                    onChange={(target) => {
                                        console.log(target.value)
                                        setValue("province", target.value)
                                        handleDistricts(watch("province"));
                                    }}
                                    required
                                    id="province"
                                />

                            </div>

                            <div className="w-full flex flex-col items-start justify-center gap-2">

                                <FormSelect
                                    label={countryLabel[country?.value]?.districtsLabel || "Distrito"}
                                    property="district"
                                    options={districts}
                                    value={districts.filter(
                                        (distric) => {
                                            // console.log(values.value, watch("district"))
                                            return distric.value.trim() === watch("district")
                                        }
                                    )}
                                    values={register}
                                    watch={watch}
                                    setValue={setValue}
                                    error={errors}
                                    onChange={(target) => {
                                        console.log(target.value)
                                        setValue("district", target.value)
                                        // handleDistricts(watch("district"));
                                    }}
                                    required
                                    id="district"
                                />

                            </div>
                        </>
                }


                <div className='w-full'>
                    <FormInput
                        label='Dirección'
                        type='text'
                        id='address'
                        register={register}
                        required={{
                            value: true,
                            message: "Dirección es requerido",
                        }}
                        minLength={{ value: 3, message: "Formato incorrecto" }}
                        maxLength={{ value: 50, message: "Formato incorrecto" }}
                        errors={errors}
                        placeholder='Ej. Jr. Los Olivos 1234'
                        upperCase
                    />
                </div>

                <div className="w-full ">

                    {
                        address ?
                            <CustomAsyncSelect
                                label='Elije la Entidad Registradora'
                                property="registerEntity"
                                options={[{
                                    value: dataRegister?.entity?.id,
                                    label: `${ dataRegister?.entity?.local }`,
                                }]}
                                value={[{
                                    value: dataRegister?.entity?.id,
                                    label: `${ dataRegister?.entity?.local }`,
                                }]}
                                // values={register}
                                watch={watch}
                                setValue={setValue}
                                error={errors}
                                onChange={(target) => {
                                    console.log(target.value)
                                    setValue("registerEntity", target.value)
                                }}
                                required
                                id="registerEntity"
                                loading={loading}
                            />
                            :
                            (
                                entitiesRegisterById.length > 0 ?
                                    <CustomAsyncSelect
                                        label='Elije la Entidad Registradora'
                                        property="registerEntity"
                                        options={entitiesRegisterById}
                                        value={(entitiesRegisterById).filter(
                                            (entities) => {
                                                return entities.value === watch("registerEntity")
                                            }
                                        )}
                                        // values={register}
                                        watch={watch}
                                        setValue={setValue}
                                        error={errors}
                                        onChange={(target) => {
                                            console.log(target.value)
                                            setValue("registerEntity", target.value)
                                        }}
                                        required
                                        id="registerEntity"
                                        loading={loading}
                                    />
                                    :
                                    <CustomAsyncSelect
                                        label='Elije la Entidad Registradora'
                                        property="registerEntity"
                                        options={entitiesRegister}
                                        value={(entitiesRegister).filter(
                                            (entities) => {
                                                // console.log(entities.value)
                                                return entities.value === watch("registerEntity")
                                            }
                                        )}
                                        // values={register}
                                        watch={watch}
                                        setValue={setValue}
                                        error={errors}
                                        onChange={(target) => {
                                            console.log(target.value)
                                            setValue("registerEntity", target.value)
                                        }}
                                        required
                                        id="registerEntity"
                                        loading={loading}
                                    />

                            )
                    }


                </div>

                <div className="w-full flex gap-2 ">
                    {
                        entitiesRegisterById.length > 0 &&
                        <>
                            <span className=' font-bold'>
                                teléfono:
                            </span>
                            <span className='text-base'>
                                {
                                    entitiesRegisterById[0]?.phone
                                }
                            </span>
                            <span className='font-bold'>
                                dirección:
                            </span>
                            <span>
                                {
                                    entitiesRegisterById[0]?.direction ? entitiesRegisterById[0]?.direction : "No cuenta con dirección"
                                }
                            </span>
                        </>
                    }
                </div>


                <div className='w-full'>
                    <FormCheckbox
                        label='Declaro bajo juramento que:'
                        id='jurament'
                        options={[
                            {
                                value: 'jurament1',
                                label: 'Soy propietario de la mascota a registrar.',
                                required: {
                                    value: false,
                                    message: "Campo requerido",
                                }
                            },
                            // {
                            //     value: 'jurament2',
                            //     label: 'Mi mascota a registrar no cuenta con microchip o identicación interna.',
                            //     required: {
                            //         value: false,
                            //         message: "Campo requerido",
                            //     }
                            // },
                            {
                                value: 'jurament3',
                                label: 'Acepto compartir mi informaciòn en las busquedas de la plataforma.',
                                required: {
                                    value: false,
                                    message: "Campo requerido",
                                }
                            },
                        ]}
                        // register={register("jurament", {
                        //     required: {
                        //         value: true,
                        //         message: "Campo requerido",
                        //     },
                        // })}
                        register={register}
                        errors={errors}
                        className='flex-col'
                    />
                </div>

            </div>
        </>
    )
}
