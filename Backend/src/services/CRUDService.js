import { raw } from 'express';
import db from '../models/index';
import bcrypt from "bcryptjs";
import { where } from 'sequelize';
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resole, reject) => {
        try {
            let hashUserPasswordFormBcryptjs = await hashUserPassword(data.password)
            await db.User.create({
                roleId: data.roleId,
                email: data.email,
                password: hashUserPasswordFormBcryptjs,
                fullName: data.fullName,
                phone: data.phone,
                avatar: "",
                isActive: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            resole('succeed')
        } catch (error) {
            reject(e)
        }
    })

}

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

let getAllUser = () => {
    return new Promise(async (resole, reject) => {
        try {
            let users = await db.User.findAll({ raw: true });
            resole(users)
        } catch (error) {
            reject(e)
        }
    })
}

let getUserById = (id) => {
    return new Promise(async (resole, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id },
                raw: true
            })
            if (user) {
                resole(user)
            }
            else {
                resole(
                    {}
                )
            }
        } catch (error) {
            reject(error)
        }

    })

}

let updateUserData = (data) => {
    return new Promise(async (resole, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.fullName = data.fullName
                user.phone = data.phone

                await user.save()
                resole();
            } else {
                resole();
            }
        } catch (error) {
            reject(error)
        }

    })

}

let deleteUserById = (id) => {
    return new Promise(async (resole, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            })
            if (user) {
                await user.destroy();
            }
            resole()
        } catch (error) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}