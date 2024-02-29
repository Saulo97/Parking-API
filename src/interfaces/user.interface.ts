import { Optional } from "sequelize";

export enum Roles {
    admin= "admin",
    employee = "employee",
    client = "client"
}

export interface UserInterface {
    id: number,
    name: string,
    email: string,
    password: string,
    rol: Roles
}

export interface UserInput extends Optional<UserInterface, 'id'> {}
export interface UserOutput extends Required<UserInterface>{}