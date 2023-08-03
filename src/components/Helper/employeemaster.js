import { axiosPrivate } from './axios';

export const employeefromsubmitByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/employee_masters', payloadData);
    return res.data;
};
export const employeetablesearchByApi = async (payloadData) => {
    let res = await axiosPrivate.post('/employee_masters/EmployeemasterSearch', payloadData);
    return res.data;
};
export const employeedetailsGetidByApi = async (id) => {
    let res = await axiosPrivate.get(`/employee_masters/${id}`);
    return res.data;
};
export const employeedetailsUpdateByApi = async (payloadData) => {
    let res = await axiosPrivate.patch('/employee_masters/' + payloadData.id, payloadData);
    return res.data;
};
