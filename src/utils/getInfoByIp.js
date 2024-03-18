
export const getInfoByIp = async () => {
  try {
    const content = await fetch("https://ipapi.co/json/");
    const response = await content.json();
    return {
      label: response.country_name,
      value: response.country_code,
    };
  } catch (error) {
    console.log(error);
  }
}