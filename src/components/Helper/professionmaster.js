import { axiosPrivate } from './axios';

export const professionfromsubmitByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/profession_masters', payloadData);
    return res.data;
};
export const professiontablesearchByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/profession_masters/ProfessionmasterSearch', payloadData);
    return res.data;
};
export const professiondetailsGetidByApi = async (id) => {
    let res = await axiosPrivate.get(`/profession_masters/${id}`);
    return res.data;
};
export const professiondetailsUpdateByApi = async (payloadData) => {
    let res = await axiosPrivate.patch('/profession_masters/' + payloadData.id, payloadData);
    return res.data;
};
export const professionmasterdropdownSearchApi = async (payloadData) => {
    let res = await axiosPrivate.post('/profession_masters/ProfessionmasterdropdownGetByApi', payloadData);
    return res.data;
};
