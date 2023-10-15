"use client";

import ButtonCom from "@/components/UI/Button";
import BreadcrumbCom from "@/components/UI/breadcrumb";
import { useGetProfileQuery } from "@/redux/api/UserApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Profile = () => {
  const { data, isLoading } = useGetProfileQuery({});

  if (isLoading) {
    <p>Loading....</p>;
  }

  return (
    <div>
      <div className="md:flex justify-between items-center">
        <BreadcrumbCom
          items={[
            {
              label: "Super_Admin",
              link: "/super_admin",
            },
          ]}
        />

        <Link href="/super_admin/profile/edit">
          <ButtonCom>Update profile</ButtonCom>
        </Link>
      </div>

      <div className="md:flex justify-center items-center gap-10">
        <div className="w-full">
          <Image
            src={data?.Profile[0]?.profileImage}
            alt="Profile image"
            width={400}
            className="rounded-md w-full lg:w-[600px]"
            height={400}
          />
          <div className=" mt-5 backdrop-blur-xl bg-blue-100 p-5 rounded-md">
            <div className="flex justify-start items-center gap-2">
              <h3 className="text-md md:text-2xl font-bold">
                {data?.firstName}
              </h3>
              {data?.middleName && (
                <h3 className="text-md md:text-2xl font-bold">
                  {data?.middleName}
                </h3>
              )}
              <h3 className="text-md md:text-2xl font-bold">
                {data?.lastName}
              </h3>
            </div>
            <h4 className="text-sm md:text-xl">{data?.Profile[0]?.bio}</h4>
          </div>
        </div>
        <div className="h-0.5 md:w-0.5 md:h-96 bg-black/40 my-5"></div>
        <div className="w-full">
          {data?.role && (
            <h4 className="text-sm md:text-xl backdrop-blur-xl bg-blue-100 p-5 rounded-md my-2">
              Role: {data?.role}
            </h4>
          )}
          {data?.email && (
            <h4 className="text-sm md:text-xl backdrop-blur-xl bg-blue-100 p-2 md:p-5 rounded-md my-2">
              Email: {data?.email}
            </h4>
          )}
          {data?.Profile[0]?.gender && (
            <h4 className="text-sm md:text-xl backdrop-blur-xl bg-blue-100 p-5 rounded-md my-2">
              Gender: {data?.Profile[0]?.gender}
            </h4>
          )}
          {data?.Profile[0]?.dateOfBirth && (
            <h4 className="text-sm md:text-xl backdrop-blur-xl bg-blue-100 p-5 rounded-md my-2">
              Date Of Birth: {data?.Profile[0]?.dateOfBirth}
            </h4>
          )}{" "}
          {data?.Profile[0]?.contactNo && (
            <h4 className="text-sm md:text-xl backdrop-blur-xl bg-blue-100 p-5 rounded-md my-2">
              Contact No: {data?.Profile[0]?.contactNo}
            </h4>
          )}{" "}
          {data?.Profile[0]?.division && (
            <h4 className="text-sm md:text-xl backdrop-blur-xl bg-blue-100 p-5 rounded-md my-2">
              Division: {data?.Profile[0]?.division}
            </h4>
          )}{" "}
          {data?.Profile[0]?.district && (
            <h4 className="text-sm md:text-xl backdrop-blur-xl bg-blue-100 p-5 rounded-md my-2">
              District: {data?.Profile[0]?.district}
            </h4>
          )}{" "}
          {data?.Profile[0]?.area && (
            <h4 className="text-sm md:text-xl backdrop-blur-xl bg-blue-100 p-5 rounded-md my-2">
              Area: {data?.Profile[0]?.area}
            </h4>
          )}{" "}
          {data?.Profile[0]?.nid && (
            <h4 className="text-sm md:text-xl backdrop-blur-xl bg-blue-100 p-5 rounded-md my-2">
              NID: {data?.Profile[0]?.nid}
            </h4>
          )}
          {data?.Profile[0]?.passport && (
            <h4 className="text-sm md:text-xl backdrop-blur-xl bg-blue-100 p-5 rounded-md my-2">
              Passport: {data?.Profile[0]?.passport}
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
