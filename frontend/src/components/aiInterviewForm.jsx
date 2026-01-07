import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import axios from "axios"
import { TabStore } from "@/store/tabStore"
import { useNavigate } from "react-router-dom"

const AiInterviewForm = () => {
    const [interviewTopic, setInterviewTopic] = useState("")
    const [experience, setExperience] = useState("")
    const [skills, setSkills] = useState("")
    const setTrigger = TabStore(state => state.setTrigger)

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleClick = async () => {
        if (isSubmitting) return
        setIsSubmitting(true)
        await handleSubmit()
    }

    const navigate = useNavigate()

    const handleSubmit = async () => {
        const resp = await axios.post('http://localhost:3000/interview/add', { userId: localStorage.getItem("userUid"), topic: interviewTopic, experience: experience, skills: skills });
        setTrigger();
        console.log(resp);
        navigate('/ai-interview', { state: { interviewId: resp.data.data._id } })
    }
    return (
        <div className="bg-white  h-full px-6 py-10 pt-2 overflow-hidden">
            <Card className="w-full max-w-5xl h-full border-zinc-300">
                <CardHeader className="pb-8">
                    <CardTitle className="text-2xl text-red-500 font-bold">
                        AI Interview Setup
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-10">
                    <div className="flex flex-col gap-10">
                        <div className="space-y-3 w-full">
                            <Label className="text-black text-base overflow-clip">
                                Interview Topic / Position
                            </Label>
                            <Input
                                onChange={(e) => setInterviewTopic(e.target.value)}
                                placeholder="Frontend Developer, Data Scientist, etc."
                                className="h-14 text-base border-zinc-300"
                            />
                        </div>

                        <div className="space-y-3 w-full">
                            <Label className="text-black text-base">
                                Experience Level (in years)
                            </Label>
                            <Input
                                onChange={(e) => setExperience(e.target.value)}
                                type="number"
                                placeholder="1 - 10"
                                className="h-14 text-base border-zinc-300"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label className="text-black text-base">
                                Primary Skills / Technologies
                            </Label>
                            <Input
                                onChange={(e) => setSkills(e.target.value)}
                                placeholder="React, Node.js, SQL, etc."
                                className="h-14 text-base border-zinc-300"
                            />
                        </div>
                    </div>

                    <Button
                        onClick={handleClick}
                        disabled={isSubmitting}
                        className={`w-full h-14 text-base bg-red-500 hover:bg-red-600 ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`}
                    >
                        {isSubmitting ? "Generating questions..." : "Start AI Interview"}
                    </Button>

                </CardContent>
            </Card>
        </div>
    )
}

export default AiInterviewForm
