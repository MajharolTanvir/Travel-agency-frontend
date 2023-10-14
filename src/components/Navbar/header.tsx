import { Avatar, Menu, Popover } from "antd";
import { Header } from "antd/es/layout/layout";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { UserOutlined } from "@ant-design/icons";

const content = (
  <div className="flex flex-col justify-start items-center gap-2">
    <Link className="w-20" href="/authentication/signin">Signin</Link>
    <Link className="w-20" href="/authentication/signup">Signup</Link>
  </div>
);

const HeaderSection = () => {
  const [showArrow, setShowArrow] = useState(true);
  const [arrowAtCenter, setArrowAtCenter] = useState(false);

  const mergedArrow = useMemo(() => {
    if (arrowAtCenter) return { pointAtCenter: true };
    return showArrow;
  }, [showArrow, arrowAtCenter]);

  return (
    <Header className="flex justify-between items-center">
      <div className="demo-logo  text-2xl text-white">
        <h1>Quick Tour Plan</h1>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={new Array(8).fill(null).map((_, index) => {
          const key = index + 1;
          return {
            key,
            label: `nav ${key}`,
          };
        })}
      />
      <div>
        <Popover placement="bottomRight" content={content} arrow={mergedArrow}>
          <Avatar icon={<UserOutlined />} />
        </Popover>
      </div>
    </Header>
  );
};

export default HeaderSection;
