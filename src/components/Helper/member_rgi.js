import { axiosPrivate } from './axios';

export const modelfromByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/member_regis', payloadData);
    return res.data;
};
export const membertableshowsearchByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/member_regis/MemberregiSearch', payloadData);
    return res.data;
};
export const MemberregidropdownnameSearchApi = async (payloadData) => {
    let res = await axiosPrivate.post('/member_regis/MemberregidropdownnameSearch', payloadData);
    return res.data;
};
export const MemberregiExcellsheetApi = async (payloadData) => {
    let res = await axiosPrivate.post('/member_regis/MemberregiExcellsheetlist', payloadData);
    return res.data;
};
