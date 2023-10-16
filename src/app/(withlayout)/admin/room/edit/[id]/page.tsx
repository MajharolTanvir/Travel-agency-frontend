"use client";

import Form from "@/components/FORM/Form";
import FormInput from "@/components/FORM/FormInput";
import FormSelectFields, {
  ISelectFieldOptions,
} from "@/components/FORM/FormSelectFields";
import FormTextArea from "@/components/FORM/FormTextArea";
import FormTimePicker from "@/components/FORM/FormTimePicker";
import MultipleImageUpload from "@/components/FORM/UploadMultiImage";
import ButtonCom from "@/components/UI/Button";
import DetailsTab from "@/components/UI/DetailsTab";
import BreadcrumbCom from "@/components/UI/breadcrumb";
import { useGetAllHotelQuery } from "@/redux/api/HotelApi";
import {
  useGetSingleRoomQuery,
  useUpdatedRoomMutation,
} from "@/redux/api/RoomApi";
import { message } from "antd";
import React, { useState } from "react";

type IDProps = {
  params: any;
};

interface UploadedImage {
  url: string;
  thumbUrl: string;
}

const UpdateRoom = ({ params }: IDProps) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const { id } = params;
  const [updateRoom] = useUpdatedRoomMutation();
  const { data, isLoading } = useGetSingleRoomQuery(id);
  const { data: hotelData } = useGetAllHotelQuery({});

  if (isLoading) {
    <p>Loading..........</p>;
  }

  const hotels = hotelData?.hotel;
  const hotelsOptions = hotels?.map((hotel: any) => {
    return {
      label: hotel?.title,
      value: hotel?.id,
    };
  });

  const onSubmit = async (values: any) => {
    message.loading("Updating....");

    values.roomPrice = parseInt(values?.roomPrice);
    values.roomImages = uploadedImages && uploadedImages;
    const data = {
      id: id,
      values: values,
    };
    try {
      const res = await updateRoom(data);
      if (!!res) {
        message.success("Room updated successfully");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const defaultValues = {
    roomType: data?.roomType || "",
    description: data?.description || "",
    roomPrice: data?.roomPrice || "",
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
              label: "Manage Hotel",
              link: "/admin/hotel",
            },
          ]}
        />
      </div>
      <DetailsTab title="Update hotel">
        <div>
          <Form submitHandler={onSubmit} defaultValues={defaultValues}>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 justify-start items-start gap-5">
              <div>
                <FormInput
                  name="roomType"
                  label="Room Type"
                  size="large"
                  type="text"
                />
              </div>

              <div>
                <FormInput
                  name="roomPrice"
                  label="Room price"
                  size="large"
                  type="text"
                />
              </div>

              <div>
                <FormTimePicker
                  name="checkInTime"
                  label={`Check In Time - ${data?.checkInTime}`}
                />
              </div>

              <div>
                <FormTimePicker
                  name="checkOutTime"
                  label={`Check Out Time - ${data?.checkOutTime}`}
                />
              </div>

              <div>
                <FormSelectFields
                  name="hotelId"
                  label="Hotel Name"
                  options={hotelsOptions as ISelectFieldOptions[]}
                  size="large"
                  placeholder={data?.hotel?.title}
                />
              </div>

              <div>
                <FormTextArea name="description" label="Description" />
              </div>

              <div>
                <MultipleImageUpload
                  uploadedImages={uploadedImages}
                  setUploadedImages={setUploadedImages}
                ></MultipleImageUpload>
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

export default UpdateRoom;
