import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import { Request, Response, Router } from "express"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config()

const userRepository = AppDataSource.getRepository(User)

const userRouter = Router()

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const listUser = await userRepository.find()
    res.status(200).json(listUser)
  } catch (ex) {
    res.status(500).send("Ocorreu um erro ao executar a solicitação")
  }
})