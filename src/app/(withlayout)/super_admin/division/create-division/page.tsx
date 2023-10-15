"use client";

import Form from "@/components/FORM/Form";
import FormInput from "@/components/FORM/FormInput";
import ButtonCom from "@/components/UI/Button";
import DetailsTab from "@/components/UI/DetailsTab";
import BreadcrumbCom from "@/components/UI/breadcrumb";
import { useCreateDivisionMutation } from "@/redux/api/DivisionApi";
import { message } from "antd";
import React from "react";

const CreateDivision = () => {
const [createDivision] = useCreateDivisionMutation();

  const onSubmit = async (data: any) => {
    message.loading("Creating....");

    try {
        const res = await createDivision(data);
        if (!!res) {
          message.success("Division created successfully");
        }
    } catch (error: any) {
      message.error(error.message);
    }
  };
  return (
    <div>
      <div className="md:flex justify-between items-center">
        <BreadcrumbCom
          items={[
            {
              label: "Super_Admin",
              link: "/super_admin",
            },
            {
              label: "Manage division",
              link: "/super_admin/division",
            },
          ]}
        />
      </div>
      <DetailsTab title="Create division">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-start items-start">
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput name="title" label="Title" size="large" type="text" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
              <ButtonCom>Submit</ButtonCom>
            </div>
          </Form>
        </div>
      </DetailsTab>
    </div>
  );
};

export default CreateDivision;
