import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import questionRoute from './routes/questionRoute.js'
import answerRoute from './routes/answerRoutes.js'
import dotenv from 'dotenv'
// import { authenticate } from "./middleware/auth.js"
import interviewRoute from './routes/interviewRoutes.js'
import resultRoute from './routes/resultRoutes.js'
import quizRoute from './routes/quizRoute.js'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
}))

//ai-interview
app.use('/questions', questionRoute)
app.use('/interview', interviewRoute);
app.use('/answers', answerRoute);
app.use('/results', resultRoute);

//ai-quiz

app.use('/quiz', quizRoute)
app.get('/', (req, resp) => {
    resp.json("hello world");
})


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("database connected"))
.catch(err => console.log(err))


app.listen(3000);