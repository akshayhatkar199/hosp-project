import { axiosPrivate } from './axios';

export const educationfromsubmitByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/education_masters', payloadData);
    return res.data;
};
export const educationtablesearchByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/education_masters/EducationmasterSearch', payloadData);
    return res.data;
};
export const educationdetailsGetidByApi = async (id) => {
    let res = await axiosPrivate.get(`/education_masters/${id}`);
    return res.data;
};
export const educationdetailsUpdateByApi = async (payloadData) => {
    let res = await axiosPrivate.patch('/education_masters/' + payloadData.id, payloadData);
    return res.data;
};
