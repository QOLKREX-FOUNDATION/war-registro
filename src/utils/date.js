export const yearCurrent = () => {
  const date = new Date();
  return date.getFullYear();
};

/* export const formatDate = (value, type = false) => {
	let date = new Date(value);
	date = date.getTime() / 1000;
	date = new Date((date + 86400) * 1000);
	const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
	const month =
		date.getMonth() + 1 < 10 ? `${date.getMonth() + 1}` : date.getMonth() + 1;
	const year = date.getFullYear();

	return type
		? month < 10
			? `${year}-0${month}-${day}`
			: `${year}-${month}-${day}`
		: month < 10
		? `${day}-0${month}-${year}`
		: `${day}-${month}-${year}`;
}; */

export function formatDate(date) {
  if (!date) return "";
  // Si es objeto Date, pásalo a string ISO
  const str = typeof date === "string" ? date : date.toISOString();
  // Toma solo la parte de la fecha
  const [yyyy, mm, dd] = str.split("T")[0].split("-");
  return `${dd}/${mm}/${yyyy}`;
}

export const dateStringYear = (value, operation = false) => {
  const date = new Date();
  const year = operation
    ? date.getFullYear() + value
    : date.getFullYear() - value;
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${year}-${month}-${day}`;
};

export const dateNow = (inverse = false, slash = false) => {
  const date = new Date();
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  return inverse
    ? `${day}${slash ? "/" : "-"}${month}${slash ? "/" : "-"}${year}`
    : `${year}${slash ? "/" : "-"}${month}${slash ? "/" : "-"}${day}`;
};

export const timeStamp = () => {
  return Math.floor(Date.now() / 1000);
};

export const timeStampToDate = (unix_timestamp) => {
  const date = new Date(unix_timestamp * 1000);
  const year = date.getFullYear();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  return `${day}-${month}-${year}`;
};
