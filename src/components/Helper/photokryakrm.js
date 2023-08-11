import { axiosPrivate } from './axios';
export const imagekaryakramtwostablesearchByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/imagekaryakramtwos/ImagekaryakramtwoTableSearch', payloadData);
    return res.data;
};
