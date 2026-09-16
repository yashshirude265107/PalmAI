const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const CLOUDINARY_CONFIGURED = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

const UPLOADS_DIR = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

let cloudinary = null;
if (CLOUDINARY_CONFIGURED) {
  cloudinary = require("cloudinary").v2;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
} else {
  console.warn(
    "[storage] Cloudinary credentials not set — falling back to local disk storage at backend-nodb/uploads. " +
      "Images will be served from this server and won't survive a fresh deploy. Set CLOUDINARY_* env vars for real hosting."
  );
}

/**
 * Uploads a base64 image string to Cloudinary, or saves it to local disk and
 * returns a URL served by this same Express app when Cloudinary isn't configured.
 * @param {string} base64DataUrl - full data URL, e.g. "data:image/jpeg;base64,..."
 */
async function uploadPalmImage(base64DataUrl) {
  if (CLOUDINARY_CONFIGURED) {
    const result = await cloudinary.uploader.upload(base64DataUrl, {
      folder: "palmai/palms",
      resource_type: "image",
      transformation: [{ width: 1200, crop: "limit" }, { quality: "auto" }],
    });
    return { url: result.secure_url, publicId: result.public_id };
  }

  // --- Local disk fallback ---
  const match = base64DataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) throw new Error("Invalid image data");

  const ext = match[1].split("/")[1] || "jpg";
  const buffer = Buffer.from(match[2], "base64");
  const filename = `${crypto.randomBytes(12).toString("hex")}.${ext}`;
  fs.writeFileSync(path.join(UPLOADS_DIR, filename), buffer);

  const baseUrl = process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5000}`;
  return { url: `${baseUrl}/uploads/${filename}`, publicId: filename };
}

/** Deletes an image, from Cloudinary or local disk depending on how it was stored. */
async function deletePalmImage(publicId) {
  if (!publicId) return;

  if (CLOUDINARY_CONFIGURED) {
    await cloudinary.uploader.destroy(publicId);
    return;
  }

  const filePath = path.join(UPLOADS_DIR, publicId);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
}

module.exports = { uploadPalmImage, deletePalmImage, CLOUDINARY_CONFIGURED };
