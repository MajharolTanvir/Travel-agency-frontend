"use client";

import Form from "@/components/FORM/Form";
import FormInput from "@/components/FORM/FormInput";
import FormSelectFields, {
  ISelectFieldOptions,
} from "@/components/FORM/FormSelectFields";
import FormTextArea from "@/components/FORM/FormTextArea";
import ImageUpload from "@/components/FORM/UploadSingleImage";
import ButtonCom from "@/components/UI/Button";
import DetailsTab from "@/components/UI/DetailsTab";
import BreadcrumbCom from "@/components/UI/breadcrumb";
import { useGetAllDistrictQuery } from "@/redux/api/DistrictApi";
import {
  useGetSinglePlaceQuery,
  useUpdatedPlaceMutation,
} from "@/redux/api/PlaceApi";
import { message } from "antd";
import React, { useState } from "react";

type IDProps = {
  params: any;
};

const UpdatePlace = ({ params }: IDProps) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const { id } = params;
  const [updatePlace] = useUpdatedPlaceMutation();
  const { data, isLoading } = useGetSinglePlaceQuery(id);
  const { data: districtData } = useGetAllDistrictQuery({});

  if (isLoading) {
    <p>Loading..........</p>;
  }

  const districts = districtData?.district;
  const districtOptions = districts?.map((district: any) => {
    return {
      label: district?.title,
      value: district?.id,
    };
  });

  const onSubmit = async (values: any) => {
    message.loading("Updating....");
    const data = {
      id: id,
      values: values,
    };
    try {
      const res = await updatePlace(data);
      if (!!res) {
        message.success("Place updated successfully");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const defaultValues = {
    title: data?.title || "",
    description: data?.description || "",
  };

  return (
    <div>
      <div className="md:flex justify-between items-center">
        <BreadcrumbCom
          items={[
            {
              label: "Admin",
              link: "/admin",
            },
            {
              label: "Manage Place",
              link: "/admin/place",
            },
          ]}
        />
      </div>
      <DetailsTab title="Update place">
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
                  name="districtId"
                  label="District"
                  options={districtOptions as ISelectFieldOptions[]}
                  size="large"
                  placeholder={data?.district?.title}
                />
              </div>
              <div>
                <ImageUpload
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                ></ImageUpload>
              </div>
            </div>

            <div>
              <FormTextArea name="description" label="Description" />
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

export default UpdatePlace;
