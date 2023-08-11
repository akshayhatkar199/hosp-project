import { axiosPrivate } from './axios';

export const karyakramfromsubmitByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/karyakrams', payloadData);
    return res.data;
};
export const karyakramtablesearchByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/karyakrams/KaryakramTableSearch', payloadData);
    return res.data;
};
export const karyakramdetailsGetidByApi = async (id) => {
    let res = await axiosPrivate.get(`/karyakrams/${id}`);
    return res.data;
};
export const karyakramdetailsUpdateByApi = async (payloadData) => {
    let res = await axiosPrivate.patch('/karyakrams/' + payloadData.id, payloadData);
    return res.data;
};
export const uploadImgkaryakramApi = async (payloadData, karyakramimageFolder) => {
    let res = await axiosPrivate.post('/fileuploads/' + karyakramimageFolder + '/upload', payloadData);
    return res.data;
};
// export const uploadImgAgamikaryakramApi = async (payloadData, Agamikaryakramimages) => {
//     let res = await axiosPrivate.post('/fileuploads/' + Agamikaryakramimages + '/upload', payloadData);
//     return res.data;
// };
