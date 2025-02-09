import "reflect-metadata";
import express from "express"
import {AppDataSource} from "./data-source"
import cors from "cors"

import userRouter from "./routes/user.routes";
import medicineRouter from "./routes/medicamentos.routes";
import rbacRouter from "./routes/rbac.routes";


const app = express()

app.use(cors())
app.use(express.json())

app.use("/user", userRouter)
app.use("/medicines", medicineRouter)
app.use("/rbac", rbacRouter)

AppDataSource.initialize().then(() => {
    app.listen(3000, () => {
        console.log("O servidor está rodando em http://localhost:3000")
    })
}).catch(error => console.log(error))
