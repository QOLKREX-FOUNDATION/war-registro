import React, { useEffect, useContext } from "react";
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
import { Web3Context } from "../../../../contexts/Web3/Web3Context";
import { Users, getErUsers } from "../../../../utils/war/UsersSystem";
import { API } from "../../../../config";

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
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [listUsers, setListUsers] = useState([]);
  const [statistic, setStatistic] = useState({
    petsWithRegisteringEntity: [],
    userWithRegisteringEntity: [],
    petsByMonthArray: [],
    adoptersByMonthArray: [],
    petsByBreedArray: [],
    petsByRaceArray: [],
  });
  const [year, setYear] = useState(2024);

  const { web3 } = useContext(Web3Context);

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

  // obtiene los usuarios de la blockchain
  const getList = async () => {
    try {
      const array = await getErUsers(web3.wallet, web3.account);

      const promises = array.map(async (address) => {
        const resolve2 = await Users(web3.wallet, address);
        if (resolve2.data !== "") {
          resolve2.data = JSON.parse(
            Buffer.from(resolve2.data, "base64").toString()
          );
        }
        return { address, ...resolve2 };
      });

      const users = await Promise.all(promises);
      setListUsers(users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  console.log({ web3 });

  const getStatistics = async () => {
    setLoader(true);
    try {
      // const response = await fetch('https://firulaix-api-test.vercel.app/api/statistics/list', {
      //     method: 'GET',
      // })
      // `statistics/list-stadistic-user/${web3.account}`,
      // const response = await firuApi.post(
      //   `statistics/list-stadistic-user`,
      //   {
      //     address: JSON.stringify([
      //       ...listUsers.map((item) => item.address),
      //       web3.account,
      //     ]),
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       "x-token": web3.authToken,
      //     },
      //   }
      // );
      const fetchStatistics = async (url, body) => {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            "x-token": web3.authToken,
          },
        });
        return await response.json();
      };
  
      const addresses = [
        ...listUsers.map((item) => item.address),
      ];
      const idsEntity = JSON.parse(
        sessionStorage.getItem(
          "idsEntity_" + String(web3.account).toUpperCase()
        )
      ).map(Number);
  
      const [data2, dataAdopters] = await Promise.all([
        fetchStatistics(`${API.war}statistics/stats-pets`, { addresses, year }),
        fetchStatistics(`${API.war}statistics/stats-adopter`, { year, idsEntity }),
      ]);
  
      setStatistic((oldState) => ({
        ...oldState,
        userWithRegisteringEntity: data2.petsPerAdopter,
        petsByMonthArray: data2.petsByMonthArray,
        petsWithRegisteringEntity: data2.petsPerAdopter,
        adoptersByMonthArray: dataAdopters.adoptersByMonthArray,
      }));
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  useEffect(() => {
    if(listUsers.length > 0) {
      getStatistics();
    }
  }, [listUsers, year]);

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
    labels: statistic?.adoptersByMonthArray.map((item) => item.label),
    datasets: [
      {
        label: "My First Dataset",
        data: statistic?.adoptersByMonthArray.map((item) => item.adopters),
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

  const handleSubmit = (e) => {
    console.log(e);
    const filtered = statistic?.userWithRegisteringEntity.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filtered);
  };

  console.log({ filtered });

  return (
    <>
      {statistic?.petsWithRegisteringEntity ? (
        <div className="flex flex-col">
          <div className="flex items-center gap-10">
            <h2 className="text-xl font-semibold py-2">
              Estadísticas Generales:
            </h2>
            <div className="flex items-center gap-3">
              Año:
              <select
                name="year"
                id="yearStats"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
            </div>
          </div>
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
            <div className="flex flex-col w-2/3 h-96 md:min-w-[200px] max-w-[500px] min-w-full">
              <h2 className="py-1 pb-10 font-bold">
                Usuarios según la entidad registradora:
              </h2>
              {/* <Doughnut data={adoptersByEntity} /> */}
              {!loader && (
                <>
                  <form
                    className="flex"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSubmit(e);
                    }}
                  >
                    <label htmlFor="search" className="sr-only">
                      Buscar
                    </label>
                    <input
                      type="text"
                      placeholder="Buscar"
                      className="border border-gray-300 rounded-md p-2 w-full dark:text-black"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-gray-300 dark:bg-gray-800 rounded-md p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </button>
                  </form>
                  <span className="text-sm text-gray-500">
                    cantidad{" "}
                    {filtered.length > 0
                      ? filtered.length
                      : statistic?.userWithRegisteringEntity.length}
                  </span>
                </>
              )}
              <div className="flex flex-row gap-2 max-h-72 overflow-y-auto">
                {/* <div className="flex flex-col w-1/2">
                  {adoptersByEntity?.labels.map((item, index) => (
                    <div
                      className="flex flex-col w-1/2 md:min-w-[200px] min-h-[70px] min-w-full"
                      key={index}
                    >
                      <h2 className="py-1 h-full">{item}</h2>
                      <hr />
                    </div>
                  ))}
                </div> */}
                <div className="flex flex-col w-full ">
                  {(filtered.length > 0
                    ? filtered
                    : statistic?.userWithRegisteringEntity
                  ).map((item) => (
                    <div
                      className="flex flex-row justify-between flex-1 w-fullmd:min-w-[200px] min-h-[70px] min-w-full"
                      key={item.label}
                    >
                      <h2 className="py-1 h-full w-full max-w-xs">
                        {item.label}
                      </h2>
                      <h2 className="py-1 h-full">{item.adopters}</h2>
                      <hr />
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
                Mascotas Según el mes ({year})
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
                Adopters según el mes ({year})
              </h2>
              <Bar
                options={optionsBar}
                data={{
                  labels: statistic?.adoptersByMonthArray.map(
                    (item) => item.label
                  ),
                  datasets: [
                    {
                      label: "My First Dataset",
                      data: statistic?.adoptersByMonthArray.map(
                        (item) => item.adopters
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
            <div className="flex flex-col w-3/4 md:min-w-[200px] min-h-[200px] min-w-full">
              <h2>Mascotas por Tipo</h2>
              <Bar
                options={optionsBar}
                data={{
                  labels: statistic?.petsByBreedArray.map(
                    (item) => `${item.breed} - ${item.quantity}`
                  ),
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
            <div className="flex flex-col w-1/4 md:min-w-[200px] min-h-[200px] min-w-full">
              <h2>Mascotas por Raza</h2>
              {/* <Bar
                options={optionsBar}
                data={{
                  labels: statistic?.petsByRaceArray.map((item) => item.race),
                  datasets: [
                    {
                      label: "My First Dataset",
                      data: statistic?.petsByRaceArray.map(
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
              /> */}
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
