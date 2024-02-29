import { Sequelize } from "sequelize";
const nameDB = process.env.NAME_DB_PG || "MyDatabase"
const userDB = process.env.USER_DB_PG || "postgres"
const passDB = process.env.PASS_DB_PG || "123456"
const hostDB = process.env.HOST_DB_PG || "localhost"
export const sequelize = new Sequelize( nameDB, userDB, passDB,{
    host: hostDB,
    dialect: 'postgres'
})