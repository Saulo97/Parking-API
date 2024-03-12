import { Sequelize } from "sequelize";
const {NODE_ENV, NAME_DB_PG_TEST, NAME_DB_PG} = process.env
const nameDB = NODE_ENV === 'test'? NAME_DB_PG_TEST! : NAME_DB_PG! 
const userDB = process.env.USER_DB_PG || "postgres"
const passDB = process.env.PASS_DB_PG || "123456"
const hostDB = process.env.HOST_DB_PG || "localhost"
export const sequelizeConnection = new Sequelize( nameDB, userDB, passDB,{
    host: hostDB,
    dialect: 'postgres',
})