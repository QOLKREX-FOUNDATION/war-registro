import React, { useState, useEffect, useRef, useContext } from "react";
import { firuApi } from "../../../api";
import { formatDateForm, parseText } from "../../utils/formatForm";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { downloadImage } from "../../utils/download";
import { useToken } from "../../hooks/useToken";
import { Web3Context } from "../../contexts/Web3/Web3Context";
import QRCode from "react-qr-code";
import { URL_EXPLORER } from "../../config";
import { usePrice } from "../../hooks/usePrice";
import { ChooseCurrency } from "../atoms/ChooseCurrency/ChooseCurrency";
import { ButtonPaymentCertificate } from "./ButtonPaymentCertificate";

export const GenealogyCertification = ({ petValues, adopter }) => {
  const [genealogy, setGenealogy] = useState([]);
  const [loading, setLoading] = useState(false);
  const { web3 } = useContext(Web3Context);
  const ref1 = useRef(null);

  const { coin, setCoin, price, setPrice, priceCoin, setPriceCoin } =
    usePrice();

  useEffect(() => {
    setLoading(true);
    firuApi
      .get(`/pets/genealogy/${petValues.chip}`, {
        // .get(`/pets/genealogy/111111111111111`, {
        headers: {
          "x-token": web3.authToken,
        },
      })
      .then((res) => {
        console.log(res);
        setGenealogy(res.data.genealogy);
        // console.log(form);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [petValues._id]);

  const { token, getToken } = useToken();

  useEffect(() => {
    getToken(web3, petValues.chip);
  }, []);

  console.log({ petValues });
  console.log({ adopter });
  console.log({ genealogy });

  const generatePdf = async () => {
    const pdfWidth = 297; // Ancho en mm
    const pdfHeight = 210; // Alto en mm

    setLoading(true);
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [pdfWidth, pdfHeight],
      putOnlyUsedFonts: true,
      compress: true,
      precision: 2,
      userUnit: 1,
      lineHeight: 1.15,
      dpi: 300, // Ajustar el DPI para mejorar la calidad
    });

    // Obtén el elemento HTML que deseas convertir en PDF
    const element = document.getElementById("content-to-pdf");

    // Convierte el elemento en un lienzo (canvas)
    html2canvas(element, {
      scale: 1.9,
    }).then((canvas) => {
      // Crea un objeto PDF con la medida del canvas
      const imgData = canvas.toDataURL("image/jpeg");

      // Agrega la imagen al PDF
      pdf.addImage(imgData, "JPEG", 0, 0, 280, 0);

      // Guarda el PDF o abre una ventana para descargarlo
      // pdf.save(`SRV-${ genealogy?.correlativeNumber?.toString().padStart(8, "0") }.pdf`);
      pdf.save(`SRV-${petValues?.name?.toString()}.pdf`);
    });

    setLoading(false);
  };

  const handleImage = () => {
    downloadImage(ref1, `cert-gen-${petValues.chip}`, 900, 1200, 1);
  };

  // getPet();

  console.log(`${genealogy?.son?.image}.png`);

  return (
    <>
      {loading ? (
        <div className="text-center dark:text-white text-lg">Cargando...</div>
      ) : (
        <>
          <div className="flex flex-col justify-center mb-4 gap-4 dark:text-black">
            <div className="flex justify-between">
              <span></span>
              <h2 className="text-center text-2xl dark:text-white">
                Certificado de Genelaogía
              </h2>

              <ChooseCurrency
                contract={"DOG"}
                price={price}
                setPrice={setPrice}
                coin={coin}
                setCoin={setCoin}
                priceCoin={priceCoin}
                setPriceCoin={setPriceCoin}
                variantPrice={1 / 8}
              />

              <ButtonPaymentCertificate
                handleFinish={handleImage}
                price={price}
                coin={coin}
                priceCoin={priceCoin}
              />

              {/* <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                  // generatePdf()
                  handleImage();
                }}
              >
                Descargar
              </button> */}
            </div>
            <div className="flex justify-center w-full overflow-x-auto">
              {/* preview */}
              <div className="relative w-[1200px] h-[900px] flex flex-col  bg-white text-black pb-4 ">
                <div className="w-[1200px] h-[1600px]">
                  {
                    <img
                      src="/img/certificate/genealogy/certificate_genealogy_complete.webp"
                      alt="background"
                      border="0"
                      width={1300}
                      height={900}
                      className="w-[1200px] h-[900px]"
                    />
                  }
                </div>
                <div className="absolute border border-blue-600 w-[1200px] h-[900px] overflow-hidden">
                  <div className="relative w-full h-full">
                    {/* <img
                      src="/img/certificate/genealogy/world-animal-registry.webp"
                      alt="war"
                      border="0"
                      width={650}
                      height={200}
                      className="absolute top-[10px] left-[270px] w-[650px] h-[200px]"
                    />

                    <img
                      src="/img/certificate/genealogy/firulaix-logo.png"
                      alt="war"
                      border="0"
                      width={150}
                      height={150}
                      className="absolute top-[50px] left-[970px] w-[150px] h-[150px]"
                    />

                    <img
                      src="/img/certificate/genealogy/world-animal-registry-alt.png"
                      alt="war"
                      border="0"
                      width={120}
                      height={500}
                      className="absolute top-[260px] left-[990px] w-[120px] h-[500px]"
                    /> */}

                    <div className="flex flex-col relative top-[140px] left-[300px] ">
                      {/* <h1 className="font-semibold text-3xl">
                        World Animal registry
                      </h1> */}
                      {/* <h1 className="font-semibold text-3xl">
                        Certificado de Genealogía
                      </h1> */}
                      <p className="text-[12px] text-center font-semibold max-w-[610px]">
                        Este certificado atestigua la genealogía del animal,
                        emitido por el World Animal registry (W.A.R.).
                        <br />
                        Este documento confirma la ascendencia del animal hasta
                        la cuarta generación.
                      </p>
                    </div>

                    {/* <div className="flex flex-col items-start justify-center h-auto w-full text-black overflow-x-auto lg:items-center border border-green-600 ">
                    </div> */}
                    <div className="absolute flex flex-col gap-10 top-[180px] left-[70px] text-[13px] ">
                      <div className="flex flex-col w-[250px] max-w-[250px]">
                        <p>
                          <strong>ID del NFT:</strong>
                        </p>
                        <p className="text-balance max-w-[100%] break-all">
                          {/* https://celoscan.io/tx/
                          {petValues.hash} */}
                          {token}
                        </p>
                        <p>
                          <strong>Nombre del Animal:</strong>
                        </p>
                        <span className="text-balance max-w-[100%] overflow-hidden overflow-ellipsis whitespace-nowrap">
                          {petValues.name}
                        </span>
                        <p>
                          <strong>Fecha de Nacimiento:</strong>
                        </p>
                        <span className="text-balance max-w-[100%] overflow-hidden overflow-ellipsis whitespace-nowrap">
                          {formatDateForm(petValues.date)}
                        </span>
                        <p>
                          <strong>Especie:</strong>
                        </p>
                        <span className="text-balance max-w-[100%] overflow-hidden overflow-ellipsis whitespace-nowrap">
                          {petValues.type === "DOG"
                            ? "PERRO"
                            : petValues.type === "CAT"
                            ? "GATO"
                            : ""}
                        </span>
                        <p>
                          <strong>Raza:</strong>
                        </p>
                        <span className="text-balance max-w-[100%] overflow-hidden overflow-ellipsis whitespace-nowrap">
                          {petValues.race}
                        </span>
                        <p>
                          <strong>Color/Marcas Distintivas:</strong>
                        </p>
                        <span className="text-balance max-w-[100%] overflow-hidden overflow-ellipsis whitespace-nowrap">
                          {petValues.colour}
                        </span>
                        {/* <p>
                          <strong>Hash:</strong>
                        </p> */}
                        {/* <QRCode
                          value={`${URL_EXPLORER}tx/${petValues.hash}`}
                          size={100}
                        />
                        <span className="text-balance max-w-[100%] break-all">
                          {`${URL_EXPLORER}tx/
                            ${petValues.hash}
                            `}
                        </span> */}
                      </div>

                      <div className="flex flex-col w-[250px] max-w-[250px]">
                        <p>
                          <strong>Registrante:</strong>
                        </p>
                        <span>{petValues.userName}</span>
                        <p>
                          <strong>Address:</strong>
                        </p>
                        <span className="text-balance max-w-[100%] break-all">
                          {petValues.userAddress}
                        </span>
                        <p>
                          <strong>Adoptante:</strong>
                        </p>
                        <span className="text-balance max-w-[100%] break-all">
                          {adopter.firstName} {adopter.secondName}{" "}
                          {adopter.lastName} {adopter.mLastName}
                        </span>
                        <p>
                          <strong>Address:</strong>
                        </p>
                        <span className="text-balance max-w-[100%] break-all">
                          {adopter.address}
                        </span>
                      </div>
                    </div>

                    <div className="absolute w-full max-w-5xl min-w-[1024px]  px-5 py-3 flex flex-row items-center top-[100px] left-[260px] scale-[.8]">
                      {/* hijo */}
                      <div className="flex flex-col relative">
                        <div className="flex flex-col mx-auto">
                          <h2 className="text-xl font-semibold py-2 text-center">
                            Hijo
                          </h2>
                          <img
                            src={`${genealogy?.son?.image}.png`}
                            className="rounded-full object-cover w-24 h-24 border-2 border-gray-500 "
                            alt="hijo"
                            width={96}
                            height={96}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/img/error/DOG.png";
                            }}
                          />
                          <h2 className="text-xl font-semibold py-2 text-center">
                            {genealogy?.son?.name}
                          </h2>
                          <span className="text-base font-semibold text-center">
                            {genealogy?.son?.chip}
                          </span>
                        </div>

                        <div className="flex w-8 h-36 absolute top-8 left-[138px]">
                          <div className="flex flex-col border-t-4 border-b-4 border-l-4 w-full border-gray-500 "></div>
                          <div className="absolute flex flex-col border-t-4 w-8 border-gray-500  top-16 -left-8"></div>
                        </div>
                        {/* <div className="flex flex-col border-t-4 w-20 border-gray-500 "></div> */}
                        {/* <div className="flex flex-col border-l-4 w-4 h-5 mx-auto border-gray-500 "></div> */}
                      </div>
                      {/* padres */}
                      {(genealogy?.father?.name || genealogy?.mother?.name) && (
                        <div className="w-full justify-center flex flex-col items-start ml-24 gap-14 min-w-[176px] max-w-[220px]">
                          <div className="flex flex-col items-start relative h-24">
                            <h2 className="text-xl font-semibold text-center">
                              Padre
                            </h2>

                            <h2 className="text-base font-semibold text-center">
                              {genealogy?.father?.name}
                            </h2>
                            <span className="text-base font-semibold text-center">
                              {genealogy?.father?.chip}
                            </span>

                            <div className="flex w-8 h-36 absolute -top-28 left-[170px]">
                              <div className="flex flex-col border-t-4 border-b-4 border-l-4 w-full border-gray-500 "></div>
                              <div className="absolute flex flex-col border-t-4 w-8 border-gray-500  top-16 -left-8"></div>
                            </div>
                          </div>

                          <div className="flex flex-col items-start relative mt-3 h-24">
                            <h2 className="text-xl font-semibold text-center">
                              Madre
                            </h2>
                            <h2 className="text-xl font-semibold text-center">
                              {genealogy?.mother?.name}
                            </h2>
                            <span className="text-base font-semibold text-center">
                              {genealogy?.mother?.chip}
                            </span>

                            <div className="flex w-8 h-36 absolute top-9 left-[170px]">
                              <div className="flex flex-col border-t-4 border-b-4 border-l-4 w-full border-gray-500 "></div>
                              <div className="absolute flex flex-col border-t-4 w-8 border-gray-500  top-16 -left-8"></div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* abuelos */}
                      <div className="w-full flex flex-col items-start gap-24 h-full min-w-[176px] max-w-[220px]">
                        {/* padres del padre */}
                        <div className="flex flex-col gap-10 items-center">
                          <div className="flex flex-col h-24 items-start relative">
                            <h2 className="text-xl font-semibold text-center">
                              Padre
                            </h2>
                            <h2 className="text-xl font-semibold text-center">
                              {genealogy?.grandparents?.father?.father?.name}
                            </h2>
                            <span className="text-base font-semibold text-center">
                              {genealogy?.grandparents?.father?.father?.chip}
                            </span>
                            <div className="flex w-8 h-24 absolute -top-14 left-[170px]">
                              <div className="flex flex-col border-t-4 border-b-4 border-l-4 w-full border-gray-500 "></div>
                              <div className="absolute flex flex-col border-t-4 w-8 border-gray-500  top-12 -left-8"></div>
                            </div>
                          </div>

                          <div className="flex flex-col h-24 items-start relative">
                            <h2 className="text-xl font-semibold text-center">
                              Madre
                            </h2>
                            <h2 className="text-xl font-semibold text-center">
                              {genealogy?.grandparents?.father?.mother?.name}
                            </h2>
                            <span className="text-base font-semibold text-center">
                              {genealogy?.grandparents?.father?.mother?.chip}
                            </span>
                            <div className="flex w-8 h-24 absolute -top-4 left-[170px]">
                              <div className="flex flex-col border-t-4 border-b-4 border-l-4 w-full border-gray-500 "></div>
                              <div className="absolute flex flex-col border-t-4 w-8 border-gray-500  top-12 -left-8"></div>
                            </div>
                          </div>
                        </div>

                        {/* padres de la madre */}
                        <div className="flex flex-col items-center gap-10">
                          <div className="flex flex-col h-24 items-start relative">
                            <h2 className="text-xl font-semibold text-center">
                              Padre
                            </h2>

                            <h2 className="text-xl font-semibold text-center">
                              {genealogy?.grandparents?.mother?.father?.name}
                            </h2>
                            <span className="text-base font-semibold text-center">
                              {genealogy?.grandparents?.mother?.father?.chip}
                            </span>
                            <div className="flex w-8 h-24 absolute top-0 left-[170px]">
                              <div className="flex flex-col border-t-4 border-b-4 border-l-4 w-full border-gray-500 "></div>
                              <div className="absolute flex flex-col border-t-4 w-8 border-gray-500  top-12 -left-8"></div>
                            </div>
                          </div>

                          <div className="flex flex-col h-24 items-start relative">
                            <h2 className="text-xl font-semibold text-center">
                              Madre
                            </h2>
                            <h2 className="text-xl font-semibold text-center">
                              {genealogy?.grandparents?.mother?.mother?.name}
                            </h2>

                            <span className="text-base font-semibold text-center">
                              {genealogy?.grandparents?.mother?.mother?.chip}
                            </span>
                            <div className="flex w-8 h-24 absolute top-10 left-[170px]">
                              <div className="flex flex-col border-t-4 border-b-4 border-l-4 w-full border-gray-500 "></div>
                              <div className="absolute flex flex-col border-t-4 w-8 border-gray-500  top-12 -left-8"></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* tatara abuelos */}
                      <div className="flex flex-col items-start gap-4 min-w-[176px] max-w-[220px] ml-2">
                        {/* tatara abuelos paternos*/}
                        <div className="flex flex-col gap-3">
                          {/* padres del padre */}
                          <div className="flex flex-col gap-3 items-start relative">
                            <div className="flex flex-col h-20 items-start">
                              <h2 className="text-xl font-semibold text-center">
                                Padre
                              </h2>

                              <h2 className="text-xl font-semibold text-center">
                                {
                                  genealogy?.greatGrandparents?.father?.father
                                    ?.father?.name
                                }
                              </h2>
                              <span className="text-base font-semibold text-center">
                                {
                                  genealogy?.greatGrandparents?.father?.father
                                    ?.father?.chip
                                }
                              </span>
                            </div>

                            <div className="flex flex-col h-20 items-start">
                              <h2 className="text-xl font-semibold text-center">
                                Madre
                              </h2>
                              <h2 className="text-xl font-semibold text-center">
                                {
                                  genealogy?.greatGrandparents?.father?.father
                                    ?.mother?.name
                                }
                              </h2>
                              <span className="text-base font-semibold text-center">
                                {
                                  genealogy?.greatGrandparents?.father?.father
                                    ?.mother?.chip
                                }
                              </span>
                            </div>
                          </div>

                          {/* padres de la madre */}
                          <div className="flex flex-col gap-3 items-start relative">
                            <div className="flex flex-col h-20 items-start">
                              <h2 className="text-xl font-semibold text-center">
                                Padre
                              </h2>
                              <h2 className="text-xl font-semibold text-center">
                                {
                                  genealogy?.greatGrandparents?.father?.mother
                                    ?.father?.name
                                }
                              </h2>
                              <span className="text-base font-semibold text-center">
                                {
                                  genealogy?.greatGrandparents?.father?.mother
                                    ?.father?.chip
                                }
                              </span>
                            </div>

                            <div className="flex flex-col h-20 items-start">
                              <h2 className="text-xl font-semibold text-center">
                                Madre
                              </h2>
                              <h2 className="text-xl font-semibold text-center">
                                {
                                  genealogy?.greatGrandparents?.father?.mother
                                    ?.mother?.name
                                }
                              </h2>
                              <span className="text-base font-semibold text-center">
                                {
                                  genealogy?.greatGrandparents?.father?.mother
                                    ?.mother?.chip
                                }
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* tatara abuelos maternos*/}
                        <div className="flex flex-col gap-3">
                          {/* padres del padre */}
                          <div className="flex flex-col gap-3 items-start">
                            <div className="flex flex-col h-20 items-start relative">
                              <h2 className="text-xl font-semibold text-center">
                                Padre
                              </h2>

                              <h2 className="text-xl font-semibold text-center">
                                {
                                  genealogy?.greatGrandparents?.mother?.father
                                    ?.father?.name
                                }
                              </h2>
                              <span className="text-base font-semibold text-center">
                                {
                                  genealogy?.greatGrandparents?.mother?.father
                                    ?.father?.chip
                                }
                              </span>
                            </div>

                            <div className="flex flex-col h-20 items-start relative">
                              <h2 className="text-xl font-semibold text-center">
                                Madre
                              </h2>
                              <h2 className="text-xl font-semibold text-center">
                                {
                                  genealogy?.greatGrandparents?.mother?.father
                                    ?.mother?.name
                                }
                              </h2>
                              <span className="text-base font-semibold text-center">
                                {
                                  genealogy?.greatGrandparents?.mother?.father
                                    ?.mother?.chip
                                }
                              </span>
                            </div>
                          </div>

                          {/* padres de la madre */}
                          <div className="flex flex-col gap-3 items-start">
                            <div className="flex flex-col h-20 items-start">
                              <h2 className="text-xl font-semibold text-center">
                                Padre
                              </h2>
                              <h2 className="text-xl font-semibold text-center">
                                {
                                  genealogy?.greatGrandparents?.mother?.mother
                                    ?.father?.name
                                }
                              </h2>
                              <span className="text-base font-semibold text-center">
                                {
                                  genealogy?.greatGrandparents?.mother?.mother
                                    ?.father?.chip
                                }
                              </span>
                            </div>

                            <div className="flex flex-col h-20 items-start">
                              <h2 className="text-xl font-semibold text-center">
                                Madre
                              </h2>

                              <h2 className="text-xl font-semibold text-center">
                                {
                                  genealogy?.greatGrandparents?.mother?.mother
                                    ?.mother?.name
                                }
                              </h2>
                              <span className="text-base font-semibold text-center">
                                {
                                  genealogy?.greatGrandparents?.mother?.mother
                                    ?.mother?.chip
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* firmas */}
                    <div className="flex items-center absolute gap-10 bottom-10 left-[80px]">
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-[200px] border-t-4 border-yellow-500"></div>
                        <span className="flex flex-co text-center items-center text-[12px] font-thin">
                          Entidad registradora <br />
                          {petValues.userName}
                        </span>
                      </div>
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-[200px] border-t-4 border-yellow-500"></div>
                        <span className="flex flex-col text-center items-center text-[12px] font-thin">
                          Director General <br />
                          World Animal Registry
                        </span>
                      </div>
                      <div className="flex gap-4 ">
                        <QRCode
                          value={`${URL_EXPLORER}tx/${petValues.hash}`}
                          size={80}
                        />
                        <span className="text-balance text-[12px] font-semibold max-w-[200px] break-all">
                          {`${URL_EXPLORER}tx/
                            ${petValues.hash}
                            `}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* plantilla */}
              <div className="absolute -z-10">
                <div
                  id="content-to-pdf"
                  ref={ref1}
                  className="relative w-[1200px] h-[900px] flex flex-col  bg-white text-black pb-4"
                >
                  <div className="relative w-[1200px] h-[900px] flex flex-col  bg-white text-black pb-4 ">
                    <div className="w-[1200px] h-[900px]">
                      {
                        <img
                          src="/img/certificate/genealogy/certificate_genealogy_complete.webp"
                          alt="background"
                          border="0"
                          width={1300}
                          height={900}
                          className="w-[1200px] h-[900px]"
                        />
                      }
                    </div>
                    <div className="absolute border border-blue-600 w-[1200px] h-[900px] overflow-hidden">
                      <div className="relative w-full h-full">
                        {/* <img
                      src="/img/certificate/genealogy/world-animal-registry.webp"
                      alt="war"
                      border="0"
                      width={650}
                      height={200}
                      className="absolute top-[10px] left-[270px] w-[650px] h-[200px]"
                    />

                    <img
                      src="/img/certificate/genealogy/firulaix-logo.png"
                      alt="war"
                      border="0"
                      width={150}
                      height={150}
                      className="absolute top-[50px] left-[970px] w-[150px] h-[150px]"
                    />

                    <img
                      src="/img/certificate/genealogy/world-animal-registry-alt.png"
                      alt="war"
                      border="0"
                      width={120}
                      height={500}
                      className="absolute top-[260px] left-[990px] w-[120px] h-[500px]"
                    /> */}

                        <div className="flex flex-col relative top-[140px] left-[300px] ">
                          {/* <h1 className="font-semibold text-3xl">
                        World Animal registry
                      </h1> */}
                          {/* <h1 className="font-semibold text-3xl">
                        Certificado de Genealogía
                      </h1> */}
                          <p className="text-[12px] text-center font-semibold max-w-[610px]">
                            Este certificado atestigua la genealogía del animal,
                            emitido por el World Animal registry (W.A.R.).
                            <br />
                            Este documento confirma la ascendencia del animal
                            hasta la cuarta generación.
                          </p>
                        </div>

                        {/* <div className="flex flex-col items-start justify-center h-auto w-full text-black overflow-x-auto lg:items-center border border-green-600 ">
                    </div> */}
                        <div className="absolute flex flex-col gap-10 top-[180px] left-[70px] text-[13px] ">
                          <div className="flex flex-col w-[250px] max-w-[250px]">
                            <p>
                              <strong>ID del NFT:</strong>
                            </p>
                            <p className="text-balance max-w-[100%] break-all">
                              {/* https://celoscan.io/tx/
                          {petValues.hash} */}
                              {token}
                            </p>
                            <p>
                              <strong>Nombre del Animal:</strong>
                            </p>
                            <span className="text-balance max-w-[100%] overflow-hidden overflow-ellipsis whitespace-nowrap">
                              {petValues.name}
                            </span>
                            <p>
                              <strong>Fecha de Nacimiento:</strong>
                            </p>
                            <span className="text-balance max-w-[100%] overflow-hidden overflow-ellipsis whitespace-nowrap">
                              {formatDateForm(petValues.date)}
                            </span>
                            <p>
                              <strong>Especie:</strong>
                            </p>
                            <span className="text-balance max-w-[100%] overflow-hidden overflow-ellipsis whitespace-nowrap">
                              {petValues.type === "DOG"
                                ? "PERRO"
                                : petValues.type === "CAT"
                                ? "GATO"
                                : ""}
                            </span>
                            <p>
                              <strong>Raza:</strong>
                            </p>
                            <span className="text-balance max-w-[100%] overflow-hidden overflow-ellipsis whitespace-nowrap">
                              {petValues.race}
                            </span>
                            <p>
                              <strong>Color/Marcas Distintivas:</strong>
                            </p>
                            <span className="text-balance max-w-[100%] overflow-hidden overflow-ellipsis whitespace-nowrap">
                              {petValues.colour}
                            </span>
                            {/* <p>
                          <strong>Hash:</strong>
                        </p> */}
                            {/* <QRCode
                          value={`${URL_EXPLORER}tx/${petValues.hash}`}
                          size={100}
                        />
                        <span className="text-balance max-w-[100%] break-all">
                          {`${URL_EXPLORER}tx/
                            ${petValues.hash}
                            `}
                        </span> */}
                          </div>

                          <div className="flex flex-col w-[250px] max-w-[250px]">
                            <p>
                              <strong>Registrante:</strong>
                            </p>
                            <span>{petValues.userName}</span>
                            <p>
                              <strong>Address:</strong>
                            </p>
                            <span className="text-balance max-w-[100%] break-all">
                              {petValues.userAddress}
                            </span>
                            <p>
                              <strong>Adoptante:</strong>
                            </p>
                            <span className="text-balance max-w-[100%] break-all">
                              {adopter.firstName} {adopter.secondName}{" "}
                              {adopter.lastName} {adopter.mLastName}
                            </span>
                            <p>
                              <strong>Address:</strong>
                            </p>
                            <span className="text-balance max-w-[100%] break-all">
                              {adopter.address}
                            </span>
                          </div>
                        </div>

                        <div className="absolute w-full max-w-5xl min-w-[1024px]  px-5 py-3 flex flex-row items-center top-[100px] left-[260px] scale-[.8]">
                          {/* hijo */}
                          <div className="flex flex-col relative">
                            <div className="flex flex-col mx-auto">
                              <h2 className="text-xl font-semibold py-2 text-center">
                                Hijo
                              </h2>
                              <img
                                src={`${genealogy?.son?.image}.png`}
                                className="rounded-full object-cover w-24 h-24 border-2 border-gray-500 "
                                alt="hijo"
                                width={96}
                                height={96}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "/img/error/DOG.png";
                                }}
                              />
                              <h2 className="text-xl font-semibold py-2 text-center">
                                {genealogy?.son?.name}
                              </h2>
                              <span className="text-base font-semibold text-center">
                                {genealogy?.son?.chip}
                              </span>
                            </div>

                            <div className="flex w-8 h-36 absolute top-8 left-[138px]">
                              <div className="flex flex-col border-t-4 border-b-4 border-l-4 w-full border-gray-500 "></div>
                              <div className="absolute flex flex-col border-t-4 w-8 border-gray-500  top-16 -left-8"></div>
                            </div>
                            {/* <div className="flex flex-col border-t-4 w-20 border-gray-500 "></div> */}
                            {/* <div className="flex flex-col border-l-4 w-4 h-5 mx-auto border-gray-500 "></div> */}
                          </div>
                          {/* padres */}
                          {(genealogy?.father?.name ||
                            genealogy?.mother?.name) && (
                            <div className="w-full justify-center flex flex-col items-start ml-24 gap-14 min-w-[176px] max-w-[220px]">
                              <div className="flex flex-col items-start relative h-24">
                                <h2 className="text-xl font-semibold text-center">
                                  Padre
                                </h2>

                                <h2 className="text-base font-semibold text-center">
                                  {genealogy?.father?.name}
                                </h2>
                                <span className="text-base font-semibold text-center">
                                  {genealogy?.father?.chip}
                                </span>

                                <div className="flex w-8 h-36 absolute -top-28 left-[170px]">
                                  <div className="flex flex-col border-t-4 border-b-4 border-l-4 w-full border-gray-500 "></div>
                                  <div className="absolute flex flex-col border-t-4 w-8 border-gray-500  top-16 -left-8"></div>
                                </div>
                              </div>

                              <div className="flex flex-col items-start relative mt-3 h-24">
                                <h2 className="text-xl font-semibold text-center">
                                  Madre
                                </h2>
                                <h2 className="text-xl font-semibold text-center">
                                  {genealogy?.mother?.name}
                                </h2>
                                <span className="text-base font-semibold text-center">
                                  {genealogy?.mother?.chip}
                                </span>

                                <div className="flex w-8 h-36 absolute top-9 left-[170px]">
                                  <div className="flex flex-col border-t-4 border-b-4 border-l-4 w-full border-gray-500 "></div>
                                  <div className="absolute flex flex-col border-t-4 w-8 border-gray-500  top-16 -left-8"></div>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* abuelos */}
                          <div className="w-full flex flex-col items-start gap-24 h-full min-w-[176px] max-w-[220px]">
                            {/* padres del padre */}
                            <div className="flex flex-col gap-10 items-center">
                              <div className="flex flex-col h-24 items-start relative">
                                <h2 className="text-xl font-semibold text-center">
                                  Padre
                                </h2>
                                <h2 className="text-xl font-semibold text-center">
                                  {
                                    genealogy?.grandparents?.father?.father
                                      ?.name
                                  }
                                </h2>
                                <span className="text-base font-semibold text-center">
                                  {
                                    genealogy?.grandparents?.father?.father
                                      ?.chip
                                  }
                                </span>
                                <div className="flex w-8 h-24 absolute -top-14 left-[170px]">
                                  <div className="flex flex-col border-t-4 border-b-4 border-l-4 w-full border-gray-500 "></div>
                                  <div className="absolute flex flex-col border-t-4 w-8 border-gray-500  top-12 -left-8"></div>
                                </div>
                              </div>

                              <div className="flex flex-col h-24 items-start relative">
                                <h2 className="text-xl font-semibold text-center">
                                  Madre
                                </h2>
                                <h2 className="text-xl font-semibold text-center">
                                  {
                                    genealogy?.grandparents?.father?.mother
                                      ?.name
                                  }
                                </h2>
                                <span className="text-base font-semibold text-center">
                                  {
                                    genealogy?.grandparents?.father?.mother
                                      ?.chip
                                  }
                                </span>
                                <div className="flex w-8 h-24 absolute -top-4 left-[170px]">
                                  <div className="flex flex-col border-t-4 border-b-4 border-l-4 w-full border-gray-500 "></div>
                                  <div className="absolute flex flex-col border-t-4 w-8 border-gray-500  top-12 -left-8"></div>
                                </div>
                              </div>
                            </div>

                            {/* padres de la madre */}
                            <div className="flex flex-col items-center gap-10">
                              <div className="flex flex-col h-24 items-start relative">
                                <h2 className="text-xl font-semibold text-center">
                                  Padre
                                </h2>

                                <h2 className="text-xl font-semibold text-center">
                                  {
                                    genealogy?.grandparents?.mother?.father
                                      ?.name
                                  }
                                </h2>
                                <span className="text-base font-semibold text-center">
                                  {
                                    genealogy?.grandparents?.mother?.father
                                      ?.chip
                                  }
                                </span>
                                <div className="flex w-8 h-24 absolute top-0 left-[170px]">
                                  <div className="flex flex-col border-t-4 border-b-4 border-l-4 w-full border-gray-500 "></div>
                                  <div className="absolute flex flex-col border-t-4 w-8 border-gray-500  top-12 -left-8"></div>
                                </div>
                              </div>

                              <div className="flex flex-col h-24 items-start relative">
                                <h2 className="text-xl font-semibold text-center">
                                  Madre
                                </h2>
                                <h2 className="text-xl font-semibold text-center">
                                  {
                                    genealogy?.grandparents?.mother?.mother
                                      ?.name
                                  }
                                </h2>

                                <span className="text-base font-semibold text-center">
                                  {
                                    genealogy?.grandparents?.mother?.mother
                                      ?.chip
                                  }
                                </span>
                                <div className="flex w-8 h-24 absolute top-10 left-[170px]">
                                  <div className="flex flex-col border-t-4 border-b-4 border-l-4 w-full border-gray-500 "></div>
                                  <div className="absolute flex flex-col border-t-4 w-8 border-gray-500  top-12 -left-8"></div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* tatara abuelos */}
                          <div className="flex flex-col items-start gap-4 min-w-[176px] max-w-[220px] ml-2">
                            {/* tatara abuelos paternos*/}
                            <div className="flex flex-col gap-3">
                              {/* padres del padre */}
                              <div className="flex flex-col gap-3 items-start relative">
                                <div className="flex flex-col h-20 items-start">
                                  <h2 className="text-xl font-semibold text-center">
                                    Padre
                                  </h2>

                                  <h2 className="text-xl font-semibold text-center">
                                    {
                                      genealogy?.greatGrandparents?.father
                                        ?.father?.father?.name
                                    }
                                  </h2>
                                  <span className="text-base font-semibold text-center">
                                    {
                                      genealogy?.greatGrandparents?.father
                                        ?.father?.father?.chip
                                    }
                                  </span>
                                </div>

                                <div className="flex flex-col h-20 items-start">
                                  <h2 className="text-xl font-semibold text-center">
                                    Madre
                                  </h2>
                                  <h2 className="text-xl font-semibold text-center">
                                    {
                                      genealogy?.greatGrandparents?.father
                                        ?.father?.mother?.name
                                    }
                                  </h2>
                                  <span className="text-base font-semibold text-center">
                                    {
                                      genealogy?.greatGrandparents?.father
                                        ?.father?.mother?.chip
                                    }
                                  </span>
                                </div>
                              </div>

                              {/* padres de la madre */}
                              <div className="flex flex-col gap-3 items-start relative">
                                <div className="flex flex-col h-20 items-start">
                                  <h2 className="text-xl font-semibold text-center">
                                    Padre
                                  </h2>
                                  <h2 className="text-xl font-semibold text-center">
                                    {
                                      genealogy?.greatGrandparents?.father
                                        ?.mother?.father?.name
                                    }
                                  </h2>
                                  <span className="text-base font-semibold text-center">
                                    {
                                      genealogy?.greatGrandparents?.father
                                        ?.mother?.father?.chip
                                    }
                                  </span>
                                </div>

                                <div className="flex flex-col h-20 items-start">
                                  <h2 className="text-xl font-semibold text-center">
                                    Madre
                                  </h2>
                                  <h2 className="text-xl font-semibold text-center">
                                    {
                                      genealogy?.greatGrandparents?.father
                                        ?.mother?.mother?.name
                                    }
                                  </h2>
                                  <span className="text-base font-semibold text-center">
                                    {
                                      genealogy?.greatGrandparents?.father
                                        ?.mother?.mother?.chip
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* tatara abuelos maternos*/}
                            <div className="flex flex-col gap-3">
                              {/* padres del padre */}
                              <div className="flex flex-col gap-3 items-start">
                                <div className="flex flex-col h-20 items-start relative">
                                  <h2 className="text-xl font-semibold text-center">
                                    Padre
                                  </h2>

                                  <h2 className="text-xl font-semibold text-center">
                                    {
                                      genealogy?.greatGrandparents?.mother
                                        ?.father?.father?.name
                                    }
                                  </h2>
                                  <span className="text-base font-semibold text-center">
                                    {
                                      genealogy?.greatGrandparents?.mother
                                        ?.father?.father?.chip
                                    }
                                  </span>
                                </div>

                                <div className="flex flex-col h-20 items-start relative">
                                  <h2 className="text-xl font-semibold text-center">
                                    Madre
                                  </h2>
                                  <h2 className="text-xl font-semibold text-center">
                                    {
                                      genealogy?.greatGrandparents?.mother
                                        ?.father?.mother?.name
                                    }
                                  </h2>
                                  <span className="text-base font-semibold text-center">
                                    {
                                      genealogy?.greatGrandparents?.mother
                                        ?.father?.mother?.chip
                                    }
                                  </span>
                                </div>
                              </div>

                              {/* padres de la madre */}
                              <div className="flex flex-col gap-3 items-start">
                                <div className="flex flex-col h-20 items-start">
                                  <h2 className="text-xl font-semibold text-center">
                                    Padre
                                  </h2>
                                  <h2 className="text-xl font-semibold text-center">
                                    {
                                      genealogy?.greatGrandparents?.mother
                                        ?.mother?.father?.name
                                    }
                                  </h2>
                                  <span className="text-base font-semibold text-center">
                                    {
                                      genealogy?.greatGrandparents?.mother
                                        ?.mother?.father?.chip
                                    }
                                  </span>
                                </div>

                                <div className="flex flex-col h-20 items-start">
                                  <h2 className="text-xl font-semibold text-center">
                                    Madre
                                  </h2>

                                  <h2 className="text-xl font-semibold text-center">
                                    {
                                      genealogy?.greatGrandparents?.mother
                                        ?.mother?.mother?.name
                                    }
                                  </h2>
                                  <span className="text-base font-semibold text-center">
                                    {
                                      genealogy?.greatGrandparents?.mother
                                        ?.mother?.mother?.chip
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* firmas */}
                        <div className="flex items-center absolute gap-10 bottom-10 left-[80px]">
                          <div className="flex flex-col items-center gap-0.5">
                            <div className="w-[200px] border-t-4 border-yellow-500"></div>
                            <span className="w-full flex flex-col text-center items-center text-[12px] font-thin">
                              Entidad registradora <br />
                              {petValues.userName}
                            </span>
                          </div>
                          <div className="flex flex-col items-center gap-0.5">
                            <div className="w-[200px] border-t-4 border-yellow-500"></div>
                            <span className="w-full flex flex-col text-center items-center text-[12px] font-thin">
                              Director General <br />
                              World Animal Registry
                            </span>
                          </div>
                          <div className="flex gap-4 ">
                            <QRCode
                              value={`${URL_EXPLORER}tx/${petValues.hash}`}
                              size={80}
                            />
                            <span className="text-balance text-[12px] font-semibold max-w-[200px] break-all">
                              {`${URL_EXPLORER}tx/
                            ${petValues.hash}
                            `}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
