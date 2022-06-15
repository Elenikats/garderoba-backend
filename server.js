import express from "express"
import cors from "cors"
import { connect } from "./libs/database.js"
import uploadRouter from './routes/uploadRouter.js'
import loginRouter from './routes/loginRouter.js'
import signupRouter from './routes/signupRouter.js'
import clothesRouter from './routes/clothesRouter.js'
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import dotenv from "dotenv"
import bodyParser from "body-parser"



const app = express()
console.log(process.env)

// Middleware
app.use(cors())
app.use(express.json())
dotenv.config()
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

await connect()
// app.set('trust proxy', true)

app.use((req,res,next)=>{console.log(req.url);next()})
// Routes

app.use("/login", loginRouter)
app.use("/signup", signupRouter)
app.use("/cloth", clothesRouter)
app.use("/upload", uploadRouter)


// global error handler middleware
app.use(globalErrorHandler)

// listening
const port = process.env.PORT || 3099
app.listen(port,"0.0.0.0", () => {
  console.log(`Let the adventures in Backend begin at port:${port}!!🙈`)
})
