import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv"

dotenv.config()


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: "Audi3354.",
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: ["src/entity/*.ts"],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => {
        console.log("📌 Banco de Dados Conectado!");
    })
    .catch((error) => {
        console.error("❌ Erro ao conectar ao banco:", error);
    });