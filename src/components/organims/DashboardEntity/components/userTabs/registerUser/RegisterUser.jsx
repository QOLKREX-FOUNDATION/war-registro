import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Web3Context } from "../../../../../../contexts/Web3/Web3Context";
import { useUbigeo } from "../../../../../../hooks/useUbigeo";
import {
  Users,
  getAccessAll,
  setUsers,
} from "../../../../../../utils/war/UsersSystem";
import { handleSignup } from "../../../../../../utils/war/auth";
import {
  initAccessValues,
  initAccessValuesReset,
  initModuleValues,
} from "../../../../../atoms/Wallet/utils";
import { GroupPermit } from "../userinfo/GroupPermit";

// import { validateForm } from "../../../utils/validate";
// import { validateAddress } from "../../../../../../../utils/formValidations";

const initialValues = {
  address: "",
  typePerson: "JURIDIC",
  typeDocument: "",
  dni: "",
  ruc: "",
  socialReason: "",
  tradeName: "",
  name: "", // RUC
  lastName: "", /// Social Reason
  phone: "",
  email: "",
  birthDate: dayjs().startOf("year").format("YYYY-MM-DD"),
  officeName: "",
  position: "",
  gender: "",
  status: "active",
  department: "",
  province: "",
  district: "",
  direction: "",
};

