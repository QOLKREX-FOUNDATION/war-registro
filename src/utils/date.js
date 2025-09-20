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

export function formatDate(date, type = false) {
  if (!date) return "";
  let str = typeof date === "string" ? date : date.toISOString();

  // Extraer año, mes y día
  let yyyy, mm, dd;
  if (str.length === 10 && str.match(/^\d{4}-\d{2}-\d{2}$/)) {
    [yyyy, mm, dd] = str.split("-");
  } else if (str.includes("T")) {
    [yyyy, mm, dd] = str.split("T")[0].split("-");
  } else {
    // fallback para otros formatos
    const d = new Date(str);
    dd = d.getDate().toString().padStart(2, "0");
    mm = (d.getMonth() + 1).toString().padStart(2, "0");
    yyyy = d.getFullYear();
  }

  // type: true = "YYYY-MM-DD", false = "DD-MM-YYYY"
  return type ? `${yyyy}-${mm}-${dd}` : `${dd}-${mm}-${yyyy}`;
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
