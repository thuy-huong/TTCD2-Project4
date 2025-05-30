import db from '../models/index';
import userService from "../services/userSevice"

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    //ckeck email exist
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
    let userData = await userService.handleUserLogin(email, password)
    //compare password
    //return userInfor
    //access_token:JWT json web token

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {},

    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; //all, id
    if (!id) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing required parameted',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);

    return res.status(200).json({
        errCode: 0,
        message: 'ok',
        users
    })
}

let handleCreateNewUsers = async (req, res) => {
    let message = await userService.createNewUser(req.body);

    return res.status(200).json(message)
}
let handleEditUsers = async (req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)
}
let handleDeleteUsers = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            message: "Missing required parameters!"
        })
    }
    let message = await userService.deleteUser(req.body.id)
    return res.status(200).json(message)
}
module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUsers: handleCreateNewUsers,
    handleEditUsers: handleEditUsers,
    handleDeleteUsers: handleDeleteUsers,

}