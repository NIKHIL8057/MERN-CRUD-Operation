import express from "express"
import { createUser, getUser, getUserById, userDelete, userUpdate } from "../controller/user.controller.js";

const router = express.Router();

router.post("/create",createUser);
router.get('/getUsers',getUser);
router.get('/getbyid/:id',getUserById)
router.put('/update/:id',userUpdate)
router.delete('/delete/:id',userDelete)

export default router;