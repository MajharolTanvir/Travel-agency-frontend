"use client";

import Form from "@/components/FORM/Form";
import FormDatePicker from "@/components/FORM/FormDatePicker";
import FormInput from "@/components/FORM/FormInput";
import FormSelectFields from "@/components/FORM/FormSelectFields";
import ImageUpload from "@/components/FORM/UploadSingleImage";
import ButtonCom from "@/components/UI/Button";
import DetailsTab from "@/components/UI/DetailsTab";
import BreadcrumbCom from "@/components/UI/breadcrumb";
import { genderOptions } from "@/constant/global";
import {
  useGetProfileQuery,
  useProfileUpdateMutation,
} from "@/redux/api/UserApi";
import { message } from "antd";
import React, { useEffect, useState } from "react";

const UpdateProfile = () => {
  const { data, isLoading } = useGetProfileQuery({});
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  if (isLoading) {
    <p>Loading....</p>;
  }

  useEffect(() => {
    if (data?.Profile[0]?.profileImage) {
      setImageUrl(data?.Profile[0]?.profileImage);
    }
  }, [data?.Profile]);

  const defaultValues = {
    firstName: data?.firstName || "",
    middleName: data?.middleName || "",
    lastName: data?.lastName || "",
    bio: data?.Profile[0]?.bio || "",
    country: data?.Profile[0]?.country || "",
    division: data?.Profile[0]?.division || "",
    district: data?.Profile[0]?.district || "",
    area: data?.Profile[0]?.area || "",
    nid: data?.Profile[0]?.nid || "",
    passport: data?.Profile[0]?.passport || "",
    contactNo: data?.Profile[0]?.contactNo || "",
    dateOfBirth: data?.Profile[0]?.dateOfBirth,
    gender: data?.Profile[0]?.gender || "male",
  };

  const [profileUpdate] = useProfileUpdateMutation();

  const onSubmit = async (data: any) => {
    message.loading("Updating....");
    data.profileImage = imageUrl && imageUrl;

    try {
      const res = await profileUpdate(data);
      if (!!res) {
        message.success("User update successfully");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <BreadcrumbCom
        items={[
          {
            label: "Super_Admin",
            link: "/super_admin",
          },
          {
            label: "Profile",
            link: "/super_admin/profile",
          },
        ]}
      />
      <DetailsTab title="Update profile">
        <div>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <FormInput
                  type="text"
                  size="large"
                  name="firstName"
                  label="First Name"
                />
              </div>
              <div>
                <FormInput
                  type="text"
                  size="large"
                  name="middleName"
                  label="Middle Name"
                />
              </div>
              <div>
                <FormInput
                  type="text"
                  name="lastName"
                  size="large"
                  label="Last Name"
                />
              </div>
              <div>
                <FormSelectFields
                  name="gender"
                  label="Gender"
                  options={genderOptions}
                  size="large"
                  placeholder="Male"
                />
              </div>
              <div>
                <FormDatePicker
                  name="dateOfBirth"
                  size="large"
                  label="Date of birth"
                />
              </div>
              <div>
                <FormInput type="text" name="bio" size="large" label="Bio" />
              </div>
              <div>
                <FormInput
                  type="text"
                  name="country"
                  size="large"
                  label="Country"
                />
              </div>
              <div>
                <FormInput
                  type="text"
                  name="division"
                  size="large"
                  label="Division"
                />
              </div>
              <div>
                <FormInput
                  type="text"
                  name="district"
                  size="large"
                  label="District"
                />
              </div>
              <div>
                <FormInput type="text" name="area" size="large" label="Area" />
              </div>
              <div>
                <FormInput type="text" name="nid" size="large" label="NID" />
              </div>
              <div>
                <FormInput
                  type="text"
                  name="passport"
                  size="large"
                  label="Passport No"
                />
              </div>
              <div>
                <FormInput
                  type="text"
                  name="contactNo"
                  size="large"
                  label="Contact No"
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

export default UpdateProfile;
