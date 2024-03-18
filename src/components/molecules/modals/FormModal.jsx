import { IoMdClose } from "react-icons/io";

export const FormModal = ({
  title,
  children,
  handleClose,
  render = () => false,
}) => {
  return (
    <>
      <div className="justify-center items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm"
        onClick={() => handleClose(false)}
      >
      </div>
      <div className="opacity-25 fixed inset-0 z-30 bg-black top-0 left-0"

      >
      </div>
      <div className="absolute my-20 mx-auto w-full max-w-7xl z-50 top-0  -translate-x-2/4 left-1/2">
        {/*content*/}
        <div className="  border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none dark:bg-gray-800 p-2 md:p-5">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 className="text-2xl font-extrabold w-auto dark:text-white">
              {title}
            </h3>
            {render()}

            <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-80 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => handleClose(false)}
            >
              <div className="rounded-full cursor-pointer hover:drop-shadow-xl hover:bg-light-gray p-2 dark:text-white dark:hover:bg-slate-800">
                <IoMdClose size={20} />
              </div>
            </button>
          </div>
          {/*body*/}
          <div
            className="relative p-6 flex-auto"
            style={{ overflowY: "auto", height: "35rem" }}
          >
            <div>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};
