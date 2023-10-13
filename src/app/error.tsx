"use client";
import { Col, Row } from "antd";
import Image from "next/image";
import React from "react";
// import troubleshoot from "../assets/troubleshooting.gif";

const Error = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        color: "white",
        background: "#1a183f",
        padding: "0px 10px",
      }}
    >
      <Col>
        {/* <Image src={troubleshoot} alt="Something went wrong" width={500} /> */}
        <h1 style={{ textAlign: "center" }}>Some thing went wrong!</h1>
      </Col>
    </Row>
  );
};

export default Error;
