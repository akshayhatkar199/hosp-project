import { axiosPrivate } from './axios';

export const patientnamedropdownSearchApi = async (payloadData) => {
    let res = await axiosPrivate.post('/case_papers/CasepaperdropdownnameSearch', payloadData);
    return res.data;
};
export const fromsubmitedByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/case_papers', payloadData);
    return res.data;
};
export const caspaperMEMBER_IDByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/case_papers/CasepapergetDataById', payloadData);
    return res.data;
};
export const caspaperDetailListByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/case_papers/CasepaperSearch', payloadData);
    return res.data;
};
export const casepaperGetByApi = async (id) => {
    let res = await axiosPrivate.get(`/case_papers/${id}`);
    return res.data;
};
export const casepaperUpdateByApi = async (payloadData) => {
    let res = await axiosPrivate.patch('/case_papers/' + payloadData.id, payloadData);
    return res.data;
};
export const casepaperExcellsheetByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/case_papers/CasepaperExcellsheetlist', payloadData);
    return res.data;
};
export const casepaperCountTotalByApi = async (payloadData) => {
    let res = await axiosPrivate.get('/case_papers/count', payloadData);
    return res.data;
};
