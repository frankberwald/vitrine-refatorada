import {Router } from "express"
import UserController from "../controllers/user.controller"


const userRouter = Router()
const userController = new UserController()

userRouter.get("/", userController.userGetAll)

userRouter.post("/", userController.userCreate)

export default userRouter