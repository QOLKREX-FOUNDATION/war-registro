import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import "dayjs/locale/es";
import dayjs from "dayjs";
import { useState } from "react";

export const CustomInputDate = ({ setValue, watch }) => {
  const [errors, setErrors] = useState({
    startDate2: "",
    endDate2: "",
  });
  return (
    <LocalizationProvider adapterLocale={"es"} dateAdapter={AdapterDayjs}>
      <div className="flex w-full justify-between">
        <DatePicker
          onError={(err) => {
            if (err) {
              setErrors({
                ...errors,
                startDate2: "Fecha de inicio requerida",
              });
            } else {
              setErrors({
                ...errors,
                startDate2: "",
              });
            }
          }}
          value={watch("startDate2")}
          format="DD/MM/YYYY"
          label="Fecha de inicio"
          onChange={(newVal) => {
            setValue("startDate2", newVal);
          }}
        />
        <DatePicker
          format="DD/MM/YYYY"
          label="Fecha de fin"
          value={watch("endDate2")}
          onError={(err) => {
            if (err) {
              setErrors({
                ...errors,
                endDate2: "Fecha de fin requerida",
              });
            } else {
              setErrors({
                ...errors,
                endDate2: "",
              });
            }
          }}
          onChange={(newVal) => {
            setValue("endDate2", newVal);
          }}
        />
      </div>
    </LocalizationProvider>
  );
};
