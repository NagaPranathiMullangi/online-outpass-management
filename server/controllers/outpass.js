import outpass from "../models/outpass.js";
import Pending from "../models/PendingOutpass.js";
import cloudinary from "../middlewares/cloudinary.js";

export const createOutpass = async (req, res) => {
  const outpassData = req.body;

  try {
    // await newOutpass.save();
    // await POutpass.save();

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ecommerce_products",
    });

    outpassData.ImageURL = result.secure_url;

    const newOutpass = new outpass({ ...outpassData });
    const POutpass = new Pending({ ...outpassData });

    await Promise.all([newOutpass.save(), POutpass.save()]);
    return res.status(200).json("Outpass saved successfully");
  } catch (error) {
    console.error(error);
    return res.status(409).json({ message: "Couldn't post Outpass" });
  }
};
