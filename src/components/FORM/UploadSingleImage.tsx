import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import Image from "next/image";
import axios from "axios";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must be smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const ImageUpload = ({ imageUrl, setImageUrl }: any) => {
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", info.file.originFileObj as RcFile);

      try {
        const response = await axios.post(
          "https://api.imgbb.com/1/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            params: {
              key: "74c8424adb20f9d1cb8d5b37f691776a",
            },
          }
        );

        if (response.data.status === 200) {
          const imageURL = response.data.data.url;
          setLoading(false);
          setImageUrl(imageURL);
        } else {
          console.error("Image upload failed:", response.data.error);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
      return;
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://api.imgbb.com/1/upload"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt="avatar" width={400} height={400} />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};

export default ImageUpload;
