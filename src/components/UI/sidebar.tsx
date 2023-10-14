import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import { SidebarMenus } from "./sidebarMenus";
import { getUserInfo } from "@/services/auth.services";

const Sidebar = ({ collapsed }: { collapsed: true | false }) => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const userInfo = getUserInfo();

    if (userInfo) {
      //@ts-ignore
      setRole(userInfo.role);
    }
  }, []);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      style={{
        overflow: "auto",

        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="demo-logo-vertical">
        {collapsed ? (
          <h3 className="text-[15px] text-center my-5 text-white font-bold">
            QTP
          </h3>
        ) : (
          <h3 className="text-[20px] text-center my-5 text-white font-bold">
            Quick Tour Plan
          </h3>
        )}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={SidebarMenus(role)}
        inlineCollapsed={collapsed}
      />
    </Sider>
  );
};

export default Sidebar;
