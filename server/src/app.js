import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser"
// import { testingApi } from "./controllers/user.controller.js"
// import userRouter from "./routes/user.routes.js"
import supplierRouter from "./routes/supplier.routes.js"
import superRouter from "./routes/superuser.routes.js"
import clientRouter from "./routes/client.routes.js"

const app = express()

app.use(cors({
    // origin: process.env.CORS_ORIGIN,
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.json({
    limit: '16kb'
}))
app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}))
app.use(express.static("public"))
app.use(cookieParser())

//routes declaration
// app.use("/api/v1/user", userRouter);
app.use("/api/v1/supplier", supplierRouter);
app.use("/api/v1/client", clientRouter);
app.use("/api/v1/superuser", superRouter);


export default app