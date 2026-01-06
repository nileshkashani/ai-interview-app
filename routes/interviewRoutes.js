import e from "express";
import {InterviewModel} from '../models/interviewModel.js'
import { generateQuestions } from "./questionRoute.js";
const router = e.Router();

router.post('/add', async (req, resp) => {
    try{
        const response = await InterviewModel.create({
            userId: req.body.userId,
            topic: req.body.topic,
            experience: req.body.experience,
            skills: req.body.skills,
            isCompleted: false
        })
        const questionResp = await generateQuestions(req.body.topic, req.body.experience, req.body.skills, response._id);
        resp.json({success: true, data: response, message: "questions saved to database"});
    }
    catch(e){
        console.error(e);
        resp.json({success: false, message: e});
    }
})

router.get('/getAll/:userId', async (req, resp) => {
    try{
        const response = await InterviewModel.find({userId: req.params.userId});
        console.log(response);
        resp.json({success: true, data: response});
    }
    catch(e){
        console.error(e);
        resp.json({success :false, message: e});
    }
})
export default router;