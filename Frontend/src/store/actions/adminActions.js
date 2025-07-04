import actionTypes from './actionTypes';
import { getAllCodeService, createNewCompanyService, getTopCompanyService } from '../../services/companyService';



export const fetchAllCodesStart = (types) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALLCODES_START });

            const fetchCode = async (type) => {
                let res = await getAllCodeService(type);
                if (res && res.errCode === 0) {
                    dispatch(fetchAllCodesSuccess(type, res.data));
                } else {
                    dispatch(fetchAllCodesFailed());
                }
            };

            for (const type of types) {
                await fetchCode(type);

            }

        } catch (error) {
            dispatch(fetchAllCodesFailed());
            console.log("fetchAllCodesFailed error: ", error);
        }
    };
}

export const fetchAllCodesSuccess = (codeType, data) => ({
    type: actionTypes.FETCH_ALLCODES_SUCCESS,
    codeType,
    data
});

export const fetchAllCodesFailed = () => ({
    type: actionTypes.FETCH_ALLCODES_FAILED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewCompanyService(data);
            console.log(res)
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess(res));
            } else {
                dispatch(saveUserFailed());
            }
        } catch (error) {
            dispatch(saveUserFailed());
            console.log("saveUserFailed error: ", error);
        }
    };
}

export const saveUserSuccess = (res) => ({
    type: actionTypes.CREATE_COMPANY_SUCCESS,
    res
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_COMPANY_FAILED
})

export const fetchTopCompany = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopCompanyService('6')

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_COMPANY_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_COMPANY_FAILED,
                })
            }
        } catch (e) {
            console.log(' ', e)
            dispatch({
                type: actionTypes.FETCH_TOP_COMPANY_FAILED,
            })
        }

    }
}