import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
    interviewId: {type: String, required: true},
    text: { type: String, required: true },
    qNo: {type: String, required: true}
})
export const questionModel = mongoose.model("questions", questionSchema);