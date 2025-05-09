import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);

    router.get("/dth", (req, res) => {
        return res.send('sth');
    });

    return app.use("/", router);
}

module.exports = initWebRoutes;