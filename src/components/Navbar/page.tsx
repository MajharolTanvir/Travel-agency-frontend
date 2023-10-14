"use client";

import FooterSection from "./footer";
import HeaderSection from "./header";
import ContentSection from "./content";
import { Layout } from "antd";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout className="layout bg-white ">
      <HeaderSection />
      <ContentSection>{children} </ContentSection>
      <FooterSection />
    </Layout>
  );
};

export default Navbar;
