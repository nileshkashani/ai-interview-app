import express from 'express'
import { upload } from '../middlewares/upload.js'
import ResumeModel from '../models/resumeModel.js'
import ocrSpacePkg from 'ocr-space-api-wrapper';
import { GoogleGenAI } from '@google/genai';

const { ocrSpace } = ocrSpacePkg;
const router = express.Router()


const extractText = async (s3Url) => {
  const result = await ocrSpace(s3Url, {
    apiKey: process.env.OCR_API_KEY,
    language: 'eng'
  });

  return result.ParsedResults[0].ParsedText;
}

const getPrompt = async (file) => {
  return `You are a senior technical recruiter and career coach.

Your task is to evaluate the following resume text and produce a professional hiring assessment.

Scoring Rules:
- Score the resume from 0 to 100 based on employability, clarity, structure, technical depth, and market alignment.
- Be strict and realistic. Do not inflate the score.

Output Requirements (CRITICAL):
- The output must be a single valid JSON object.
- Do NOT include markdown.
- Do NOT include explanations outside JSON.
- The JSON must be directly parsable using JSON.parse() with no modifications.

The JSON must contain exactly these fields:

{
  "score": number (0–100),
  "improvements": string[],
  "recruiterFeedback": string
}

Guidelines:
- Base all conclusions only on the provided resume.
- Do not invent qualifications.
- Focus on real hiring standards for modern tech roles.
- Be concise, specific, and actionable.

Here is the resume content:
${await extractText(file.location)}
`
}
export const analyseResume = async (file) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    })
    const prompt = await getPrompt(file);
    const geminiResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });
    return geminiResponse;
  }
  catch (e) {
    console.log(e);
    return { message: e }
  }
}


router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    const file = req.file
    const geminiResp = await analyseResume(file);
    const modifiedResp = JSON.parse(geminiResp.candidates[0].content.parts[0].text);
    console.log(modifiedResp);
    const record = await ResumeModel.create({
      userId: req.body.userId,
      fileUrl: file.location,
      fileName: file.originalname,
      fileType: file.mimetype,
      fileSize: file.size,
      improvements: modifiedResp.improvements,
      score: modifiedResp.score,
      feedback: modifiedResp.recruiterFeedback
    })

    res.json({
      success: true,
      resume: record
    })
  } catch (e) {
    console.log(e.message)
    res.status(500).json({
      success: false,
      message: e.message
    })
  }
})

export default router
