import { Request, Response, Router } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

import { AppDataSource } from "../data-source"
import { User } from "../entity/User";
import UserLogin from "../classes/UserLogin";
import PayloadJwt from "../classes/PayLoadJwt";

const userRepository = AppDataSource.getRepository(User);

const authRouter = Router();

authRouter.post("/", async (req:Request, res:Response)=> {
  try{
    const userLogin = req.body as UserLogin
    const userEntity = await userRepository.findOne({
      where: {
        email: userLogin.email,
      },
      relations: ["roles", "roles.permissions"],
      select:  {
        roles: {
          id: true,
          description: true,
            permissions: {
              id: true,
              description: true
            }
        }
      }
    })

    if(!userEntity){
      res.status(400).json("Credenciais inválidas")
      return
    }

    const isValid = await bcrypt.compare(userLogin.password, userEntity.password)

    if(!isValid){
      res.status(400).json("Credenciais inválidas")
      return
    }

    const secretKey = process.env.JWT_SECRET ?? ""

    const payload = {
      email: userEntity.email,
      name: userEntity.name,
      userId: userEntity.id,
      roles: userEntity.roles
    } as PayloadJwt

    const token = await jwt.sign(payload, secretKey, {expiresIn: '1h'})
    res.status(200).json({ token: token })
  } catch(ex){
    res.status(500).json("Não foi possível se conectar ao banco de dados")
    return
  }
})

export default authRouter