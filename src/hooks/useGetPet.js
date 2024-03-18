import { useState } from "react";
import { API } from "../config";
import { usePreloaderContext } from "../contexts";
import { firuApi } from "../../api";

export const useGetPet = () => {
  const { handlePreloader } = usePreloaderContext();
  const [getRecords, setGetRecords] = useState([]);

  const handleGetRecords = async ({ id, token, params }) => {
    try {
      console.log({ params });
      console.log(params?.created_for);
      // console.log({ token });
      handlePreloader(true);
      // `http://localhost:5000/api/pets/getHistory?idRegisteringEntity=${id}&${
      //     params?.filter
      //   }=${params?.search}&${
      //     params?.dateStart ? `dateStart=${params?.dateStart}` : ""
      //   }&${params?.dateEnd ? `dateEnd=${params?.dateEnd}` : ""}`
      // `${API.war}pets/getHistory?idRegisteringEntity=${id}&${params?.filter}=${params?.search}&dateStart=${params?.dateStart}&dateEnd=${params?.dateEnd}`,

      console.log("get records");

      const baseUrl = `${API.war}pets/get-history-report`;
      // const baseUrl = `http://localhost:5000/api/pets/get-history-report`;
      // const baseUrl = `https://3tfgz37n-5000.brs.devtunnels.ms/api/pets/get-history-report`;
      const urlParams = new URLSearchParams();

      if (id) urlParams.append("idRegisteringEntity", id);
      if (params?.filter) urlParams.append(params.filter, params.search);
      if (params?.dateStart) urlParams.append("dateStart", params.dateStart);
      if (params?.dateEnd) urlParams.append("dateEnd", params.dateEnd);
      if (params?.limit === false) urlParams.append("limit", params.limit);
      if (params?.created_for !== undefined && params?.created_for !== "")
        urlParams.append("created_for", params.created_for);
      if (params?.address !== undefined && params?.address !== "")
        urlParams.append("address", params.address);
      if (params?.userAddress !== undefined && params?.userAddress !== "")
        urlParams.append("userAddress", params.userAddress);
      if (
        (params?.department !== undefined && params?.department !== "") ||
        (params?.province !== undefined && params?.province !== "") ||
        (params?.district !== undefined && params?.district !== "")
      )
        urlParams.append(
          "department",
          params.department,
          "province",
          params.province,
          "district",
          params.district
        );
      if (params?.typeAnimal !== undefined && params?.typeAnimal !== "")
        urlParams.append("typeAnimal", params.typeAnimal);
      if (params?.typeRace !== undefined && params?.typeRace !== "")
        urlParams.append("typeRace", params.typeRace);

      const fullUrl = `${baseUrl}?${urlParams.toString()}`;

      const content = await fetch(fullUrl, {
        headers: {
          "Content-Type": "application/json",
          "x-token": token,
        },
      }).catch((error) => {
        console.log(error);
      });

      // const content = await fetch(
      //   `http://localhost:5000/api/pets/get-history-report?idRegisteringEntity=${id}&${
      //     params?.filter
      //   }=${params?.search}&${
      //     params?.dateStart ? `dateStart=${params?.dateStart}` : ""
      //   }&${params?.dateEnd ? `dateEnd=${params?.dateEnd}` : ""}&limit=${
      //     params?.limit
      //   }&${
      //     params?.created_for !== undefined || params?.created_for !== ""
      //       ? `&created_for=${params?.created_for}`
      //       : "&"
      //   }${
      //     params?.district !== undefined || params?.district !== ""
      //       ? `&department=${params?.department}&province=${params?.province}&district=${params?.district}`
      //       : "&"
      //   }
      //   ${
      //     params?.typeAnimal !== undefined || params?.typeAnimal !== ""
      //       ? `&typeAnimal=${params?.typeAnimal}`
      //       : "&"
      //   }
      //     ${
      //       params?.typeRace !== undefined || params?.typeRace !== ""
      //         ? `&typeRace=${params?.typeRace}`
      //         : "&"
      //     }
      //   `,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       "x-token": token,
      //     },
      //   }
      // ).catch((error) => {
      //   console.log(error);
      // });

      console.log("get records");

      // const content = await firuApi.get(
      //   `/pets/get-history-report?idRegisteringEntity=${id}&${params?.filter}=${
      //     params?.search
      //   }&${params?.dateStart ? `dateStart=${params?.dateStart}` : ""}&${
      //     params?.dateEnd ? `dateEnd=${params?.dateEnd}` : ""
      //   }&limit=${params?.limit}&${
      //     params?.created_for !== ""
      //       ? `&created_for=${params?.created_for}`
      //       : ""
      //   }${
      //     params.district !== ""
      //       ? `&department=${params?.department}&province=${params?.province}&district=${params?.district}`
      //       : ""
      //   }
      //   ${params?.typeAnimal !== "" ? `&typeAnimal=${params?.typeAnimal}` : ""}
      //     ${params?.typeRace !== "" ? `&typeRace=${params?.typeRace}` : ""}
      //   `,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       "x-token": token,
      //     },
      //   }
      // );

      console.log({ content });
      const response = await content.json();
      console.log({ response });
      handlePreloader(false);

      // response.pets.reverse(function (a, b) {
      //   return b[0] - a[0];
      // });

      for (let i = 0; i < response.pets.length; i++) {
        response.pets[i].documentNumber = "";
        response.pets[i].phone = "";
        response.pets[i].email = "";
      }

      setGetRecords(response);
    } catch (error) {
      console.log(error);
      handlePreloader(false);
    }
  };

  return {
    getRecords,
    handleGetRecords,
    setGetRecords,
  };
};
