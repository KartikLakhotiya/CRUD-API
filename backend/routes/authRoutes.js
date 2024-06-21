import express from "express";
import { deleteUser, editUser, fetchAll, getUser, signUp, updateUser } from "../controller/userController.js";

const router = express.Router();

router.post('/signup', signUp)
router.post('/getuser', getUser)
router.post('/update', updateUser)
router.post('/fetchall', fetchAll)
router.put('/edit/:id', editUser)
router.delete('/delete/:id', deleteUser)

export default router