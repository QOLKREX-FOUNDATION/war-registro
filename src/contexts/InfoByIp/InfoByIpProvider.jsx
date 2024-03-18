import { useState, useEffect } from "react";
import { InfoByIpContext } from "./InfoByIpContext";
import { useCountry } from "../../hooks/useCountry";
import axios from "axios";

const INIT_STATE = {
  ip: null,
  country: { label: "PERÚ", value: "PE" },
  countryCode: "PE",
  region: null,
};

export const InfoByIpProvider = ({ children }) => {
  const [infoByIp, setInfoByIp] = useState(INIT_STATE);
  const { countries } = useCountry();
  // console.log(infoByIp);

  useEffect(() => {
    const getCountryByIp = async () => {
      try {
        const ip = await (
          await axios.get("https://api.ipify.org/?format=json")
        ).data.ip;
        // const country = await (await axios.get(`https://ipapi.co/${ip}/json/`)).data.country_code;
        const info = await (
          await axios.get(`https://ipinfo.io/${ip}?token=3e6c9ca3fdd99b`)
        ).data;
        // console.log({ip, info})
        const countryCode = info.country;
        const region = info.region;
        const country = countries.find(
          (country) => country.value == countryCode
        );
        if (!info.country) {
          // localStorage.setItem("countryCode", "PE");
          setInfoByIp(INIT_STATE);
          return;
        }
        // localStorage.setItem("countryCode", countryCode);
        // console.log({countries})
        // console.log(country);
        setInfoByIp({
          ip: ip,
          countryCode,
          country,
          region,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getCountryByIp();
  }, [countries]);

  const handleCountryChange = (country) => {
    console.log(country);
    localStorage.setItem("countryCode", country.value);
    setInfoByIp((oldState) => ({
      ...oldState,
      country,
    }));
  };

  return (
    <InfoByIpContext.Provider
      value={{
        ip: infoByIp.ip,
        country: infoByIp.country,
        countryCode: infoByIp.countryCode,
        region: infoByIp.region,
        handleCountryChange,
      }}
    >
      {children}
    </InfoByIpContext.Provider>
  );
};
