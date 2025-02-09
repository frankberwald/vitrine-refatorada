import { Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Medicamento } from "../entity/Medicamento"

export class MedicineController {
  private medicineRepository

  constructor() {
    this.medicineRepository = AppDataSource.getRepository(Medicamento)
  }

  medicineGetAll = async (req: Request, res: Response) => {
    try {
      const listMedicine = await this.medicineRepository.find()
      res.status(200).json(listMedicine)
    } catch (ex) {
      res.status(500).json("Erro Interno do servidor")
    }
  }

  medicineGetById = async (req: Request, res: Response) => {
    try {
      const medResult = await this.medicineRepository.findOne({
        where: {
          id: Number(req.params.id)
        }
      })
      if (!medResult) {
        res.status(400).json("Medicamento não encontrado")
        return
      }
      res.status(200).json(medResult)
    } catch (ex) {
      res.status(500).json("Erro Interno do servidor")
    }
  }

  medicineCreate = async (req: Request, res: Response) => {
    try {
      const medicineBody = req.body
      if (!medicineBody || !medicineBody.name || !!medicineBody.descrição || !medicineBody.quantidade || !medicineBody.userId) {
        res.status(400).json("Preencha todos os campos")
        return
      }
      await medicineBody.save(medicineBody)
    } catch (ex) {
      res.status(500).json("Erro Interno do servidor")
    }
  }

  medicineUpdate = async (req: Request, res: Response) => {
    try {

      const id = Number(req.params.id)
      const userId = Number(req.headers.userId)

      if (!userId) {
        res.status(400).json("Informe o id do usuário no header")
        return
      }

      const medBody = req.body as Medicamento

      const medicine = await this.medicineRepository.findOne({
        where: {
          id: id,
          userId: userId
        }
      })
      if (!medicine) {
        res.status(200).json("Nenhum registro encontrado")
        return
      }

      Object.assign(medicine, medBody)
    } catch (ex) {
      res.status(500).json("Erro Interno do servidor")
    }
  }

  medicineDelete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const userId = Number(req.params.userId)

      if (!userId) {
        res.status(400).json("Informe o id do usuário no header")
        return
      }
      const medicine = await this.medicineRepository.findOne({
        where: {
          id: id,
          userId: userId
        }
      })
      if (!medicine) {
        res.status(200).json("Nenhum registro encontrado")
        return
      }
      await this.medicineRepository.remove(medicine)
      res.status(200).json("Medicamento removido com sucesso!")

    } catch (ex) {
      res.status(500).json("Não foi possível executar a solicitação!")
    }
  }
}

export default MedicineController