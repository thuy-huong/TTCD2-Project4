import axios from '../axios'

const getAllCodeService = (inputData) => {
    return axios.get(`/api/get-all-code?type=${inputData}`)
}

const createNewCompanyService = (data) => {
    return axios.post('/api/create-new-company', data)
}

const getAllCompanyService = (id) => {
    return axios.get(`/api/get-all-company?id=${id}`)
}
const deleteCompanyService = (id) => {
    return axios.delete('/api/delete-company', {
        data: {
            id: id
        }
    })
}
const editComponyService = (data) => {
    return axios.put('/api/edit-company', data)
}

const getTopCompanyService = (limit) => {
    return axios.get(`/api/top-company-home?limit=${limit}`)
}


export {
    getAllCodeService, createNewCompanyService, getAllCompanyService,
    deleteCompanyService, editComponyService, getTopCompanyService

};

