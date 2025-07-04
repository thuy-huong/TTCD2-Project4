
import axios from '../axios'

const getAllCategoryService = (id) => {
    return axios.get(`/api/get-all-category?id=${id}`)
}


const createCategoryService = (data) => {
    return axios.post('/api/create-new-category', data)
}

const deleteCategoryService = (id) => {
    return axios.delete('/api/delete-category', {
        data: {
            id: id
        }
    })
}
const editCategoryService = (data) => {
    return axios.put('/api/edit-category', data)
}



const getAllPositionService = (id) => {
    return axios.get(`/api/get-professional-position?id=${id}`)
}

const createPositionService = (data) => {
    return axios.post('/api/create-new-pp', data)
}
const editPositionService = (data) => {
    return axios.put('/api/edit-position', data)
}

const deletePositionService = (id) => {
    return axios.delete('/api/delete-position', {
        data: {
            id: id
        }
    })
}

export {

    getAllCategoryService, createCategoryService, deleteCategoryService,
    editCategoryService, getAllPositionService, createPositionService,
    editPositionService, deletePositionService
};