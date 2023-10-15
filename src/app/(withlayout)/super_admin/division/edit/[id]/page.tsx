"use client";

import Form from "@/components/FORM/Form";
import FormInput from "@/components/FORM/FormInput";
import ButtonCom from "@/components/UI/Button";
import DetailsTab from "@/components/UI/DetailsTab";
import BreadcrumbCom from "@/components/UI/breadcrumb";
import {
  useDivisionUpdateMutation,
  useGetSingleDivisionQuery,
} from "@/redux/api/DivisionApi";
import { message } from "antd";
import React from "react";

type IDProps = {
  params: any;
};

const UpdateDivision = ({ params }: IDProps) => {
  const { id } = params;
  const [divisionUpdate] = useDivisionUpdateMutation();
  const { data, isLoading } = useGetSingleDivisionQuery(id);

  if (isLoading) {
    <p>Loading..........</p>;
  }

  const onSubmit = async (values: any) => {
    message.loading("Updating....");
    const data = {
      id: id,
      values: values,
    };
    try {
      const res = await divisionUpdate(data);
      if (!!res) {
        message.success("Division updated successfully");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const defaultValues = {
    title: data?.title || "",
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
      <DetailsTab title="Update division">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-start items-start">
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
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

export default UpdateDivision;
