import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { FormRegister } from './FormRegister';
import { firuApi } from '../../../../../../api';
import { adopterFormRegister } from '../../../../../utils/initRegister';

export const FormRegisterContent = () => {
    const { pathname, query } = useRouter();
    const [formData, setFormData] = useState({})

    const { correlative, address } = query;

    console.log({ pathname, query })
    console.log({ pathname: pathname.split("/")[2] })

    // si viene el parametro correlative
    const handleGetData = async () => {
        console.log("query")

        firuApi.get(`/form/correlative/${ correlative }`)
            .then((res) => {
                console.log(res.data)
                setFormData(res.data.form[0])
            })
            .catch((err) => {
                console.log(err)
            })

    }

    // si viene el parametro address
    const handleGetAddress = async () => {
        console.log("query")

        firuApi.get(`/form/address/${ address }`)
            .then((res) => {
                console.log(res.data)
                // setFormData(res.data.form[0])

                if (res.data.ok === false) return;
                setFormData({
                    adopter: {
                        country: adopterFormRegister.country,
                        person: adopterFormRegister.person,
                        documentType: adopterFormRegister.documentType,
                        documentNumber: adopterFormRegister.documentNumber,
                        adopterType: adopterFormRegister.adopterType,
                        isAddressPublic: adopterFormRegister.isAddressPublic,
                        addressPublic: adopterFormRegister.addressPublic,
                        firstName: adopterFormRegister.firstName,
                        secondName: adopterFormRegister.secondName,
                        firstLastName: adopterFormRegister.firstLastName,
                        secondLastName: adopterFormRegister.secondLastName,
                        birthDate: adopterFormRegister.birthDate,
                        gender: adopterFormRegister.gender,
                        cellphone: adopterFormRegister.cellphone,
                        email: adopterFormRegister.email,
                        department: res.data.form.department,
                        province: res.data.form.province,
                        district: res.data.form.district,
                        address: adopterFormRegister.address,
                        registerEntity: res.data.form.registerEntity,
                        jurament1: adopterFormRegister.jurament1,
                        isMicrochip: adopterFormRegister.isMicrochip,
                        jurament3: adopterFormRegister.jurament3,
                    },
                    pet: {
                        microchip: adopterFormRegister.microchip,
                        dateMicrochip: adopterFormRegister.dateMicrochip,
                        firstNamePet: adopterFormRegister.firstNamePet,
                        countryPet: adopterFormRegister.countryPet,
                        birthDatePet: adopterFormRegister.birthDatePet,
                        adoptionDate: adopterFormRegister.adoptionDate,
                        adoptionDate: adopterFormRegister.adoptionDate,
                        genderPet: adopterFormRegister.genderPet,
                        specie: adopterFormRegister.specie,
                        race: adopterFormRegister.race,
                        color: adopterFormRegister.color,
                        isSterilized: adopterFormRegister.isSterilized,
                    },
                    isPayment: adopterFormRegister.isPayment,
                    entity: {
                        id: res.data.form.registerEntity,
                        name: res.data.form.name,
                        lastName: res.data.form.lastName,
                        local: res.data.form.local,
                    }
                }
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // si vienen los parametros correlative y address

    const handleGetAllData = async () => {
        console.log("query");

        try {
            let res; //response
            if (correlative && address) {
                // Si vienen ambos parámetros, consulta ambas direcciones
                res = await Promise.all([
                    firuApi.get(`/form/correlative/${ correlative }`),
                    firuApi.get(`/form/address/${ address }`),
                ]);

                const [res1, res2] = res;
                const { form: form } = res1.data;
                const { form: form2 } = res2.data;
                const form1 = form[0];
                console.log("1")
                // console.log(res[0], res[1])
                console.log(form1, form2)

                setFormData({
                    adopter: {
                        country: form1.adopter.country,
                        person: form1.adopter.person,
                        documentType: form1.adopter.documentType,
                        documentNumber: form1.adopter.documentNumber,
                        adopterType: form1.adopter.adopterType,
                        isAddressPublic: form1.adopter.isAddressPublic,
                        addressPublic: form1.adopter.addressPublic,
                        firstName: form1.adopter.firstName,
                        secondName: form1.adopter.secondName,
                        firstLastName: form1.adopter.firstLastName,
                        secondLastName: form1.adopter.secondLastName,
                        birthDate: form1.adopter.birthDate,
                        gender: form1.adopter.gender,
                        cellphone: form1.adopter.cellphone,
                        email: form1.adopter.email,
                        department: form2.department,
                        province: form2.province,
                        district: form2.district,
                        address: form1.adopter.address,
                        registerEntity: form2.registerEntity,
                        jurament1: form1.adopter.jurament1,
                        isMicrochip: form1.adopter.isMicrochip,
                        jurament3: form1.adopter.jurament3,
                    },
                    pet: {
                        microchip: form1.pet.microchip,
                        dateMicrochip: form1.pet.dateMicrochip,
                        firstNamePet: form1.pet.firstNamePet,
                        countryPet: form1.pet.countryPet,
                        birthDatePet: form1.pet.birthDatePet,
                        adoptionDate: form1.pet.adoptionDate,
                        adoptionDate: form1.pet.adoptionDate,
                        genderPet: form1.pet.genderPet,
                        specie: form1.pet.specie,
                        race: form1.pet.race,
                        color: form1.pet.color,
                        isSterilized: form1.pet.isSterilized,
                    },
                    isPayment: form1.isPayment,
                    correlativeNumber: form1.correlativeNumber,
                    status: form1.status,
                    id: form1.id,
                    entity: {
                        id: form2.registerEntity,
                        name: form2.name,
                        lastName: form2.lastName,
                        local: form2.local,
                    }
                })
                return;
            }
            if (correlative) {
                // Si solo viene el parámetro correlative
                res = await firuApi.get(`/form/correlative/${ correlative }`);
                console.log("2")

                setFormData(res.data.form[0])
                return;
            }
            if (address) {
                // Si solo viene el parámetro address
                res = await firuApi.get(`/form/address/${ address }`);
                const res2 = await firuApi.get(`entity-register/info/${address}`);
                console.log({
                    res2: res2.data.user
                })
                console.log("3")

                if (res.data.ok === false) return;
                if (res2.data.ok === false) return;
                setFormData({
                    adopter: {
                        country: res2.data.user.entityRegister.country || "PE",
                        person: adopterFormRegister.person,
                        documentType: adopterFormRegister.documentType,
                        documentNumber: adopterFormRegister.documentNumber,
                        adopterType: adopterFormRegister.adopterType,
                        isAddressPublic: adopterFormRegister.isAddressPublic,
                        addressPublic: adopterFormRegister.addressPublic,
                        firstName: adopterFormRegister.firstName,
                        secondName: adopterFormRegister.secondName,
                        firstLastName: adopterFormRegister.firstLastName,
                        secondLastName: adopterFormRegister.secondLastName,
                        birthDate: adopterFormRegister.birthDate,
                        gender: adopterFormRegister.gender,
                        cellphone: adopterFormRegister.cellphone,
                        email: adopterFormRegister.email,
                        department: res.data.form.department,
                        province: res.data.form.province,
                        district: res.data.form.district,
                        address: adopterFormRegister.address,
                        registerEntity: res.data.form.registerEntity,
                        jurament1: adopterFormRegister.jurament1,
                        isMicrochip: adopterFormRegister.isMicrochip,
                        jurament3: adopterFormRegister.jurament3,
                    },
                    pet: {
                        microchip: adopterFormRegister.microchip,
                        dateMicrochip: adopterFormRegister.dateMicrochip,
                        firstNamePet: adopterFormRegister.firstNamePet,
                        countryPet: res2.data.user.entityRegister.country || "PE",
                        birthDatePet: adopterFormRegister.birthDatePet,
                        adoptionDate: adopterFormRegister.adoptionDate,
                        adoptionDate: adopterFormRegister.adoptionDate,
                        genderPet: adopterFormRegister.genderPet,
                        specie: adopterFormRegister.specie,
                        race: adopterFormRegister.race,
                        color: adopterFormRegister.color,
                        isSterilized: adopterFormRegister.isSterilized,
                    },
                    isPayment: adopterFormRegister.isPayment,
                    entity: {
                        id: res.data.form.registerEntity,
                        name: res.data.form.name,
                        lastName: res.data.form.lastName,
                        local: res.data.form.local,
                    }
                }
                )
                return;
            }

        } catch (error) {
            setFormData({ ...adopterFormRegister })
            console.log(error);
        }
    };

    useEffect(() => {
        if (pathname.split("/")[2] !== "solicitud-de-registro") return;
        // if (query.correlative !== "" && query.correlative !== undefined) handleGetData();
        // if (query?.address !== "" && query?.address !== undefined) handleGetAddress();
        handleGetAllData();
    }, [query])

    return (
        <>
            <FormRegister
                dataRegister={formData}
            />
        </>
    )
}
