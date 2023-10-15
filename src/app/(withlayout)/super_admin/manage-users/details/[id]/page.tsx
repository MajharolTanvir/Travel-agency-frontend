"use client";

import { useGetSingleUserQuery } from "@/redux/api/UserApi";
import React from "react";

type IDProps = {
  params: any;
};

const UserDetails = ({ params }: IDProps) => {
  const { id } = params;
  const { data, isLoading } = useGetSingleUserQuery(id);

  return (
    <div className="flex justify-around items-center">
      <div></div>
      <div>
        <div className="flex justify-around items-center gap-2">
          <h5 className="text-2xl font-medium">{data?.firstName}</h5>
          <h5 className="text-2xl font-medium">{data?.middleName}</h5>
          <h5 className="text-2xl font-medium">{data?.lastName}</h5>
        </div>
        <div className="flex flex-col">
          <span>Email: {data?.email}</span>
          <span>Role: {data?.role}</span>
          <span>Email: {data?.email}</span>
          <span>Email: {data?.email}</span>
          <span>Email: {data?.email}</span>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
