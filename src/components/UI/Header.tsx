import { Avatar, Button, Popover, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useMemo, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { UserOutlined } from "@ant-design/icons";
import { getUserInfo } from "@/services/auth.services";

type collapsedProps = {
  collapsed: boolean;
  setCollapsed: any;
};

type userInfoProps = {
  userId: string | undefined;
  userRole: string | undefined;
  role: string | undefined;
};

const HeaderPage = ({ collapsed, setCollapsed }: collapsedProps) => {
  const [showArrow, setShowArrow] = useState(true);
  const [arrowAtCenter, setArrowAtCenter] = useState(false);
  const userInfo: userInfoProps = getUserInfo() as userInfoProps;

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  //@ts-ignore
  const text = <span>{userInfo && userInfo?.userEmail}</span>;
  const content = (
    <div>
      <p>Role: {userInfo && userInfo?.role}</p>
    </div>
  );

  const mergedArrow = useMemo(() => {
    if (arrowAtCenter) return { pointAtCenter: true };
    return showArrow;
  }, [showArrow, arrowAtCenter]);

  return (
    <Header
      style={{
        padding: '0 20px',
        background: colorBgContainer,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 60,
        }}
      />
      <Popover
        placement="bottomRight"
        title={text}
        content={content}
        arrow={mergedArrow}
      >
        <Avatar icon={<UserOutlined />} />
      </Popover>
    </Header>
  );
};

export default HeaderPage;
