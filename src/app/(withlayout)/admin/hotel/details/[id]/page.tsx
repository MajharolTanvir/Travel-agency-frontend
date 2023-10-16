"use client";

import { useGetSingleHotelQuery } from "@/redux/api/HotelApi";
import Image from "next/image";
import React from "react";

type IDProps = {
  params: any;
};

const HotelDetails = ({ params }: IDProps) => {
  const { id } = params;

  const { data, isLoading } = useGetSingleHotelQuery(id);

  if (isLoading) {
    <p>Loading..........</p>;
  }

  console.log(data);

  return (
    <div>
      <h1 className="text-xl md:text-3xl font-bold text-center">
        {data?.title}
      </h1>
      <div className="min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center items-center gap-10 my-4">
          <div>
            <Image
              src={data?.hotelImage}
              alt="Hotel Image"
              width={400}
              height={400}
              className="w-full lg:w-[700px] rounded-md"
            />
          </div>
          <div>
            {data?.hotelType && (
              <p className="text-sm md:text-xl">
                <span className="font-bold">Hotel Type:</span> {data?.hotelType}
              </p>
            )}
            {data?.description && (
              <p className="text-sm md:text-xl">
                <span className="font-bold">About Hotel: </span>
                {data?.description}
              </p>
            )}
            {data?.district?.title && (
              <p className="text-sm md:text-xl">
                <span className="font-bold">District: </span>
                {data?.district?.title}
              </p>
            )}
            {data?.contactNo && (
              <p className="text-sm md:text-xl">
                <span className="font-bold">Contact No: </span>
                {data?.contactNo}
              </p>
            )}
            {data?.location && (
              <p className="text-sm md:text-xl">
                <span className="font-bold">Hotel area: </span>
                {data?.location}
              </p>
            )}
            {data?.mapLocationUrl && (
              <a
                className="text-sm md:text-xl"
                target="_blank"
                href={data?.mapLocationUrl}
              >
                <span className="font-bold">Map Location: </span>
                Google map
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
