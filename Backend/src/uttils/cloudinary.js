import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET, 
    });

const uploadFile = async (localURL,productName) =>{
    try {
        if(!localURL && !productName) return null;
        response = await cloudinary.uploader.upload(localURL,
            {
                resource_type: "auto",
                public_id:  productName  
            }
        )
        console.log(`File Uploaded :: ${response}`);
        return response;
    } catch (error) {
        fs.unlink(localURL);
        return error;
    }
}

export default uploadFile;