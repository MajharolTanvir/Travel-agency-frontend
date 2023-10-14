"use client";

import Form from "@/components/FORM/Form";
import FormInput from "@/components/FORM/FormInput";
import Navbar from "@/components/Navbar/page";
import ButtonCom from "@/components/UI/Button";
import { useForgetPasswordMutation } from "@/redux/api/AuthApi";
import { Divider, message } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const ForgetPassword = () => {
  const [forgetPassword] = useForgetPasswordMutation();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    message.loading("Email sending....");
    try {
      const res = await forgetPassword(data);
      //@ts-ignore
      if (res?.data?.success) {
        message.success("Check your email");
        router.push("https://mail.google.com/mail");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <Navbar>
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-full md:w-[600px] p-10 rounded-xl backdrop-blur-xl bg-blue-100">
          <h2 className="text-center font-bold text-2xl">Forget Password</h2>
          <Divider style={{ borderColor: "rgb(37 99 235)" }} />
          <Form submitHandler={onSubmit}>
            <FormInput
              type="email"
              name="email"
              size="large"
              label="Email"
            ></FormInput>
            <ButtonCom>Submit</ButtonCom>
          </Form>
        </div>
      </div>
    </Navbar>
  );
};

export default ForgetPassword;
