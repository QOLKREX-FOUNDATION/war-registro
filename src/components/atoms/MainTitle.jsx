import { useStateContext } from "../../contexts/ContextProvider";

export const MainTitle = ({ title, subtitle, size = "3xl" }) => {
  const { currentColor } = useStateContext();

  return (
    <h2
      className={`text-${size} font-extrabold text-slate-700 flex flex-col dark:text-white`}
    >
      <span>{title}</span>
      <span style={{ color: `${currentColor}` }}>{subtitle}</span>
    </h2>
  );
};
