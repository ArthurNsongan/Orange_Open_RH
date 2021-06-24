/**
 * Login Action
 * @returns {{type: string}}
 */
import * as GlossaryType from '../types/GlossaryType';

export const fetchPostGlossaryPending = () => ({
    type: GlossaryType.POST_GLOSSARY_PENDING
});
export const fetchPostGlossaryReset = () => ({
    type: GlossaryType.POST_GLOSSARY_RESET
});
export const fetchPostGlossarySuccess = (res) => ({
    type: GlossaryType.POST_GLOSSARY_SUCCESS,
    result: res,
});
export const fetchPostGlossaryError = (error) => ({
    type: GlossaryType.POST_GLOSSARY_ERROR,
    result: error
});


export const fetchGetAllGlossaryPending = () => ({
    type: GlossaryType.GET_ALL_GLOSSARY_PENDING
});
export const fetchGetAllGlossaryReset = () => ({
    type: GlossaryType.GET_ALL_GLOSSARY_RESET
});
export const fetchGetAllGlossarySuccess = (res) => ({
    type: GlossaryType.GET_ALL_GLOSSARY_SUCCESS,
    result: res,
});
export const fetchGetAllGlossaryError = (error) => ({
    type: GlossaryType.GET_ALL_GLOSSARY_ERROR,
    result: error
});
