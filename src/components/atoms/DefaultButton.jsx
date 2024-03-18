import { useStateContext } from "../../contexts/ContextProvider";

export const DefaultButton = ({ name = "default", type = "button" }) => {
  const { currentColor } = useStateContext();

  return (
    <button
      type={type}
      className={`py-1.5 text-gray-100 w-full text-center capitalize text-xs font-semibold tracking-wide bg-black shadow-md rounded-md focus:ring-transparent focus:outline-none`}
      style={{ background: `${currentColor}` }}
    >
      {name}
    </button>
  );
};
