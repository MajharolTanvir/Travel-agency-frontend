"use client";

import Form from "@/components/FORM/Form";
import FormInput from "@/components/FORM/FormInput";
import Navbar from "@/components/Navbar/page";
import ButtonCom from "@/components/UI/Button";
import { useResetPasswordMutation } from "@/redux/api/AuthApi";
import { Divider, message } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const ResetPassword = ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  const [resetPassword] = useResetPasswordMutation();
  const router = useRouter();

  const onSubmit = async (values: any) => {
    const data = {
      query: searchParams?.token,
      values: values
    }
    message.loading("Reset....");
    try {
      const res = await resetPassword(data).unwrap();
      if (!!res) {
        message.success("Password reset successfully");
        router.push("/authentication/signin");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <Navbar>
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-full md:w-[600px] p-10 rounded-xl backdrop-blur-xl bg-blue-100">
          <h2 className="text-center font-bold text-2xl">Reset Password</h2>
          <Divider style={{ borderColor: "rgb(37 99 235)" }} />
          <Form submitHandler={onSubmit}>
            <FormInput
              type="password"
              name="password"
              size="large"
              label="Password"
            ></FormInput>
            <ButtonCom>Submit</ButtonCom>
          </Form>
        </div>
      </div>
    </Navbar>
  );
};

export default ResetPassword;
