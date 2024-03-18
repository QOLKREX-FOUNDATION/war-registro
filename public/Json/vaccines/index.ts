import DOG from "./dogs.json";
import CAT from "./cats.json";

export const SpeciesVaccines = {
	DOG,
	CAT,
};

export interface ISpeciesVaccinesOption {
	"en-Us": string;
	"es-Es": string;
	value: string;
}

export interface ISpeciesVaccines {
	DOG: ISpeciesVaccinesOption;
	CAT: ISpeciesVaccinesOption;
}
