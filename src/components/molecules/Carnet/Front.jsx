import Barcode from "react-jsbarcode";
import classes from "./license.module.css";
import { LicenseLanguaje } from "./validationLanguaje";
import { useSpecie } from "../../organims/Cpanel/components/PetForm/hooks/useSpecie";
import { API, IPFS } from "../../../config";
import { useCountry } from "../../../hooks/useCountry";
import { optionsSterilized } from "../../organims/Cpanel/components/PetForm/utils/Data";

const lang = { locale: "es-Es" };

export const Front = ({
  getPet,
  image,
  styles = { width: 45, height: 30 },
  imp = false,
}) => {
  const ajust = { height: styles.width * 16 };
  const { countries } = useCountry();
  const { races } = useSpecie(getPet?.type);
  console.log(races);
  console.log(getPet);

  const handleIdEntity = () => {
    return sessionStorage?.getItem(
      "idEntity_" + String(getPet.adopter).toUpperCase()
    );
  };

  return (
    <div className={classes.container}>
      <div className="relative">
        <img
          style={{
            height: imp ? styles.height : `${styles.height}rem`,
            width: imp ? styles.width : "100%",
          }}
          src="/img/license/front.png"
          alt="carnet"
        />
      </div>

      <img
        className={classes.warLogo}
        style={{
          maxWidth: imp ? "320px" : ajust.height / 4,
          maxHeight: imp ? "100px" : ajust.height / 8,
        }}
        src="/img/license/war.png"
        alt="Wold animal registry"
      />

      <img
        className={classes.erLogo}
        style={{
          maxWidth: imp ? "250px" : ajust.height / 5,
          maxHeight: imp ? "100px" : ajust.height / 8,
          width: "120px",
        }}
        src={`https://res.cloudinary.com/worldanireg/image/upload/v1701811578/entityRegister/logo/${
          getPet?.idRegisteringEntity || "default"
        }.png`}
        onError={({ currentTarget }) => {
          // currentTarget.onerror = null; // Evita bucles infinitos
          // const idEntity = handleIdEntity();
          // currentTarget.src = idEntity
          //   ? `https://res.cloudinary.com/worldanireg/image/upload/v1701811578/entityRegister/logo/${idEntity}.png`
          //   : `/img/logo/2.png`;
          currentTarget.onerror = null;
          currentTarget.src = `/img/logo/2.png`;
        }}
        alt="Entity Register"
      />

      <p
        className={`${classes.text} ${classes.name}`}
        style={{ fontSize: imp ? "21px" : ajust.height / 60 }}
        translate="no"
      >
        <span className={classes.title}>
          {LicenseLanguaje[lang.locale].name}
        </span>
        <br className="marginPaddingNone" />
        {getPet?.name}
      </p>
      <p
        className={`${classes.text} ${classes.lastName}`}
        style={{ fontSize: imp ? "21px" : ajust.height / 60 }}
        translate="no"
      >
        <span className={classes.title}>
          {LicenseLanguaje[lang.locale].lastName}
        </span>
        <br className="marginPaddingNone" />
        {getPet?.adopterLastName}
      </p>
      <p
        className={`${classes.text} ${classes.race}`}
        style={{ fontSize: imp ? "21px" : ajust.height / 60 }}
      >
        <span className={classes.title}>
          {LicenseLanguaje[lang.locale].race}
        </span>
        <br className="marginPaddingNone" />
        {races.map((race) => {
          // console.log(race)
          // console.log(getPet?.race.trim())
          // console.log(race.value.trim())
          // console.log(race.value === getPet?.race && "encontrado")
          // return race.value === getPet?.race && race.label
          if (race.value.trim() === getPet?.race.trim()) {
            // console.log(race);
            // console.log(getPet?.race);
            // console.log("encontrado");
            return race.label;
          }
          return null;
        })}
      </p>

      <p
        className={`${classes.text} ${classes.date}`}
        style={{ fontSize: imp ? "21px" : ajust.height / 60 }}
      >
        <span className={classes.title}>
          {LicenseLanguaje[lang.locale].date}
        </span>
        <br className="marginPaddingNone" />
        {getPet?.date}
      </p>

      <p
        className={`${classes.text} ${classes.gender}`}
        style={{ fontSize: imp ? "21px" : ajust.height / 60 }}
      >
        <span className={classes.title}>
          {LicenseLanguaje[lang.locale].gender}
        </span>
        <br className="marginPaddingNone" />
        {getPet?.gender == "MALE" && "MACHO"}

        {getPet?.gender == "FEMALE" && "HEMBRA"}
      </p>

      <p
        className={`${classes.text} ${classes.country}`}
        style={{ fontSize: imp ? "21px" : ajust.height / 60 }}
      >
        <span className={classes.title}>
          {LicenseLanguaje[lang.locale].country}
        </span>
        <br className="marginPaddingNone" />
        {countries.map(
          (values) => values.value == getPet?.country && values.label
        )}
      </p>

      <p
        className={`${classes.text} ${classes.dateAdoption}`}
        style={{ fontSize: imp ? "21px" : ajust.height / 60 }}
      >
        <span className={classes.title}>
          {LicenseLanguaje[lang.locale].dateAdoption}
        </span>
        <br className="marginPaddingNone" />
        {getPet?.dateAdoption}
      </p>

      <p
        className={`${classes.text} ${classes.dateIssue}`}
        style={{ fontSize: imp ? "21px" : ajust.height / 60 }}
      >
        <span className={classes.title}>
          {LicenseLanguaje[lang.locale].dateIssue}
        </span>
        <br className="marginPaddingNone" />
        {getPet?.dateIssue}
      </p>

      <p
        className={`${classes.text} ${classes.sterilized}`}
        style={{ fontSize: imp ? "21px" : ajust.height / 60 }}
      >
        <span className={classes.title}>Esterilizado : </span>
        {
          optionsSterilized.filter(
            (option) => option.value === getPet?.sterilized
          )[0]?.label
        }
      </p>

      <div className={classes.image}>
        <div>
          <img
            style={{
              borderRadius: imp ? "15px" : ajust.height / 100,
              width: imp ? "310px" : ajust.height / 2,
            }}
            src={image}
            alt="image"
            onError={
              ({ currentTarget }) =>
                (currentTarget.src = `${IPFS}${getPet?.image}`)
              // (currentTarget.src = "/img/license/noImage.png")
              // currentTarget.src = "/img/license/noImage.png"
            }
          />
          {/* Número de chip debajo de la foto */}
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: imp ? "20px" : ajust.height / 50,
              margin: "0.3rem 0",
              letterSpacing: "2px",
            }}
          >
            {getPet?.chip}
          </p>
        </div>
        <div
          className={`${classes.chipContainer}`}
          style={{
            marginLeft: imp ? "35px" : ajust.height / 32,
          }}
        >
          <p className={`${classes.chip}`}>
            <Barcode
              value={getPet?.chip ? getPet?.chip : "000"}
              options={{
                width: imp ? 3 : ajust.height / 450,
                height: imp ? 32 : ajust.height / 35,
                fontSize: imp ? 20 : ajust.height / 60,
                background: "transparent",
                displayValue: false,
              }}
            />
          </p>
        </div>
      </div>

      <img
        className={classes.paw}
        style={{
          height: imp ? "30px" : ajust.height / 40,
          width: imp ? "40px" : ajust.height / 30,
        }}
        src="/img/license/paw.png"
        alt="paw"
      />

      {getPet && getPet.country ? (
        <img
          className={classes.countryIcon}
          style={{
            height: imp ? "25px" : ajust.height / 40,
            width: imp ? "40px" : ajust.height / 30,
          }}
          src={`/img/license/flat/${String(getPet?.country).toLowerCase()}.png`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = `/img/license/PER.png`;
          }}
          alt="Country"
        />
      ) : (
        <img
          className={classes.countryIcon}
          style={{
            height: imp ? "25px" : ajust.height / 40,
            width: imp ? "40px" : ajust.height / 30,
          }}
          src={`/img/license/flat/PER.png`}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = `/img/license/PER.png`;
          }}
          alt="Country"
        />
      )}
    </div>
  );
};
