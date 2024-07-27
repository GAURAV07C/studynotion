const express = require("express");
const app = express();

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const Cors = require("cors");
const cloudinary = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const dotenv = require("dotenv");

const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const contactUs = require('./routes/Contact')



// Loading environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 4000;

database.connect();

app.use(express.json())
app.use(cookieParser())
app.use(
    Cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/temp"
    })
)



cloudinary.CloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUs);

app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});