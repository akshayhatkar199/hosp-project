import { axiosPrivate } from './axios';

export const ShanchitrsubmitByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/shanshitrydata', payloadData);
    return res.data;
};
export const ShanchitrtablesearchByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/shanshitrydata/ShanshitrydataSearch', payloadData);
    return res.data;
};
export const uploadImgShanchitrApi = async (payloadData, Shanchitre) => {
    let res = await axiosPrivate.post('/fileuploads/' + Shanchitre + '/upload', payloadData);
    return res.data;
};
export const ShanchitriddetailsGetidByApi = async (id) => {
    let res = await axiosPrivate.get(`/shanshitrydata/${id}`);
    return res.data;
};
export const ShanchitrUpdateByApi = async (payloadData) => {
    let res = await axiosPrivate.patch('/shanshitrydata/' + payloadData.id, payloadData);
    return res.data;
};
export const shanchitrydropdwonGetByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/shanshitrydata/shanchitrydropdwonGetByApi', payloadData);
    return res.data;
};
