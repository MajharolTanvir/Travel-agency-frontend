"use client";

import Form from "@/components/FORM/Form";
import FormInput from "@/components/FORM/FormInput";
import FormSelectFields, {
  ISelectFieldOptions,
} from "@/components/FORM/FormSelectFields";
import ImageUpload from "@/components/FORM/UploadSingleImage";
import ButtonCom from "@/components/UI/Button";
import DetailsTab from "@/components/UI/DetailsTab";
import BreadcrumbCom from "@/components/UI/breadcrumb";
import {
  useGetSingleDistrictQuery,
  useUpdatedDistrictMutation,
} from "@/redux/api/DistrictApi";
import {
  useDivisionUpdateMutation,
  useGetAllDivisionQuery,
  useGetSingleDivisionQuery,
} from "@/redux/api/DivisionApi";
import { message } from "antd";
import React, { useState } from "react";

type IDProps = {
  params: any;
};

const UpdateDivision = ({ params }: IDProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const { id } = params;
  const [updateDistrict] = useUpdatedDistrictMutation();
  const { data, isLoading } = useGetSingleDistrictQuery(id);
  const { data: divisionData } = useGetAllDivisionQuery({});

  if (isLoading) {
    <p>Loading..........</p>;
  }

  const divisions = divisionData?.division;
  const divisionOptions = divisions?.map((division: any) => {
    return {
      label: division?.title,
      value: division?.id,
    };
  });

  const onSubmit = async (values: any) => {
    message.loading("Updating....");
    const data = {
      id: id,
      values: values,
    };
    try {
      const res = await updateDistrict(data);
      if (!!res) {
        message.success("District updated successfully");
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
              label: "Manage district",
              link: "/super_admin/district",
            },
          ]}
        />
      </div>
      <DetailsTab title="Update district">
        <div>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-start items-start gap-5">
              <div>
                <FormInput
                  name="title"
                  label="Title"
                  size="large"
                  type="text"
                />
              </div>
              <div>
                <FormSelectFields
                  name="divisionId"
                  label="Division"
                  options={divisionOptions as ISelectFieldOptions[]}
                  size="large"
                  placeholder={data?.division?.title}
                />
              </div>
              <div>
                <ImageUpload
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                ></ImageUpload>
              </div>
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
