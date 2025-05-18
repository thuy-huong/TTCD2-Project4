import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage);
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

    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-user', userController.handleGetAllUsers)

    return app.use("/", router);
}

module.exports = initWebRoutes;