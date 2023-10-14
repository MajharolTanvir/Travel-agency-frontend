import { Content } from 'antd/es/layout/layout';
import React from 'react';
import { theme } from "antd";

const ContentSection = ({ children }: { children: React.ReactNode }) => {

  return (
    <Content className='w-[95%] mx-auto'>
      <div
        className="site-layout-content"
        style={{ minHeight: "100vh" }}
      >
        {children}
      </div>
    </Content>
  );
};

export default ContentSection;