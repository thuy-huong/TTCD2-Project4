import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/companyService';


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