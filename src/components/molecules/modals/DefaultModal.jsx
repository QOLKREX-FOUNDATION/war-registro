import React from "react";
import { IoMdClose } from "react-icons/io";

const BgBlur = ({ children }) => {
  return (
    <div className="absolute w-screen h-full min-h-full z-50 flex items-center justify-center bg-half-transparent">
      {children}
    </div>
  );
};

const Container = ({ children, width }) => {
  return (
    <div
      className="shadow-lg rounded-2xl px-4 pt-4 pb-8 bg-white border border-transparent dark:bg-gray-800 m-auto dark:border-gray-600"
      style={{ width: `${width}` }}
    >
      {children}
    </div>
  );
};

export const DefaultModal = ({ children, width, handleClose }) => {
  return (
    <BgBlur>
      <Container width={width}>
        <div className="w-full h-full text-center">
          <div className="flex h-full flex-col justify-between">
            <div className="w-full flex justify-end">
              <div
                className="p-2 rounded-full cursor-pointer ease-in duration-200 bg-white border border-transparent hover:drop-shadow-xl dark:text-white dark:bg-transparent dark:hover:border-gray-600"
                onClick={() => handleClose(false)}
              >
                <IoMdClose />
              </div>
            </div>
            {children}
          </div>
        </div>
      </Container>
    </BgBlur>
  );
};
