import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useProfile } from "../../hooks/useProfile";
import { Web3Context } from "../../contexts/Web3/Web3Context";
import { ReactSelect } from "../atoms/Form";
import { regexNum, regexText } from "../../utils/validations";
import { PageSectionContainer } from "../containers/PageSectionContainer";
import { useStateContext } from "../../contexts/ContextProvider";
import { ProfileInput } from "../atoms/Form/ProfileInput";
import { useUbigeo } from "../../hooks/useUbigeo";
import { formatDate } from "../../utils/date";
import Swal from "sweetalert2";

export const Profile = () => {
  const { currentColor } = useStateContext();
  const { web3 } = useContext(Web3Context);
  const { profile, handleAdopter, handleAdmin, setProfile, handleUpdate } =
    useProfile();
  const {
    departments,
    provinces,
    districts,
    handleDepartaments,
    handleProvinces,
    handleDistricts,
  } = useUbigeo();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleUpdate(data, web3.authToken);
  };

  const [isEntityRegistering, setIsEntityRegistering] = useState(false);
  const [idEntityRegistering, setIdEntityRegistering] = useState(null);
  const [logo, setLogo] = useState(null);
  useEffect(() => {
    const entityInfo = JSON.parse(
      sessionStorage.getItem("user_" + String(web3.account).toUpperCase())
    );
    setIsEntityRegistering(
      entityInfo?.registeringEntity === web3.account ? true : false
    );
    setIdEntityRegistering(
      JSON.parse(
        sessionStorage.getItem("idEntity_" + String(web3.account).toUpperCase())
      )
    );
  }, []);
  useEffect(() => {
    if (web3.rol == "adopter") {
      handleAdopter(web3.authToken);
    }
    if (web3.rol == "admin") {
      handleAdmin(web3.account);
    }
  }, [web3.rol]);

  useEffect(() => {
    web3.rol == "adopter" && handleDepartaments();
  }, [web3.rol]);

  useEffect(() => {
    web3.rol == "adopter" && setValue("phone", profile.phone);
  }, [profile?.phone]);

  useEffect(() => {
    web3.rol == "adopter" && setValue("direction", profile.direction);
  }, [profile?.direction]);

  useEffect(() => {
    web3.rol == "adopter" && setValue("department", profile.department);
  }, [profile?.department]);

  useEffect(() => {
    web3.rol == "adopter" && setValue("department", profile.department);
  }, [profile?.department]);

  useEffect(() => {
    web3.rol == "adopter" && setValue("province", profile.province);
  }, [profile?.province]);

  useEffect(() => {
    web3.rol == "adopter" && setValue("district", profile.district);
  }, [profile?.district]);

  const handleUploadLogo = async () => {
    try {
      if (logo === null) return;

      const formData = new FormData();
      formData.append("file", logo);
      formData.append("idEntity", idEntityRegistering);

      const response = await fetch(
        "https://w-a-r-api.onrender.com/api/files/upload-logo",
        {
          method: "POST",
          headers: {
            "x-token": web3.authToken,
          },
          body: formData,
        }
      );

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "Logo actualizado",
          showConfirmButton: false,
          timer: 1500,
        });
        // return true;
      } else {
        // return false;
        throw new Error("Error al actualizar logo");
      }
    } catch (error) {
      console.log(error);
      console.log("Error al actualizar logo");
      // return false;
    }
  };

  return (
    <PageSectionContainer category="datos" title="ver perfil">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 grid-flow-row-dense mt-20 items-center justify-center">
        <div
          className={`w-40 h-40 lg:w-48 lg:h-48 rounded-full flex items-center justify-center overflow-hidden border-8 relative m-auto`}
          style={{ borderColor: currentColor }}
        >
          <button
            className={`w-full h-full ${
              isEntityRegistering ? "cursor-pointer" : "cursor-default"
            } group`}
            onClick={() => {
              if (!isEntityRegistering) return;
              document.getElementById("logoER").click();
            }}
          >
            {logo ? (
              <Image
                src={URL.createObjectURL(logo)}
                alt="logo"
                layout="fill"
                objectFit="contain"
              />
            ) : (
              <img
                src={`https://res.cloudinary.com/worldanireg/image/upload/v1701794426/entityRegister/logo/${idEntityRegistering}.png?v=${Date.now()}`}
                alt="profile image"
                // layout="fill"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/img/avatar.jpg";
                }}
                className="object-contain"
              />
            )}
            <div
              className={`hidden opacity-0 absolute inset-0 ${
                isEntityRegistering &&
                "group-hover:grid group-hover:opacity-100"
              } transition-opacity place-items-center w-full h-full bg-black/40 z-10`}
            >
              <p className="text-white font-bold text-xl">Cambiar Logo</p>
            </div>
          </button>
          <input
            className="hidden"
            type="file"
            name="logoER"
            id="logoER"
            accept=".png"
            onChange={(e) => {
              if (e.target == undefined) return false;
              if (!e.target.files) return;
              setLogo(e.target.files[0]);
              Swal.fire({
                title: "¿Estás seguro?",
                text: "¿Estás seguro de cambiar el logo de tu entidad registradora?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Si, cambiar",
                cancelButtonText: "Cancelar",
              })
                .then((result) => {
                  console.log(result);
                  if (!result.isConfirmed) return setLogo(null);
                  handleUploadLogo();
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          />
        </div>

        <div className="col-span-2 flex flex-col justify-center text-center lg:text-start mt-8 lg:mt-0">
          <h2 className="text-3xl font-extrabold sm:text-2xl text-slate-700">
            <span className="block dark:text-white">{`${profile?.name} ${profile?.lastName}`}</span>
            <span className="block" style={{ color: currentColor }}>
              {web3.rol == "adopter"
                ? "Eres un adoptante"
                : isEntityRegistering
                ? "Eres una Entidad Registradora"
                : "Eres un Registrante"}
            </span>
          </h2>
          <div className="text-base mt-4 text-gray-400 block">
            {web3.rol == "adopter"
              ? "Aqui podras ver y editar los datos de tu perfil"
              : "Aqui podras ver los datos de tu perfil"}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mt-14 mb-10 border-b">
        <h4 className="text-lg text-gray-400 dark:text-gray-400 mt-4 mb-4 uppercase">
          Ver datos
        </h4>
      </div>

      {/* TYPE PERSON */}
      {profile?.typePerson && (
        <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
          <div className="flex items-center border-b">
            <h5
              className="text-base capitalize font-semibold"
              style={{ color: currentColor }}
            >
              Tipo de persona
            </h5>
          </div>

          <div className="col-span-2">
            <ProfileInput value={profile?.typePerson} />
          </div>
        </div>
      )}

      {/* ADDRESS */}
      <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
        <div className="flex items-center border-b">
          <h5
            className="text-base capitalize font-semibold"
            style={{ color: currentColor }}
          >
            Address
          </h5>
        </div>

        <div className="col-span-2">
          <ProfileInput
            value={web3.rol == "adopter" ? profile?.address : web3.account}
          />
        </div>
      </div>

      {web3.rol === "adopter" && (
        <>
          <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
            <div className="flex items-center border-b">
              <h5
                className="text-base capitalize font-semibold"
                style={{ color: currentColor }}
              >
                Documento
              </h5>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-x-4">
              <ProfileInput value={profile?.document} />
              <ProfileInput value={profile?.documentNumber} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
            <div className="flex items-center border-b">
              <h5
                className="text-base capitalize font-semibold"
                style={{ color: currentColor }}
              >
                Tipo de Persona
              </h5>
            </div>
            <div className="col-span-2">
              <ProfileInput value={profile?.person} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
            <div className="flex items-center border-b">
              <h5
                className="text-base capitalize font-semibold"
                style={{ color: currentColor }}
              >
                Tipo de Adoptante
              </h5>
            </div>
            <div className="col-span-2">
              <ProfileInput value={profile?.type} />
            </div>
          </div>
        </>
      )}
      {/* NAME */}
      <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
        <div className="flex items-center border-b">
          <h5
            className="text-base capitalize font-semibold"
            style={{ color: currentColor }}
          >
            {profile?.typePerson === "JURIDIC" ? "Razón Social" : "Nombres"}
          </h5>
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-x-4">
          <ProfileInput value={profile?.name} />
          {web3.rol == "adopter" ? (
            <ProfileInput value={profile?.secondName} />
          ) : (
            <ProfileInput />
          )}
        </div>
      </div>

      {/* LASTNAME */}
      <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
        <div className="flex items-center border-b">
          <h5
            className="text-base capitalize font-semibold"
            style={{ color: currentColor }}
          >
            Apellidos
          </h5>
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-x-4">
          <ProfileInput value={profile?.lastName} />
          {web3.rol == "adopter" ? (
            <ProfileInput value={profile?.mLastName} />
          ) : (
            <ProfileInput />
          )}
        </div>
      </div>

      {/* DEPARTAMENTO */}
      {profile?.department && (
        <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
          <div className="flex items-center border-b">
            <h5
              className="text-base capitalize font-semibold"
              style={{ color: currentColor }}
            >
              Departamento
            </h5>
          </div>

          <div className="col-span-2">
            <ProfileInput value={profile?.department} />
          </div>
        </div>
      )}

      {/* PROVINCIA */}
      {profile?.province && (
        <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
          <div className="flex items-center border-b">
            <h5
              className="text-base capitalize font-semibold"
              style={{ color: currentColor }}
            >
              Provincia
            </h5>
          </div>

          <div className="col-span-2">
            <ProfileInput value={profile?.province} />
          </div>
        </div>
      )}

      {/* DISTRITO */}
      {profile?.district && (
        <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
          <div className="flex items-center border-b">
            <h5
              className="text-base capitalize font-semibold"
              style={{ color: currentColor }}
            >
              Distrito
            </h5>
          </div>

          <div className="col-span-2">
            <ProfileInput value={profile?.district} />
          </div>
        </div>
      )}

      {/* DIRECCIÓN */}
      {profile?.direction && (
        <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
          <div className="flex items-center border-b">
            <h5
              className="text-base capitalize font-semibold"
              style={{ color: currentColor }}
            >
              Dirección
            </h5>
          </div>

          <div className="col-span-2">
            <ProfileInput value={profile?.direction} />
          </div>
        </div>
      )}
      {/* TELÉFONO */}
      {profile?.phone && (
        <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
          <div className="flex items-center border-b">
            <h5
              className="text-base capitalize font-semibold"
              style={{ color: currentColor }}
            >
              Teléfono
            </h5>
          </div>

          <div className="col-span-2">
            <ProfileInput value={profile?.phone} />
          </div>
        </div>
      )}

      {web3.rol == "admin" && (
        <>
          {/* LOCAL */}
          <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
            <div className="flex items-center border-b">
              <h5
                className="text-base capitalize font-semibold"
                style={{ color: currentColor }}
              >
                Local
              </h5>
            </div>

            <div className="col-span-2">
              <ProfileInput value={profile?.local} />
            </div>
          </div>

          {/* POSITION */}
          <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
            <div className="flex items-center border-b">
              <h5
                className="text-base capitalize font-semibold"
                style={{ color: currentColor }}
              >
                Posición
              </h5>
            </div>

            <div className="col-span-2">
              <ProfileInput value={profile?.position} />
            </div>
          </div>
        </>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {web3.rol == "adopter" && (
          <>
            {/* EMAIL */}
            <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
              <div className="flex items-center border-b">
                <h5
                  className="text-base capitalize font-semibold"
                  style={{ color: currentColor }}
                >
                  Correo electronico
                </h5>
              </div>

              <div className="col-span-2">
                <ProfileInput value={profile?.email} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
              <div className="flex items-center border-b">
                <h5
                  className="text-base capitalize font-semibold"
                  style={{ color: currentColor }}
                >
                  Fecha de Nacimiento
                </h5>
              </div>
              <div className="col-span-2">
                <ProfileInput value={formatDate(profile?.date)} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
              <div className="flex items-center border-b">
                <h5
                  className="text-base capitalize font-semibold"
                  style={{ color: currentColor }}
                >
                  Sexo
                </h5>
              </div>
              <div className="col-span-2">
                <ProfileInput
                  value={profile?.gender === "MAN" ? "HOMBRE" : "MUJER"}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mt-14 mb-10 border-b">
              <h4 className="text-lg text-gray-400 dark:text-gray-400 mt-4 mb-4 uppercase">
                Modificar
              </h4>
            </div>

            {/* CEL */}
            <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
              <div className="flex items-center border-b">
                <h5
                  className="text-base capitalize font-semibold"
                  style={{ color: currentColor }}
                >
                  Celular
                </h5>
              </div>

              <div className="col-span-2">
                <ProfileInput
                  readOnly={false}
                  formInput={register("phone", {
                    required: {
                      value: true,
                      message: "Campo requerido",
                    },
                    minLength: { value: 6, message: "Formato incorrecto" },
                    maxLength: { value: 15, message: "Formato incorrecto" },
                    pattern: {
                      value: regexNum,
                      message: "Formato incorrecto",
                    },
                  })}
                  error={errors?.phone}
                />
              </div>
            </div>

            {/* LOCALIDAD */}
            <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
              <div className="flex items-center border-b">
                <h5
                  className="text-base capitalize font-semibold"
                  style={{ color: currentColor }}
                >
                  Localidad
                </h5>
              </div>

              <div className="col-span-2 grid grid-cols-3 gap-x-4">
                <div>
                  <ReactSelect
                    options={departments}
                    value={{ label: watch("department") }}
                    onChange={(target) => {
                      setValue("department", target.value);
                      setValue("province", "");
                      setValue("district", "");
                      handleProvinces(target.value);
                    }}
                    name="departamento"
                    required
                  />
                  <input
                    type="hidden"
                    required
                    {...register("department", {
                      required: {
                        value: true,
                        message: "Campo requerido",
                      },
                    })}
                  />
                  {errors.department && (
                    <small className="text-red-400">
                      {errors.department.message}
                    </small>
                  )}
                </div>
                <div>
                  <ReactSelect
                    options={provinces}
                    value={{ label: watch("province") }}
                    onChange={(target) => {
                      setValue("province", target.value);
                      setValue("district", "");
                      handleDistricts(target.value);
                    }}
                    name="provincia"
                    required
                  />

                  <input
                    type="hidden"
                    required
                    {...register("province", {
                      required: {
                        value: true,
                        message: "Campo requerido",
                      },
                    })}
                  />
                  {errors.province && (
                    <small className="text-red-400">
                      {errors.province.message}
                    </small>
                  )}
                </div>
                <div>
                  <ReactSelect
                    options={districts}
                    value={{ label: watch("district") }}
                    onChange={(target) => {
                      setValue("district", target.value);
                    }}
                    name="distrito"
                    required
                  />

                  <input
                    type="hidden"
                    required
                    {...register("district", {
                      required: {
                        value: true,
                        message: "Campo requerido",
                      },
                    })}
                  />
                  {errors.district && (
                    <small className="text-red-400">
                      {errors.district.message}
                    </small>
                  )}
                </div>
              </div>
            </div>

            {/* DIRECTION */}
            <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4">
              <div className="flex items-center border-b">
                <h5
                  className="text-base capitalize font-semibold"
                  style={{ color: currentColor }}
                >
                  Direccion
                </h5>
              </div>

              <div className="col-span-2">
                <ProfileInput
                  formInput={register("direction", {
                    required: {
                      value: true,
                      message: "Campo requerido",
                    },
                    minLength: { value: 5, message: "Direccion muy corta" },
                    maxLength: { value: 100, message: "Direccion muy larga" },
                    pattern: {
                      value: regexText,
                      message: "Formato incorrecto",
                    },
                  })}
                  readOnly={false}
                  error={errors?.direction}
                />
              </div>
            </div>
          </>
        )}
        {web3.rol == "adopter" && (
          <>
            {/* BUTTON */}
            <div className="grid grid-cols-3 gap-x-8 grid-flow-row-dense mb-4 mt-20">
              <div></div>
              <div className="col-span-2 grid grid-cols-2 gap-x-4">
                <button
                  className="py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                  style={{ background: currentColor }}
                >
                  Guardar
                </button>

                <button
                  onClick={() => {
                    setProfile({});
                    handleAdopter(web3.authToken);
                  }}
                  type="button"
                  className="py-2 px-4 text-white bg-red-600 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </>
        )}
      </form>
    </PageSectionContainer>
  );
};
