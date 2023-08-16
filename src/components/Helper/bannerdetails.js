import { axiosPrivate } from './axios';

export const bannerfromsubmitByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/bannerdetails', payloadData);
    return res.data;
};
export const bannertablesearchByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/bannerdetails/BannerdetailsSearch', payloadData);
    return res.data;
};
export const uploadImgbannerApi = async (payloadData, banner) => {
    let res = await axiosPrivate.post('/fileuploads/' + banner + '/upload', payloadData);
    return res.data;
};
export const bannerdetailsGetidByApi = async (id) => {
    let res = await axiosPrivate.get(`/bannerdetails/${id}`);
    return res.data;
};
export const bannerdetailsUpdateByApi = async (payloadData) => {
    let res = await axiosPrivate.patch('/bannerdetails/' + payloadData.id, payloadData);
    return res.data;
};
