import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import questionRoute from './routes/questionRoute.js'
import dotenv from 'dotenv'
// import { authenticate } from "./middleware/auth.js"

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}))
app.use('/questions', questionRoute)

app.get('/', (req, resp) => {
    resp.json("hello world");
})


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("database connected"))
.catch(err => console.log(err))


app.listen(3000);