export const RegisterUser = ({ country }) => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    control,
    reset,
    setValue,
  } = useForm({ defaultValues: initialValues });
  const { web3 } = useContext(Web3Context);
  const [access, setAccess] = useState(initModuleValues);
  const [accessValues, setAccessValues] = useState(initAccessValues);
  const [permission, setPermission] = useState(true);
  const {
    departments,
    provinces,
    districts,
    handleDepartaments,
    handleProvinces,
    handleDistricts,
  } = useUbigeo(country || "PE");

  const onSubmit = (data) => {
    console.log(data);
    const dataToSend =
      watch("typePerson") === "JURIDIC"
        ? {
            birthDate: data.birthDate,
            department: data.department,
            direction: data.direction,
            district: data.district,
            dni: data.dni,
            email: data.email,
            gender: data.gender,
            lastName: data.socialReason,
            local: data.tradeName,
            name: data.ruc,
            phone: data.phone,
            position: data.email,
            province: data.province,
            tradeName: "",
            typePerson: data.typePerson,
          }
        : {
            birthDate: data.birthDate,
            department: data.department,
            direction: data.direction,
            district: data.district,
            dni: data.dni,
            email: data.email,
            gender: data.gender,
            lastName: data.lastName,
            local: data.officeName,
            name: data.name,
            phone: data.phone,
            position: data.position,
            province: data.province,
            tradeName: data.tradeName,
            typePerson: data.typePerson,
          };

    console.log(dataToSend);

    const obj = objectUppercase(dataToSend, ["address"]);
    console.log(obj);
    setUsers(
      web3.wallet,
      web3.account,
      data.address,
      permission,
      Buffer.from(JSON.stringify(obj)).toString("base64"),
      access,
      accessValues
    )
      .then((r) => {
        if (r !== undefined) {
          handleSignup(
            JSON.stringify({
              publicAddress: data.address,
              user: { ...obj, accessValues },
            }),
            web3.authToken
          ).then();
          handleReset();
          Swal.fire(
            "Registro Exitoso",
            "Registro Finalizado Sastifactoriamente",
            "success"
          );
        } else {
          Swal.fire(
            "Error",
            "Ha ocurrido un error, intente nuevamente",
            "error"
          );
        }
      })
      .catch((e) => {
        console.log(e);
        Swal.fire("Error", "Ha ocurrido un error, intente nuevamente", "error");
      });
  };

  const handleReset = () => {
    reset(initialValues);
  };

    const handleAccessValues = ({ target }, access, value) => {
        if (target.checked) {
      let temp = [...accessValues];
      temp[access][value] = value;
      setAccessValues(temp);
    } else {
      let temp = [...accessValues];
      temp[access][value] = 0;
      setAccessValues(temp);
    }
console.log(accessValues);
  };

  const objectUppercase = (object, includes = [""]) => {
    Object.keys(object).map((key) => {
      if (
        typeof object[key] === "string" &&
        key != "_id" &&
        key != "user" &&
        !includes.includes(key)
      ) {
        object[key] = String(object[key]).toUpperCase().trim();
      }
    });
    return object;
  };

  const handleOnBlur = (web3, address) => {
    Users(web3, address)
      .then((resolve) => {
        console.log(resolve);
        // if(resolve.data === "") return console.log("No existe usuario");
        if (resolve.data != "" && resolve.status) {
          handleReset();
          const data = JSON.parse(
            Buffer.from(resolve.data, "base64").toString()
          );
          setValue("address", address);
          console.log(data);
          setValue("typePerson", data.typePerson);
          if (data.typePerson === "JURIDIC") {
            setValue("ruc", data.name);
            setValue("socialReason", data.lastName);
            setValue("tradeName", data.local);
            setValue("phone", data.phone);
            setValue("email", data.position);

            // location
            setValue("department", data.department);
            setValue("province", data.province);
            setValue("district", data.district);
            setValue("direction", data.direction);
          } else if (data.typePerson === "NATURAL") {
            setValue("dni", data.dni);
            setValue("name", data.name);
            setValue("lastName", data.lastName);
            setValue("phone", data.phone);
            setValue("email", data.email);
            setValue("birthDate", data.birthDate);
            setValue("officeName", data.local);
            setValue("position", data.position);
            setValue("gender", data.gender);

            // location
            setValue("department", data.department);
            setValue("province", data.province);
            setValue("district", data.district);
            setValue("direction", data.direction);
          }
          setPermission(resolve.permission);
          let temp = initAccessValuesReset();
          for (let i = 0; i < accessValues.length; i++) {
            getAccessAll(web3, address, access[i])
              .then((resolve2) => {
                for (let index = 0; index < resolve2.length; index++) {
                  temp[access[i]][resolve2[index]] = resolve2[index];
                  setAccessValues([...temp]);
                }
              })
              .catch((e) => console.log(e));
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    handleDepartaments();
  }, []);

  useEffect(() => {
    handleProvinces(watch("department"));
  }, [watch("department")]);

  useEffect(() => {
    handleDistricts(watch("department"), watch("province"));
  }, [watch("province")]);

  console.log(errors);
  return (
    <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold">Registrar Usuario:</h2>
        <TextField
          variant="standard"
          name="address"
          label="Address"
          error={!!errors.address}
          {...register("address", {
            required: { value: true, message: "Este campo es requerido" },
          })}
          onBlur={(e) => {
            if (e.target.value === "") return;
            console.log(e.target.value.toUpperCase());
            handleOnBlur(web3.wallet, e.target.value.toUpperCase());
          }}
          onChange={(e) => {
            setValue("address", e.target.value.toUpperCase());
            console.log(watch("address"));
          }}
          className="w-1/2 uppercase"
          helperText={errors.address && errors.address.message}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold mb-3">Datos:</h2>
        <div className="flex flex-col gap-8 mt-3">
          <div className="flex gap-4">
            <FormControl className="flex w-1/2">
              <InputLabel id="user-type-person">Tipo de persona:</InputLabel>
              <Select
                labelId="user-type-person"
                id="demo-simple-select-standard"
                name="typePerson"
                label="Tipo de persona:"
                {...register("typePerson")}
                value={watch("typePerson")}
                variant="standard"
              >
                <MenuItem value="JURIDIC">JURIDICA</MenuItem>
                <MenuItem value="NATURAL">NATURAL</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex gap-4 w-1/2">
            {watch("typePerson") === "JURIDIC" ? (
              <>
                <TextField
                  variant="standard"
                  name="ruc"
                  label="RUC:"
                  {...register("ruc", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                  value={watch("ruc")}
                  className="w-full"
                  onChange={(e) => {
                    setValue("ruc", e.target.value.toUpperCase());
                  }}
                  error={!!errors.ruc}
                  helperText={errors.ruc && errors.ruc.message}
                />
                <TextField
                  variant="standard"
                  name="socialReason"
                  label="Razón Social:"
                  {...register("socialReason", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                  value={watch("socialReason")}
                  className="w-full"
                  onChange={(e) => {
                    setValue("socialReason", e.target.value.toUpperCase());
                  }}
                  error={!!errors.socialReason}
                  helperText={
                    errors.socialReason && errors.socialReason.message
                  }
                />
              </>
            ) : (
              <>
                <TextField
                  variant="standard"
                  name="dni"
                  label="DNI:"
                  {...register("dni", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Solo se permiten números",
                    },
                    min: {
                      value: 7,
                      message: "Mínimo 7 caracteres",
                    },
                    max: {
                      value: 15,
                      message: "Máximo 15 caracteres",
                    },
                  })}
                  value={watch("dni")}
                  className="w-full"
                  onChange={(e) => {
                    setValue("dni", e.target.value.toUpperCase());
                  }}
                  error={!!errors.dni}
                  helperText={errors.dni && errors.dni.message}
                />
                <TextField
                  variant="standard"
                  name="name"
                  label="Nombre:"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                  value={watch("name")}
                  className="w-full"
                  onChange={(e) => {
                    setValue("name", e.target.value.toUpperCase());
                  }}
                  error={!!errors.name}
                  helperText={errors.name && errors.name.message}
                />
              </>
            )}
          </div>
          <div className="flex gap-4 w-1/2">
            {watch("typePerson") === "JURIDIC" ? (
              <>
                <TextField
                  variant="standard"
                  name="tradeName"
                  label="Nombre comercial:"
                  {...register("tradeName", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                  value={watch("tradeName")}
                  className="w-full"
                  onChange={(e) => {
                    setValue("tradeName", e.target.value.toUpperCase());
                  }}
                  error={!!errors.tradeName}
                  helperText={errors.tradeName && errors.tradeName.message}
                />
                <TextField
                  type="number"
                  variant="standard"
                  name="phone"
                  label="Teléfono:"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Solo se permiten números",
                    },
                  })}
                  value={watch("phone")}
                  className="w-full"
                  onChange={(e) => {
                    setValue("phone", e.target.value.toUpperCase());
                  }}
                  error={!!errors.phone}
                  helperText={errors.phone && errors.phone.message}
                />
              </>
            ) : (
              <>
                <TextField
                  variant="standard"
                  name="lastName"
                  label="Apellido:"
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                  value={watch("lastName")}
                  className="w-full"
                  onChange={(e) => {
                    setValue("lastName", e.target.value.toUpperCase());
                  }}
                  error={!!errors.lastName}
                  helperText={errors.lastName && errors.lastName.message}
                />
                <TextField
                  variant="standard"
                  name="phone"
                  label="Teléfono:"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Solo se permiten números",
                    },
                  })}
                  value={watch("phone")}
                  type="number"
                  className="w-full"
                  onChange={(e) => {
                    setValue("phone", e.target.value.toUpperCase());
                  }}
                  error={!!errors.phone}
                  helperText={errors.phone && errors.phone.message}
                />
              </>
            )}
          </div>
          <div className="flex gap-4 w-1/2">
            <TextField
              variant="standard"
              name="email"
              label="Correo Electrónico:"
              {...register("email", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              })}
              value={watch("email")}
              type="email"
              className="w-full"
              onChange={(e) => {
                setValue("email", e.target.value.toUpperCase());
              }}
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
            />
            {watch("typePerson") === "NATURAL" && (
              <TextField
                variant="standard"
                name="birthDate"
                label="Fecha de Nacimiento:"
                {...register("birthDate", {
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                })}
                value={watch("birthDate")}
                onChange={(e) => {
                  console.log(e.target.value);
                  setValue("birthDate", e.target.value);
                }}
                type="date"
                className="w-full"
                error={!!errors.birthDate}
                helperText={errors.birthDate && errors.birthDate.message}
              />
            )}
          </div>
          {watch("typePerson") === "NATURAL" && (
            <div className="flex gap-4">
              <TextField
                variant="standard"
                name="officeName"
                label="Nombre de oficina:"
                {...register("officeName", {
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                })}
                value={watch("officeName")}
                className="w-full"
                onChange={(e) => {
                  setValue("officeName", e.target.value.toUpperCase());
                }}
                error={!!errors.officeName}
                helperText={errors.officeName && errors.officeName.message}
              />
              <TextField
                variant="standard"
                name="position"
                label="Posición:"
                {...register("position", {
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                })}
                value={watch("position")}
                className="w-full"
                onChange={(e) => {
                  setValue("position", e.target.value.toUpperCase());
                }}
                error={!!errors.position}
                helperText={errors.position && errors.position.message}
              />
            </div>
          )}
          <div className="flex gap-4 w-1/2">
            <FormControl className="flex w-full">
              <InputLabel id="status-new-user">Estado</InputLabel>
              <Select
                name="status"
                value={watch("status")}
                labelId="status-new-user"
                label="Estado"
                {...register("status")}
                className="w-full"
                variant="standard"
                onChange={() => {
                  setPermission(watch("status") === "active" ? true : false);
                }}
                error={!!errors.status}
              >
                <MenuItem value={"active"}>Activo</MenuItem>
                <MenuItem value={"inactive"}>Inactivo</MenuItem>
              </Select>
              {
                <FormHelperText error={!!errors.status}>
                  {errors.status && errors.status.message}
                </FormHelperText>
              }
            </FormControl>
            {watch("typePerson") === "NATURAL" && (
              <FormControl className="flex w-full">
                <InputLabel id="gender-user">Género</InputLabel>
                <Select
                  labelId="gender-user"
                  name="gender"
                  label="Género"
                  {...register("gender", {
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  })}
                  value={watch("gender")}
                  className="w-full"
                  variant="standard"
                  error={!!errors.gender}
                >
                  <MenuItem value={"M"}>Masculino</MenuItem>
                  <MenuItem value={"F"}>Femenino</MenuItem>
                </Select>
                {
                  <FormHelperText error={!!errors.gender}>
                    {errors.gender && errors.gender.message}
                  </FormHelperText>
                }
              </FormControl>
            )}
          </div>
        </div>
      </div>
      <div className="">
        <h2 className="font-bold">Dirección:</h2>
        <div className="flex gap-4 my-4">
          <FormControl className="flex w-1/3">
            <InputLabel id="user-department">Departamento:</InputLabel>
            <Select
              labelId="user-department"
              id="user-department-select"
              name="department"
              label="Departamento:"
              {...register("department", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              })}
              value={watch("department")}
              variant="standard"
              error={!!errors.department}
            >
              {departments.map((department, index) => (
                <MenuItem key={index} value={department.value}>
                  {department.label}
                </MenuItem>
              ))}
            </Select>
            {
              <FormHelperText error={!!errors.department}>
                {errors.department && errors.department.message}
              </FormHelperText>
            }
          </FormControl>
          <FormControl className="flex w-1/3">
            <InputLabel id="user-province">Provincia:</InputLabel>
            <Select
              labelId="user-province"
              id="user-province-select"
              name="province"
              label="Provincia:"
              {...register("province", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              })}
              value={watch("province")}
              variant="standard"
              error={!!errors.province}
            >
              {provinces.map((province, index) => (
                <MenuItem key={index} value={province.value}>
                  {province.label}
                </MenuItem>
              ))}
            </Select>
            {
              <FormHelperText error={!!errors.province}>
                {errors.province && errors.province.message}
              </FormHelperText>
            }
          </FormControl>
          <FormControl className="flex w-1/3">
            <InputLabel id="user-district">Distrito:</InputLabel>
            <Select
              labelId="user-district"
              id="user-district-select"
              name="district"
              label="Distrito:"
              {...register("district", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              })}
              value={watch("district")}
              variant="standard"
              error={!!errors.district}
            >
              {districts.map((district, index) => (
                <MenuItem key={index} value={district.value}>
                  {district.label}
                </MenuItem>
              ))}
            </Select>
            {
              <FormHelperText error={!!errors.district}>
                {errors.district && errors.district.message}
              </FormHelperText>
            }
          </FormControl>
        </div>
        <div className="flex gap-4">
          <TextField
            variant="standard"
            name="direction"
            label="Dirección:"
            {...register("direction", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            })}
            value={watch("direction")}
            onChange={(e) => {
              setValue("direction", e.target.value.toUpperCase());
            }}
            className="w-full"
            error={!!errors.direction}
            helperText={errors.direction && errors.direction.message}
          />
        </div>
      </div>

      <div>
        <GroupPermit
          accessValues={accessValues}
          handleAccessValues={handleAccessValues}
          permit={access}
          show={true}
        />
      </div>

      <div className="flex">
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-2 rounded-lg shadow-md hover:opacity-70 transition-opacity"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
