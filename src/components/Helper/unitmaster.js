import { axiosPrivate } from './axios';

export const unitfromsubmitByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/unit_masters', payloadData);
    return res.data;
};
export const unittablesearchByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/unit_masters/UnitmasterSearch', payloadData);
    return res.data;
};
export const unitdetailsGetidByApi = async (id) => {
    let res = await axiosPrivate.get(`/unit_masters/${id}`);
    return res.data;
};
export const unitdetailsUpdateByApi = async (payloadData) => {
    let res = await axiosPrivate.patch('/unit_masters/' + payloadData.id, payloadData);
    return res.data;
};
