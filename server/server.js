import express, { json } from "express"
import { configDotenv } from "dotenv";
import { ConnectDB } from "./utils/db.js";
configDotenv();
import router from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"


const app = express();
const port = process.env.PORT || 5000;
ConnectDB();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

// routes
app.use('/api',router);

app.get('/',(res,req) => {
    console.log("Server start");
})

app.listen(port ,() => {
    console.log(`Server start port ${port}`)
})

