import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { theme } from "antd";

const ContentSection = ({ children }: { children: React.ReactNode }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Content style={{ padding: "0 50px" }}>
      <div
        className="site-layout-content"
        style={{ background: colorBgContainer, minHeight: '100vh' }}
      >
        {children}
      </div>
    </Content>
  );
};

export default ContentSection;