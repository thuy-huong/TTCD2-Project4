import { raw } from 'express';
import db from '../models/index';

let checkNameCompany = (companyName) => {
    return new Promise(async (resolve, reject) => {
        try {
            let company = await db.Company.findOne({
                where: { companyName: companyName }
            })
            if (company) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let createNewCompany = (data) => {
    return new Promise(async (resolve, reject) => {
        console.log(data)
        try {
            let check = await checkNameCompany(data.companyName)
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'Company already exists. Please try again.'
                })
            } else {
                await db.Company.create({
                    companyName: data.companyName,
                    industry: data.industry,
                    companySize: data.companySize,
                    address: data.address,
                    description: data.description,
                    logo: data.logo,
                    status: data.status,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                resolve({
                    errCode: 0,
                    message: 'ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllCompany = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let company;

            if (id === 'ALL') {
                company = await db.Company.findAll();
            } else if (id) { // kiểm tra nếu id tồn tại và khác 'ALL'
                company = await db.Company.findOne({
                    where: { id: id }
                });
            } else {
                return resolve([]); // Trả về mảng rỗng nếu không có id
            }

            resolve(company || null); // Trả về null nếu không tìm thấy công ty
        } catch (error) {
            reject({
                errCode: 1,
                message: 'Lỗi khi lấy thông tin công ty',
                details: error
            });
        }
    });
}

module.exports = {
    createNewCompany: createNewCompany,
    getAllCompany: getAllCompany,

}