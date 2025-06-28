import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import companyController from "../controllers/companyController";
import allCodeController from '../controllers/allCodeController'

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
    router.post('/api/create-new-user', userController.handleCreateNewUsers)
    router.put('/api/edit-user', userController.handleEditUsers)
    router.delete('/api/delete-user', userController.handleDeleteUsers)

    router.get('/api/get-all-role', userController.getAllRole)

    //allCode
    router.get('/api/get-all-code', allCodeController.handleGetAllCode)


    //company
    router.post('/api/create-new-company', companyController.handleCreateNewCompany)
    router.get('/api/get-all-company', companyController.handleGetAllCompany)

    return app.use("/", router);
}

module.exports = initWebRoutes;