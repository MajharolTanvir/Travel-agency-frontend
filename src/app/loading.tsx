"use client";
import { Row } from "antd";
import React from "react";

const Loading = () => {
  return (
    <Row
      align="middle"
      justify="center"
      style={{ minHeight: "100vh", background: "#1a183f" }}
    >
      <h1>Loading.............</h1>
    </Row>
  );
};

export default Loading;
