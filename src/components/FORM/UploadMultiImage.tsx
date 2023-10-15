import { useState } from "react";
import axios from "axios";
import { FormEvent } from "react";
import Image from "next/image";

function ImageUpload() {
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleImageUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (images.length === 0) {
      console.error("No images selected");
      return;
    }

    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`image${index + 1}`, image);
    });

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
          params: {
            key: "YOUR_IMGBB_API_KEY",
          },
        }
      );

      if (response.data.status === 200) {
        const imageUrls = response.data.data.image.map(
          (imgData: { url: any; }) => imgData.url
        );
        console.log("Image URLs:", imageUrls);
        setImageUrls(imageUrls);
      } else {
        console.error("Image upload failed:", response.data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <form onSubmit={handleImageUpload}>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages(Array.from(e.target.files || []))}
        />
        <button type="submit">Upload</button>
      </form>

      {imageUrls.length > 0 && (
        <div>
          <h2>Uploaded Images</h2>
          {imageUrls.map((imageUrl, index) => (
            <div key={index}>
              <Image
                src={imageUrl}
                alt={`Uploaded ${index + 1}`}
                width={300}
                height={200}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
