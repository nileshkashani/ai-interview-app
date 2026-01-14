import e from "express";
import { userModel } from "../models/userModel.js";
const router = e.Router()

router.post('/add', async (req, resp) => {
    try {
        const response = await userModel.insertOne({name: req.body.name, email: req.body.email, firebaseId: req.body.firebaseId});
        resp.json({success: true, data: response});
    } catch (e) {
        resp.json({success: false, Message: e.message});
    }
})
router.get('/get/:uid', async (req, resp) => {
    try {
        const response= await userModel.findOne({firebaseId: req.params.uid});
        // console.log(resp)
        if(response == null){
            return resp.status(404).json({success: false, message: "user not found"})
        }
        resp.json({success: true, data: response});
    } catch (e) {
        resp.json({success: false, message: e.message});
    }
})

export default router;