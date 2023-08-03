import { axiosPrivate } from './axios';

export const booldfromsubmitByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/blood_masters', payloadData);
    return res.data;
};
export const booldtablesearchByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/blood_masters/BloodmasterSearch', payloadData);
    return res.data;
};
export const boolddetailsGetidByApi = async (id) => {
    let res = await axiosPrivate.get(`/blood_masters/${id}`);
    return res.data;
};
export const boolddetailsUpdateByApi = async (payloadData) => {
    let res = await axiosPrivate.patch('/blood_masters/' + payloadData.id, payloadData);
    return res.data;
};
