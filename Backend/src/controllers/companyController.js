import db from '../models/index';
import companyService from "../services/companySerivice"

let handleCreateNewCompany = async (req, res) => {
    try {
        let message = await companyService.createNewCompany(req.body);
        return res.status(200).json(message);
    } catch (error) {
        return res.status(500).json({
            errCode: 1,
            message: 'Error creating company',
            details: error.message
        });
    }
};

let handleGetAllCompany = async (req, res) => {
    let id = req.query.id; // all, id

    if (!id) {
        return res.status(400).json({
            errCode: 1,
            message: 'Missing required parameter',
            company: []
        });
    }

    try {
        let company = await companyService.getAllCompany(id);
        return res.status(200).json({
            errCode: 0,
            message: 'ok',
            company
        });
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            message: 'Lỗi từ server khi lấy công ty',
            error: error
        });
    }
};

let handleDeleteCompany = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters!"
        });
    }
    try {
        let message = await companyService.deleteCompany(req.body.id);
        return res.status(200).json(message);
    } catch (error) {
        console.error('❌ Error in handleDeleteCompany:', error);
        return res.status(500).json({
            errCode: -1,
            message: 'Internal server error',
            details: error.message
        });
    }
};

let handleEditCompany = async (req, res) => {
    let data = req.body;
    let message = await companyService.updateCompanyData(data);
    return res.status(200).json(message)
}

let handleGetTopCompany = async (req, res) => {
    let limit = req.query.limit
    if (!limit) limit = 6;
    try {
        let response = await companyService.getTopCompany(limit)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            message: "Error from server",

        })
    }

}

module.exports = {
    handleCreateNewCompany: handleCreateNewCompany,
    handleGetAllCompany: handleGetAllCompany,
    handleDeleteCompany: handleDeleteCompany,
    handleEditCompany: handleEditCompany,
    handleGetTopCompany: handleGetTopCompany,

}