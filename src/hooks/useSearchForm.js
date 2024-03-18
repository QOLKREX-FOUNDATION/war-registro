import { useForm } from "react-hook-form";
import { firuApi } from "../../api";
import { useWeb3Context } from "../contexts";
import Swal from "sweetalert2";
import { useState } from "react";

export const useSearchForm = () => {
  const { web3 } = useWeb3Context();
  const [data, setData] = useState({});
  const [dataUsers, setDataUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const {
    register: registerSearch,
    handleSubmit: handleSubmitSearch,
    setValue: setSearch,
    formState: { errors: errorsSearch },
    reset: resetSearch,
    getValues: getSearch,
  } = useForm({
    defaultValues: {
      search: "",
      searchUser: "",
    },
  });

  const handleSearch = () => {
    setLoading(true);

    // e.preventDefault();
    if (getSearch("search") === "") return;
    console.log(getSearch("search"));

    firuApi
      .get(`/form/search/${getSearch("search")}`, {
        headers: {
          // Authorization: `Bearer ${ web3.authToken }`,
          "x-token": web3.authToken,
        },
      })
      .then((response) => {
        setLoading(false);

        console.log(response.data);
        if (!response.data.ok) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se encontró el formulario",
          });
          console.log(response.data.msg);
          return;
        }

        if (response.data.ok) {
          console.log(response);
          const formData = response.data.form[0];
          if(formData.pet.motherMicrochip === 'undefined') {
            formData.pet.motherMicrochip = '';
          }
          setData(formData);
          // setData(response.data.form[0]);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al buscar el formulario",
        });
      });
  };

  const handleSearchUserEmail = () => {
    setLoading(true);

    // e.preventDefault();
    if (getSearch("searchUser") === "") return;
    console.log(getSearch("searchUser"));

    firuApi
      .get(
        `/adopters/search/${getSearch(
          "searchUser"
        )}?email=true&name=false&limit=20`,
        {
          headers: {
            // Authorization: `Bearer ${ web3.authToken }`,
            "x-token": web3.authToken,
          },
        }
      )
      .then((response) => {
        setLoading(false);

        console.log(response.data);
        if (!response.data.ok) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se encontró el adoptante",
          });
          console.log(response.data.msg);
          return;
        }

        if (response.data.ok) {
          console.log(response);
          setDataUsers(response.data.form);
          setTotalResults(response.data.totalResults);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al buscar el adoptante",
        });
      });
  };

  const handleSearchUserName = () => {
    setLoading(true);

    // e.preventDefault();
    if (getSearch("searchUser") === "") return;
    console.log(getSearch("searchUser"));

    firuApi
      .get(
        `/adopters/search/${getSearch(
          "searchUser"
        )}?email=false&name=true&limit=20`,
        {
          headers: {
            // Authorization: `Bearer ${ web3.authToken }`,
            "x-token": web3.authToken,
          },
        }
      )
      .then((response) => {
        setLoading(false);

        console.log(response.data);
        if (!response.data.ok) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se encontró el adoptante",
          });
          console.log(response.data.msg);
          return;
        }

        if (response.data.ok) {
          console.log(response);
          setDataUsers(response.data.form);
          setTotalResults(response.data.totalResults);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al buscar el adoptante",
        });
      });
  };

  const handleNextPage = ({ page, name = true, email = true }) => {
    console.log({ page });
    firuApi
      .get(
        `/adopters/search/${getSearch("searchUser")}?offset=${
          20 * page
        }&email=${email}&name=${name}&limit=20`,
        {
          headers: {
            // Authorization: `Bearer ${ web3.authToken }`,
            "x-token": web3.authToken,
          },
        }
      )
      .then((response) => {
        setLoading(false);

        console.log(response.data);
        if (!response.data.ok) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se encontró el formulario",
          });
          console.log(response.data.msg);
          return;
        }

        if (response.data.ok) {
          console.log(response);
          if (response.data.total === response.data.totalResults) {
            return;
          }
          setDataUsers((prev) => [...prev, ...response.data.form]);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al buscar el formulario",
        });
      });
  };

  const handleCleanSearch = () => {
    setSearch("search", "");
    setData({});
    resetSearch();
  };

  const handleCleanSearchUser = () => {
    setSearch("searchUser", "");
    setDataUsers({});
    resetSearch();
  };

  return {
    registerSearch,
    handleSubmitSearch,
    setSearch,
    errorsSearch,
    resetSearch,
    getSearch,
    handleSearch,
    data,
    loading,
    handleCleanSearch,
    handleSearchUserEmail,
    handleSearchUserName,
    handleCleanSearchUser,
    dataUsers,
    handleNextPage,
    totalResults,
  };
};
