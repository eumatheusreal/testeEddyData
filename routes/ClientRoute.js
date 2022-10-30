import Database from "../database/index";
import User from "../models/index";

export default class ClientRoute{

    constructor(app){
        this.app = app;
        this.database = new Database();
        this.connectDatabase();
        this.user = null;
    }

    init(){
        this.insert();
        this.update();
        this.delete();
    }

    async insert(){

        this.app.post("/client", async (req, res) => {

            let salary = 0;

            const {
                nome,
                cpf,
                estadocivil,
                pai,
                mae,
                conjuge,
                rg,
                salario,
                especie,
                titulodeeleitor,
                sexo,
                celular,
                cep,
                endereco,
                complemento,
                numero,
                bairro,
                email,
                cidade,
                datadenascimento
            } = req.body;


            if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")

            try {

                salary = parseFloat(salario);
                
                this.user = new User(
                    nome,
                    cpf,
                    estadocivil,
                    pai,
                    mae,
                    conjuge,
                    rg,
                    salary,
                    especie,
                    titulodeeleitor,
                    sexo,
                    celular,
                    cep,
                    endereco,
                    complemento,
                    numero,
                    bairro,
                    email,
                    cidade,
                    new Date(datadenascimento)
                );

                let savedUser = await this.database.save(this.user);
                return res.send(savedUser);
            } catch (error) {
                console.log("Error saving the user. Try again later.");
                console.log(error);
                return res.status(500).send("Cannot complete your request. Try again later.")
            }
        });
    }

    async update(){
        this.app.put("/client", async (req, res) => {

            let salary = 0;

            const {
                nome,
                cpf,
                estadocivil,
                pai,
                mae,
                conjuge,
                rg,
                salario,
                especie,
                titulodeeleitor,
                sexo,
                celular,
                cep,
                endereco,
                complemento,
                numero,
                bairro,
                email,
                cidade,
                datadenascimento
            } = req.body;

            
            
            
            if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")

            try {
                
                salary = parseFloat(salario);
                
                this.user = new User(
                    nome,
                    cpf,
                    estadocivil,
                    pai,
                    mae,
                    conjuge,
                    rg,
                    salary,
                    especie,
                    titulodeeleitor,
                    sexo,
                    celular,
                    cep,
                    endereco,
                    complemento,
                    numero,
                    bairro,
                    email,
                    cidade,
                    new Date(datadenascimento)
                );

                let updatedRows = await this.database.update(this.user);
                
                if (updatedRows.toString() === "0") return res.status(500).send("Cannot complete your request. Try again later.") 

                return res.send(updatedRows.toString() + " rows update successfully.");
                
            } catch (error) {
                console.log("Error saving the user. Try again later.");
                console.log(error);
                return res.status(500).send("Cannot complete your request. Try again later.")
            }
        });
    }

    async delete(){
        this.app.delete("/client", async (req, res) => {

            let salary = 0;

            const {
                nome,
                cpf,
                estadocivil,
                pai,
                mae,
                conjuge,
                rg,
                salario,
                especie,
                titulodeeleitor,
                sexo,
                celular,
                cep,
                endereco,
                complemento,
                numero,
                bairro,
                email,
                cidade,
                datadenascimento
            } = req.body;

            
            
            if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")

            try {

                salary = parseFloat(salario);
                
                this.user = new User(
                    nome,
                    cpf,
                    estadocivil,
                    pai,
                    mae,
                    conjuge,
                    rg,
                    salary,
                    especie,
                    titulodeeleitor,
                    sexo,
                    celular,
                    cep,
                    endereco,
                    complemento,
                    numero,
                    bairro,
                    email,
                    cidade,
                    new Date(datadenascimento)
                );

                let rowsAffected = await this.database.delete(this.user);
                if(rowsAffected == 0) res.status(500).send("Cannot complete your request. Try again.");
                return res.send(rowsAffected.toString() + " rows affected.")

            } catch (error) {
                console.log("An error ocurred trying to delete the user.");
                console.log(error);
                return res.status(500).send("Cannot complete your request. Try again.");
            }
        })
    }

    async connectDatabase(){

        try {
            this.database.connect();
            // await this.database.authenticate();
            await this.database.setModel();
            await this.database.sync();
            return "ok";
        } catch (error) {
            console.log("An error ocurred when syncing the database.");
            console.log(error);
            return null;
        }
    }
}