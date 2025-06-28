import db from '../models/index';
import companyService from "../services/companySerivice"

let handleCreateNewCompany = async (req, res) => {
    let message = await companyService.createNewCompany(req.body)
    return res.status(200).json(message)
}

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

module.exports = {
    handleCreateNewCompany: handleCreateNewCompany,
    handleGetAllCompany: handleGetAllCompany,
}