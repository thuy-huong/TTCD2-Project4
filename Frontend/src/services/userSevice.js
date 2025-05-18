import axios from '../axios'

const handleLoginAPI = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-user?id=${id}`)
}

export { handleLoginAPI, getAllUsers };