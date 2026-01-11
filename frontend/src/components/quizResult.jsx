import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ScoreCircle from './ui/scoreCircle'

const QuizResult = () => {
    const { state } = useLocation()
    const score = Number(state?.score ?? 0)
    const noOfQuestions = Number(state?.noOfQuestions ?? 0)

    useEffect(() => {
        console.log(state)
    }, [state])
    return (
        <div className="flex flex-col items-center h-screen overflow-auto justify-center mb-6">
            <div className='font-bold text-xl'>
                Your Score
            </div>
            <ScoreCircle score={Math.round(score / noOfQuestions * 100)} size={160} />
            <div>
                you answered {score} questions correctly.
            </div>
        </div>

    )
}

export default QuizResult