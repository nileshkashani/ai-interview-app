import { GoogleGenAI } from '@google/genai'
import e from 'express'
import { questionModel } from '../models/questionModel.js'
import dotenv from 'dotenv'
dotenv.config()

const router = e.Router()


const getPrompt = (post, experience, skills) => `
You are an AI interview engine.

Your task is to generate exactly 9 high-quality technical interview questions for the role of ${post}, having ${experience}, and having ${skills}
You MUST follow these rules strictly:

1. The output MUST be a valid JSON array of 9 objects.
2. Each object MUST have the following exact fields:
   - "qNo": a number from 1 to 9
   - "text": a single interview question as a string
3. The output MUST contain only JSON. No explanations, no comments, no markdown, no extra text.
4. Do NOT wrap the output in code blocks.
5. The array MUST contain exactly 9 elements.

Required JSON format:

[
  { "qNo": 1, "text": "question here" },
  { "qNo": 2, "text": "question here" },
  ...
  { "qNo": 9, "text": "question here" }
]
`

export const generateQuestions = async (topic, experience, skills, interviewId) => {
    try {
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        })
        const prompt = getPrompt(topic, experience, skills);
        const geminiResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        
        const parsedResponse = JSON.parse(geminiResponse.candidates[0].content.parts[0].text);

        for (const r of parsedResponse) {
            questionModel.create({
                interviewId: interviewId,
                text: r.text,
                qNo: r.qNo,
                postOfInterview: topic
            })
        }
        
        return { 
            success: "true",
            message: "added to database successfully"
        }
    }
    catch (e) {
        console.log(e);
        return { message: e }
    }
}

router.get('/:interviewId/:qNo', async (req, resp) => {
    try {
        const response = await questionModel.findOne({qNo: req.params.qNo, interviewId: req.params.interviewId})
        // console.log(resp);
        resp.json({success: true, data: response})
    } catch (e) {
        console.log(e);
        resp.json({success: false, message: e})
    }
})
router.get('/:interviewId', async (req, resp) => {
    try {
        const response = await questionModel.find({interviewId: req.params.interviewId})
        // console.log(resp);
        resp.json({success: true, data: response})
    } catch (e) {
        console.log(e);
        resp.json({success: false, message: e})
    }
})

export default router 