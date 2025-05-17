import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);

    router.get("/dth", (req, res) => {
        return res.send('sth');
    });
    //create
    router.get("/crud", homeController.getCRUD);
    router.post("/post-crud", homeController.postCRUD);

    //read
    router.get("/get-crud", homeController.displayGetCRUD)

    //update
    router.get('/edit-crud', homeController.getEditCRUD)
    router.post('/put-crud', homeController.putCRUD)

    //delete
    router.get('/delete-crud', homeController.deleteCRUD)

    return app.use("/", router);
}

module.exports = initWebRoutes;