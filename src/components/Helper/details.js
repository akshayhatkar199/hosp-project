import { axiosPrivate } from './axios';

export const EnquiryTypedropdownSearchApi = async (payloadData) => {
    let res = await axiosPrivate.post('/detailsfroms/DetailsfromdropdownnameSearch15', payloadData);
    return res.data;
};
export const detailsfromsubmitedByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/detailsfroms', payloadData);
    return res.data;
};
export const DetailListByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/detailsfroms/DetailsfromSearch', payloadData);
    return res.data;
};
export const detailsGetByApi = async (id) => {
    let res = await axiosPrivate.get(`/detailsfroms/${id}`);
    return res.data;
};
export const detailsUpdateByApi = async (payloadData) => {
    let res = await axiosPrivate.patch('/detailsfroms/' + payloadData.id, payloadData);
    return res.data;
};
export const detailsExcellsheetByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/detailsfroms/DetailsfromExcellsheetlist', payloadData);
    return res.data;
};
export const detailsCountTotalByApi = async (payloadData) => {
    let res = await axiosPrivate.get('/detailsfroms/count', payloadData);
    return res.data;
};
