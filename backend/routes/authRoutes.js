import express from "express";
import { deleteUser, editedUser, fetchAll, fetchUserById, getUser, signUp, updateUser } from "../controller/userController.js";

const router = express.Router();

router.post('/signup', signUp)
router.post('/getuser', getUser)
router.post('/update', updateUser)
router.post('/fetchall', fetchAll)
router.delete('/delete/:id', deleteUser)
router.post('/edit/editeduser/:id', editedUser)
router.get('/fetch/:id', fetchUserById)

export default router