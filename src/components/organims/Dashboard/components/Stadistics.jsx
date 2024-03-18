import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { useState } from "react";
import { firuApi } from "../../../../../api";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip
  // Legend
);

export const Stadistics = () => {
  const [loader, setLoader] = useState(false);
  const [statistic, setStatistic] = useState({
    petsWithRegisteringEntity: [],
    userWithRegisteringEntity: [],
    petsByMonthArray: [],
    adoptersByMonthArray: [],
    petsByBreedArray: [],
    petsByRaceArray: [],
  });

  const data = {
    labels: ["Baños", "Cortes", "Puntos"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const optionsBar = {
    // indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data2 = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() => Math.floor(Math.random() * 1000)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() => Math.floor(Math.random() * 1000)),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const getStatistics = async () => {
    setLoader(true);
    try {
      // const response = await fetch('https://firulaix-api-test.vercel.app/api/statistics/list', {
      //     method: 'GET',
      // })
      //   const response = await fetch(
      //     "http://localhost:5000/api/statistics/list",
      //     {
      //       method: "GET",
      //     }
      //   );
      const response = await firuApi.get("/statistics/list");
      console.log({ response });
      const data = response.data;
      console.log({ data });
      // console.log(data)
      const { ok, ...rest } = data;
      console.log(rest);
      setStatistic(rest);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    getStatistics();
  }, []);

  //

  const petsByEntity = {
    labels: statistic?.petsWithRegisteringEntity.map((item) => item.label),
    datasets: [
      {
        label: "My First Dataset",
        data: statistic?.petsWithRegisteringEntity.map((item) => item.pets),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(255, 162, 86)",
          "rgb(86, 249, 255)",
          "rgb(86, 111, 255)",
          "rgb(168, 86, 255)",
          "rgb(255, 86, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  //

  const adoptersByEntity = {
    labels: statistic?.userWithRegisteringEntity.map((item) => item.label),
    datasets: [
      {
        label: "My First Dataset",
        data: statistic?.userWithRegisteringEntity.map((item) => item.adopters),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(255, 162, 86)",
          "rgb(86, 249, 255)",
          "rgb(86, 111, 255)",
          "rgb(168, 86, 255)",
          "rgb(255, 86, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      {statistic?.petsWithRegisteringEntity ? (
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold py-2">
            Estadísticas Generales:
          </h2>
          {loader && (
            <div className="flex flex-col items-center justify-center h-auto absolute w-full">
              <h2 className="text-xl font-semibold py-2">Cargando...</h2>
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-40 w-40 border-l-transparent animate-spin"></div>
            </div>
          )}
          <div className="flex flex-row flex-wrap items-center gap-16">
            <div className="flex flex-col w-1/3 md:min-w-[200px] min-w-full">
              <h2 className="py-1 pb-10 font-bold">
                Mascotas Según la entidad registradora:
              </h2>
              <Doughnut data={petsByEntity} />
            </div>
            <div className="flex flex-col w-2/3 md:min-w-[200px] max-w-[500px] min-w-full">
              <h2 className="py-1 pb-10 font-bold">
                Usuarios según la entidad registradora:
              </h2>
              {/* <Doughnut data={adoptersByEntity} /> */}
              <div className="flex flex-row gap-2 max-h-72 overflow-y-auto">
                <div className="flex flex-col w-1/2">
                  {adoptersByEntity?.labels.map((item, index) => (
                    <div
                      className="flex flex-col w-1/2 md:min-w-[200px] min-h-[60px] min-w-full"
                      key={index}
                    >
                      <h2 className="py-1">{item}</h2>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col w-1/2 ">
                  {statistic?.userWithRegisteringEntity.map((item) => (
                    <div
                      className="flex flex-col w-1/2 md:min-w-[200px] min-h-[60px] min-w-full"
                      key={item.label}
                    >
                      <h2 className="py-1">{item.adopters}</h2>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col w-1/3 md:min-w-[200px] min-w-full">
                                <h2 className='py-1'>Otros:</h2>
                                <Doughnut data={data} />
                            </div> */}
          </div>

          <h2 className="text-xl font-semibold py-2 pt-4">
            Estadísticas según características de las Mascotas:
          </h2>
          <div className="flex flex-row flex-wrap items-center justify-center">
            <div className="flex flex-col w-1/2 md:min-w-[200px] min-h-[200px] min-w-full">
              <h2 className="py-1">
                Mascotas Según el mes ({new Date().getFullYear()})
              </h2>
              <Bar
                options={optionsBar}
                data={{
                  labels: statistic?.petsByMonthArray.map((item) => item.month),
                  datasets: [
                    {
                      label: "My First Dataset",
                      data: statistic?.petsByMonthArray.map(
                        (item) => item.quantity
                      ),
                      backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                        "rgb(255, 162, 86)",
                        "rgb(86, 249, 255)",
                        "rgb(86, 111, 255)",
                        "rgb(168, 86, 255)",
                        "rgb(255, 86, 86)",
                      ],
                      hoverOffset: 4,
                    },
                  ],
                }}
              />
            </div>
            <div className="flex flex-col w-1/2 md:min-w-[200px] min-h-[200px] min-w-full">
              <h2 className="py-1">
                Adopters según el mes ({new Date().getFullYear()})
              </h2>
              <Bar
                options={optionsBar}
                data={{
                  labels: statistic?.adoptersByMonthArray.map(
                    (item) => item.month
                  ),
                  datasets: [
                    {
                      label: "My First Dataset",
                      data: statistic?.adoptersByMonthArray.map(
                        (item) => item.quantity
                      ),
                      backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                        "rgb(255, 162, 86)",
                        "rgb(86, 249, 255)",
                        "rgb(86, 111, 255)",
                        "rgb(168, 86, 255)",
                        "rgb(255, 86, 86)",
                      ],
                      hoverOffset: 4,
                    },
                  ],
                }}
              />
            </div>
            <div className="flex flex-col w-1/2 md:min-w-[200px] min-h-[200px] min-w-full">
              <h2>Mascotas por Tipo</h2>
              <Bar
                options={optionsBar}
                data={{
                  labels: statistic?.petsByBreedArray.map((item) => item.breed),
                  datasets: [
                    {
                      label: "My First Dataset",
                      data: statistic?.petsByBreedArray.map(
                        (item) => item.quantity
                      ),
                      backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                        "rgb(255, 162, 86)",
                        "rgb(86, 249, 255)",
                        "rgb(86, 111, 255)",
                        "rgb(168, 86, 255)",
                        "rgb(255, 86, 86)",
                      ],
                      hoverOffset: 4,
                    },
                  ],
                }}
              />
            </div>
            <div className="flex flex-col w-1/2 md:min-w-[200px] min-h-[200px] min-w-full">
              <h2>Mascotas por Raza</h2>
              <Bar
                options={optionsBar}
                data={{
                  labels: statistic?.petsByRaceArray?.map((item) => item.race),
                  datasets: [
                    {
                      label: "My First Dataset",
                      data: statistic?.petsByRaceArray?.map(
                        (item) => item.quantity
                      ),
                      backgroundColor: [
                        "rgb(255, 99, 132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 205, 86)",
                        "rgb(255, 162, 86)",
                        "rgb(86, 249, 255)",
                        "rgb(86, 111, 255)",
                        "rgb(168, 86, 255)",
                        "rgb(255, 86, 86)",
                      ],
                      hoverOffset: 4,
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          {/* loader */}
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
          </div>
        </div>
      )}
    </>
  );
};
