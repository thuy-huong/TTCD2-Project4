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

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
}