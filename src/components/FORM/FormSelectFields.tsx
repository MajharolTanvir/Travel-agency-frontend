"use client";

import { Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";

export interface ISelectFieldOptions {
  label: string;
  value: string;
}

export interface ISelectField {
  options: ISelectFieldOptions[];
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  defaultValue?: ISelectFieldOptions;
  handleChange?: (el: string) => void;
}

const FormSelectFields = ({
  name,
  size,
  value,
  placeholder,
  options,
  label,
  defaultValue,
  handleChange,
}: ISelectField) => {
  const { control } = useFormContext();
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
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            onChange={handleChange ? handleChange : onChange}
            value={value}
            size={size}
            options={options}
            placeholder={placeholder}
            style={{
              borderWidth: "0px 0px 2px 0px",
              outline: "none",
              background: "transparent",
              borderRadius: "0px",
              marginBottom: "4px",
              borderColor: "rgb(37 99 235)",
              width: "100%",
            }}
            defaultValue={defaultValue}
          ></Select>
        )}
      />
    </>
  );
};

export default FormSelectFields;
