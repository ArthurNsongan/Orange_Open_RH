/**
 * Login Action
 * @returns {{type: string}}
 */
import * as DomainesType from '../types/DomaineType';

export const fetchGetAllDomainePending = () => ({
    type: DomainesType.GET_ALL_DOMAINE_PENDING
});
export const fetchGetAllDomaineReset = () => ({
    type: DomainesType.GET_ALL_DOMAINE_RESET
});
export const fetchGetAllDomaineSuccess = (res) => ({
    type: DomainesType.GET_ALL_DOMAINE_SUCCESS,
    result: res,
});
export const fetchGetAllDomaineError = (error) => ({
    type: DomainesType.GET_ALL_DOMAINE_ERROR,
    result: error
});


export const fetchGetDomaineByPostPending = () => ({
    type: DomainesType.GET_DOMAINE_BY_POST_PENDING
});
export const fetchGetDomaineByPostReset = () => ({
    type: DomainesType.GET_DOMAINE_BY_POST_RESET
});
export const fetchGetDomaineByPostSuccess = (res) => ({
    type: DomainesType.GET_DOMAINE_BY_POST_SUCCESS,
    result: res,
});
export const fetchGetDomaineByPostError = (error) => ({
    type: DomainesType.GET_DOMAINE_BY_POST_ERROR,
    result: error
});

export const fetchCreateThematiquePending = () => ({
    type: DomainesType.CREATE_THEMATIQUE_PENDING
});
export const fetchCreateThematiqueReset = () => ({
    type: DomainesType.CREATE_THEMATIQUE_RESET
});
export const fetchCreateThematiqueSuccess = (res) => ({
    type: DomainesType.CREATE_THEMATIQUE_SUCCESS,
    result: res,
});
export const fetchCreateThematiqueError = (error) => ({
    type: DomainesType.CREATE_THEMATIQUE_ERROR,
    result: error
});


export const fetchModifyThematiquePending = () => ({
    type: DomainesType.MODIFY_THEMATIQUE_PENDING
});
export const fetchModifyThematiqueReset = () => ({
    type: DomainesType.MODIFY_THEMATIQUE_RESET
});
export const fetchModifyThematiqueSuccess = (res) => ({
    type: DomainesType.MODIFY_THEMATIQUE_SUCCESS,
    result: res,
});
export const fetchModifyThematiqueError = (error) => ({
    type: DomainesType.MODIFY_THEMATIQUE_ERROR,
    result: error
});
