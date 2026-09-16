// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// /**
//  * Uploads a base64 image string to Cloudinary under the `palmai/palms` folder.
//  * @param {string} base64DataUrl - full data URL, e.g. "data:image/jpeg;base64,..."
//  * @returns {Promise<{url: string, publicId: string}>}
//  */
// async function uploadPalmImage(base64DataUrl) {
//   const result = await cloudinary.uploader.upload(base64DataUrl, {
//     folder: "palmai/palms",
//     resource_type: "image",
//     transformation: [{ width: 1200, crop: "limit" }, { quality: "auto" }],
//   });

//   return { url: result.secure_url, publicId: result.public_id };
// }

// /**
//  * Deletes an image from Cloudinary by its public ID (used when a report is deleted).
//  */
// async function deletePalmImage(publicId) {
//   if (!publicId) return;
//   await cloudinary.uploader.destroy(publicId);
// }

// module.exports = { uploadPalmImage, deletePalmImage };
