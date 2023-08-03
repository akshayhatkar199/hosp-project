import { axiosPrivate } from './axios';

export const familyrelationfromsubmitByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/familyrelation_masters', payloadData);
    return res.data;
};
export const familyrelationtablesearchByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/familyrelation_masters/FamilyrelationmasterSearch', payloadData);
    return res.data;
};
export const familyrelationdetailsGetidByApi = async (id) => {
    let res = await axiosPrivate.get(`/familyrelation_masters/${id}`);
    return res.data;
};
export const familyrelationdetailsUpdateByApi = async (payloadData) => {
    let res = await axiosPrivate.patch('/familyrelation_masters/' + payloadData.id, payloadData);
    return res.data;
};
