import outpass from "../models/outpass.js";
import Pending from "../models/PendingOutpass.js";
import cloudinary from "../middlewares/cloudinary.js";
import streamifier from "streamifier";

export const createOutpass = async (req, res) => {
  try {
    const outpassData = req.body;

    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "File not uploaded" });
    }

    const buffer = req.file.buffer;

    // --- Magic bytes check ---
    const fileHex = buffer.slice(0, 4).toString("hex").toLowerCase();
    const allowedSignatures = {
      "image/jpeg": ["ffd8ff"],
      "image/png": ["89504e47"],
      "application/pdf": ["25504446"],
    };

    let isValid = false;
    for (const sigs of Object.values(allowedSignatures)) {
      if (sigs.some(sig => fileHex.startsWith(sig))) {
        isValid = true;
        break;
      }
    }

    if (!isValid) {
      return res
        .status(400)
        .json({ message: "Invalid file type! Only JPG, PNG, PDF allowed." });
    }

    // --- Upload to Cloudinary ---
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "outpass_parent_consent_proofs" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });

    outpassData.ImageURL = result.secure_url;

    // Save to DB
    const newOutpass = new outpass({ ...outpassData });
    const pending = new Pending({ ...outpassData });

    await Promise.all([newOutpass.save(), pending.save()]);
    return res.status(200).json("Outpass saved successfully");
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Couldn't post Outpass" });
  }};

/* The .save() method is necessary when using new Model() to create a document.

If you want to avoid .save(), you can use create() to simplify the process. */
