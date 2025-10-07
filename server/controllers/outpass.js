import outpass from "../models/outpass.js";
import Pending from "../models/PendingOutpass.js";
import cloudinary from "../middlewares/cloudinary.js";

export const createOutpass = async (req, res) => {
  const outpassData = req.body;

  try {
    // await newOutpass.save();
    // await POutpass.save();

    /* req.file.path:
This is the path to the uploaded file on the server, provided by the multer middleware.
The file was uploaded to the server's temporary directory by multer.

cloudinary.uploader.upload:
This uploads the file to Cloudinary.
The folder: "ecommerce_products" option specifies the folder in Cloudinary where the file will be stored.

result:
The result object contains metadata about the uploaded file, including its URL.
d */

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ecommerce_products",
    });

    /* result.secure_url:
This is the secure URL of the uploaded file on Cloudinary. */

    /* It is added to the outpassData object as the ImageURL field. */
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

/* The .save() method is necessary when using new Model() to create a document.

If you want to avoid .save(), you can use create() to simplify the process. */
