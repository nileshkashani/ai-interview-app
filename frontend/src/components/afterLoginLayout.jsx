import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  LayoutGrid,
  HelpCircle,
  Video,
  User,
  LogOut,
  Zap
} from "lucide-react"
import { useState } from "react"
import { AiOutlineRobot } from "react-icons/ai"
import AiInterviewForm from "./aiInterviewForm"
import { logoutUser } from "@/services/authService"
import InterviewCards from "./interviewCards"
import InterviewQuizForm from "./interviewQuizForm"
import QuizCards from "./quizCards"

const navItems = [
  { label: "Overview", icon: LayoutGrid },
  { label: "Mock Interview", icon: AiOutlineRobot },
  { label: "Ai Generated Quiz", icon: HelpCircle },
]

const AfterLoginLayout = () => {
  const [activeTab, setActiveTab] = useState("Mock Interview");


  const handleLogout = async () => {
    await logoutUser();
  }
  return (
    <div className="flex max-h-screen max-w-screen overflow-hidden">
      <aside className="h-screen w-64 bg-zinc-900 text-zinc-100 flex flex-col">
        <div className="flex items-center gap-2 px-6 py-5 text-lg font-semibold">
          <div className="h-8 w-8 rounded-lg bg-red-500 flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          Interview.io
        </div>

        <div className="px-3">
          {navItems.map(item => (
            <Button
              key={item.label}
              variant="ghost"
              className={`w-full justify-start gap-3 px-4 py-6 text-sm ${activeTab === item.label
                ? "bg-red-500 text-white hover:bg-red-500"
                : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                }`}
              onClick={() => setActiveTab(item.label)}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </div>

        <div className="mt-auto px-4 pb-6">
          <Separator className="mb-4 bg-zinc-800" />
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 text-zinc-400 hover:text-white hover:bg-zinc-800"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        {activeTab === "Mock Interview" && (
          <div className="flex flex-col lg:flex-row w-full h-full">

            <div className="flex-1 p-2">
              <AiInterviewForm />
            </div>

            <div className=" lg:w-[420px] p-2">
              <InterviewCards />
            </div>

          </div>
        )}
        {activeTab === "Ai Generated Quiz" && (
          <div className="flex flex-col lg:flex-row w-full h-full">
            <div className="flex-1 p-2">
              <InterviewQuizForm />
            </div>
            <div className=" lg:w-[420px] p-2">
              <QuizCards />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default AfterLoginLayout
