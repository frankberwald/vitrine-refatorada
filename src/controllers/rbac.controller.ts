import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Role } from "../entity/Role";
import { Permission } from "../entity/Permission";

export class RbacController{
  private userRepository
  private roleRepository
  private permissionRepository

  constructor (){
    this.userRepository = AppDataSource.getRepository(User)
    this.roleRepository = AppDataSource.getRepository(Role)
    this.permissionRepository = AppDataSource.getRepository(Permission)
  }

  listPermissions = async (req: Request, res: Response) => {
    try {
      const permissions = await this.permissionRepository.find()
      res.status(200).json(permissions)
    } catch (ex) {
      res.status(500).json("Erro ao processar solicitação")
    }
  }

  createPermission = async (req: Request, res: Response) => {
    try {
      const permissionBody = req.body as Permission
      if (!permissionBody.description) {
        res.status(400).json("A descrição é obrigatória")
        return
      }
      this.permissionRepository.save(permissionBody)
      res.status(200).json(permissionBody)
    } catch (ex) {
      res.status(500).json("Erro ao processar solicitação")
    }
  }

  listRoles = async (req: Request, res: Response) => {
    try {
      const roles = await this.roleRepository.find()
      res.status(200).json(roles)
    } catch (ex) {
      res.status(500).json("Erro ao processar solicitação")
    }
  }

  createRole = async (req: Request, res: Response) => {
    try {
      const roleBody = req.body as Role
      if (!roleBody.description) {
        res.status(400).json("A descrição é obrigatória")
        return
      }
      this.roleRepository.save(roleBody)
      res.status(200).json(roleBody)
    } catch (ex) {
      res.status(500).json("Erro ao processar solicitação")
    }
  }

  listPermissionsByRole = async (req: Request, res: Response) => {
    try {
      const roles = await this.roleRepository.find({
        relations: ["permissions"]
      })
      res.status(200).json(roles)
    } catch (ex) {
      res.status(500).json("Erro ao processar solicitação")
    }
  }

  addPermissionToRole = async (req: Request, res: Response) => {
    try {
      const { permissionId, roleId } = req.body as {
        permissionId: number,
        roleId: number
      }
      if (!permissionId || !roleId) {
        res.status(400).json("As id's de permissão e role são obrigatórias!")
        return
      }
      const permission = await this.permissionRepository.findOne({
        where: { id: permissionId },
        relations: ["roles"]
      })
      if (!permission) {
        res.status(400).json("Permissão inválida")
        return
      }
      const role = await this.roleRepository.findOne({
        where: { id: roleId },
        relations: ["permissions"]
      })
      if (!role) {
        res.status(400).json("Role inválida")
        return
      }
      if (role.permissions.some((perm) => perm.id === permissionId)) {
        res.status(400).json("Permissão ja adicionada a esta role")
        return
      }
      role.permissions.push(permission)
      await this.roleRepository.save(role)
      res.status(200).json("Permissão adicionada a role!")
      return
    } catch (ex) {
      res.status(500).json("Erro ao processar solicitação")
    }
  }

  addRoleToUser = async (req: Request, res: Response) => {
    try {
      const { roleId, userId} = req.body as {
        roleId: number,
        userId: number
      }
      if(!roleId || !userId){
        res.status(400).json("As id's de usuário e role são obrigatórias!")
        return
      }
      const role = await this.roleRepository.findOne({
        where: { id: roleId },
        relations: ["users"]
      })
      if(!role){
        res.status(400).json("Role inválida")
        return
      }
      const user = await this.userRepository.findOne({
        where: { id: userId},
        relations: ["roles"]
      })
      if(!user){
        res.status(400).json("Usuário inválido")
        return
      }
      if(user.roles.some((role) => role.id === roleId)){
        res.status(400).json("Role já atribuída a esse usuario")
        return
      }
      user.roles.push(role)
      await this.userRepository.save(user)
    } catch (ex) {
      res.status(500).json("Erro ao processar solicitação")
    }
  }

}

export default RbacController
