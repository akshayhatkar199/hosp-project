import { axiosPrivate } from './axios';

export const batmyafromsubmitByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/batmayyaanilekhans', payloadData);
    return res.data;
};
export const batmayatablesearchByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/batmayyaanilekhans/BatmayyaanilekhanSearch', payloadData);
    return res.data;
};
export const uploadbatmayaImgbannerApi = async (payloadData, batmaya) => {
    let res = await axiosPrivate.post('/fileuploads/' + batmaya + '/upload', payloadData);
    return res.data;
};
export const batmayadetailsGetidByApi = async (id) => {
    let res = await axiosPrivate.get(`/batmayyaanilekhans/${id}`);
    return res.data;
};
export const batmayadetailsUpdateByApi = async (payloadData) => {
    let res = await axiosPrivate.patch('/batmayyaanilekhans/' + payloadData.id, payloadData);
    return res.data;
};
