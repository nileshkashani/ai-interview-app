import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const InterviewCards = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const func = async () => {
      try {
        const resp = await axios.get(`http://localhost:3000/interview/getAll/${localStorage.getItem("userUid")}`)
        setData(resp.data.data)
      }
      catch (e) {
        console.error(e);
      }
    }
    func();
  }, [])
  return (
    <div className="bg-white max-h-screen px-6 py-10 pt-2">

      <Card className="pt-2 h-full py-7">
        <CardHeader className="pb-4">
          <CardTitle className={'text-red-500 font-bold text-2xl'}>Incomplete Interviews</CardTitle>
          <CardDescription>
            Interviews you have not completed yet
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {data.map(item => (
            <div
              key={item._id}
              className="flex items-center justify-between border rounded-xl p-4 hover:shadow-sm transition"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-red-50 text-red-500 font-semibold text-lg">
                  {item.topic?.[0]?.toUpperCase()}
                </div>

                <div>
                  <p className="font-medium capitalize">{item.topic}</p>
                  <p className="text-sm text-muted-foreground">
                    Experience: {item.experience} year{item.experience > 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Skills: {item.skills.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default InterviewCards