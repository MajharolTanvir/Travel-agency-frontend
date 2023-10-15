"use client";

import ButtonCom from "@/components/UI/Button";
import DetailsTab from "@/components/UI/DetailsTab";
import BreadcrumbCom from "@/components/UI/breadcrumb";
import TableComponent from "@/components/UI/table";
import { useDebounced } from "@/redux/hook";
import { Input } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import {
  ReloadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useDeletePlaceMutation, useGetAllPlaceQuery } from "@/redux/api/PlaceApi";

const Place = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [deletePlace] = useDeletePlaceMutation();

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

  const { data, isLoading } = useGetAllPlaceQuery({ ...query });
  //@ts-ignore
  const places = data?.place;
  //@ts-ignore
  const meta = data?.meta;

  const handleDelete = (id: string) => {
    deletePlace(id);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
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
      render: function (id: any) {
        return (
          <div className="grid grid-cols-2 justify-center items-center gap-5">
            <Link href={`/super_admin/place/edit/${id}`}>
              <ButtonCom>
                <EditOutlined />
              </ButtonCom>
            </Link>

            <ButtonCom onclick={() => handleDelete(id)}>
              <DeleteOutlined />
            </ButtonCom>
          </div>
        );
      },
      responsive: ["md"],
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
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
      <DetailsTab title="Manage Place">
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
            <Link href="/super_admin/place/create-place">
              <ButtonCom>Create Place</ButtonCom>
            </Link>
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
          dataSource={places}
          showPagination={true}
        ></TableComponent>
      </DetailsTab>
    </div>
  );
};

export default Place;
