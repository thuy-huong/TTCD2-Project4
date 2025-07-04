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

let createNewCompany = async (data) => {
    try {
        let check = await checkNameCompany(data.companyName);
        if (check) {
            return {
                errCode: 1,
                message: 'Company already exists. Please try again.'
            };
        }
        await db.Company.create({
            companyName: data.companyName,
            industry: data.industry,
            companySize: data.companySize,
            address: data.address,
            description: data.description,
            logo: data.logo,
            status: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return {
            errCode: 0,
            message: 'ok'
        };
    } catch (error) {
        console.error('Error creating company:', error);
        return {
            errCode: 2,
            message: 'An error occurred while creating the company.',
            details: error.message
        };
    }
};

let getAllCompany = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let company;
            const includeOptions = [
                {

                    model: db.AllCode,
                    as: 'sizeData',
                    attributes: ['valueVi', 'valueEn']
                }
            ];
            if (id === 'ALL') {
                company = await db.Company.findAll({
                    include: includeOptions
                });

            } else if (id) {
                company = await db.Company.findOne({
                    where: { id: id },
                    include: includeOptions
                });
            } else {
                return resolve([]);
            }

            resolve(company || null);
        } catch (error) {
            reject({
                errCode: 1,
                message: 'Company information not found',
                details: error
            });
        }
    });
}

let deleteCompany = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let company = await db.Company.findOne({ where: { id } });
            if (!company) {
                return resolve({
                    errCode: 2,
                    message: `The company doesn't exist!`
                });
            }
            await db.Company.destroy({ where: { id } });
            return resolve({
                errCode: 0,
                message: `The company has been deleted.`
            });
        } catch (error) {
            console.error('❌ Error in deleteCompany:', error);
            return reject(error);
        }
    });
};

let updateCompanyData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                });
            }
            let existingCompany = await db.Company.findOne({
                where: { companyName: data.companyName }
            });
            if (existingCompany && existingCompany.id !== +data.id) {
                return resolve({
                    errCode: 3,
                    message: 'Company name already exists. Please choose another name.'
                });
            }

            let company = await db.Company.findOne({
                where: { id: data.id }
            })
            if (company) {
                company.companyName = data.companyName
                company.industry = data.industry
                company.companySize = data.companySize
                company.address = data.address
                company.description = data.description
                if (data.logoUpdate) {
                    company.logo = data.logoUpdate;
                }

                company.status = data.status
                company.updatedAt = new Date()


                await company.save()
                resolve({
                    errCode: 0,
                    message: 'Update the company succeeds!'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: `User's not found!`
                });
            }
        } catch (error) {
            console.error('❌ Error in updateCompanyData:', error);
            return reject({
                errCode: 500,
                message: 'Something went wrong while updating the company.',
                details: error.message || error
            });
        }
    })
}

let getTopCompany = async (limitInput) => {
    try {
        let company = await db.Company.findAll({
            limit: +limitInput,
            order: [['createdAt', 'ASC']],
        });
        return {
            errCode: 0,
            message: 'OK',
            data: company,
        };
    } catch (error) {
        console.error('❌ Error in getTopCompany:', error);
        return {
            errCode: 1,
            message: 'Failed to fetch top companies.',
            details: error.message || error,
        };
    }
};


module.exports = {
    createNewCompany: createNewCompany,
    getAllCompany: getAllCompany,
    deleteCompany: deleteCompany,
    updateCompanyData: updateCompanyData,
    getTopCompany: getTopCompany
}