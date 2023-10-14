"use client";

import FooterSection from "./footer";
import HeaderSection from "./header";
import ContentSection from "./content";
import { Layout } from "antd";
import { getUserInfo, isLoggedIn } from "@/services/auth.services";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

const Navbar = ({ children }: { children: React.ReactNode }) => {
  const userInfo = getUserInfo();
  const userLoggedIn = isLoggedIn();

  const [loading, setLoading] = useState<Boolean>(false);
  useEffect(() => {
    if (userLoggedIn) {
      //@ts-ignore
      redirect(`/${userInfo!.role}/profile`);
    } else {
      setLoading(true);
    }
  }, [setLoading, userInfo, userLoggedIn]);

  return (
    <Layout className="layout bg-white ">
      <HeaderSection />
      <ContentSection>{children} </ContentSection>
      <FooterSection />
    </Layout>
  );
};

export default Navbar;
