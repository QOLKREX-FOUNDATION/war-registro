import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { useCodePhone } from "../../../../../../hooks/useCodePhone";

export default function FormSelectPrimeCountry({
    register,
    setValue,
    watch,
    errors,
}) {
    const [selectedCountry, setSelectedCountry] = useState(null);

    const { codes, getCodes } = useCodePhone();

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img alt={option.name} src={option?.image?.imageUrl} className={`mr-2 flag flag-${ option.countryCode.toLowerCase() }`} style={{ width: '18px' }} />
                    <div>{option.name} </div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src={option?.image?.imageUrl} className={`mr-2 flag flag-${ option.countryCode.toLowerCase() }`} style={{ width: '18px' }} />
                <div>{option.name} </div>
            </div>
        );
    };

    const panelFooterTemplate = () => {
        return (
            <div className="py-2 px-3">
                {selectedCountry ? (
                    <span>
                        <b>{selectedCountry.name}</b> seleccionado.
                    </span>
                ) : (
                    'No hay país seleccionado'
                )}
            </div>
        );
    };

    useEffect(() => {
        getCodes(100)
    }, [])

    // console.log({ codes })
    // console.log({ selectedCountry })
    console.log({ nationality: watch('nationality') })

    return (
        <div className="w-full flex flex-col gap-2 pb-3 justify-content-center">
            <label htmlFor="nationality">
                <h1 className="font-bold">
                    Nacionalidad
                </h1>
            </label>
            <Dropdown
                id="nationality"
                {
                ...register('nationality', {
                    required: {
                        value: true,
                        message: "Campo requerido",
                    },
                })
                }
                value={selectedCountry}
                onChange={(e) => {
                    setSelectedCountry(e.value)
                    // console.log(e.value)
                    // setValue('nationality', e.value.nationality)
                }}
                options={codes}
                optionLabel="name"
                placeholder="Select a Country"
                valueTemplate={selectedCountryTemplate}
                itemTemplate={countryOptionTemplate}
                className="w-full md:w-14rem"
                panelFooterTemplate={panelFooterTemplate}
            />
            {
                errors?.nationality && (
                    <span className="text-red-500">{errors?.nationality?.message}</span>
                )
            }
        </div>
    )
}
