"use client";

import React from "react";
import type { ColumnsType } from "antd/es/table";
import BreadcrumbCom from "@/components/UI/breadcrumb";
import DetailsTab from "@/components/UI/DetailsTab";
import { EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useGetAllAdminQuery } from "@/redux/api/UserApi";
import TableComponent from "@/components/UI/table";
import ButtonCom from "@/components/UI/Button";
import Link from "next/link";

const ManageAdmin = () => {
  const { data, isLoading } = useGetAllAdminQuery({});

  const columns: ColumnsType = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Middle Name",
      dataIndex: "middleName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <Link href={`/super_admin/manage-users/details/${data}`}>
            <ButtonCom>
              <EyeOutlined />
            </ButtonCom>
          </Link>
        );
      },
    },
  ];

  return (
    <div>
      <BreadcrumbCom
        items={[
          {
            label: "Super_Admin",
            link: "/super_admin",
          },
        ]}
      />
      <DetailsTab title="Manage Admin">
        <TableComponent
          loading={isLoading}
          columns={columns}
          showSizeChanger={true}
          dataSource={data}
          showPagination={true}
        ></TableComponent>
      </DetailsTab>
    </div>
  );
};

export default ManageAdmin;
