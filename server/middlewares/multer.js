import multer from "multer";

const storage = multer.diskStorage({});

/* You didn’t provide a destination or filename, so Multer will store files in a default temp folder (platform-dependent) with random names.

That’s why nothing appeared in a specific folder — it’s just a temp location. */

const upload = multer({ storage });

/* , files uploaded with key "image" will be saved in uploads/ folder with a unique name. */
export default upload;

/* | Frontend Key in `FormData` | Backend Multer Call      | Files Available As |
| -------------------------- | ------------------------ | ------------------ |
| `"image"`                  | `upload.single("image")` | `req.file`         |
| `"images"` (multiple)      | `upload.array("images")` | `req.files`        |
 

Since you have multiple inputs with different keys, use upload.fields().

single → for one input only

array → for one input with multiple files

fields → for multiple inputs with possibly different file counts
*/
