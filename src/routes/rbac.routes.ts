import { Router } from "express"
import RbacController from "../controllers/rbac.controller"

const rbacRouter = Router()

const rbacController = new RbacController()

rbacRouter.get("/listPermissions", rbacController. listPermissions)

rbacRouter.post("/createPermission", rbacController.createPermission )

rbacRouter.get("/listRoles", rbacController.listRoles )

rbacRouter.post("/createRole", rbacController.createRole)

rbacRouter.get("/listPermissionsByRole", rbacController.listPermissionsByRole)

rbacRouter.post("/addPermissionToRole", rbacController.addPermissionToRole)

rbacRouter.post("/addRoleToUser", rbacController.addRoleToUser )

export default rbacRouter