import { axiosPrivate } from './axios';

export const PhotogallaryfromsubmitByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/photoGallaries', payloadData);
    return res.data;
};
export const PhotogallarytablesearchByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/photoGallaries/PhotogallaryTableSearch', payloadData);
    return res.data;
};
export const uploadPhotogallaryImgApi = async (payloadData, photoGallary) => {
    let res = await axiosPrivate.post('/fileuploads/' + photoGallary + '/upload', payloadData);
    return res.data;
};
export const PhotogallarydetailsGetidByApi = async (id) => {
    let res = await axiosPrivate.get(`/photoGallaries/${id}`);
    return res.data;
};
export const PhotogallarydetailsUpdateByApi = async (payloadData) => {
    let res = await axiosPrivate.patch('/photoGallaries/' + payloadData.id, payloadData);
    return res.data;
};
