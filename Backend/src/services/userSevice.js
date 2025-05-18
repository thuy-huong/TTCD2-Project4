import { raw } from 'body-parser';
import db from '../models/index';
import bcrypt from "bcryptjs";
import { where } from 'sequelize';

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', "roleId", "fullName", "isActive", 'password'],
                    where: { email: email },
                    raw: true
                })
                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        if (user.isActive) {
                            userData.errCode = 0
                            userData.message = `ok`
                            delete user.password
                            delete user.isActive
                            userData.user = user
                        } else {
                            userData.errCode = 4
                            userData.message = `Account has been locked. Please contact administrator.`
                        }


                    } else {
                        userData.errCode = 3
                        userData.message = `Wrong password`
                    }
                } else {
                    userData.errCode = 2
                    userData.message = `User's not found`
                }
            } else {
                userData.errCode = 1
                userData.message = `Your's Email is'n exit in your system. Plx try other email`

            }
            resolve(userData)


        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsers = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = {}
            if (id === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    },

                })
            } if (id && id !== "ALL") {
                users = await db.User.findOne({
                    where: { id: id },
                    attributes: {
                        exclude: ['password']
                    }

                })
            }

            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
}