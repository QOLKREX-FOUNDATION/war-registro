// PERU
import peDepartmentsJson from "../../../public/Json/ubigeo/PE/departments.json";
import peProvincesJson from "../../../public/Json/ubigeo/PE/provinces.json";
import peDistrictsJson from "../../../public/Json/ubigeo/PE/districts.json";
// ECUADOR
import ecDepartamentsJson from "../../../public/Json/ubigeo/EC/provincias.json";
import ecProvincesJson from "../../../public/Json/ubigeo/EC/cantones.json";
import ecDistrictsJson from "../../../public/Json/ubigeo/EC/parroquias.json";
//ESPAÑA
import esDepartamentsJson from "../../../public/Json/ubigeo/ES/comunidad.json";
import esProvincesJson from "../../../public/Json/ubigeo/ES/provincias.json";
import esDistrictsJson from "../../../public/Json/ubigeo/ES/municipios.json";
// HONDURAS
import hnDepartamentsJson from "../../../public/Json/ubigeo/HN/departamentos.json";
import hnProvincesJson from "../../../public/Json/ubigeo/HN/municipios.json";
import hnDistrictsJson from "../../../public/Json/ubigeo/HN/aldeas.json";
// Colombia
import coDepartamentsJson from "../../../public/Json/ubigeo/CO/regiones.json";
import coProvincesJson from "../../../public/Json/ubigeo/CO/departamentos.json";
import coDistrictsJson from "../../../public/Json/ubigeo/CO/municipios.json";
// Chile
import clDepartamentsJson from "../../../public/Json/ubigeo/CL/regiones.json";
import clProvincesJson from "../../../public/Json/ubigeo/CL/provincias.json";
import clDistrictsJson from "../../../public/Json/ubigeo/CL/comunas.json";

// Temporal Canada
import caDepartamentsJson from "../../../public/Json/ubigeo/CA/department.json";
import caProvincesJson from "../../../public/Json/ubigeo/CA/province.json";
import caDistrictsJson from "../../../public/Json/ubigeo/CA/district.json";

export const countryConfig = {
  PE: {
    departmentsJson: peDepartmentsJson,
    provincesJson: peProvincesJson,
    districtsJson: peDistrictsJson,
  },
  EC: {
    departmentsJson: ecDepartamentsJson,
    provincesJson: ecProvincesJson,
    districtsJson: ecDistrictsJson,
  },
  ES: {
    departmentsJson: esDepartamentsJson,
    provincesJson: esProvincesJson,
    districtsJson: esDistrictsJson,
  },
  HN: {
    departmentsJson: hnDepartamentsJson,
    provincesJson: hnProvincesJson,
    districtsJson: hnDistrictsJson,
  },
  CO: {
    departmentsJson: coDepartamentsJson,
    provincesJson: coProvincesJson,
    districtsJson: coDistrictsJson,
  },
  CL: {
    departmentsJson: clDepartamentsJson,
    provincesJson: clProvincesJson,
    districtsJson: clDistrictsJson,
  },
  CA: {
    departmentsJson: caDepartamentsJson,
    provincesJson: caProvincesJson,
    districtsJson: caDistrictsJson,
  }
};

export const countryLabel = {
  PE: {
    departmentsLabel: "Departamento",
    provincesLabel: "Provincia",
    districtsLabel: "Distrito",
  },
  EC: {
    departmentsLabel: "Provincia",
    provincesLabel: "Cantón",
    districtsLabel: "Parroquia",
  },
  ES: {
    departmentsLabel: "Comunidad",
    provincesLabel: "Provincia",
    districtsLabel: "Municipio",
  },
  HN: {
    departmentsLabel: "Departamento",
    provincesLabel: "Municipio",
    districtsLabel: "Colonia",
  },
  CO: {
    departmentsLabel: "Región",
    provincesLabel: "Departamento",
    districtsLabel: "Municipio",
  },
  CL: {
    departmentsLabel: "Región",
    provincesLabel: "Provincia",
    districtsLabel: "Comuna",
  },
  CA: {
    departmentsLabel: "Province",
    provincesLabel: "City",
    districtsLabel: "District",
  }
}