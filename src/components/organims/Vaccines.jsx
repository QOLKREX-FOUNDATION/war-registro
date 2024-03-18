import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useWeb3Context } from "../../contexts";
import { useSelection } from "../../hooks/useSelection";
import { useVaccines } from "../../hooks/useVaccines";
import { permisionActive } from "../../utils/war/permissionVerifi";
import { Tag } from "../atoms/Tag";
import { FormVaccines} from "../molecules/Vaccines/FormVaccines";
import { initValuesVaccines } from "../molecules/Vaccines/initValuesVaccines";
import { ListVaccines } from "../molecules/Vaccines/ListVaccines";
import { ViewVaccines } from "../molecules/Vaccines/ViewVaccines";

export const Vaccines = ({ chip }) => {
  const { web3 } = useWeb3Context();

  const { selection, handleSelection } = useSelection({
    register: false,
    list: false,
    view: false,
  });

  const {
    update,
    setUpdate,
    handleFinish,
    reset,
    image,
    setImage,
    petValues,
    getSearch,
  } = useVaccines();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset: resetVaccine,
  } = useForm({
    defaultValues: initValuesVaccines,
  });

  useEffect(() => {
    handleSelection("view");
  }, []);

  useEffect(() => {
    getSearch({ chip, token: web3.authToken });
  }, []);

  return (
    <>
      {petValues.chip && petValues.chip != "" && (
        <div className="flex justify-center mb-4 gap-4">
          <Tag
            access={true}
            selection={selection}
            conditional="view"
            handleSelection={handleSelection}
            id="Ver Vacunas"
          />
          <Tag
            access={permisionActive(web3.account, 5, 1)}
            selection={selection}
            conditional="register"
            handleSelection={handleSelection}
            id="Registrar Vacunas"
          />

          <Tag
            access={
              permisionActive(web3.account, 5, 2) ||
              permisionActive(web3.account, 5, 3)
            }
            selection={selection}
            conditional="list"
            handleSelection={handleSelection}
            id="Lista de Vacunas"
          />
        </div>
      )}
      {selection.view && <ViewVaccines pets={petValues} />}

      {selection.register && (
        <FormVaccines
          petValues={petValues}
          handleFinish={handleFinish}
          setImage={setImage}
          image={image}
          update={update}
          reset={reset}
          register={register}
          handleSubmit={handleSubmit}
          watch={watch}
          setValue={setValue}
          errors={errors}
          resetVaccine={resetVaccine}
        />
      )}

      {selection.list && (
        <ListVaccines
          petValues={petValues}
          resetVaccine={resetVaccine}
          setUpdate={setUpdate}
          handleSelection={handleSelection}
          handleFinish={handleFinish}
          getSearch={getSearch}
        />
      )}
    </>
  );
};
