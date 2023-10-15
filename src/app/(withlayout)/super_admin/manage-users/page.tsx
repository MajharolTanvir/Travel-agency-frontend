"use client";

import React, { useState } from "react";
import { Input, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import BreadcrumbCom from "@/components/UI/breadcrumb";
import DetailsTab from "@/components/UI/DetailsTab";
import { ReloadOutlined, EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useGetAllProfileQuery } from "@/redux/api/UserApi";
import { useDebounced } from "@/redux/hook";
import TableComponent from "@/components/UI/table";
import ButtonCom from "@/components/UI/Button";
import Link from "next/link";

const ManageUser = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetAllProfileQuery({ ...query });
  //@ts-ignore
  const users = data?.users;
  //@ts-ignore
  const meta = data?.meta;

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

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

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
      <DetailsTab title="Manage user">
        <div className="md:flex justify-between items-center gap-5 mb-5">
          <Input
            size="large"
            placeholder="Search"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "20%",
            }}
          />
          <div className="flex justify-between items-center gap-2">
            {(!!sortBy || !!sortOrder || !!searchTerm) && (
              <ButtonCom onclick={resetFilters}>
                <ReloadOutlined />
              </ButtonCom>
            )}
          </div>
        </div>
        <TableComponent
          loading={isLoading}
          columns={columns}
          pageSize={size}
          //@ts-ignore
          totalPages={meta?.total}
          showSizeChanger={true}
          onPaginationChange={onPaginationChange}
          onTableChange={onTableChange}
          dataSource={users}
          showPagination={true}
        ></TableComponent>
      </DetailsTab>
    </div>
  );
};

export default ManageUser;
