import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from './config/connectDb';
require('dotenv').config();

let app = express();

// Sửa lỗi: Gọi hàm bodyParser.json()
app.use(bodyParser.json()); // Thêm dấu ngoặc để gọi hàm
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6886;

app.listen(port, () => {
    console.log("Node.js is running on the port: " + port);
});