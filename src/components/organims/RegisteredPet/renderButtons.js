import { FcSurvey } from "react-icons/fc";
import { SiDatadog } from "react-icons/si";
import { ImUsers } from "react-icons/im";
import { isModule, permisionActive } from "../../../utils/war/permissionVerifi";

export const render = ({
  account,
  openAdopter,
  setOpenAdopter,
  openPet,
  setOpenPet,
  currentColor,
}) => {
  const bandera = isModule(account, 1);

  const cardActive = {
    background: `${currentColor}60`,
  };
  return (
    <div className="flex justify-end gap-2">
      {bandera && (
        <>
          {/* <div className="w-2/6">
						<button
							onClick={() => setOpenAdopter(true)}
							type="submit"
							className="py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md rounded-lg"
							style={{ backgroundColor: currentColor }}
						>
							Adoptantes
						</button>
					</div>
					<div className="w-2/6">
						{permisionActive(account, 1, 1) && (
							<button
								onClick={() => setOpenPet(true)}
								type="submit"
								className="py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md rounded-lg "
								style={{ backgroundColor: currentColor }}
							>
								Nueva Mascota
							</button>
						)}
					</div> */}

          <div className="grid grid-cols-2 gap-8 h-80 xl:grid-cols-2 xl:h-auto items-center justify-center">
            <div
              className="shadow-lg rounded-2xl p-4 text-gray-800 dark:text-gray-50 duration-300 cursor-pointer hover:scale-95"
              onClick={() => setOpenAdopter(true)}
              style={openAdopter ? cardActive : null}
            >
              <div className="flex items-center">
                <p className="text-xs ml-2 mb-4 capitalize">Adoptantes</p>
              </div>
              <div className="flex justify-center">
                <ImUsers size={55} />
              </div>
            </div>

            {permisionActive(account, 1, 1) && (
              <div
                className="shadow-lg rounded-2xl p-4 text-gray-800 dark:text-gray-50 duration-300 cursor-pointer hover:scale-95"
                onClick={() => setOpenPet(true)}
                style={openPet ? cardActive : null}
              >
                <div className="flex items-center">
                  <p className="text-xs ml-2 mb-4 capitalize">Nueva Mascota</p>
                </div>
                <div className="flex justify-center">
                  <SiDatadog size={55} />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export const renderButtonsAdopter = ({
  account,
  adopter,
  setAdopter,
  currentColor,
}) => {
  const bandera = isModule(account, 1);

  return (
    <div className="flex justify-center gap-2 w-full">
      {bandera && (
        <>
          {permisionActive(account, 1, 1) && (
            <div className="w-48">
              <button
                onClick={() => setAdopter(false)}
                type="submit"
                className={`${
                  adopter && "opacity-50"
                } py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md rounded-lg `}
                style={{ backgroundColor: currentColor }}
              >
                Registrar Adoptante
              </button>
            </div>
          )}
          {permisionActive(account, 1, 2) && (
            <div className="w-48">
              <button
                onClick={() => setAdopter(true)}
                type="submit"
                className={`${
                  !adopter && "opacity-50"
                } py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md rounded-lg`}
                style={{ backgroundColor: currentColor }}
              >
                Actualizar Adoptante
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
