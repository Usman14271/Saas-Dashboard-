import multer from "multer";
import path from "path";
import fs from "fs";

const tempDir = path.resolve("public/temp");

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, {
        recursive: true
    });
}

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, tempDir);
    },

    filename: function (req, file, cb) {

        const uniqueSuffix =
            Date.now() + "-" +
            Math.round(Math.random() * 1E9);

        const extension =
            path.extname(file.originalname);

        cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${extension}`
        );
    }
});

export const upload = multer({
    storage
});