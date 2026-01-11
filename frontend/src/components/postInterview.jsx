import axios from "axios"
import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import ScoreCircle from "./ui/scoreCircle"

const PostInterview = () => {
    const { state } = useLocation()
    const interviewId = state?.interviewId

    const [result, setResult] = useState(null)

    useEffect(() => {
        const fetchResult = async () => {
            try {
                const resp = await axios.get(
                    `http://localhost:3000/results/getByInterviewId/${interviewId}`
                )
                setResult(resp.data.data)
            } catch (e) {
                console.error(e)
            }
        }

        if (interviewId) fetchResult()
    }, [interviewId])

    if (!result) {
        return (
            <div className="h-screen flex items-center justify-center bg-zinc-100 text-zinc-500">
                Loading results...
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-zinc-100 p-10">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 space-y-6">

                <div className="flex justify-center mb-6">
                    <ScoreCircle score={result.score} size={160} />
                </div>


                <div className="flex flex-col gap-8">

                    <div className="flex-1">
                        <h3 className="text-lg font-medium text-zinc-800 mb-2">Overall Assessment</h3>
                        <p className="text-zinc-600 leading-relaxed">
                            {result.overallAssessment}
                        </p>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-lg font-medium text-zinc-800 mb-2">Improvements</h3>
                        <ul className="list-disc pl-5 text-zinc-600 space-y-1">
                            {result.improvements?.map((s, i) => (
                                <li key={i}>{s}</li>
                            ))}
                        </ul>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default PostInterview
