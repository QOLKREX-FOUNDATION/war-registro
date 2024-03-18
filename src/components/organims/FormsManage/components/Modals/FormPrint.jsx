import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { useColours } from '../../../Cpanel/components/PetForm/hooks/useColours';
import { useSpecie } from '../../../Cpanel/components/PetForm/hooks/useSpecie';
import { formatDateForm, parseText } from '../../../../../utils/formatForm';
import { useRouter } from 'next/router';
import { Web3Context } from '../../../../../contexts/Web3/Web3Context';
// import { firuApi } from '../../../../../../api';

export const FormPrint = ({
    selectedForm
}) => {
    const [pdf, setPdf] = useState('');
    const [loading, setLoading] = useState(false);
    const [idEntity, setIdEntity] = useState('')
    const { web3 } = useContext(Web3Context);
    const [urlLogo, setUrlLogo] = useState('')

    const handleIdEntity = async () => {
        const id = sessionStorage?.getItem("idEntity_" + String(web3.account).toUpperCase())
        if (!id) {
            setIdEntity('')
            return
        }
        setUrlLogo(`https://res.cloudinary.com/worldanireg/image/upload/v1701794426/entityRegister/logo/${id}.png?v=${Date.now()}`)
        setIdEntity(id);
    };

    useEffect(() => {
        handleIdEntity();
    }, []);

    const { colours } = useColours();
    const { races } = useSpecie(selectedForm.pet.specie);

    const router = useRouter()

    const { pathname } = router;
    // console.log(pathname)

    const route = pathname.split('/')[2]
    console.log({ route })


    // const handlePdf = async () => {
    //     console.log(selectedForm.id)
    //     setLoading(true)
    //     try {
    //         // const response = await fetch(`http://localhost:5000/api/form/pdf/{ selectedForm.id }`, {
    //         const response = await fetch(`https://firulaix-api-test.vercel.app/api/form/pdf/{ selectedForm.id }`, {
    //             // const response = await fetch(`https://ca6c-190-237-31-122.ngrok-free.app/api/form/pdf/{ selectedForm.id }`, {
    //             method: 'POST',
    //         })

    //         console.log(response)
    //         console.log(typeof response)

    //         const arrayBuffer = await response.arrayBuffer();
    //         console.log(arrayBuffer)

    //         const file = new Blob(
    //             [arrayBuffer],
    //             { type: 'application/pdf' });

    //         console.log(file)

    //         const fileURL = URL.createObjectURL(file);
    //         // const link = document.createElement('a');
    //         // link.href = fileURL;
    //         // link.setAttribute('download', "generated.pdf");
    //         // document.body.appendChild(link);
    //         // link.click();
    //         // document.body.removeChild(link);
    //         // URL.revokeObjectURL(fileURL);
    //         setLoading(false)
    //         console.log("uri")
    //         console.log(fileURL)
    //         setPdf(fileURL)
    //     } catch (error) {
    //         console.log(error)
    //         setLoading(false)
    //     }




    //     // firuApi.post(`/form/pdf/{ selectedForm.id }`, {
    //     //     body: {
    //     //         id: selectedForm.id
    //     //     },
    //     //     responseType: 'arraybuffer',
    //     // }).then(async (response) => {
    //     //     const buffer = Buffer.from(response.selectedForm, 'binary').toString('base64');
    //     //     const file = new Blob(
    //     //         [buffer],
    //     //         { type: 'application/octet-stream' });
    //     //     console.log(response.selectedForm)
    //     //     console.log(typeof buffer)
    //     //     console.log(fileURL)
    //     //     const fileURL = URL.createObjectURL(file);
    //     //     const link = document.createElement('a');
    //     //     link.href = fileURL;
    //     //     link.setAttribute('download', "generated.pdf");
    //     //     document.body.appendChild(link);
    //     //     link.click();
    //     //     document.body.removeChild(link);
    //     //     URL.revokeObjectURL(fileURL);
    //     //     setPdf(fileURL)
    //     // })
    //     //     .catch((error) => {
    //     //         console.log(error)
    //     //     })
    // }

    const generatePdf = async () => {
        setLoading(true);
    
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true,
            compress: true,
            precision: 2,
            userUnit: 1,
            lineHeight: 1.15,
            dpi: 300,
        });
    
        // Obtén el elemento HTML que deseas convertir en PDF
        const element = document.getElementById('content-to-pdf');
    
        try {
            // Convierte el elemento en un lienzo (canvas)
            html2canvas(element, { scale: 1.4 }).then((canvas) => {
                // Agrega el contenido del formulario al PDF
                const imgData = canvas.toDataURL('image/jpeg');
                pdf.addImage(imgData, 'JPEG', 0, 0, 215, 0);
    
                // Crea un elemento img en el DOM para cargar la imagen de Cloudinary
                const cloudinaryImageElement = document.createElement('img');
    
                // Manejador de evento de carga exitosa
                cloudinaryImageElement.onload = (e) => {
                    console.log('Imagen de Cloudinary cargada exitosamente');
    
                    // Ajusta las coordenadas según tus necesidades
                    const xPosition = 23; // Cambia estas coordenadas según sea necesario
                    const yPosition = 15;
                    const desiredWidth = 38;
    
                    // Calcula la altura proporcional manteniendo el ancho fijo
                    const aspectRatio = cloudinaryImageElement.width / cloudinaryImageElement.height;
                    const desiredHeight = desiredWidth / aspectRatio;
    
                    // Agrega la imagen de Cloudinary al PDF en la posición deseada
                    pdf.addImage(cloudinaryImageElement, 'PNG', xPosition, yPosition, desiredWidth, desiredHeight);
                    console.log('Imagen cargada');
                    
                    // Guarda el PDF o abre una ventana para descargarlo
                    pdf.save(`SRV-${selectedForm.correlativeNumber.toString()}.pdf`);
                    setLoading(false);
                };
    
                // Manejador de evento de error
                cloudinaryImageElement.onerror = () => {
                    console.log('Error al cargar la imagen');
                    // Establecer una imagen de respaldo en caso de error
                    cloudinaryImageElement.src = 'https://res.cloudinary.com/worldanireg/image/upload/v1703107054/entityRegister/logo/test.png';
                };
    
                // Establecer la propiedad src
                console.log('URL de Cloudinary:', urlLogo);
                cloudinaryImageElement.src = urlLogo;
            });
        } catch (error) {
            console.error('Error al generar el PDF', error);
            setLoading(false);
        }
    };
    
    

    const formatedDateChip = () => {
        const date = selectedForm.pet.dateMicrochip ?
            selectedForm.pet.dateMicrochip.toLocaleString('es-ES',
                {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit'
                })
            : new Date().toLocaleString('es-ES',
                {
                    year: '2-digit',
                    month: '2-digit',
                    day: '2-digit'
                })
        const day = date.split('-')[0]
        const month = date.split('-')[1]
        const year = date.split('-')[2]
        return `${ day }/${ month }/${ year }`
    }

    function formatTextWithColors(colors) {
        // Filtra y mapea los colores seleccionados
        const selectedColors = colors
            .filter((colour) => selectedForm.pet.color.split(",").includes(colour.value))
            .map((colour) => colour.label);

        // Combina los colores en una sola cadena separada por espacios
        const formattedText = selectedColors.join(" - ");

        // const quantity = formattedText.length;

        return `${ formattedText }` || "Sin color";
    }

    console.log(selectedForm)
    // console.log(selectedForm.pet.color.split(","))

    return (
        <div className="flex flex-col dark:text-white">
            <div className="flex items-center mb-3">
                <h1 className='font-bold text-lg '>
                    Imprimiendo el usuario:
                    <span className='pl-2 uppercase'>
                        {selectedForm.adopter.firstName}
                    </span>
                    <span className='pl-2 uppercase'>
                        {selectedForm.adopter.firstLastName}
                    </span>
                </h1>
                <button
                    disabled={loading}
                    onClick={generatePdf}
                    className='ml-auto bg-blue-500 hover:bg-blue-700 text-white disabled:opacity-50 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                >
                    Imprimir
                </button>
            </div>

            {/* pdf section */}
            {/* <div className='border px-5 py-8 h-full'>
                {
                    pdf === '' && loading === false ?
                        <p className='text-center font-semibold'>No hay nada que imprimir</p>
                        :
                        <>
                            {
                                loading === true ?
                                    <div role="status" className="max-w-sm animate-pulse">
                                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    :
                                    <div className="flex h-[900px] min-h-[200px] max-h-[900px]">
                                        <iframe
                                            src={pdf}
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            marginHeight="0"
                                            marginWidth="0"
                                        />
                                    </div>
                            }
                        </>
                }
            </div> */}
            {/* button download */}
            {/* <div className="flex justify-end mt-10">
                {
                    pdf === '' &&
                    <button
                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        onClick={
                            () => {
                                window.open(pdf)
                            }
                        }
                    >
                        Descargar
                    </button>
                }
            </div> */}

            <div className="flex justify-center w-full overflow-x-auto">
                {/* preview */}
                <div className="relative w-[1200px] h-[1600px] flex flex-col  bg-white text-black pb-4 border border-red-600">
                    <div className="w-[1200px] h-[1600px] border border-green-600">
                        {
                            route === 'forms' ?
                                <img
                                    src="/img/forms/solicitud_registro.webp"
                                    alt="background"
                                    border="0"
                                    width={1300}
                                    height={1800}
                                    className='w-[1200px] h-[1600px]'
                                />
                                :
                                <img
                                    src="/img/forms/certificate_microchip.webp"
                                    alt="background"
                                    border="0"
                                    width={1300}
                                    height={1800}
                                    className='w-[1200px] h-[1600px]'
                                />
                        }
                    </div>
                    <div className="absolute border border-blue-600 w-[1200px] h-[1600px] pb-2 overflow-hidden">
                        <div className="relative w-full h-full -top-[10px]">
                            <div className='flex'>
                                <img
                                    src={urlLogo}
                                    className='absolute top-[105px] left-[130px]'
                                    style={{ width: "200px" }}
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = `https://res.cloudinary.com/worldanireg/image/upload/v1703787762/entityRegister/logo/test.png`;
                                    }}
                                />
                                <h1 className='relative top-[135px] left-[550px] font-semibold text-3xl'>
                                    #{selectedForm.correlativeNumber.toString().padStart(8, "0")}
                                </h1>
                            </div>
                            <h1 className='relative top-[325px] left-[960px] font-semibold text-xl'>
                                <span className='ml-4'>
                                    {
                                        formatedDateChip().split('/')[2]
                                    }
                                </span>
                                <span className='ml-6'>
                                    {
                                        formatedDateChip().split('/')[1]
                                    }
                                </span>
                                <span className='ml-4'>
                                    {
                                        formatedDateChip().split('/')[0]
                                    }
                                </span>
                            </h1>
                            {/* primera linea */}
                            <div className="flex relative top-[435px]">
                                <h1 className='relative left-[200px] font-light text-xl w-[500px] top-1 pb-1'>
                                    {/* {selectedForm.adopter.firstName} {selectedForm.adopter.secondName} {selectedForm.adopter.firstLastName} {selectedForm.adopter.secondLastName} */}
                                    {
                                        parseText(36, `${ selectedForm.adopter.firstName } ${ selectedForm.adopter.secondName }  ${ selectedForm.adopter.firstLastName } ${ selectedForm.adopter.secondLastName }`)
                                    }
                                </h1>
                                <h1 className='relative left-[250px] font-light text-2xl w-40'>
                                    {selectedForm.adopter.documentNumber}
                                </h1>
                                <h1 className='relative top-2 left-[310px] font-light text-xl w-40'>
                                    <span className=''>
                                        {
                                            formatDateForm(selectedForm.adopter.birthDate).split('/')[2]
                                        }
                                    </span>
                                    <span className='ml-4'>
                                        {
                                            formatDateForm(selectedForm.adopter.birthDate).split('/')[1]
                                        }
                                    </span>
                                    <span className='ml-4'>
                                        {
                                            formatDateForm(selectedForm.adopter.birthDate).split('/')[0]
                                        }
                                    </span>
                                </h1>
                            </div>
                            {/* segunda línea */}
                            <div className="flex relative top-[480px]">
                                <h1 className='relative left-[200px] font-light text-xl w-[700px] top-1 pb-1'>
                                    {
                                        parseText(56, `${ selectedForm.adopter.address }`)
                                    }
                                </h1>
                            </div>
                            {/* tercera línea */}
                            <div className="flex relative top-[530px]">
                                <h1 className='relative left-[200px] font-light text-2xl w-96'>
                                    {parseText(15, `${ selectedForm.adopter.district }`)}
                                </h1>
                                <h1 className='relative flex justify-center left-[100px] font-light text-2xl w-64 border'>
                                    {parseText(15, `${ selectedForm.adopter.province }`)}
                                </h1>
                                <h1 className='relative flex justify-center left-[150px] font-light text-2xl w-64 border '>
                                    {parseText(15, `${ selectedForm.adopter.department }`)}
                                </h1>
                            </div>
                            {/* cuarta línea */}
                            <div className="flex relative top-[580px]">
                                <h1 className='relative left-[200px] font-light text-2xl w-[460px]'>
                                    {
                                        parseText(30, `${ selectedForm.adopter.email }`)
                                    }
                                </h1>
                                <h1 className='relative left-[400px] font-light text-2xl w-96'>
                                    {selectedForm.adopter.cellphone}
                                </h1>
                            </div>
                            {/* quinta línea */}
                            <div className="flex relative top-[710px]">
                                <h1 className='relative left-[300px] font-light text-center text-2xl w-96'>
                                    {parseText(30, `${ selectedForm.pet.firstNamePet } `)}
                                </h1>
                                <h1 className='relative top-3 left-[430px] font-light text-2xl w-72'>
                                    {selectedForm.pet.microchip}
                                </h1>
                            </div>
                            {/* sexta línea */}
                            <div className="flex relative top-[770px]">
                                <h1 className='relative top-2 left-[160px] font-light text-2xl w-24'>
                                    {
                                        selectedForm.pet.specie === 'DOG' ?
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            :
                                            ""
                                    }
                                </h1>
                                <h1 className='relative top-2 left-[165px] font-light text-2xl w-24 '>
                                    {
                                        selectedForm.pet.specie === 'DOG' ?
                                            ""
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                    }
                                </h1>
                                <h1 className='relative left-[260px] font-light text-2xl w-36 '>
                                    {
                                        parseText(20, `${ selectedForm.pet.specie === 'DOG' || selectedForm.pet.specie === 'CAT' ?
                                            ""
                                            :
                                            selectedForm.pet.specie
                                            }`)
                                    }
                                </h1>
                                <h1 className='relative left-[400px] font-light text-2xl w-72 '>
                                    {
                                        races.map((raceSelected, index) => {
                                            if (raceSelected.value === selectedForm.pet.race) {
                                                return (
                                                    <span key={index}>
                                                        {parseText(20, `${ raceSelected.label }`)}
                                                    </span>
                                                )
                                            }
                                        })
                                    }
                                </h1>
                            </div>

                            <div className="flex relative top-[830px]">
                                {
                                    selectedForm.pet.birthDatePet && (
                                        <h1 className='relative top-1 left-[170px] font-light text-lg w-60'>
                                            <span className='ml-2'>
                                                {
                                                    formatDateForm(selectedForm.pet.birthDatePet).split('/')[2]
                                                }
                                            </span>
                                            <span className='ml-6'>
                                                {
                                                    formatDateForm(selectedForm.pet.birthDatePet).split('/')[1]
                                                }
                                            </span>
                                            <span className='ml-5'>
                                                {
                                                    formatDateForm(selectedForm.pet.birthDatePet).split('/')[0]
                                                }
                                            </span>
                                        </h1>
                                    )
                                }
                                {
                                    selectedForm.pet.adoptionDate && (
                                        <h1 className='relative top-1 left-[135px] font-light text-lg w-60'>
                                            <span className='ml-2'>
                                                {
                                                    formatDateForm(selectedForm.pet.adoptionDate).split('/')[2]
                                                }
                                            </span>
                                            <span className='ml-5'>
                                                {
                                                    formatDateForm(selectedForm.pet.adoptionDate).split('/')[1]
                                                }
                                            </span>
                                            <span className='ml-5'>
                                                {
                                                    formatDateForm(selectedForm.pet.adoptionDate).split('/')[0]
                                                }
                                            </span>
                                        </h1>
                                    )
                                }
                                {/* {selectedForm.pet.genderPet === 'M' ? 'Macho' : 'Hembra'} */}
                                <h1 className='relative left-[108px] font-light text-2xl w-40 mt-3'>
                                    {
                                        selectedForm.pet.genderPet === 'M' ?
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            : ''
                                    }
                                </h1>
                                <h1 className='relative left-[60px] font-light text-2xl w-40 mt-3'>

                                    {
                                        selectedForm.pet.genderPet === 'M' ?
                                            ''
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>

                                    }
                                </h1>
                                <h1 className='relative left-[95px] font-light text-2xl w-24 mt-3'>

                                    {
                                        selectedForm.pet.isSterilized === 'isSterilized-yes' ?
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            :
                                            ''

                                    }
                                </h1>
                                <h1 className='relative left-[95px] font-light text-2xl w-24 mt-3'>
                                    {
                                        selectedForm.pet.isSterilized === 'isSterilized-yes' ?
                                            ''
                                            :
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>


                                    }
                                </h1>
                            </div>


                            <div className="flex relative top-[870px] h-[32px]">
                                <h1 className='relative left-[170px] font-light text-xl w-64 h-10 overflow-hidden'>
                                    {
                                        parseText(20, `${ formatTextWithColors(colours) }`)
                                        // colours.map((colour, index) => {
                                        //     const isSelected = selectedForm.pet.color.split(",").includes(colour.value);

                                        //     if (isSelected) {
                                        //         return (
                                        //             <span key={index} className='ml-2'>
                                        //                 {parseText(20, `${ colour.label } `)}
                                        //             </span>
                                        //         );
                                        //     }

                                        //     return null;
                                        // })
                                    }
                                </h1>
                                <h1 className='relative top-2 left-[420px] font-light text-[17px] w-60'>
                                    {selectedForm.pet.fatherMicrochip}
                                </h1>
                                <h1 className='relative top-2 left-[430px] font-light text-[17px] w-60'>
                                    {selectedForm.pet.motherMicrochip}
                                </h1>

                            </div>
                            <div className="flex relative top-[967px] ">
                                <h1 className='relative left-[103px] font-light text-2xl w-60'>
                                    {selectedForm.adopter.jurament1 ?
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 border">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        : <></>
                                    }
                                </h1>
                                {/* <h1 className='relative left-[420px] font-light text-[17px] w-60'>
                                    {selectedForm.adopter.jurament2 ?
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 border">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        : <></>
                                    }
                                </h1> */}
                                {/* <h1 className='relative top-[45px] left-[-378px] font-light text-[17px] w-60'>
                                    {selectedForm.adopter.jurament3 ?
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 border">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        : <></>
                                    }
                                </h1> */}
                                <h1 className='relative left-[420px] font-light text-[17px] w-60'>
                                    {selectedForm.adopter.jurament3 ?
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 border">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        : <></>
                                    }
                                </h1>

                            </div>
                        </div>

                    </div>
                </div>
                {/* plantilla */}
                <div className="absolute -z-10">
                    <div id="content-to-pdf" className="relative w-[1200px] h-[1600px] flex flex-col  bg-white text-black pb-4">
                        <div className="w-[1200px] h-[1600px] ">
                            {
                                route === 'forms' ?
                                    <img
                                        src="/img/forms/solicitud_registro.webp"
                                        alt="background"
                                        border="0"
                                        width={1300}
                                        height={1800}
                                        className='w-[1200px] h-[1600px]'
                                    />
                                    :
                                    <img
                                        src="/img/forms/certificate_microchip.webp"
                                        alt="background"
                                        border="0"
                                        width={1300}
                                        height={1800}
                                        className='w-[1200px] h-[1600px]'
                                    />
                            }
                        </div>
                        <div className="top-[-10px] absolute  w-[1200px] h-[1600px] overflow-hidden">
                            <div className="relative w-full h-full -top-[10px]">
                            <div className='flex'>
                                <img
                                    src={urlLogo}
                                    className='absolute top-[115px] left-[130px]'
                                    style={{ width: "200px" }}
                                    onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = `https://res.cloudinary.com/worldanireg/image/upload/v1703787762/entityRegister/logo/test.png`;
                                    }}
                                />
                                <h1 className='relative top-[135px] left-[550px] font-semibold text-3xl'>
                                    #{selectedForm.correlativeNumber.toString().padStart(8, "0")}
                                </h1>
                            </div>
                                <h1 className='relative top-[325px] left-[960px] font-semibold text-xl'>
                                    <span className='ml-4'>
                                        {
                                            formatedDateChip().split('/')[2]
                                        }
                                    </span>
                                    <span className='ml-6'>
                                        {
                                            formatedDateChip().split('/')[1]
                                        }
                                    </span>
                                    <span className='ml-4'>
                                        {
                                            formatedDateChip().split('/')[0]
                                        }
                                    </span>
                                </h1>
                                {/* primera linea */}
                                <div className="flex relative top-[435px]">
                                    <h1 className='relative left-[200px] font-light text-xl w-[500px] top-1 pb-1'>
                                        {
                                            parseText(36, `${ selectedForm.adopter.firstName } ${ selectedForm.adopter.secondName }  ${ selectedForm.adopter.firstLastName } ${ selectedForm.adopter.secondLastName }`)
                                        }
                                    </h1>
                                    <h1 className='relative left-[250px] font-light text-2xl w-40'>
                                        {selectedForm.adopter.documentNumber}
                                    </h1>
                                    <h1 className='relative top-2 left-[310px] font-light text-xl w-40'>
                                        <span className=''>
                                            {
                                                formatDateForm(selectedForm.adopter.birthDate).split('/')[2]
                                            }
                                        </span>
                                        <span className='ml-4'>
                                            {
                                                formatDateForm(selectedForm.adopter.birthDate).split('/')[1]
                                            }
                                        </span>
                                        <span className='ml-4'>
                                            {
                                                formatDateForm(selectedForm.adopter.birthDate).split('/')[0]
                                            }
                                        </span>
                                    </h1>
                                </div>
                                {/* segunda línea */}
                                <div className="flex relative top-[480px]">
                                    <h1 className='relative left-[200px] font-light text-xl w-[700px] top-1 pb-1'>
                                        {
                                            parseText(56, `${ selectedForm.adopter.address }`)
                                        }
                                    </h1>
                                </div>
                                {/* tercera línea */}
                                <div className="flex relative top-[530px]">
                                    <h1 className='relative left-[200px] font-light text-2xl w-96'>
                                        {parseText(15, `${ selectedForm.adopter.district }`)}
                                    </h1>
                                    <h1 className='relative flex justify-center left-[100px] font-light text-2xl w-64 border'>
                                        {parseText(15, `${ selectedForm.adopter.province }`)}
                                    </h1>
                                    <h1 className='relative flex justify-center left-[150px] font-light text-2xl w-64 border '>
                                        {parseText(15, `${ selectedForm.adopter.department }`)}
                                    </h1>
                                </div>
                                {/* cuarta línea */}
                                <div className="flex relative top-[580px]">
                                    <h1 className='relative left-[200px] font-light text-2xl w-[460px]'>
                                        {
                                            parseText(30, `${ selectedForm.adopter.email }`)
                                        }
                                    </h1>
                                    <h1 className='relative left-[500px] font-light text-2xl w-96'>
                                        {selectedForm.adopter.cellphone}
                                    </h1>
                                </div>
                                {/* quinta línea */}
                                <div className="flex relative top-[710px]">
                                    <h1 className='relative left-[300px] font-light text-2xl w-96'>
                                        {parseText(30, `${ selectedForm.pet.firstNamePet } `)}
                                    </h1>
                                    <h1 className='relative top-3 left-[430px] font-light text-2xl w-72'>
                                        {selectedForm.pet.microchip}
                                    </h1>
                                </div>
                                {/* sexta línea */}
                                <div className="flex relative top-[770px]">
                                    <h1 className='relative top-[18px] left-[160px] font-light text-2xl w-24'>
                                        {
                                            selectedForm.pet.specie === 'DOG' ?
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                :
                                                ""
                                        }
                                    </h1>
                                    <h1 className='relative top-[18px] left-[165px] font-light text-2xl w-24 '>
                                        {
                                            selectedForm.pet.specie === 'DOG' ?
                                                ""
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                        }
                                    </h1>
                                    <h1 className='relative left-[260px] font-light text-2xl w-36 '>
                                        {
                                            parseText(20, `${ selectedForm.pet.specie === 'DOG' || selectedForm.pet.specie === 'CAT' ?
                                                ""
                                                :
                                                selectedForm.pet.specie
                                                }`)
                                        }
                                    </h1>
                                    <h1 className='relative left-[400px] font-light text-2xl w-72 '>
                                        {
                                            races.map((raceSelected, index) => {
                                                if (raceSelected.value === selectedForm.pet.race) {
                                                    return (
                                                        <span key={index}>
                                                            {parseText(20, `${ raceSelected.label }`)}
                                                        </span>
                                                    )
                                                }
                                            })
                                        }
                                    </h1>
                                </div>

                                <div className="flex relative top-[830px]">
                                    {
                                        selectedForm.pet.birthDatePet && (
                                            <h1 className='relative top-1 left-[170px] font-light text-lg w-60'>
                                                <span className='ml-2'>
                                                    {
                                                        formatDateForm(selectedForm.pet.birthDatePet).split('/')[2]
                                                    }
                                                </span>
                                                <span className='ml-6'>
                                                    {
                                                        formatDateForm(selectedForm.pet.birthDatePet).split('/')[1]
                                                    }
                                                </span>
                                                <span className='ml-5'>
                                                    {
                                                        formatDateForm(selectedForm.pet.birthDatePet).split('/')[0]
                                                    }
                                                </span>
                                            </h1>
                                        )
                                    }
                                    {
                                        selectedForm.pet.adoptionDate && (
                                            <h1 className='relative top-1 left-[135px] font-light text-lg w-60'>
                                                <span className='ml-2'>
                                                    {
                                                        formatDateForm(selectedForm.pet.adoptionDate).split('/')[2]
                                                    }
                                                </span>
                                                <span className='ml-5'>
                                                    {
                                                        formatDateForm(selectedForm.pet.adoptionDate).split('/')[1]
                                                    }
                                                </span>
                                                <span className='ml-5'>
                                                    {
                                                        formatDateForm(selectedForm.pet.adoptionDate).split('/')[0]
                                                    }
                                                </span>
                                            </h1>
                                        )
                                    }
                                    {/* {selectedForm.pet.genderPet === 'M' ? 'Macho' : 'Hembra'} */}
                                    <h1 className='relative left-[108px] font-light text-2xl w-40 mt-3 top-[10px]'>
                                        {
                                            selectedForm.pet.genderPet === 'M' ?
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                : ''
                                        }
                                    </h1>
                                    <h1 className='relative left-[60px] font-light text-2xl w-40 mt-3 top-[10px]'>

                                        {
                                            selectedForm.pet.genderPet === 'M' ?
                                                ''
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>

                                        }
                                    </h1>
                                    <h1 className='relative left-[95px] font-light text-2xl w-24 mt-3 top-[10px]'>

                                        {
                                            selectedForm.pet.isSterilized === 'isSterilized-yes' ?
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                :
                                                ''

                                        }
                                    </h1>
                                    <h1 className='relative left-[95px] font-light text-2xl w-24 mt-3 top-[10px]'>
                                        {
                                            selectedForm.pet.isSterilized === 'isSterilized-yes' ?
                                                ''
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>


                                        }
                                    </h1>
                                </div>


                                <div className="flex relative top-[870px] h-[32px]">
                                    <h1 className='relative left-[170px] font-light text-2xl w-64 h-10 overflow-hidden'>
                                        {
                                            parseText(20, `${ formatTextWithColors(colours) }`)
                                            // parseText(20, `${ colours.map((colour, index) => {
                                            //     if (selectedForm.pet.color === colour.value) {
                                            //         return `${ colour.label }`
                                            //     }
                                            // }) }`
                                            // )
                                        }
                                    </h1>
                                    <h1 className='relative top-2 left-[420px] font-light text-[17px] w-60'>
                                        {selectedForm.pet.fatherMicrochip}
                                    </h1>
                                    <h1 className='relative top-2 left-[430px] font-light text-[17px] w-60'>
                                        {selectedForm.pet.motherMicrochip}
                                    </h1>

                                </div>
                                <div className="flex relative top-[967px]">
                                    <h1 className='relative top-[10px] left-[103px] font-light text-2xl w-60'>
                                        {selectedForm.adopter.jurament1 ?
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            : <></>
                                        }
                                    </h1>
                                    {/* <h1 className='relative top-[10px] left-[420px] font-light text-[17px] w-60'>
                                        {selectedForm.adopter.jurament2 ?
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            : <></>
                                        }
                                    </h1> */}
                                    <h1 className='relative top-[55px] left-[-378px] font-light text-[17px] w-60'>
                                        {selectedForm.adopter.jurament3 ?
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            : <></>
                                        }
                                    </h1>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* <div id="content-to-pdf" className="w-[1200px] flex flex-col items-center bg-white text-black pb-4">
                    <div className="w-full flex justify-center py-1 bg-[#04c4b4]">
                        <Image
                            src="/img/logo/logo-icon.png"
                            alt="Logo"
                            border="0"
                            width={140}
                            height={110}
                        />
                    </div>
                    <div className="flex flex-col py-2">
                        <h1
                            className='text-3xl font-bold text-center w-full pb-1'
                        >
                            #{selectedForm.correlativeNumber.toString().padStart(8, "0")}
                        </h1>
                        <h1 className='text-3xl font-bold text-center w-full pb-1'>
                            Gracias por formar parte del mundo #PETLOVER
                        </h1>
                    </div>
                    <div className="flex flex-col px-4 max-w-2xl text-center">
                        <p
                            className='text-xl text-center w-full py-2'
                        >
                            Su registro fue realizado exitosamente! Por favor revise sus credenciales de registro a continuación. No comparta esta información con niguna entidad, su llave private es de suma importancia.
                        </p>
                    </div>
                    <div className="w-full flex">

                        <div className="w-full justify-start flex-grow-[9rem]  flex flex-col pl-4 gap-3">
                            <h2
                                className='text-xl font-bold w-full py-2'
                            >
                                Datos del Usuario:
                            </h2>
                            <div className="flex">
                                <Image src="/img/logo/check.png" className="flex mr-1"
                                    alt="checked" border="0" width={30} height={10} />
                                <p>
                                    <b className="pr-2">Tipo de persona:</b>
                                    {selectedForm.adopter.person}
                                </p>
                            </div>
                            <div className="flex">
                                <Image src="/img/logo/check.png" className="flex mr-1"
                                    alt="checked" border="0" width={30} height={10} />
                                <p>
                                    <b className="pr-2">Tipo de Documento:</b>{selectedForm.adopter.documentType}

                                </p>
                            </div>
                            <div className="flex">
                                <Image src="/img/logo/check.png" className="flex mr-1"
                                    alt="checked" border="0" width={30} height={10} />
                                <p>
                                    <b className="pr-2">Número de Documento:</b>{selectedForm.adopter.documentNumber}
                                </p>
                            </div>
                            <div className="flex">
                                <Image src="/img/logo/check.png" className="flex mr-1"
                                    alt="checked" border="0" width={30} height={10} />
                                <p>
                                    <b className="pr-2">Tipo de Adoptante:</b>{selectedForm.adopter.adopterType}

                                </p>
                            </div>
                            <div className="flex">
                                <Image src="/img/logo/check.png" className="flex mr-1"
                                    alt="checked" border="0" width={30} height={10} />
                                <p>
                                    <b className="pr-2">¿Tiene dirección pública?:</b>{selectedForm.adopter.isAddressPublic}

                                </p>
                            </div>
                            <div className="flex">
                                <Image src="/img/logo/check.png" className="flex mr-1"
                                    alt="checked" border="0" width={30} height={10} />
                                <p>
                                    <b className="pr-2">Dirección Pública:</b>{selectedForm.adopter.addressPublic}

                                </p>
                            </div>
                            <div className="flex">
                                <Image src="/img/logo/check.png" className="flex mr-1"
                                    alt="checked" border="0" width={30} height={10} />
                                <p>
                                    <b className="pr-2">Primer Nombre:</b>{selectedForm.adopter.firstName}

                                </p>
                            </div>
                            <div className="flex">
                                <Image src="/img/logo/check.png" className="flex mr-1"
                                    alt="checked" border="0" width={30} height={10} />
                                <p>
                                    <b className="pr-2">Segundo Nombre:</b>{selectedForm.adopter.secondName}

                                </p>
                            </div>
                            <div className="flex">
                                <Image src="/img/logo/check.png" className="flex mr-1"
                                    alt="checked" border="0" width={30} height={10} />
                                <p>
                                    <b className="pr-2">Primer Apellido:</b>{selectedForm.adopter.firstLastName}

                                </p>
                            </div>
                            <div className="flex">
                                <Image src="/img/logo/check.png" className="flex mr-1"
                                    alt="checked" border="0" width={30} height={10} />
                                <p>
                                    <b className="pr-2">Segundo Apellido:</b>{selectedForm.adopter.secondLastName}

                                </p>
                            </div>
                            <div className="flex">
                                <Image src="/img/logo/check.png" className="flex mr-1"
                                    alt="checked" border="0" width={30} height={10} />
                                <p>
                                    <b className="pr-2">Fecha de Nacimiento:</b>{selectedForm.adopter.birthDate}

                                </p>
                            </div>
                            <div className="flex">
                                <Image src="/img/logo/check.png" className="flex mr-1"
                                    alt="checked" border="0" width={30} height={10} />
                                <p>
                                    <b className="pr-2">Género:</b>{selectedForm.adopter.gender}

                                </p>
                            </div>
                            <div className="flex">
                                <Image src="/img/logo/check.png" className="flex mr-1"
                                    alt="checked" border="0" width={30} height={10} />
                                <p>
                                    <b className="pr-2">Teléfono / Celular:</b>{selectedForm.adopter.cellphone}

                                </p>
                            </div>
                            <div className="flex">
                                <Image src="/img/logo/check.png" className="flex mr-1"
                                    alt="checked" border="0" width={30} height={10} />
                                <p>
                                    <b className="pr-2">Email:</b>{selectedForm.adopter.email}

                                </p>
                            </div>
                            <div className="flex">
                                <Image src="/img/logo/check.png" className="flex mr-1"
                                    alt="checked" border="0" width={30} height={10} />
                                <p>
                                    <b className="pr-2">Departamento:</b>{selectedForm.adopter.department}

                                </p>
                            </div>
                            <div className="flex">
                                <Image src="/img/logo/check.png" className="flex mr-1"
                                    alt="checked" border="0" width={30} height={10} />
                                <p>
                                    <b className="pr-2">Provincia:</b>{selectedForm.adopter.province}

                                </p>
                            </div>
                            <div className="flex">
                                <Image src="/img/logo/check.png" className="flex mr-1"
                                    alt="checked" border="0" width={30} height={10} />
                                <p>
                                    <b className="pr-2">Distrito:</b>{selectedForm.adopter.district}

                                </p>
                            </div>
                            <div className="flex">
                                <Image src="/img/logo/check.png" className="flex mr-1"
                                    alt="checked" border="0" width={30} height={10} />
                                <p>
                                    <b className="pr-2">Dirección :</b>{selectedForm.adopter.address}

                                </p>
                            </div>
                            <div className="flex">
                                <Image src="/img/logo/check.png" className="flex mr-1"
                                    alt="checked" border="0" width={30} height={10} />
                                <p>
                                    <b className="pr-2">Entidada Registradora:</b>{selectedForm.adopter.regiterEntity}

                                </p>
                            </div>
                        </div>

                        <div className="w-full justify-start flex-grow-[9rem]  flex flex-col pl-4">
                            <h2
                                className='text-xl font-bold w-full py-2'
                            >
                                Datos de la Mascota:
                            </h2>
                            <div className="flex flex-col gap-3">
                                <div className="flex ">
                                    <Image src="/img/logo/check.png" className="flex mr-1"
                                        alt="checked" border="0" width={30} height={10} />
                                    <p>
                                        <b className="pr-2">Microchip:</b>{selectedForm.pet.microchip}

                                    </p>
                                </div>
                                <div className="flex ">
                                    <Image src="/img/logo/check.png" className="flex mr-1"
                                        alt="checked" border="0" width={30} height={10} />
                                    <p>
                                        <b className="pr-2">Fecha de Microchip:</b>{selectedForm.pet.dateMicrochip}

                                    </p>
                                </div>
                                <div className="flex ">
                                    <Image src="/img/logo/check.png" className="flex mr-1"
                                        alt="checked" border="0" width={30} height={10} />
                                    <p>
                                        <b className="pr-2">Primer Nombre de la Mascota:</b>{selectedForm.pet.firstNamePet}

                                    </p>
                                </div>
                                <div className="flex ">
                                    <Image src="/img/logo/check.png" className="flex mr-1"
                                        alt="checked" border="0" width={30} height={10} />
                                    <p>
                                        <b className="pr-2">País de la Mascota:</b>{selectedForm.pet.countryPet}

                                    </p>
                                </div>
                                <div className="flex ">
                                    <Image src="/img/logo/check.png" className="flex mr-1"
                                        alt="checked" border="0" width={30} height={10} />
                                    <p>
                                        <b className="pr-2">Fecha de Nacimiento:</b>{selectedForm.pet.birthDatePet}

                                    </p>
                                </div>
                                <div className="flex ">
                                    <Image src="/img/logo/check.png" className="flex mr-1"
                                        alt="checked" border="0" width={30} height={10} />
                                    <p>
                                        <b className="pr-2">Fecha de Adopción:</b>{selectedForm.pet.adoptionDate}

                                    </p>
                                </div>
                                <div className="flex ">
                                    <Image src="/img/logo/check.png" className="flex mr-1"
                                        alt="checked" border="0" width={30} height={10} />
                                    <p>
                                        <b className="pr-2">Género de la mascota:</b>{selectedForm.pet.genderPet}

                                    </p>
                                </div>
                                <div className="flex ">
                                    <Image src="/img/logo/check.png" className="flex mr-1"
                                        alt="checked" border="0" width={30} height={10} />
                                    <p>
                                        <b className="pr-2">Especie:</b>{selectedForm.pet.specie}

                                    </p>
                                </div>
                                <div className="flex ">
                                    <Image src="/img/logo/check.png" className="flex mr-1"
                                        alt="checked" border="0" width={30} height={10} />
                                    <p>
                                        <b className="pr-2">Raza:</b>{selectedForm.pet.race}

                                    </p>
                                </div>
                                <div className="flex ">
                                    <Image src="/img/logo/check.png" className="flex mr-1"
                                        alt="checked" border="0" width={30} height={10} />
                                    <p>
                                        <b className="pr-2">Color:</b>{selectedForm.pet.color}

                                    </p>
                                </div>
                                <div className="flex ">
                                    <Image src="/img/logo/check.png" className="flex mr-1"
                                        alt="checked" border="0" width={30} height={10} />
                                    <p>
                                        <b className="pr-2">Esterilizado:</b>{selectedForm.pet.isSterilized}

                                    </p>
                                </div>
                                <div className="flex ">
                                    <Image src="/img/logo/check.png" className="flex mr-1"
                                        alt="checked" border="0" width={30} height={10} />
                                    <p>
                                        <b className="pr-2">Microchip del Padre:</b>{selectedForm.pet.fatherMicrochip}

                                    </p>
                                </div>
                                <div className="flex ">
                                    <Image src="/img/logo/check.png" className="flex mr-1"
                                        alt="checked" border="0" width={30} height={10} />
                                    <p>
                                        <b className="pr-2">Microchip de la Madre:</b>{selectedForm.pet.motherMicrochip}

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>

        </div>
    )
}
