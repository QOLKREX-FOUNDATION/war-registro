import { IoMdClose } from "react-icons/io";
import { useFullScreen } from "../../../hooks/useFullScreen";
import { useRef } from "react";
import { ButtonTop } from "../../atoms/ButtonTop";

export const FormModal = ({
  title,
  children,
  handleClose,
  render = () => false,
  height = "auto",
  isFullScreen = false,
  isButtonTop = false,
}) => {
  const { fullScreen, toggleFullScreen, refScreen } = useFullScreen();

  const buttonTopRef = useRef(null);

  return (
    <>
      <div
        className="justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm"
        onClick={() => handleClose(false)}
      ></div>
      <div className="opacity-25 fixed inset-0 z-30 bg-black top-0 left-0"></div>
      <div
        className={`absolute mt-20 mx-auto w-full h-full ${
          height === "auto" ? "max-h-[80vh]" : `max-h-[${height}]`
        } max-w-7xl z-50 top-0  -translate-x-2/4 left-1/2`}
      >
        {/*content*/}
        <div
          ref={refScreen}
          className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none dark:bg-gray-800 p-2 md:p-5"
        >
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-2xl font-extrabold w-auto dark:text-white">
              {title}
            </h3>
            {render()}

            <div className="flex">
              {isFullScreen && (
                <button
                  data-tooltip="Pantalla completa"
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-80 float-right text-3xl leading-none font-semibold outline-none focus:outline-none tooltip"
                  onClick={() => {
                    toggleFullScreen();
                  }}
                >
                  <div className="rounded-full cursor-pointer hover:drop-shadow-xl hover:bg-light-gray p-2 dark:text-white dark:hover:bg-slate-800">
                    {fullScreen ? (
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
                          d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25"
                        />
                      </svg>
                    ) : (
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
                          d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              )}
              <button
                data-tooltip="Cerrar"
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-80 float-right text-3xl leading-none font-semibold outline-none focus:outline-none tooltip"
                onClick={() => handleClose(false)}
              >
                <div className="rounded-full cursor-pointer hover:drop-shadow-xl hover:bg-light-gray p-2 dark:text-white dark:hover:bg-slate-800">
                  <IoMdClose size={20} />
                </div>
              </button>
            </div>
          </div>
          {/*body*/}
          <div
            className="relative p-6 flex-auto"
            style={{ overflowY: "auto", height: "35rem" }}
            ref={buttonTopRef}
          >
            <div>{children}</div>
            {isButtonTop && <ButtonTop buttonTopRef={buttonTopRef} />}
          </div>
        </div>
      </div>
    </>
  );
};
