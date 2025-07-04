import actionTypes from '../actions/actionTypes';

const initialState = {
    allCodes: {
        sizes: [],
        roles: [],
        positions: [],
    },
    topCompany: [],
    isLoadingAllCode: false,
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALLCODES_START:
            return {
                ...state,
                isLoadingAllCode: true,
            };
        case actionTypes.FETCH_ALLCODES_SUCCESS:
            return {
                ...state,
                allCodes: {
                    ...state.allCodes,
                    [action.codeType.toLowerCase() + 's']: action.data  // Ví dụ: "size" -> "sizes"
                },
                isLoadingAllCode: false,
            };
        case actionTypes.FETCH_ALLCODES_FAILED:
            return {
                ...state,
                isLoadingAllCode: false,
            };
        case actionTypes.FETCH_TOP_COMPANY_SUCCESS:
            return {
                ...state,
                topCompany: action.data
            }
        case actionTypes.FETCH_TOP_COMPANY_FAILED:
            return {
                ...state,
                topCompany: []
            }
        default:
            return state;
    }
}

export default adminReducer;