"use client";
import { message, type MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "@/constant/role";
import { removeUserInfo } from "@/services/auth.services";
import { authKey } from "@/constant/storageKey";
import { redirect } from "next/navigation";
import { FaUserTie } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { BiWorld, BiSolidMapAlt } from "react-icons/bi";



export const SidebarMenus = (role: string) => {
  const logout = () => {
    removeUserInfo(authKey);
    message.info("Sign out successfully");
    redirect("/authentication/signin");
  };

  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}/profile`}>Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/${role}/change-password`}>Change Password</Link>,
          key: `/${role}/change-password`,
        },
      ],
    },
    {
      label: <h2 onClick={logout}>Signout</h2>,
      key: "signout",
      icon: <LogoutOutlined />,
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/place`}>Place</Link>,
      icon: <MdPlace />,
      key: `/${role}/place`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...commonAdminSidebarItems,
    {
      label: <Link href={`/${role}/hotel`}>Hotel</Link>,
      icon: <TableOutlined />,
      key: `/${role}/hotel`,
    },
    {
      label: <Link href={`/${role}/room`}>Room</Link>,
      icon: <TableOutlined />,
      key: `/${role}/room`,
    },
    {
      label: <Link href={`/${role}/room-facilities`}>Room Facilities</Link>,
      icon: <TableOutlined />,
      key: `/${role}/room-facilities`,
    },

    ...defaultSidebarItems,
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/manage-admin`}>Manage Admin</Link>,
      icon: <FaUserTie />,
      key: `/${role}/manage-admin`,
    },
    {
      label: <Link href={`/${role}/manage-users`}>Manage User</Link>,
      icon: <UserOutlined />,
      key: `/${role}/manage-users`,
    },
    {
      label: <Link href={`/${role}/division`}>Division</Link>,
      icon: <BiWorld />,
      key: `/${role}/division`,
    },
    {
      label: <Link href={`/${role}/district`}>District</Link>,
      icon: <BiSolidMapAlt />,
      key: `/${role}/district`,
    },
    ...commonAdminSidebarItems,
    ...defaultSidebarItems,
  ];

  const userSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/courses`}>Courses</Link>,
      icon: <TableOutlined />,
      key: `/${role}/courses`,
    },
    ...defaultSidebarItems,
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.USER) return userSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
