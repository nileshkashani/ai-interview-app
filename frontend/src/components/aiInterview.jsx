import { useEffect, useRef, useState } from "react"
import Vapi from "@vapi-ai/web"
import { Button } from "./ui/button"
import axios from "axios"
const vapi = new Vapi(import.meta.env.VITE_VAPI_PUBLIC_KEY)

export default function AiInterview() {
    const [questions, setQuestions] = useState([])
    const [current, setCurrent] = useState(0)
    const [answers, setAnswers] = useState([])


    useEffect(() => {
        const handler = (msg) => {
            if (
                msg.type === "transcript" &&
                msg.transcriptType === "final" &&
                msg.role === "user"
            ) {
                const answer = msg.transcript
                setAnswers(prev => [...prev, answer])
            }
        }

        vapi.on("message", handler)
        return () => vapi.off("message", handler)
    }, [])


    let parsedQuestions;

    const parsedQuestionsRef = useRef([])
    // useEffect(() => {
    //     if (questions.length) {
    //         parsedQuestionsRef.current = questions.map(q => (q.text))
    //     }
    //     if (parsedQuestionsRef.current.length) {
    //         parsedQuestions = parsedQuestionsRef.current;
    //         startInterview()
    //     }
    // }, [questions])  //uncomment to start interview

    useEffect(() => {
        const func = async () => {
            await axios.get("http://localhost:3000/questions/1").then(res => {
                setQuestions(res.data.data)
            })
        }
        func();
    }, [])


    const startInterview = async () => {
        const assistantOptions = {
            name: "AI Recruiter",
            firstMessage: "Hi John doe, how are you? Ready for your interview on SDE?",

            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },

            voice: {
                provider: "11labs",
                voiceId: "burt",
            },

            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.

Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ${"SDE"} interview. Let's get started with a few questions!"

Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below are the questions which you need to ask one by one to the candidate:
Questions: ${parsedQuestions} 

If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"

Provide brief, encouraging feedback after each answer. Example:
"Nice! That's a solid answer."
"Hmm, not quite! Want to try again?"

Keep the conversation natural and engaging — use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"

After 5–7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"

End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"

Key Guidelines:
• Be friendly, engaging, and witty
• Keep responses short and natural, like a real conversation
• Adapt based on the candidate’s confidence level
• Take questions from interview from provided questions only
• Dont invent your own questions (most imp guideline) again, never ever invent your own questions just choose random question from list of questions provided. location for questions is "Questions: ${parsedQuestions}" this.

`,
                    },
                ],
            },
        }
        try {
            vapi.start(assistantOptions)
        }
        catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="flex h-screen items-center justify-center">
            <Button onClick={startInterview}>Start Interview</Button>
            <pre className="absolute bottom-4 left-4 bg-black text-green-400 p-3 rounded max-w-md">
                {JSON.stringify(answers, null, 2)}
            </pre>
        </div>
    )
}
