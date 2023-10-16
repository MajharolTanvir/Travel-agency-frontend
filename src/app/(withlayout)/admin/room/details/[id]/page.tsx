/* eslint-disable react/jsx-key */
"use client";

import BreadcrumbCom from "@/components/UI/breadcrumb";
import { useGetSingleRoomQuery } from "@/redux/api/RoomApi";
import { Carousel } from "antd";
import Image from "next/image";
import React from "react";

type IDProps = {
  params: any;
};

const RoomDetails = ({ params }: IDProps) => {
  const { id } = params;

  const { data, isLoading } = useGetSingleRoomQuery(id);

  if (isLoading) {
    <p>Loading..........</p>;
  }

  return (
    <div>
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
      <div className="min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center gap-10 my-4">
          <div className="w-full">
            {data?.roomImages && (
              <Carousel autoplay>
                {data?.roomImages?.map((roomImage: { url: string }) => (
                  <div>
                    <Image
                      src={roomImage?.url}
                      alt="Room Image"
                      width={400}
                      height={400}
                      className="w-full h-[300px] lg:h-[500px] lg:w-full rounded-md"
                    />
                  </div>
                ))}
              </Carousel>
            )}
          </div>
          <div>
            {data?.roomType && (
              <p className="text-sm md:text-xl">
                <span className="font-bold">Room Type:</span> {data?.roomType}
              </p>
            )}
            {data?.description && (
              <p className="text-sm md:text-xl">
                <span className="font-bold">About Room: </span>
                {data?.description}
              </p>
            )}
            {data?.roomPrice && (
              <p className="text-sm md:text-xl">
                <span className="font-bold">Room price: </span>
                {data?.roomPrice}
              </p>
            )}
            {data?.checkInTime && (
              <p className="text-sm md:text-xl">
                <span className="font-bold">Check In Time: </span>
                {data?.checkInTime}
              </p>
            )}
            {data?.checkOutTime && (
              <p className="text-sm md:text-xl">
                <span className="font-bold">Check Out Time: </span>
                {data?.checkOutTime}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
