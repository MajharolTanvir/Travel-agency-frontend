import { Col, Row } from "antd";
import Image from "next/image";
import React from "react";
// import errorImage from "../assets/Error.gif";

const NotFound = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{ minHeight: "100vh", background: "#1a183f" }}
    >
      <Col>
        {/* <Image src={errorImage} width={600} alt="Error image" /> */}
        <h2 style={{ textAlign: "center", color: "white" }}>
          404!!! Not found!
        </h2>
        <h3 style={{ textAlign: "center", padding: "10px 0" }}>
          <a href="/">Go back to home page</a>
        </h3>
      </Col>
    </Row>
  );
};

export default NotFound;
