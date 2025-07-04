
import db from '../models/index';
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resole, reject) => {
        try {
            var hash = await bcrypt.hashSync(password, salt);
            resole(hash)
        } catch (error) {
            reject(e)
        }

    })
}

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

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email)
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'Your email is already in use. Please try another email!'
                })
            } else {
                let hashUserPasswordFormBcryptjs = await hashUserPassword(data.password)
                await db.User.create({
                    roleId: data.roleId,
                    email: data.email,
                    password: hashUserPasswordFormBcryptjs,
                    fullName: data.fullName,
                    phone: data.phone,
                    // avatar: "",
                    isActive: 1,
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

let deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    message: `The user isn't exist!`
                })
            }
            await db.User.destroy({
                where: { id: id }
            });

            resolve({
                errCode: 0,
                message: `The user is delete.`
            })
        } catch (error) {
            reject(error)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameters!'
                });
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.fullName = data.fullName
                user.phone = data.phone
                user.avatar = data.avatar
                user.password = data.password
                user.isActive = data.isActive
                user.roleId = data.roleId
                user.updatedAt = new Date()
                await user.save()
                resolve({
                    errCode: 0,
                    message: 'Update the user succeeds!'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: `User's not found!`
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}

let getAllRoleService = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let res = {};
            let allRole = await db.AllCode.findAll();
            res.errCode = 0,
                res.data = allRole
            resolve(res)
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllRoleService: getAllRoleService,
}