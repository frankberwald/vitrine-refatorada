import {Router } from "express";
import MedicineController from "../controllers/medicine.controller";

const medicineRouter = Router()

const medicineController = new MedicineController()

medicineRouter.get("/", medicineController.medicineGetAll)

medicineRouter.get("/:id", medicineController.medicineGetById)

medicineRouter.post("/", medicineController.medicineCreate)

medicineRouter.put("/:id", medicineController.medicineUpdate)

medicineRouter.delete("/:id", medicineController.medicineDelete)

export default medicineRouter