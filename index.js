import express from "express";
import dotenv from "dotenv";
import Route from "./routes";

const app = express();
app.use(express.json());
dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const routes = new Route(app);
routes.router();

app.listen(PORT, () => {
    console.log("Listening on port " + PORT);
});

