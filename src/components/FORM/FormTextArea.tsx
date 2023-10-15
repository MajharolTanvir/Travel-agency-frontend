"use client";

import { Input } from "antd";
import { useFormContext, Controller } from "react-hook-form";

const { TextArea } = Input;

interface ITextArea {
  name: string;
  label?: string;
  rows?: number;
  value?: string | string[] | undefined;
  placeholder?: string;
}

const FormTextArea = ({ name, rows, value, placeholder, label }: ITextArea) => {
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
        render={({ field }) => (
          <TextArea
            rows={rows}
            {...field}
            defaultValue={value}
            placeholder={placeholder}
            style={{
              width: "100%",
            }}
          ></TextArea>
        )}
      />
    </>
  );
};

export default FormTextArea;
