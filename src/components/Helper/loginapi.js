import { axiosPrivate } from './axios';

export const loginByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/Users/login', payloadData);
    return res.data;
};
