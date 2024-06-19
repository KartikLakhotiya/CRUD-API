import express from "express";
import { fetchAll, getUser, signUp, updateUser } from "../controller/userController.js";

const router = express.Router();

router.post('/signup', signUp)
router.post('/getuser', getUser)
router.post('/update', updateUser)
router.post('/fetchall', fetchAll)


export default router