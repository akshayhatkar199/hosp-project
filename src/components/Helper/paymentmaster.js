import { axiosPrivate } from './axios';

export const paymentfromsubmitByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/payment_masters', payloadData);
    return res.data;
};
export const paymenttablesearchByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/payment_masters/PaymentmasterSearch', payloadData);
    return res.data;
};
export const paymentdetailsGetidByApi = async (id) => {
    let res = await axiosPrivate.get(`/payment_masters/${id}`);
    return res.data;
};
export const paymentdetailsUpdateByApi = async (payloadData) => {
    let res = await axiosPrivate.patch('/payment_masters/' + payloadData.id, payloadData);
    return res.data;
};
