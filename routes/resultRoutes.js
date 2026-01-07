import resultModel from "../models/resultModel.js"
import express from "express"

const router = express.Router()

export const addResult = async (interviewId, evaluation) => {
  if (!interviewId) throw new Error("Missing interviewId")

  const payload = {
    interviewId,
    score: evaluation.score,
    feedback: evaluation.feedback,
    strengths: evaluation.strengths,
    improvements: evaluation.improvements,
    overallAssessment: evaluation.overallAssessment
  }

  return await resultModel.create(payload)
}

router.get("/getByInterviewId/:interviewId", async (req, res) => {
  try {
    const result = await resultModel.findOne({ interviewId: req.params.interviewId })

    if (!result) {
      return res.status(404).json({ success: false, message: "Result not found" })
    }

    res.json({ success: true, data: result })

  } catch (e) {
    console.error(e)
    res.status(500).json({ success: false, message: e.message })
  }
})

export default router
