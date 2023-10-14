"use client";
import Contents from "@/components/UI/Contants";
import HeaderPage from "@/components/UI/Header";
import Sidebar from "@/components/UI/sidebar";
import { isLoggedIn } from "@/services/auth.services";
import { Layout } from "antd";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(true);
  const userLoggedIn = isLoggedIn();
  const [loading, setLoading] = useState<Boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/authentication/signin");
    } else {
      setLoading(true);
    }
  }, [router, setLoading, userLoggedIn]);

  return (
    <Layout hasSider>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <HeaderPage
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        ></HeaderPage>
        <Contents>{children}</Contents>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
