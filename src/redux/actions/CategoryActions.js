/**
 * Login Action
 * @returns {{type: string}}
 */
import * as CategoryType from '../types/CategoryType';

export const fetchGetAllCategoryPending = () => ({
    type: CategoryType.GET_CATEGORY_PENDING
});
export const fetchGetAllCategoryReset = () => ({
    type: CategoryType.GET_CATEGORY_RESET
});
export const fetchGetAllCategorySuccess = (res) => ({
    type: CategoryType.GET_CATEGORY_SUCCESS,
    result: res,
});
export const fetchGetAllCategoryError = (error) => ({
    type: CategoryType.GET_CATEGORY_ERROR,
    result: error
});


export const fetchCreateCategoryPending = () => ({
    type: CategoryType.CREATE_CATEGORY_PENDING
});
export const fetchCreateCategoryReset = () => ({
    type: CategoryType.CREATE_CATEGORY_RESET
});
export const fetchCreateCategorySuccess = (res) => ({
    type: CategoryType.CREATE_CATEGORY_SUCCESS,
    result: res,
});
export const fetchCreateCategoryError = (error) => ({
    type: CategoryType.CREATE_CATEGORY_ERROR,
    result: error
});


export const fetchModifyCategoryPending = () => ({
    type: CategoryType.MODIFY_CATEGORY_PENDING
});
export const fetchModifyCategoryReset = () => ({
    type: CategoryType.MODIFY_CATEGORY_RESET
});
export const fetchModifyCategorySuccess = (res) => ({
    type: CategoryType.MODIFY_CATEGORY_SUCCESS,
    result: res,
});
export const fetchModifyCategoryError = (error) => ({
    type: CategoryType.MODIFY_CATEGORY_ERROR,
    result: error
});
