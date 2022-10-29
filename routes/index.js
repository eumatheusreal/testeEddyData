import ClientRoute from "./ClientRoute";

export default class Route{

    constructor(app){
        this.app = app;
        
        this.clientRoute = new ClientRoute(this.app);
    }

    router(){
        this.home();
        this.clientRoute.init();
    }

    home(){
        this.app.get("/", (req, res) => {
            res.status(404).send("Nothing here. Go back.")
        })
    }

}