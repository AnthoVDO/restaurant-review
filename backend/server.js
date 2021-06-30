import express from "express";
import cors from "cors";
import restaurants from "./api/restaurants.route.js";

const app = express()

app.use(cors());
app.use(express.json());

app.use("/api/v1/restaurants", restaurants); //initial url
app.use("*", (req, res) => { //redirect to 404 any route that doesn't match the existing one
    res.status(404).json({ error: "not found" })
})

export default app; //to be able to import it to use the server for db code