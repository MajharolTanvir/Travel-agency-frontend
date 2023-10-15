"use client";

import ButtonCom from "@/components/UI/Button";
import { useGetProfileQuery } from "@/redux/api/UserApi";
import Link from "next/link";
import React from "react";

const Profile = () => {
  const { data, isLoading } = useGetProfileQuery({});

  if (isLoading) {
    <p>Loading....</p>;
  }


  return (
    <div>
      <div className="flex justify-end items-start">
        <Link href="/super_admin/profile/edit">
          <ButtonCom>Update profile</ButtonCom>
        </Link>
      </div>
      <div>
        <h1>{data?.firstName}</h1>
        <h1>{data?.middleName}</h1>
        <h1>{data?.lastName}</h1>
      </div>
    </div>
  );
};

export default Profile;
