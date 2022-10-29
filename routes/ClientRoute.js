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
    }

    async getClient(client){}

    async insert(){

        this.app.post("/client", async (req, res) => {

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

            this.user = new User(
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
            );

            if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")

            try {
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

            this.user = new User(
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
            );
            
            if (this.connectDatabase() == null) return res.status(500).send("Cannot complete your request. Try again later.")

            try {
                let savedUser = await this.database.getInstance(this.user);

                if (savedUser == null) return res.status(500).send("Cannot complete your request. Try again later.") 

                return savedUser;
                
            } catch (error) {
                console.log("Error saving the user. Try again later.");
                console.log(error);
                return res.status(500).send("Cannot complete your request. Try again later.")
            }
        });
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