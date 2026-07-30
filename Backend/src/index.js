import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
})

const port = process.env.PORT;
const app = express();

connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`App is listen on port ${port}`);
    })
})
.catch((error)=>{
    console.log("Error in app connection",error);
    throw error;
})


