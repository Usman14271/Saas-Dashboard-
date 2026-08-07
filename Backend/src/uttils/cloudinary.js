import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadFile = async (localURL, productName) => {
  try {
    if (!localURL || !productName) {
      return null;
    }

    const response = await cloudinary.uploader.upload(localURL, {
      resource_type: "auto",
      public_id: productName,
    });

    console.log(`File uploaded: ${response.secure_url}`);

    // Delete temporary file after successful upload
    await fs.promises.unlink(localURL);

    return response;

  } catch (error) {
    console.error("Cloudinary upload error:", error);

    // Try deleting temporary file if it exists
    if (localURL) {
      try {
        await fs.promises.unlink(localURL);
      } catch (unlinkError) {
        console.error("Temporary file deletion failed:", unlinkError);
      }
    }

    return null;
  }
};

export default uploadFile;