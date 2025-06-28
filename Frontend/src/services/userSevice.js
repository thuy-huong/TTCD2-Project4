import axios from '../axios'

const handleLoginAPI = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-user?id=${id}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}
const deleteUserService = (id) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: id
        }

    })
}

const editUSerService = (data) => {
    return axios.put('/api/edit-user', data)
}
export {
    handleLoginAPI,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUSerService
};