import React, { useMemo, useState } from "react";
import { CustomAsyncSelect } from "./CustomAsyncSelect";
import { useEffect } from "react";
import { firuApi } from "../../../../../../api";

export const CustomAsyncSelectEntity = ({
  // entitiesRegister,
  register,
  setValue,
  watch,
  errors,
  // loading,
}) => {
  const [loading, setLoading] = useState(false);
  const [entitiesRegister, setEntitiesRegister] = useState([]);

  // console.log({ loading });
  // console.log(entitiesRegister.length);

  const handleEntitiesRegister = useMemo(() => {
    const temp = [];
    setLoading(true);
    firuApi
      .get(`/entity-register/list`)
      .then((res) => {
        console.log(res);
        for (let i = 0; i < res.data.entityRegister.length; i++) {
          temp.push({
            label: `${res.data.entityRegister[i].local}`,
            value: res.data.entityRegister[i].id,
            id: res.data.entityRegister[i].id,
          });
        }
        setLoading(false);
        console.log(temp);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
    return temp;
  }, []);

  useEffect(() => {
    // si viene el address no se ejecuta
    setEntitiesRegister(handleEntitiesRegister);
  }, [handleEntitiesRegister]);

  // console.log(watch("registerEntity"));

  return (
    <>
      {loading && entitiesRegister.length > 0 ? (
        <p>Cargando...</p>
      ) : (
        <CustomAsyncSelect
          label="Elije la Entidad Registradora editar"
          property="registerEntity"
          options={entitiesRegister}
          value={entitiesRegister.filter((entities) => {
            console.log(entities.value);
            return entities.value === watch("registerEntity");
          })}
          // values={register}
          watch={watch}
          setValue={setValue}
          error={errors}
          onChange={(target) => {
            console.log(target.value);
            setValue("registerEntity", target.value);
          }}
          required
          id="registerEntity"
          loading={loading}
        />
      )}
    </>
  );
};
