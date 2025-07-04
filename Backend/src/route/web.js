import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import companyController from "../controllers/companyController";
import allCodeController from '../controllers/allCodeController';
import categoryController from '../controllers/categoryController';
import jobPostController from '../controllers/jobPostController'

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


    //company admin 
    router.post('/api/create-new-company', companyController.handleCreateNewCompany)
    router.get('/api/get-all-company', companyController.handleGetAllCompany)
    router.delete('/api/delete-company', companyController.handleDeleteCompany)
    router.put('/api/edit-company', companyController.handleEditCompany)
    //company homepage
    router.get('/api/top-company-home', companyController.handleGetTopCompany)

    //category
    router.get('/api/get-all-category', categoryController.handleGetAllCategory)
    router.post('/api/create-new-category', categoryController.handleCreateNewCategory)
    router.put('/api/edit-category', categoryController.handleEditCategory)
    router.delete('/api/delete-category', categoryController.handleDeleteCategory)

    router.get('/api/get-professional-position', categoryController.handleGetProfessionalPosition)
    router.post('/api/create-new-pp', categoryController.handleCreateNewPosition)
    router.put('/api/edit-position', categoryController.handleEditPosition)
    router.delete('/api/delete-position', categoryController.handleDeletePosition)

    //jobPost
    router.post('/api/create-job-post', jobPostController.handleCreateJobPost)
    router.put('/api/edit-job-post', jobPostController.handleEditJobPost)
    router.get('/api/get-job-post', jobPostController.handleGetJobPost)

    router.post('/api/create-save-job', jobPostController.handleCreateSaveJob)
    router.delete('/api/delete-save-job', jobPostController.handleDeleteSaveJob)

    return app.use("/", router);
}

module.exports = initWebRoutes;