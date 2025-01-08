import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadImage = async (
  img: Express.Multer.File
): Promise<string | null> => {
  try {
    const uploadParams = {
      folder: "project-uploads",
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    };

    const base64 = img.buffer.toString("base64");
    const dataUri = `data:${img.mimetype};base64,${base64}`;

    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(
      dataUri,
      uploadParams
    );

    if (uploadResult?.secure_url) {
      return uploadResult?.secure_url;
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
