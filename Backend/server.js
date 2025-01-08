import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors"; 
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();

app.get("/",(req,res)=>{
    res.send("Server is ready");
})

//Calling the MONGO_URL
console.log(process.env.MONGO_URL);

app.listen(5000, () =>{
    connectDB();
    console.log("Server started at port 5000")
});

app.use(
    cors({
        methods: ["GET","POST","PUT","DELETE"],
        credentials: true,
    })
)

app.use(express.json())
app.use(express.urlencoded)

app.use(cookieParser())



//x45Hxze6tUVEN3Cs