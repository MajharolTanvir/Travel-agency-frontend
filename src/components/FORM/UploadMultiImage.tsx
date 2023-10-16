import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
import axios from "axios";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";



const getBase64 = (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const MultipleImageUpload = ({ uploadedImages, setUploadedImages }: any) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
      const [fileList, setFileList] = useState<UploadFile[]>([]);


  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = async ({
    fileList: newFileList,
    file,
  }) => {
    setFileList(newFileList);

    try {
      const formData = new FormData();
      formData.append("image", file.originFileObj as RcFile);

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
        const uploadedFile = newFileList.find((item) => item.uid === file.uid);

        if (uploadedFile) {
          uploadedFile.url = imageURL;
          uploadedFile.thumbUrl = imageURL;

          if (!uploadedImages.some((img: { url: any; }) => img.url === imageURL)) {
            setUploadedImages([...uploadedImages, { url: imageURL }]);
          }
        }
      } else {
        console.error("Image upload failed:", response.data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        action="https://api.imgbb.com/1/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} onCancel={handleCancel}>
        <Image
          alt="Uploaded images"
          width={400}
          height={400}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default MultipleImageUpload;
