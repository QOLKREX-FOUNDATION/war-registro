import React, { useEffect, useState } from "react";
import { firuApi } from "../../../../../../api";
import { imageURI } from "../../../../../config/constants/endpoints";

export const TreeSection = ({ chip }) => {
  const [genealogyData, setGenealogy] = useState({});
  const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(false);
  console.log({ chip });

  const handleGenalogy = async (chip) => {
    setLoading(true);
    try {
      const genealogy = await firuApi.get(`pets/genealogy/${chip}`);
      console.log(genealogy);
      setGenealogy(genealogy.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGenalogy(chip);
  }, [chip]);

  console.log({ genealogy: genealogyData });

  return (
    <>
      <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mt-14 mb-10 border-b">
        <h4 className="text-lg text-gray-400 dark:text-gray-400 mt-4 mb-4 uppercase">
          Arbol genealogico
        </h4>
      </div>
      <div className="flex items-center justify-center mt-20 mb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-auto absolute w-full max-w-5xl">
            <h2 className="text-xl font-semibold py-2">Cargando...</h2>
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-40 w-40 border-l-transparent animate-spin"></div>
          </div>
        ) : genealogyData.ok ? (
          <div className="flex flex-col items-start justify-center h-auto w-full dark:text-white overflow-x-auto lg:items-center">
            <div className="w-full max-w-5xl min-w-[1024px] dark:bg-gray-600 bg-gray-300 rounded-lg px-5 py-3 flex flex-col items-center">
              {/* tatara abuelos */}
              <div className="flex gap-3">
                {/* tatara abuelos paternos*/}
                <div className="flex gap-3">
                  {/* padres del padre */}
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <h2 className="text-xl font-semibold py-2 text-center">
                        Padre
                      </h2>
                      <img
                        src={`${genealogyData?.genealogy?.greatGrandparents?.father?.father?.father?.image}`}
                        className="rounded-full object-cover w-20 h-20 border-2 border-gray-500 dark:border-white"
                      />
                      <h2 className="text-xl font-semibold py-2 text-center">
                        {
                          genealogyData?.genealogy?.greatGrandparents?.father
                            ?.father?.father?.name
                        }
                      </h2>
                    </div>
                    <div className="flex flex-col border-t-4 w-10 border-gray-500 dark:border-white"></div>
                    <div className="flex flex-col">
                      <h2 className="text-xl font-semibold py-2 text-center">
                        Madre
                      </h2>
                      <img
                        src={`${genealogyData?.genealogy?.greatGrandparents?.father?.father?.mother?.image}`}
                        className="rounded-full object-cover w-20 h-20 border-2 border-gray-500 dark:border-white"
                      />
                      <h2 className="text-xl font-semibold py-2 text-center">
                        {
                          genealogyData?.genealogy?.greatGrandparents?.father
                            ?.father?.mother?.name
                        }
                      </h2>
                    </div>
                  </div>

                  {/* padres de la madre */}
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <h2 className="text-xl font-semibold py-2 text-center">
                        Padre
                      </h2>
                      <img
                        src={`${genealogyData?.genealogy?.greatGrandparents?.father?.mother?.father?.image}`}
                        className="rounded-full object-cover w-20 h-20 border-2 border-gray-500 dark:border-white"
                      />
                      <h2 className="text-xl font-semibold py-2 text-center">
                        {
                          genealogyData?.genealogy?.greatGrandparents?.father
                            ?.mother?.father?.name
                        }
                      </h2>
                    </div>
                    <div className="flex flex-col border-t-4 w-10 border-gray-500 dark:border-white"></div>
                    <div className="flex flex-col">
                      <h2 className="text-xl font-semibold py-2 text-center">
                        Madre
                      </h2>
                      <img
                        src={`${genealogyData?.genealogy?.greatGrandparents?.father?.mother?.mother?.image}`}
                        className="rounded-full object-cover w-20 h-20 border-2 border-gray-500 dark:border-white"
                      />
                      <h2 className="text-xl font-semibold py-2 text-center">
                        {
                          genealogyData?.genealogy?.greatGrandparents?.father
                            ?.mother?.mother?.name
                        }
                      </h2>
                    </div>
                  </div>
                </div>

                {/* tatara abuelos maternos*/}
                <div className="flex gap-3">
                  {/* padres del padre */}
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <h2 className="text-xl font-semibold py-2 text-center">
                        Padre
                      </h2>
                      <img
                        src={`${genealogyData?.genealogy?.greatGrandparents?.mother?.father?.father?.image}`}
                        className="rounded-full object-cover w-20 h-20 border-2 border-gray-500 dark:border-white"
                      />
                      <h2 className="text-xl font-semibold py-2 text-center">
                        {
                          genealogyData?.genealogy?.greatGrandparents?.mother
                            ?.father?.father?.name
                        }
                      </h2>
                    </div>
                    <div className="flex flex-col border-t-4 w-10 border-gray-500 dark:border-white"></div>
                    <div className="flex flex-col">
                      <h2 className="text-xl font-semibold py-2 text-center">
                        Madre
                      </h2>
                      <img
                        src={`${genealogyData?.genealogy?.greatGrandparents?.mother?.father?.mother?.image}`}
                        className="rounded-full object-cover w-20 h-20 border-2 border-gray-500 dark:border-white"
                      />
                      <h2 className="text-xl font-semibold py-2 text-center">
                        {
                          genealogyData?.genealogy?.greatGrandparents?.mother
                            ?.father?.mother?.name
                        }
                      </h2>
                    </div>
                  </div>

                  {/* padres de la madre */}
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <h2 className="text-xl font-semibold py-2 text-center">
                        Padre
                      </h2>
                      <img
                        src={`${genealogyData?.genealogy?.greatGrandparents?.mother?.mother?.father?.image}`}
                        className="rounded-full object-cover w-20 h-20 border-2 border-gray-500 dark:border-white"
                      />
                      <h2 className="text-xl font-semibold py-2 text-center">
                        {
                          genealogyData?.genealogy?.greatGrandparents?.mother
                            ?.mother?.father?.name
                        }
                      </h2>
                    </div>
                    <div className="flex flex-col border-t-4 w-10 border-gray-500 dark:border-white"></div>
                    <div className="flex flex-col">
                      <h2 className="text-xl font-semibold py-2 text-center">
                        Madre
                      </h2>
                      <img
                        src={`${genealogyData?.genealogy?.greatGrandparents?.mother?.mother?.mother?.image}`}
                        className="rounded-full object-cover w-20 h-20 border-2 border-gray-500 dark:border-white"
                      />
                      <h2 className="text-xl font-semibold py-2 text-center">
                        {
                          genealogyData?.genealogy?.greatGrandparents?.mother
                            ?.mother?.mother?.name
                        }
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
              {/* abuelos */}
              <div className="w-full justify-center flex gap-28">
                {/* padres del padre */}
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <div className="flex w-36 h-5">
                      <div className="flex flex-col border-l-4 border-r-4 w-full border-gray-500 dark:border-white"></div>
                    </div>
                    <div className="flex flex-col border-t-4 w-36 border-gray-500 dark:border-white"></div>
                    <div className="flex flex-col border-l-4 w-4 h-5 mx-auto border-gray-500 dark:border-white"></div>
                    <h2 className="text-xl font-semibold py-2 text-center">
                      Padre
                    </h2>
                    <img
                      src={`${genealogyData?.genealogy?.grandparents?.father?.father?.image}`}
                      className="rounded-full object-cover w-24 h-24 border-2 border-gray-500 dark:border-white mx-auto"
                    />
                    <h2 className="text-xl font-semibold py-2 text-center">
                      {
                        genealogyData?.genealogy?.grandparents?.father?.father
                          ?.name
                      }
                    </h2>
                  </div>
                  <div className="flex flex-col border-t-4 w-16 border-gray-500 dark:border-white"></div>
                  <div className="flex flex-col">
                    <div className="flex w-36 h-5">
                      <div className="flex flex-col border-l-4 border-r-4 w-full border-gray-500 dark:border-white"></div>
                    </div>
                    <div className="flex flex-col border-t-4 w-36 border-gray-500 dark:border-white"></div>
                    <div className="flex flex-col border-l-4 w-4 h-5 mx-auto border-gray-500 dark:border-white"></div>
                    <h2 className="text-xl font-semibold py-2 text-center">
                      Madre
                    </h2>
                    <img
                      src={`${genealogyData?.genealogy?.grandparents?.father?.mother?.image}`}
                      className="rounded-full object-cover w-24 h-24 border-2 border-gray-500 dark:border-white mx-auto"
                    />
                    <h2 className="text-xl font-semibold py-2 text-center">
                      {
                        genealogyData?.genealogy?.grandparents?.father?.mother
                          ?.name
                      }
                    </h2>
                  </div>
                </div>

                {/* padres de la madre */}
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <div className="flex w-36 h-5">
                      <div className="flex flex-col border-l-4 border-r-4 w-full border-gray-500 dark:border-white"></div>
                    </div>
                    <div className="flex flex-col border-t-4 w-36 border-gray-500 dark:border-white"></div>
                    <div className="flex flex-col border-l-4 w-4 h-5 mx-auto border-gray-500 dark:border-white"></div>
                    <h2 className="text-xl font-semibold py-2 text-center">
                      Padre
                    </h2>
                    <img
                      src={`${genealogyData?.genealogy?.grandparents?.mother?.father?.image}`}
                      className="rounded-full object-cover w-24 h-24 border-2 border-gray-500 dark:border-white mx-auto"
                    />
                    <h2 className="text-xl font-semibold py-2 text-center">
                      {
                        genealogyData?.genealogy?.grandparents?.mother?.father
                          ?.name
                      }
                    </h2>
                  </div>
                  <div className="flex flex-col border-t-4 w-16 border-gray-500 dark:border-white"></div>
                  <div className="flex flex-col">
                    <div className="flex w-36 h-5">
                      <div className="flex flex-col border-l-4 border-r-4 w-full border-gray-500 dark:border-white"></div>
                    </div>
                    <div className="flex flex-col border-t-4 w-36 border-gray-500 dark:border-white"></div>
                    <div className="flex flex-col border-l-4 w-4 h-5 mx-auto border-gray-500 dark:border-white"></div>
                    <h2 className="text-xl font-semibold py-2 text-center">
                      Madre
                    </h2>
                    <img
                      src={`${genealogyData?.genealogy?.grandparents?.mother?.mother?.image}`}
                      className="rounded-full object-cover w-24 h-24 border-2 border-gray-500 dark:border-white mx-auto"
                    />
                    <h2 className="text-xl font-semibold py-2 text-center">
                      {
                        genealogyData?.genealogy?.grandparents?.mother?.mother
                          ?.name
                      }
                    </h2>
                  </div>
                </div>
              </div>
              {(genealogyData?.genealogy?.father?.name ||
                genealogyData?.genealogy?.mother?.name) && (
                <div className="w-full justify-center flex items-center gap-2">
                  <div className="flex flex-col">
                    <div className="flex w-36 h-5">
                      <div className="flex flex-col border-l-4 border-r-4 w-full border-gray-500 dark:border-white"></div>
                    </div>
                    <div className="flex flex-col border-t-4 w-36 border-gray-500 dark:border-white"></div>
                    <div className="flex flex-col border-l-4 w-4 h-5 mx-auto border-gray-500 dark:border-white"></div>
                    <h2 className="text-xl font-semibold py-2 text-center">
                      Padre
                    </h2>
                    <img
                      src={`${genealogyData?.genealogy?.father?.image}.png`}
                      className="rounded-full object-cover w-24 h-24 border-2 border-gray-500 dark:border-white mx-auto"
                    />
                    <h2 className="text-xl font-semibold py-2 text-center">
                      {genealogyData?.genealogy?.father?.name}
                    </h2>
                  </div>
                  <div className="flex flex-col border-t-4 w-64 border-gray-500 dark:border-white"></div>

                  <div className="flex flex-col">
                    <div className="flex w-36 h-5">
                      <div className="flex flex-col border-l-4 border-r-4 w-full border-gray-500 dark:border-white"></div>
                    </div>
                    <div className="flex flex-col border-t-4 w-36 border-gray-500 dark:border-white"></div>
                    <div className="flex flex-col border-l-4 w-4 h-5 mx-auto border-gray-500 dark:border-white"></div>
                    <h2 className="text-xl font-semibold py-2 text-center">
                      Madre
                    </h2>
                    <img
                      src={`${genealogyData?.genealogy?.mother.chip}.png`}
                      className="rounded-full object-cover w-24 h-24 border-2 border-gray-500 dark:border-white mx-auto"
                    />
                    <h2 className="text-xl font-semibold py-2 text-center">
                      {genealogyData?.genealogy?.mother?.name}
                    </h2>
                  </div>
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex w-72 h-5">
                  <div className="flex flex-col border-l-4 border-r-4 w-full border-gray-500 dark:border-white"></div>
                </div>
                <div className="flex flex-col border-t-4 w-72 border-gray-500 dark:border-white"></div>
                <div className="flex flex-col border-l-4 w-4 h-5 mx-auto border-gray-500 dark:border-white"></div>
                <div className="flex flex-col mx-auto">
                  <h2 className="text-xl font-semibold py-2 text-center">
                    Hijo
                  </h2>
                  <img
                    src={`${genealogyData?.genealogy?.son.chip}.png`}
                    className="rounded-full object-cover w-24 h-24 border-2 border-gray-500 dark:border-white"
                  />
                  <h2 className="text-xl font-semibold py-2 text-center">
                    {genealogyData?.genealogy?.son?.name}
                  </h2>
                </div>
              </div>
              <div className="flex flex-col">
                {genealogyData?.genealogy?.children.length > 0 && (
                  <>
                    <div className="flex w-52 h-5">
                      <div className="flex flex-col border-l-4 border-r-4 w-full border-gray-500 dark:border-white"></div>
                    </div>
                    <div className="flex flex-col border-t-4 w-52 border-gray-500 dark:border-white"></div>
                    <div className="flex flex-col border-l-4 w-4 h-5 mx-auto border-gray-500 dark:border-white"></div>
                    {genealogyData?.genealogy?.children.map((child) => (
                      <div
                        key={child.name}
                        className="flex flex-col justify-center mx-auto"
                      >
                        <h2 className="text-xl font-semibold py-2 text-center">
                          {genealogyData?.genealogy?.father?.name ||
                          genealogyData?.genealogy?.mother?.name
                            ? "Hijos 2do nivel"
                            : "Hijos 1er nivel"}
                        </h2>
                        <img
                          src={`${child?.image}.png`}
                          className="rounded-full mx-auto object-cover w-24 h-24 border-2 border-gray-500 dark:border-white"
                        />
                        <h2 className="text-xl font-semibold py-2 text-center">
                          {child?.name}
                        </h2>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center h-auto w-full">
              <div className="w-full max-w-2xl dark:bg-gray-600 bg-gray-300 rounded-lg px-5 py-3 flex flex-col items-center">
                {/* abuelos */}
                <div className="flex gap-3">
                  {/* padres del padre */}
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <h2 className="text-xl font-semibold py-2 text-center">
                        Padre
                      </h2>
                      <img
                        src={`${genealogyData?.genealogy?.grandparents?.father?.father?.image}`}
                        className="rounded-full object-cover w-24 h-24 border-2 border-gray-500 dark:border-white"
                      />
                      <h2 className="text-xl font-semibold py-2 text-center">
                        {genealogyData?.genealogy?.father?.name}
                      </h2>
                    </div>
                    <div className="flex flex-col border-t-4 w-16 border-gray-500 dark:border-white"></div>
                    <div className="flex flex-col">
                      <h2 className="text-xl font-semibold py-2 text-center">
                        Madre
                      </h2>
                      <img
                        src={`${genealogyData?.genealogy?.grandparents?.father?.mother?.image}`}
                        className="rounded-full object-cover w-24 h-24 border-2 border-gray-500 dark:border-white"
                      />
                      <h2 className="text-xl font-semibold py-2 text-center">
                        {genealogyData?.genealogy?.mother?.name}
                      </h2>
                    </div>
                  </div>

                  {/* padres de la madre */}
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <h2 className="text-xl font-semibold py-2 text-center">
                        Padre
                      </h2>
                      <img
                        src={`${genealogyData?.genealogy?.grandparents?.mother?.father?.image}`}
                        className="rounded-full object-cover w-24 h-24 border-2 border-gray-500 dark:border-white"
                      />
                      <h2 className="text-xl font-semibold py-2 text-center">
                        {genealogyData?.genealogy?.father?.name}
                      </h2>
                    </div>
                    <div className="flex flex-col border-t-4 w-16 border-gray-500 dark:border-white"></div>
                    <div className="flex flex-col">
                      <h2 className="text-xl font-semibold py-2 text-center">
                        Madre
                      </h2>
                      <img
                        src={`${genealogyData?.genealogy?.grandparents?.mother?.mother?.image}`}
                        className="rounded-full object-cover w-24 h-24 border-2 border-gray-500 dark:border-white"
                      />
                      <h2 className="text-xl font-semibold py-2 text-center">
                        {genealogyData?.genealogy?.mother?.name}
                      </h2>
                    </div>
                  </div>
                </div>

                {/* padres */}
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold py-2 text-center">
                      Padre
                    </h2>
                    <img
                      src={`${genealogyData?.genealogy?.father?.image}`}
                      className="rounded-full object-cover w-24 h-24 border-2 border-gray-500 dark:border-white"
                    />
                    <h2 className="text-xl font-semibold py-2 text-center">
                      {genealogyData?.genealogy?.father?.name}
                    </h2>
                  </div>
                  <div className="flex flex-col border-t-4 w-16 border-gray-500 dark:border-white"></div>
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold py-2 text-center">
                      Madre
                    </h2>
                    <img
                      src={`${genealogyData?.genealogy?.mother?.image}`}
                      className="rounded-full object-cover w-24 h-24 border-2 border-gray-500 dark:border-white"
                    />
                    <h2 className="text-xl font-semibold py-2 text-center">
                      {genealogyData?.genealogy?.mother?.name}
                    </h2>
                  </div>
                </div>

                {/* hijos */}
                <div className="flex flex-col">
                  <div className="flex w-36 h-5">
                    <div className="flex flex-col border-l-4 border-r-4 w-full border-gray-500 dark:border-white"></div>
                  </div>
                  <div className="flex flex-col border-t-4 w-36 border-gray-500 dark:border-white"></div>
                  <div className="flex flex-col border-l-4 w-4 h-5 mx-auto border-gray-500 dark:border-white"></div>
                  <div className="flex flex-col mx-auto">
                    <h2 className="text-xl font-semibold py-2 text-center">
                      Hijo
                    </h2>
                    <img
                      src={`${imageURI}/${genealogyData?.genealogy?.son.chip}.png`}
                      className="rounded-full object-cover w-24 h-24 border-2 border-gray-500 dark:border-white"
                    />
                    <h2 className="text-xl font-semibold py-2 text-center">
                      {genealogyData?.genealogy?.son?.name}
                    </h2>
                  </div>
                </div>

                {/* hijo del hijo */}
                <div className="flex flex-col">
                  {genealogyData?.genealogy?.children.length > 0 && (
                    <>
                      <div className="flex w-36 h-5">
                        <div className="flex flex-col border-l-4 border-r-4 w-full border-gray-500 dark:border-white"></div>
                      </div>
                      <div className="flex flex-col border-t-4 w-36 border-gray-500 dark:border-white"></div>
                      <div className="flex flex-col border-l-4 w-4 h-5 mx-auto border-gray-500 dark:border-white"></div>
                      {genealogyData?.genealogy?.children.map((child) => (
                        <div key={child._id} className="flex flex-col mx-auto">
                          <h2 className="text-xl font-semibold py-2 text-center">
                            Hijo
                          </h2>
                          <img
                            src={`${genealogyData?.genealogy?.child?.image}.png`}
                            className="rounded-full object-cover w-24 h-24 border-2 border-gray-500 dark:border-white"
                          />
                          <h2 className="text-xl font-semibold py-2 text-center">
                            {genealogyData?.genealogy?.child?.name}
                          </h2>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
