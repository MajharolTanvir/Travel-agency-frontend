"use client";

import Form from "@/components/FORM/Form";
import FormInput from "@/components/FORM/FormInput";
import Navbar from "@/components/Navbar/page";
import ButtonCom from "@/components/UI/Button";
import { useUserLoginMutation } from "@/redux/api/AuthApi";
import { getUserInfo, storeUserInfo } from "@/services/auth.services";
import { UserInfoProps } from "@/types";
import { Divider, message } from "antd";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const SignIn = () => {
  const [userLogin] = useUserLoginMutation();
  const [loading, setLoading] = useState(false);
  const { role } = getUserInfo() as UserInfoProps;

  const onSubmit = async (data: any) => {
    message.loading("Signin....");
    try {
      const res = await userLogin(data).unwrap();
      if (res?.accessToken) {
        message.success("User sign in successfully");
        storeUserInfo({ accessToken: res?.accessToken });
        setLoading(!loading);
        if (role) {
          redirect(`/${role}/profile`);
          setLoading(!loading);
        }
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <Navbar>
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-full md:w-[600px] p-10 rounded-xl backdrop-blur-xl bg-blue-100">
          <h2 className="text-center font-bold text-2xl">Signin</h2>
          <Divider style={{ borderColor: "rgb(37 99 235)" }} />
          <Form submitHandler={onSubmit}>
            <FormInput
              type="email"
              name="email"
              size="large"
              label="Email"
            ></FormInput>
            <FormInput
              type="password"
              name="password"
              size="large"
              label="Password"
            ></FormInput>
            <Link
              href="/authentication/forget-password"
              className="text-black hover:text-blue-600 py-2"
            >
              Forgotten password?
            </Link>
            <div className="md:flex justify-around items-center gap-4">
              <ButtonCom>Submit</ButtonCom>
              <Link className="w-full" href="/authentication/signup">
                <ButtonCom>Create new account</ButtonCom>
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </Navbar>
  );
};

export default SignIn;
