import React from "react";
import { isObjEmpty } from "../../../utils/helpers";

export const ProfileInput = ({
  value,
  readOnly = true,
  formInput = {},
  error = {},
}) => {
  return (
    <div className="relative ">
      {isObjEmpty(formInput) ? (
        <input
          value={value ?? ""}
          type="text"
          readOnly
          className={`${
            readOnly && "bg-slate-200"
          } rounded-lg border-transparent flex-1 appearance-none border border-zinc-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring focus:border-transparent dark:bg-slate-700 dark:text-white focus:ring-transparent`}
        />
      ) : (
        <input
          {...formInput}
          type="text"
          className="uppercase rounded-lg border-gray-300 flex-1 appearance-none border w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring focus:border-transparent dark:bg-slate-700 dark:text-white"
        />
      )}
      {error && <small className="text-red-400">{error?.message}</small>}
    </div>
  );
};
