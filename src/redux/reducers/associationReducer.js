import AssociationTypes from "../../types/AssociationTypes";

const initialState = {
    loading: false,
    result: null,
    error: null,
    isLoggedIn: false
}

export const currentAssociationReducer = (state = initialState, action) => {
    switch (action.type) {
        case AssociationTypes.CURRENT_ASSOCIATION_PENDING: {
            return {
                ...state,
                loading: true
            }
        }
        case AssociationTypes.CURRENT_ASSOCIATION_SUCCESS:
            {
                console.log(AssociationTypes.CURRENT_ASSOCIATION_SUCCESS)
                return {
                    ...state,
                    loading: false,
                    result: action.result,
                    error: null,
                    isLoggedIn: true
                }
            }
        case AssociationTypes.CURRENT_ASSOCIATION_ERROR:
        {
            console.log(AssociationTypes.CURRENT_ASSOCIATION_ERROR)
            return {
                ...state,
                loading: false,
                result: null,
                error: action.result
            }
        }
        default:
            return state;
    }
}