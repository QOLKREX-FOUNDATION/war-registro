import { useState } from "react";

export const usePetData = () => {
	const [dataSectionActive, setDataSectionActive] = useState(true);
	const [vaccineSectionActive, setVaccineSectionActive] = useState(false);
	const [historySectionActive, setHistorySectionActive] = useState(false);
	const [treeSectionActive, setTreeSectionActive] = useState(false);

	const onDataSection = () => {
		setDataSectionActive(true);
		setVaccineSectionActive(false);
		setHistorySectionActive(false);
		setTreeSectionActive(false);
	};
	const onVaccineSection = () => {
		setDataSectionActive(false);
		setVaccineSectionActive(true);
		setHistorySectionActive(false);
		setTreeSectionActive(false);
	};
	const onHistorySection = () => {
		setDataSectionActive(false);
		setVaccineSectionActive(false);
		setHistorySectionActive(true);
		setTreeSectionActive(false);
	};
	const onTreeSection = () => {
		setDataSectionActive(false);
		setVaccineSectionActive(false);
		setHistorySectionActive(false);
		setTreeSectionActive(true);
	};

	return {
		dataSectionActive,
		vaccineSectionActive,
		historySectionActive,
		treeSectionActive,
		onDataSection,
		onVaccineSection,
		onHistorySection, 
		onTreeSection,
	};
};
