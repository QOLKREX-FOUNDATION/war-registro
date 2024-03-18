import {  formatDate } from "../../../../../../utils/date";

export const formatDataPet = (pet) => {
	pet.date = formatDate(pet.date, true);
	pet.dateAdoption = formatDate(pet.dateAdoption, true);
	pet.dateIssue = formatDate(pet.dateIssue, true);
	pet.chipDate = formatDate(pet.chipDate, true);
	return pet;
};
