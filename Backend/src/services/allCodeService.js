import { raw } from 'express';
import db from '../models/index';

let getAllCode = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allCodes = {}
            if (type === 'ALL') {
                allCodes = await db.AllCode.findAll()
            } if (type && type !== "ALL") {
                allCodes = await db.AllCode.findAll({
                    where: { type: type },

                })
            }

            resolve(allCodes)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllCode: getAllCode,
}