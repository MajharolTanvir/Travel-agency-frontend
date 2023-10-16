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
import { useCreateRoomMutation } from "@/redux/api/RoomApi";
import { message } from "antd";
import React, { useState } from "react";

interface UploadedImage {
  url: string;
  thumbUrl: string;
}

const CreateRoom = () => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [createRoom] = useCreateRoomMutation();
  const { data: hotelData, isLoading } = useGetAllHotelQuery({});

  if (isLoading) {
    <p>Loading.............</p>;
  }
  const hotels = hotelData?.hotel;
  const hotelOptions = hotels?.map((hotel) => {
    return {
      //@ts-ignore
      label: hotel?.title,
      //@ts-ignore
      value: hotel?.id,
    };
  });

  const onSubmit = async (data: any) => {
    message.loading("Creating....");
    data.roomPrice = parseInt(data?.roomPrice);
    data.roomImages = uploadedImages && uploadedImages;

    try {
      const res = await createRoom(data);
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
              label: "Manage room",
              link: "/admin/room",
            },
          ]}
        />
      </div>
      <DetailsTab title="Create room">
        <div>
          <Form submitHandler={onSubmit}>
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
                <FormTimePicker name="checkInTime" label="Check In Time" />
              </div>

              <div>
                <FormTimePicker name="checkOutTime" label="Check Out Time" />
              </div>

              <div>
                <FormSelectFields
                  name="hotelId"
                  label="Hotel Name"
                  options={hotelOptions as ISelectFieldOptions[]}
                  size="large"
                  placeholder="Select hotel"
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

export default CreateRoom;
