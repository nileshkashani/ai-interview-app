import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const Quiz = () => {
    const { state } = useLocation()
    const quizId = state?.quizId

    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState({})
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [score, setScore] = useState(null)

    useEffect(() => {
        if (!quizId) return

        const loadQuestions = async () => {
            const res = await axios.get(`http://localhost:3000/quiz/questions/getAll/${quizId}`)
            setQuestions(res.data.data)
        }

        loadQuestions()
    }, [quizId])

    const handleChange = (qIndex, option) => {
        setAnswers(prev => ({ ...prev, [qIndex]: option }))
    }

    const handleSubmit = async () => {
        const payload = {
            answers: questions.map((q, index) => ({
                questionId: q._id,
                quizId,
                answer: answers[index] || ""
            }))
        }

        const res = await axios.post("http://localhost:3000/quiz/answers/add", payload)
        console.log(res)
        setScore(res.data.score)
        setIsSubmitted(true)

        const resp = await axios.put(`http://localhost:3000/quiz/update/${quizId}`)
        console.log(resp)
    }

    if (isSubmitted) {
        return (
            <div className="max-w-xl mx-auto p-6 text-center space-y-4">
                <h2 className="text-xl font-bold">Quiz Completed</h2>
                <p>Your Score: <span className="font-semibold">{score}/{questions.length}</span></p>
            </div>
        )
    }

    return (
        <div className="flex flex-col lg:flex-row w-full h-full bg-zinc-50 p-6 gap-6">

            <div className="flex-1 bg-white rounded-xl shadow-sm p-8 space-y-8">
                <h1 className="text-2xl font-bold text-red-500">AI Generated Quiz</h1>

                {questions.map((q, qIndex) => (
                    <div key={q._id} className="border rounded-xl p-5 space-y-4">
                        <p className="font-medium text-zinc-800">
                            {qIndex + 1}. {q.text.replace("```c", "").replace("```", "")} 
                        </p>

                        <div className="space-y-2">
                            {q.options.map((option, oIndex) => (
                                <label
                                    key={oIndex}
                                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition
                  ${answers[qIndex] === option ? "border-red-500 bg-red-50" : "hover:bg-zinc-50"}`}
                                >
                                    <input
                                        type="radio"
                                        name={`q-${qIndex}`}
                                        checked={answers[qIndex] === option}
                                        onChange={() => handleChange(qIndex, option)}
                                        className="accent-red-500"
                                    />
                                    <span className="text-sm text-zinc-700">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}

                <button
                    onClick={handleSubmit}
                    className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
                >
                    Submit Quiz
                </button>
            </div>

            <div className="w-full lg:w-[340px] bg-white rounded-xl shadow-sm p-6 space-y-4">
                <h2 className="font-semibold text-lg text-zinc-800">Progress</h2>
                <p className="text-sm text-zinc-500">
                    Answered {Object.keys(answers).length} / {questions.length}
                </p>

                <div className="grid grid-cols-5 gap-2">
                    {questions.map((_, i) => (
                        <div
                            key={i}
                            className={`h-10 rounded-lg flex items-center justify-center text-sm font-semibold
              ${answers[i] ? "bg-red-500 text-white" : "bg-zinc-100 text-zinc-400"}`}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )

}

export default Quiz
