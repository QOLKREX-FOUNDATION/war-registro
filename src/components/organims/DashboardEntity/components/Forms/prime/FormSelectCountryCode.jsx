import React, { useEffect, useState } from "react";
import { Dropdown } from 'primereact/dropdown';
import { useCodePhone } from "../../../../../../hooks/useCodePhone";

export default function FormSelectPrimeCountryCode({
    register,
    setValue,
    watch,
    errors,
}) {
    const [selectedCountry, setSelectedCountry] = useState(null);

    const { codes, getCodes } = useCodePhone();

    const countries = [
        { name: 'Perú', countryCode: 'PE', phoneCode: "+51", image: "https://media.discordapp.net/attachments/839620709517230081/1167153614414942228/peru.png?ex=654d1782&is=653aa282&hm=c69e34c6f2e3b191f0e8fbe29db76b694e736af6595d164a8dbd79869a3b62cc&=" },
        { name: 'Colombia', countryCode: 'CO', phoneCode: "+57", image: "https://media.discordapp.net/attachments/839620709517230081/1167153647784829038/colombia.png?ex=654d178a&is=653aa28a&hm=256a9234e4a19173fde899bbe51166a52a595e2e5779a7a4fd22587e2afaa9dc&=" },
        { name: 'Australia', countryCode: 'AU', phoneCode: "+61", image: "https://media.discordapp.net/attachments/839620709517230081/1167153772556992673/australia.png?ex=654d17a8&is=653aa2a8&hm=f9a57c3579de72f300c7b98f645dfeec941fe40bab9fcf39bbc7c883305f5f54&=" },
        { name: 'Brazil', countryCode: 'BR', phoneCode: "+55", image: "https://media.discordapp.net/attachments/839620709517230081/1167153740793532436/brasil.png?ex=654d17a0&is=653aa2a0&hm=d64e9916546696c8021c647b0e06c09872b777107fd838e29c5ca5aac81f7b8a&=" },
        { name: 'Ecuador', countryCode: 'EC', phoneCode: "+593", image: "https://media.discordapp.net/attachments/839620709517230081/1167153632714707045/ecuador.png?ex=654d1786&is=653aa286&hm=1d62f234403cc02dc8cc8236ff46c79ec21208707776f92ef32c6f958c4870aa&=" },
        { name: 'China', countryCode: 'CN', phoneCode: "+86", image: "https://media.discordapp.net/attachments/839620709517230081/1167153664117461104/porcelana.png?ex=654d178e&is=653aa28e&hm=57a2364d8a701f0d37fb70bb79a21f2e2cfc97f65bc933f7da4aa8d85c45ea26&=" },
        // { name: 'Egypt', countryCode: 'EG' phoneCode:"+51",,image:""},
        { name: 'France', countryCode: 'FR', phoneCode: "+33", image: "https://media.discordapp.net/attachments/839620709517230081/1167153712398094397/francia.png?ex=654d1799&is=653aa299&hm=30692dcd44a4322026760fdb2ca5ae71a59b57586722ee39b214e96973ec6e3e&=" },
        { name: 'Germany', countryCode: 'DE', phoneCode: "+49", image: "https://media.discordapp.net/attachments/839620709517230081/1167153755700084879/alemania.png?ex=654d17a4&is=653aa2a4&hm=b3136f67b0aa5540ce1022dde93288ba545fbcb04c88e05088bde4272c6e556f&=" },
        { name: 'Japan', countryCode: 'JP', phoneCode: "+81", image: "https://media.discordapp.net/attachments/839620709517230081/1167153680999534673/japon.png?ex=654d1792&is=653aa292&hm=8a8b12de51c50b6b5d3ce0017cb1fd1ba10f5c7bc6cc6be4f35f4268fb0add64&=" },
        { name: 'Spain', countryCode: 'ES', phoneCode: "+34", image: "https://media.discordapp.net/attachments/839620709517230081/1167153726348337162/espana.png?ex=654d179d&is=653aa29d&hm=2b0a619dabce09b83a7a0181c0617c0eee6dd07a9981626686202b35210ab568&=" },
        { name: 'United States', countryCode: 'US', phoneCode: "+1", image: "https://media.discordapp.net/attachments/839620709517230081/1167153696598138900/estados-unidos.png?ex=654d1795&is=653aa295&hm=bd5ed8e35824880b21c1cc0c938427fb57e7b9b9ce13797b7a878b5b797754a4&=" }
    ];

    const selectedCountryTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <img alt={option.name} src={option?.image?.imageUrl} className={`mr-2 flag flag-${ option.countryCode.toLowerCase() }`} style={{ width: '18px' }} />
                    <div>{option.name} {"(" + option.phoneCode + ")"}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <img alt={option.name} src={option?.image?.imageUrl} className={`mr-2 flag flag-${ option.countryCode.toLowerCase() }`} style={{ width: '18px' }} />
                <div>{option.name} {"(" + option.phoneCode + ")"}</div>
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
    console.log({ selectedCountry })
    console.log({ code: watch('phoneCode') })

    return (
        <div className="card flex flex-col gap-2 pb-3 justify-content-center">
            <h1 className="font-bold">Código de Teléfono</h1>
            <Dropdown
                {
                ...register('phoneCode', {
                    required: {
                        value: true,
                        message: "Campo requerido",
                    },
                })
                }
                value={selectedCountry}
                onChange={(e) => {
                    setSelectedCountry(e.value)
                    // console.log({ phoneCode: e.value })
                    // setValue('phoneCode', e.value.phoneCode)
                    // setValue('phoneCode', e.value.phoneCode.phoneCode)
                }}
                options={codes}
                optionLabel="phoneCode"
                placeholder="Select a Country"
                valueTemplate={selectedCountryTemplate}
                itemTemplate={countryOptionTemplate}
                className="w-full md:w-14rem"
                panelFooterTemplate={panelFooterTemplate}
            />
            {
                errors?.phoneCode && (
                    <span className="text-red-500">{errors?.phoneCode?.message}</span>
                )
            }
        </div>
    )
}
