import { ItemList } from "./ItemList/ItemList";

export const ListVaccines = ({
  petValues,
  resetVaccine,
  setUpdate,
  handleSelection,
  handleFinish,
}) => {
  return (
    <div>
      {petValues?.vaccines?.length > 0 ? (
        <ul className="list-none	p-3">
          {petValues.vaccines?.map((item, index) => (
            <ItemList
              key={`item-${index}`}
              petValues={petValues}
              item={item}
              index={index}
              resetVaccine={resetVaccine}
              handleSelection={handleSelection}
              handleFinish={handleFinish}
              setUpdate={setUpdate}
            />
          ))}
        </ul>
      ) : (
        "No Hay Vacunas"
      )}
    </div>
  );
};
