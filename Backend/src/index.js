import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env"
})

const port = process.env.PORT;

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


