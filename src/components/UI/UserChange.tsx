"use client";

import { useChangeRoleMutation } from "@/redux/api/UserApi";
import { getUserInfo } from "@/services/auth.services";
import React from "react";
import FormSelectFields from "../FORM/FormSelectFields";
import { userRole } from "@/constant/global";
import ButtonCom from "./Button";
import Form from "../FORM/Form";
import { message } from "antd";

const UserChange = ({ id }: any) => {
  const [changeRole] = useChangeRoleMutation(id);
  const { role } = getUserInfo() as any;

  const onSubmit = async (values: any) => {
    message.loading("Updating....");

    try {
      const roleData = {
        id: id,
        values: values,
      };
      const res = await changeRole(roleData);

      if (!!res) {
        message.success("User role update successfully");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div>
      {role === "super_admin" && (
        <div>
          <Form submitHandler={onSubmit}>
            <FormSelectFields
              name="role"
              label="Role"
              options={userRole}
              size="large"
              placeholder="User"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
              <ButtonCom>Submit</ButtonCom>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default UserChange;
