"use client";

import { DatePicker, DatePickerProps, Input } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

interface IDatePicker {
  onChange?: (valueOne: Dayjs | null, valueTwo: string) => void;
  name: string;
  label?: string;
  value?: Dayjs;
  size?: "large" | "small";
}

const FormDatePicker = ({ name, label, onChange, size }: IDatePicker) => {
  const { control, setValue } = useFormContext();

  const handleOnChange: DatePickerProps["onChange"] = (date, dateString) => {
    onChange ? onChange(date, dateString) : null;
    setValue(name, dateString);
  };

  return (
    <>
      {label ? (
        <span
          style={{
            fontSize: "1rem",
            fontFamily: "cursive",
          }}
        >
          {label}
        </span>
      ) : null}
      <br />
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            defaultValue={dayjs(field.value) || ""}
            onChange={handleOnChange}
            size={size}
            style={{ width: "100%" }}
          ></DatePicker>
        )}
      />
    </>
  );
};

export default FormDatePicker;
