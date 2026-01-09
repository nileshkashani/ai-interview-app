import axios from 'axios'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useNavigate } from 'react-router-dom'



const InterviewQuizForm = () => {
    const [topic, setTopic] = useState("")
    const [noOfQuestions, setNoOfQuestions] = useState(10)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate()
    const handleClick = async () => {
        setIsSubmitting(true)
        const resp = await axios.post("http://localhost:3000/quiz/add", {topic: topic, noOfQuestions: noOfQuestions, userId: localStorage.getItem("userUid")});
        console.log(resp);
        if(resp.data.success){
            navigate('/quiz', {state: {quizId: resp.data.data._id}});
        }
    }
    return (
        <div className="bg-white  h-full px-6 py-10 pt-2 overflow-hidden">
            <Card className="w-full max-w-screen h-full border-zinc-300">
                <CardHeader className="pb-8">
                    <CardTitle className="text-2xl text-red-500 font-bold">
                        Quiz Setup
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-10">
                    <div className="flex flex-col gap-10">
                        <div className="space-y-3 w-full">
                            <Label className="text-black text-base overflow-clip">
                                Quiz Topic
                            </Label>
                            <Input
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="eg: Java Programing, Python Programing, etc"
                                className="h-14 text-base border-zinc-300"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="text-black text-base">
                                No of Questions
                            </Label>
                            <Input
                                onChange={(e) => setNoOfQuestions(e.target.value)}
                                placeholder="default: 10"
                                className="h-14 text-base border-zinc-300"
                            />
                        </div>
                    </div>

                    <Button
                        onClick={handleClick}
                        disabled={isSubmitting}
                        className={`w-full h-14 text-base bg-red-500 hover:bg-red-600 ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                        {isSubmitting ? "Generating questions..." : "Start Quiz"}
                    </Button>

                </CardContent>
            </Card>
        </div>
    )
}

export default InterviewQuizForm