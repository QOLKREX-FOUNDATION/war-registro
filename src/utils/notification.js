export const formatDateNotification = (date) => {
  const fecha = new Date(date);
  const formatoPersonalizado = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };

  const fechaFormateada = new Intl.DateTimeFormat(
    "es-ES",
    formatoPersonalizado
  ).format(fecha);

  // Reemplaza "0:" con "12:" en la hora si es medianoche
  const horaFormatada = fechaFormateada.replace("00:", "12:");

  //   // Reemplaza "AM" y "PM" con "am" y "pm"
  //   const horaFormateada = horaFormatada.replace("AM", "am").replace("PM", "pm");

  return horaFormatada;
};
