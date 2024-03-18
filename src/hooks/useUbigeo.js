import { useEffect, useState } from "react";
import { countryConfig } from "../config";

export const useUbigeo = (country = "PE") => {
  const [departments, setDepartments] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  console.log({ departments, provinces, districts });

  //   const handleDepartaments = () => {
  //   const temp = [];
  //   console.log("departmentsJson", departmentsJson);
  //   departmentsJson.map((d) => temp.push({ label: d.name, value: d.name }));
  //   setDepartments(temp);
  // };

  // const handleProvinces = (department) => {
  //   setProvinces([]);
  //   const departmentT = departmentsJson.filter(
  //     (values) =>
  //       values.name?.toUpperCase().trim() === department?.toUpperCase().trim()
  //   );

  //   console.log("provincesJson", provincesJson);
  //   const temp = [];
  //   if (departmentT[0]?.id !== undefined) {
  //     for (let index = 0; index < provincesJson.length; index++) {
  //       provincesJson[index].department_id == departmentT[0].id &&
  //         temp.push({
  //           label: provincesJson[index].name,
  //           value: provincesJson[index].name,
  //         });
  //     }
  //   }

  //   setProvinces(temp);
  // };

  // const handleDistricts = (province) => {
  //   setDistricts([]);
  //   // console.log("province", province);
  //   const provinceT = provincesJson.filter((values) => {
  //     // console.log("values", values.name.toUpperCase().trim());
  //     // console.log("province", province.toUpperCase().trim());
  //     return (
  //       values.name.toUpperCase().trim() === province?.toUpperCase().trim()
  //     );
  //   });

  //   console.log("districtsJson", districtsJson);

  //   const temp = [];
  //   if (provinceT[0]?.id !== undefined) {
  //     for (let index = 0; index < districtsJson.length; index++) {
  //       districtsJson[index].province_id == provinceT[0].id &&
  //         temp.push({
  //           label: districtsJson[index].name,
  //           value: districtsJson[index].name,
  //         });
  //     }
  //   }
  //   setDistricts(temp);
  // };

  const handleDepartaments = () => {
    if (!countryConfig[country]) return;
    setDepartments([]);
    const { departmentsJson } = countryConfig[country] || [{}];
    const temp = departmentsJson.map((d) => ({ label: d.name.trim(), value: d.name.trim() }));
    setDepartments(temp);
  };

  const handleProvinces = (department) => {
    if (!countryConfig[country]) return;
    const { departmentsJson, provincesJson } = countryConfig[country] || [{}];
    setProvinces([]);

    const departmentT = departmentsJson?.find(
      (values) =>
        values.name?.toUpperCase().trim() === department?.toUpperCase().trim()
    );

    const temp = provincesJson
      ?.filter((values) => values.department_id === departmentT?.id)
      .map((province) => ({ label: province.name.trim(), value: province.name.trim() }));

    setProvinces(temp);
  };

  const handleDistricts = (province) => {
    if (!countryConfig[country]) return;
    const { provincesJson, districtsJson } = countryConfig[country] || [{}];
    setDistricts([]);

    const provinceT = provincesJson?.find(
      (values) =>
        values.name?.toUpperCase().trim() === province?.toUpperCase().trim()
    );

    const temp = districtsJson
      ?.filter(
        (values) =>
          values.province_id === provinceT?.id &&
          values.department_id === provinceT?.department_id
      )
      .map((district) => ({ label: district.name.toUpperCase().trim(), value: district.name.toUpperCase().trim() }));

    setDistricts(temp);
  };

  useEffect(() => {
    handleDepartaments();
  }, [country]);

  if (country === "NONE")
    return {
      departments,
      provinces,
      districts,
      handleDepartaments,
      handleProvinces,
      handleDistricts,
    };

  return {
    departments,
    provinces,
    districts,
    handleDepartaments,
    handleProvinces,
    handleDistricts,
  };
};
