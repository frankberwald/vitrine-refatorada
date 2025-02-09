import { AppDataSource } from "../data-source"
import { User } from "../entity/User"
import { Request, Response } from "express"
import bcrypt from "bcrypt"
import dotenv from "dotenv"

dotenv.config()


class UserController {
  private userRepository;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User)
  }

  userGetAll = async (req: Request, res: Response) => {
    try {
      const listUser = await this.userRepository.find()
      res.status(200).json(listUser)
    } catch (ex) {
      res.status(500).json("Erro Interno do servidor")
    }
  }

  userCreate = async (req: Request, res: Response) => {
    try {
      const userBody = req.body
      if (!userBody || !userBody.email || !userBody.name || !userBody.password) {
        res.status(400).json("Preencha todos os campos")
        return
      }
      const saltRounds = Number(process.env.SALT_BCYPT || "10")
      const salt = await bcrypt.genSalt(saltRounds)
      const senhaCriptografada = await bcrypt.hash(userBody.password, salt)

      userBody.senhaCriptografada
      await this.userRepository.save(userBody)
      res.status(201).json(userBody)
      return
    } catch (ex) {
      res.status(500).json("Erro Interno do servidor")
    }
  }


}


export default UserController