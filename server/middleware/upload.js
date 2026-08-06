import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        console.log("Uploading file:", file.originalname);

        return {
            folder: "civic-report-portal",
            public_id: Date.now().toString(),
            resource_type: "image",
        };
    },
});

export default multer({ storage });