require("dotenv").config();
import razorpayInstance from "./configuration/razorpay";
import "./configuration/googleAuthentication"
import express from "express"
import corsMiddleware from "./middleware/corsMidldeware";
import { errrorHandlerMiddleware } from "./middleware/errorHandlerMiddleware";
import sessionMiddleware from "./middleware/sessionMiddleware";
import authenticateRoutes from "./routes/authenticateRoutes";
import adminRoutes from "./routes/adminRoutes"
import userRoutes from "./routes/userRoutes"
import connectDb from "./db/connectDb"
const passport = require("passport")
import http from "http"
import { setupSocketIO } from "./sockets";

const PORT = process.env.PORT || 8000;

const app = express();
app.set("trust proxy", 1);
const server = http.createServer(app)
setupSocketIO(server)


app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(corsMiddleware)



app.use("/authenticate", authenticateRoutes);
app.use("/admin", adminRoutes)
app.use("/user", userRoutes)

app.use(errrorHandlerMiddleware)

const startServer = async () => {
    await connectDb()
    server.listen(PORT, () => {
        console.log("server is running in Port : " + PORT);
    })
}

startServer();




