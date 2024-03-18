export const CardContainer = ({ children }) => {
  return (
    <div
      className={`flex flex-col w-full bg-white rounded-2xl shadow relative overflow-hidden dark:bg-secondary-dark-bg`}
    >
      {children}
    </div>
  );
};
