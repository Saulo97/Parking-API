import { DataTypes, Model } from "sequelize";
import { Roles, UserInput, UserInterface } from '../interfaces/user.interface';
import { sequelizeConnection } from '../config/postgres.config';
import { Booking } from "./booking";

export class User extends Model<UserInterface,UserInput> implements UserInterface {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public rol!: Roles;
    public isActive!: boolean;
}

User.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true   
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rol:{
        type: DataTypes.ENUM('admin','employee','client'),
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
},{
    timestamps: false,
    sequelize: sequelizeConnection,
    tableName: 'users'
})

User.hasMany(Booking,{
    foreignKey:'userId',
    sourceKey: 'id'
})

Booking.belongsTo(User,{
    foreignKey: 'userId',
    targetKey: 'id'
})