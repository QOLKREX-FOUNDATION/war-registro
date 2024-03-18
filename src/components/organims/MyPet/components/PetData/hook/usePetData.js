import { useState } from "react";

export const usePetData = () => {
  const [dataSectionActive, setDataSectionActive] = useState(true);
  const [vaccineSectionActive, setVaccineSectionActive] = useState(false);
  const [historySectionActive, setHistorySectionActive] = useState(false);
  const [treeSectionActive, setTreeSectionActive] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const onDataSection = () => {
    setDataSectionActive(true);
    setVaccineSectionActive(false);
    setHistorySectionActive(false);
    setTreeSectionActive(false);
    setShowStatus(false);
  };
  const onVaccineSection = () => {
    setDataSectionActive(false);
    setVaccineSectionActive(true);
    setHistorySectionActive(false);
    setTreeSectionActive(false);
    setShowStatus(false);
  };
  const onHistorySection = () => {
    setDataSectionActive(false);
    setVaccineSectionActive(false);
    setHistorySectionActive(true);
    setTreeSectionActive(false);
    setShowStatus(false);
  };
  const onTreeSection = () => {
    setDataSectionActive(false);
    setVaccineSectionActive(false);
    setHistorySectionActive(false);
    setTreeSectionActive(true);
    setShowStatus(false);
  };
  const onShowStatus = () => {
    setDataSectionActive(false);
    setVaccineSectionActive(false);
    setHistorySectionActive(false);
    setTreeSectionActive(false);
    setShowStatus(true);
  };

  return {
    dataSectionActive,
    vaccineSectionActive,
    historySectionActive,
    treeSectionActive,
    showStatus,
    onDataSection,
    onVaccineSection,
    onHistorySection,
    onTreeSection,
    onShowStatus,
  };
};
