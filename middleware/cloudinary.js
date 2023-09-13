
const cloudinary = require("cloudinary").v2;

require("dotenv").config({ path: "./config/.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Function to upload an image
const uploadImage = async (path) => {
  try {
    const result = await cloudinary.uploader.upload(path);
    return result;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

// Function to apply image transformations
const transformImage = async (publicId, transformations) => {
  try {
    const result = await cloudinary.uploader.explicit(publicId, transformations);
    return result;
  } catch (error) {
    console.error("Error transforming image:", error);
    throw error;
  }
};

// Function to upload a video
const uploadVideo = async (path) => {
  try {
    const result = await cloudinary.uploader.upload(path, { resource_type: "video" });
    return result;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
};

module.exports = {
  cloudinary,
  uploadImage,
  transformImage,
  uploadVideo,
};
