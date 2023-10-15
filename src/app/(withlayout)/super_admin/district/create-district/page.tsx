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
import { useCreateDistrictMutation } from "@/redux/api/DistrictApi";
import { useGetAllDivisionQuery } from "@/redux/api/DivisionApi";
import { message } from "antd";
import React, { useState } from "react";

const CreateDivision = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [createDistrict] = useCreateDistrictMutation();
  const { data, isLoading } = useGetAllDivisionQuery({});

  if (isLoading) {
    <p>Loading.............</p>;
  }

  //@ts-ignore
  const divisions = data?.division;
  const divisionOptions = divisions?.map((division) => {
    return {
      label: division?.title,
      value: division?.id,
    };
  });

  const onSubmit = async (data: any) => {
    message.loading("Creating....");
    data.districtImage = imageUrl && imageUrl;

    try {
      const res = await createDistrict(data);
      if (!!res) {
        message.success("District created successfully");
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
              label: "Manage district",
              link: "/super_admin/district",
            },
          ]}
        />
      </div>
      <DetailsTab title="Create division">
        <div>
          <Form submitHandler={onSubmit}>
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
                  placeholder="Select division"
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

export default CreateDivision;
