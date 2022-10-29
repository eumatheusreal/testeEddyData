import { DataTypes, Sequelize } from "sequelize";
import Usuario from "../models";

export default class Database{

    constructor(){
        this.sequelize = null;
        this.host = process.env.BD_HOST;
        this.port = process.env.BD_PORT;
        this.user = process.env.BD_USER;
        this.password = process.env.BD_PASSWORD;
        this.database = process.env.BD_DATABASE;
        this.model = null;
        this.connection = null;
        this.usuario = new Usuario();
    }

    connect(){
        this.sequelize = new Sequelize(this.database, this.user, this.password, {
            host: this.host,
            dialect: "mysql"
        });
    }

    async authenticate(){
        this.connect();
        try {
            await this.sequelize.authenticate();
        } catch (error) {
            console.log("An error ocurred when authenticating to database.");
            console.log(error);
        }
    }

    async setModel(){

        try {
            this.model = this.sequelize.define("Cliente", {
                nome: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                cpf: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                estadocivil: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                pai: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                mae: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                conjuge: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                rg: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                salario: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                especie: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                titulodeeleitor: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                sexo: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                celular: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                cep: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                endereco: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                complemento: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                numero: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                bairro: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                cidade: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                datadenascimento: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
            });
        } catch (error) {
            console.log("Error when creating the database model.");
            console.log(error);
        }
    }

    async sync(){
        try {
            this.model.sync();
        } catch (error) {
            console.log("Error creating the database.");
            console.log(error);
        }
    }

    async close(){
        await this.sequelize.close();
    }

    async save(usuario){
        try {
            this.usuario = usuario;
            return await this.model.create(this.usuario);
        } catch (error) {
            console.log("An error ocurred when trying to save the user.");
            console.log(error);
            return null;
        }
    }

    async getInstance(usuario){
        try {
            return await this.model.findOne({where: {
                nome: usuario.nome,
                cpf: usuario.cpf,
                rg: usuario.rg
            }});
        } catch (error) {
            console.log("An error ocurred getting the user");
            console.log(error);
            return null;
        }
    }

}