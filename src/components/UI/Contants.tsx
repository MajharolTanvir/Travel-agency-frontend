import { theme } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { ReactNode } from "react";

const Contents = ({ children }: { children: ReactNode }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Content
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: '100vh',
        background: colorBgContainer,
      }}
    >
      {children}
    </Content>
  );
};

export default Contents;
