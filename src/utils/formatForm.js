export const parseText = (maxLength = 30, text = "") => {
  // const maxLength = 40;

  // const fullName = `${ selectedForm.adopter.firstName } ${ selectedForm.adopter.secondName }  ${ selectedForm.adopter.firstLastName } ${ selectedForm.adopter.secondLastName } fgdfgfdgfd`;

  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};

export const formatDateForm = (dateInput = "") => {
  const date = dateInput
    ? dateInput.toLocaleString("es-ES", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      })
    : new Date().toLocaleString("es-ES", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      });
  const day = date.split("-")[0];
  const month = date.split("-")[1];
  const year = date.split("-")[2];
  return `${day}/${month}/${year}`;
};
