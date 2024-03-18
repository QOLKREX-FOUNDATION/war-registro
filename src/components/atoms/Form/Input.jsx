import React from "react";
import { useStateContext } from "../../../contexts/ContextProvider";

export const Input = ({
  name = false,
  type = "text",
  placeholder = null,
  required = false,
  formInput = {},
  id = "",
  readOnly = false,
  onBlur = () => false,
  error = {},
  uppercase = true,
  onKeyUp = () => false,
  max = "",
  focusRing = false,
}) => {
  const { currentColor } = useStateContext();

  return (
    <div className=" relative">
      <label className="text-gray-700 text-xs">
        <p className="capitalize mb-2" style={{ color: currentColor }}>
          {name}
          {required && <span className="text-red-500 required-dot"> *</span>}
        </p>
      </label>
      <input
        type={type}
        {...formInput}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        className={`${readOnly && "bg-slate-200 cursor-not-allowed"} ${
          uppercase && "uppercase"
        }	rounded-lg border-transparent flex-1 appearance-none border border-gray-200 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-xs focus:outline-none focus:ring-2 focus:border-transparent  dark:bg-slate-700 dark:text-white dark:border-transparent`}
        placeholder={placeholder}
        id={id}
        readOnly={readOnly}
        // style={{ border: "0", outline: "none" }}
      />
      {error && <small className="text-red-400">{error.message}</small>}
    </div>
  );
};
