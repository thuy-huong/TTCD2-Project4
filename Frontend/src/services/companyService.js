import axios from '../axios'

const getAllCodeService = (inputData) => {
    return axios.get(`/api/get-all-code?type=${inputData}`)
}

export {
    getAllCodeService,
};

