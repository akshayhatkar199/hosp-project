import { axiosPrivate } from './axios';

export const memberfromsubmitByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/member_masters', payloadData);
    return res.data;
};
export const membertablesearchByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/member_masters/MembermasterSearch', payloadData);
    return res.data;
};
export const memberdetailsGetidByApi = async (id) => {
    let res = await axiosPrivate.get(`/member_masters/${id}`);
    return res.data;
};
export const memberdetailsUpdateByApi = async (payloadData) => {
    let res = await axiosPrivate.patch('/member_masters/' + payloadData.id, payloadData);
    return res.data;
};
