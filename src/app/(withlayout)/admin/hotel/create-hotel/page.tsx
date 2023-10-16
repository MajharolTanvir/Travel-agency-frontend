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
import { hotelOptions } from "@/constant/global";
import { useGetAllDistrictQuery } from "@/redux/api/DistrictApi";
import { useCreateHotelMutation } from "@/redux/api/HotelApi";
import { message } from "antd";
import React, { useState } from "react";

const CreateHotel = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [createHotel] = useCreateHotelMutation();
  const { data: districtData, isLoading } = useGetAllDistrictQuery({});

  if (isLoading) {
    <p>Loading.............</p>;
  }

  const districts = districtData?.district;
  const districtOptions = districts?.map((district) => {
    return {
      //@ts-ignore
      label: district?.title,
      //@ts-ignore
      value: district?.id,
    };
  });

  const onSubmit = async (data: any) => {
    message.loading("Creating....");
    data.hotelImage = imageUrl && imageUrl;

    try {
      const res = await createHotel(data);
      if (!!res) {
        message.success("Hotel created successfully");
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
              label: "Admin",
              link: "/admin",
            },
            {
              label: "Manage hotel",
              link: "/admin/hotel",
            },
          ]}
        />
      </div>
      <DetailsTab title="Create hotel">
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
                <FormInput
                  name="contactNo"
                  label="Contact no"
                  size="large"
                  type="text"
                />
              </div>

              <div>
                <FormInput
                  name="location"
                  label="Area Location"
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
                  placeholder="Select district"
                />
              </div>

              <div>
                <FormSelectFields
                  name="hotelType"
                  label="Hotel Type"
                  options={hotelOptions as ISelectFieldOptions[]}
                  size="large"
                  placeholder="Select place"
                />
              </div>

              <div>
                <FormInput
                  name="mapLocationUrl"
                  label="Map Location url"
                  size="large"
                  type="text"
                />
              </div>

              <div>
                <FormTextArea name="description" label="Description" />
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

export default CreateHotel;
