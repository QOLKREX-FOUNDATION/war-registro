import { useState } from "react";
import { firuApi } from "../../api";
import { useMemo } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const useEntities = (district, id, isEdit) => {
  console.log(district);
  const [loading, setLoading] = useState(false);
  const [entitiesRegister, setEntitiesRegister] = useState([]);
  const [entitiesRegisterById, setEntitiesRegisterById] = useState([]);
  const { query } = useRouter();

  // obtiene las entidades por distrito
  console.log({ isEdit });

  const handleEntitiesRegisterDistrict = useMemo(() => {
    const temp = [];
    setLoading(true);
    firuApi
      .get(`/entity-register/list?district=${district}`)
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
  }, [district]);

  useEffect(() => {
    // si viene el address no se ejecuta
    // if (query.address !== undefined || query.address !== "") return;
    if (isEdit) return;
    console.log("no viene el address");
    if (district !== "" && id === undefined) {
      setEntitiesRegister(handleEntitiesRegisterDistrict);
    }
  }, [district]);

  const handleEntitiesRegister = useMemo(() => {
    const temp = [];
    setLoading(true);
    if (!isEdit) return setEntitiesRegisterById([]);
    firuApi
      // .get(`/entity-register/list?district=${district}`)
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
  }, [district]);

  useEffect(() => {
    // si viene el address no se ejecuta
    // if (query.address !== undefined || query.address !== "") return;
    console.log(isEdit);
    if (!isEdit) return;
    console.log("no viene el address");
    if (district !== "" && id === undefined) {
      setEntitiesRegister(handleEntitiesRegister);
    }
  }, [district]);

  // obtiene las entidades por id

  const handleEntitiesRegisterById = useMemo(() => {
    const temp = [];
    setLoading(true);
    if (id === undefined) return setEntitiesRegisterById([]);
    firuApi
      .get(`/entity-register/list/${id}`)
      .then((res) => {
        console.log(res);
        for (let i = 0; i < res.data.entityRegister.length; i++) {
          temp.push({
            label: `${res.data.entityRegister[i].local}`,
            value: res.data.entityRegister[i].id,
            id: res.data.entityRegister[i].id,
            department: res.data.entityRegister[i].department,
            province: res.data.entityRegister[i].province,
            district: res.data.entityRegister[i].district,
            phone: res.data.entityRegister[i].phone,
            direction: res.data.entityRegister[i].direction,
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
  }, [id]);

  useEffect(() => {
    // if (district === "") return setEntitiesRegister([]);
    if (isEdit) return;
    console.log("no viene el id");
    if (id === undefined) return setEntitiesRegisterById([]);
    if (id !== undefined && district === "") {
      setEntitiesRegisterById(handleEntitiesRegisterById);
    }
  }, [id]);

  return {
    entitiesRegister,
    entitiesRegisterById,
    loading,
  };
};
