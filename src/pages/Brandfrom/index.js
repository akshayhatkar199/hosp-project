// material-ui
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { number } from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
import CreatableSelect from 'react-select/creatable';
import DataTable, { FilterComponent } from 'react-data-table-component';
import { DatePicker, Radio } from 'antd';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Space, Table, Tag, Select, Input, InputNumber } from 'antd';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCircleCheck, faCaretLeft, faCaretRight, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Upload, Button, Icon, Form, Modal, Checkbox } from 'antd';
import { TextareaAutosize } from '@mui/base';
import swal from 'sweetalert';
import { UploadOutlined, QuestionOutlined } from '@ant-design/icons';
import moment from 'moment';
import dayjs from 'dayjs';
// import Footer from '../components/Footer';
import './Brandfrom.css';
import { EnquiryTypedropdownSearchApi, detailsfromsubmitedByApi, detailsUpdateByApi } from 'components/Helper/details';
// import { MemberregidropdownnameSearchApi, modelfromByApi } from 'components/Helper/member_rgi';
let timeout;
let currentValue;
const { RangePicker } = DatePicker;
// const dateFormat = 'YYYY-MM-DD';
const dateFormat = 'DD-MM-YYYY';

const Brandfrom = () => {
    const [placement, SetPlacement] = useState('bottomRight');
    const [enquiryTypedata, setEnquiryTypedata] = useState([]);
    const [detailsvaluess, setdetailsvaluess] = useState();
    const [detailSelectedName, setdetailSelectedName] = useState();
    const [editselectedtype, seteditselectedtype] = useState();
    const [loading, setloading] = useState(false);
    const [loadingsepaper, setloadingsepaper] = useState(false);
    const [parpage, setParpage] = useState(10);
    const [maingroupList, setMainGroupList] = useState([]);
    const [idtypefromdata, setIdtypefromdata] = useState(null);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            total: 0,
            pageSize: 10
        }
    });
    let { id } = useParams();
    const [form] = Form.useForm();
    const [formmodal] = Form.useForm();
    const navigate = useNavigate();
    const { TextArea } = Input;

    const paginationComponentOptions = {
        rowsPerPageText: '',
        noRowsPerPage: true
    };
    useEffect(() => {
        form.setFieldValue('enquiryDate', dayjs(new Date()));
        formmodal.setFieldValue('enquiryDate', dayjs(new Date()));
    }, []);
    // useEffect(() => {
    //     if (typeof id !== 'undefined') {
    //         getcasepaerdatabyid();
    //     } else {
    //         form.setFieldValue('enquiryDate', dayjs(new Date()));
    //         formmodal.setFieldValue('enquiryDate', dayjs(new Date()));
    //     }
    // }, [id]);
    // const getcasepaerdatabyid = () => {
    //     setloadingsepaper(true);
    //     detailsGetByApi(id)
    //         .then(
    //             async (res) => {
    //                 console.log(' success');
    //                 let response = res;
    //                 response.enquiryDate = dayjs(response.enquiryDate, dateFormat); // moment(new Date(response.enquiryDate)).format('YYYY-MM-DD'); // moment();
    //                 setIdtypefromdata(response);
    //                 setdetailsvaluess(res.MEMBER_ID);
    //                 seteditselectedtype({
    //                     value: res.id,
    //                     label: res.EnquiryType
    //                 });
    //                 form.resetFields();
    //                 console.log('res', res);
    //                 setloadingsepaper(false);
    //                 let payloadData = {
    //                     MEMBER_ID: res.id,
    //                     offset: 0,
    //                     limit: 10
    //                 };
    //                 fetchcasepaperlist(payloadData, null);
    //             },
    //             (err) => {
    //                 console.log('err', err);
    //                 setloadingsepaper(false);
    //             }
    //         )
    //         .catch();
    // };
    const onFinish = (values) => {
        console.log('----------', values);
        // console.log('dfff', moment(new Date(values.enquiryDate)).format('YYYY-MM-DD'));
        console.log('dfff', moment(new Date(values.enquiryDate)).format('DD-MM-YYYY'));
        // if (detailsvaluess && detailsvaluess > 0) {
        // if (typeof id === 'undefined') {
        setloadingsepaper(true);
        console.log('Success:', values);
        console.log('detailsvaluess:', detailsvaluess);
        let payloadData = {
            ...values,
            // id: detailsvaluess,
            // EnquiryType: detailSelectedName,
            // enquiryDate: moment(new Date(values.enquiryDate)).format('YYYY-MM-DD')
            enquiryDate: moment(new Date(values.enquiryDate)).format('DD-MM-YYYY')
            // ,
            // enquiryDate: '' + moment(values.enquiryDate).format('YYYY-MM-DD') + ''
        };
        detailsfromsubmitedByApi(payloadData).then(
            (res) => {
                console.log('res', res);
                swal('success', 'success fully', 'success');
                navigate('/BrandTable');
                setloadingsepaper(false);
            },
            (err) => {
                console.log(err);
                swal('err', 'Enqury Types ', 'error');
            }
        );
        // } else {
        //     // //update
        //     console.log('Success:', values);
        //     let payloadData = {
        //         ...values,
        //         id: id,
        //         // MEMBER_ID: detailsvaluess,
        //         // MEMBER_NAME: detailSelectedName,
        //         // enquiryDate: moment(new Date(values.enquiryDate)).format('YYYY-MM-DD')
        //         enquiryDate: moment(new Date(values.enquiryDate)).format('DD-MM-YYYY')
        //     };
        //     setloadingsepaper(true);
        //     detailsUpdateByApi(payloadData)
        //         .then(
        //             async (res) => {
        //                 console.log('res', res);
        //                 console.log(' success');
        //                 swal('Details Save', 'Update success Fully', 'success');
        //                 navigate('/');
        //                 setloadingsepaper(false);
        //             },
        //             (err) => {
        //                 // console.log("error");
        //                 setloadingsepaper(false);
        //                 swal('Details Save', 'Not updated', 'error');
        //             }
        //         )
        //         .catch();
        // }
        // }
    };

    const placementChange = (e) => {
        SetPlacement(e.target.value);
    };
    const onFinishFailed = (value) => {
        console.log('value', value);
    };
    // <=============================================================================================================>
    // Start Model patient detail Add
    const showModalpatientname = () => {
        setIsModalOpenpatientname(true);
    };

    const handleOkpatientname = () => {
        setIsModalOpenpatientname(false);
    };

    const handleCancelpatientname = () => {
        setIsModalOpenpatientname(false);
    };
    // End Model patient detail Add
    // <=============================================================================================================>
    // <===================================================================================>
    // start patient name dropdown api
    const handlepationtnameSearch = (newValue) => {
        if (newValue) {
            detailnametyapefectch(newValue, setEnquiryTypedata);
        } else {
            setEnquiryTypedata([]);
        }
    };
    // const handlepationtnameChange = (newValue, n, offset = 0, current = null) => {
    //     setIsErrorPatient('');
    //     console.log('newValue', n);
    //     seteditselectedtype(null);
    //     setdetailSelectedName(n.label);
    //     setdetailsvaluess(newValue);
    //     let payloadData = {
    //         id: newValue,
    //         offset: offset,
    //         limit: 10
    //     };
    //     fetchcasepaperlist(payloadData, current);
    // };
    const detailnametyapefectch = (detailsvaluess, callback) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = detailsvaluess;
        const enqurytyapefake = () => {
            const payloadData = {
                search: currentValue
            };
            EnquiryTypedropdownSearchApi(payloadData).then((res) => {
                console.log('res--', res);
                setEnquiryTypedata(res.data);
                // if (currentValue === detailsvaluess) {
                //     const Cdata = res.data.map((item) => ({
                //         value: item.id,
                //         text: item.EnquiryType
                //     }));
                //     callback(Cdata);
                // }
            });
        };
        timeout = setTimeout(enqurytyapefake, 300);
    };
    // console.log('detailsvaluess', detailsvaluess);
    // console.log('data', enquiryTypedata);
    // <=============================================================================>
    // <======================================================================================>
    //checkbox
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    // <================================== Api call ==========================================>

    const handleAlphabets = (e) => {
        return checkAlphabets(e);
    };

    const handleChange = (e) => {
        console.log('handlechan', e);
    };
    // <================================== End Api call ==========================================>
    return (
        <>
            <Typography variant="h5" className="mx-2">
                <small className="text-black-50" style={{ fontFamily: 'Poppins' }}>
                    Home
                </small>
                {'/'} <b> Enquiry Information </b>
            </Typography>
            <br></br>
            <Card className="driver-create-card ">
                <div className="title-main  text-start">
                    <h5>
                        {/* <FontAwesomeIcon icon={faCaretLeft} /> */}
                        {/* <span className=" ribbon">Enquiry Information </span> */}

                        {/* <FontAwesomeIcon icon={faCaretRight} /> */}
                    </h5>
                </div>
                <div>
                    <h5>
                        <span className=" text-start">
                            <b>Enquiry Information</b>
                        </span>
                    </h5>
                </div>
                <hr className="MuiDivider-root MuiDivider-fullWidth css-1wnin34-MuiDivider-root"></hr>
                <Form
                    name="frmproductgroup"
                    initialValues={{
                        remember: true
                    }}
                    form={form} // Add this!
                    layout="vertical"
                    labelCol={{ span: 22 }}
                    wrapperCol={{ span: 22 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    {/* <MainCard
                        title={isAddMode ? 'Create Group' : 'Edit Group'}
                        secondary={
                            <div>
                                <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
                                    Save
                                </Button>
                                <Link to={'/productgroup'}>
                                    <Button type="danger">Cancel</Button>
                                </Link>
                            </div>
                        }
                    > */}
                    <Typography variant="body2">
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={3} sm={12} xl={3}>
                                <Form.Item
                                    // label="Name"
                                    name="EnquiryType"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Select Enquiry Name.'
                                        }
                                    ]}
                                >
                                    <div class="field-wrapper">
                                        <div class="input-group">
                                            <Select
                                                showSearch
                                                value={editselectedtype && editselectedtype.value ? editselectedtype : detailsvaluess}
                                                placeholder={'Select Enquiry Name'}
                                                className="placeholdetextsty textfont"
                                                defaultActiveFirstOption={false}
                                                showArrow={true}
                                                filterOption={false}
                                                onSearch={handlepationtnameSearch}
                                                // onChange={handlepationtnameChange}
                                                notFoundContent={null}
                                                options={(enquiryTypedata || []).map((d) => ({
                                                    value: d.id,
                                                    label: d.EnquiryType
                                                }))}
                                            />
                                            {/* <input
                                                // class="form-control"
                                                // id="name"
                                                name="name"
                                                type="text"
                                                // maxlength="10"
                                                // value=""
                                                // onchange="mobileNoValidation(event)"
                                                // onkeypress="if(this.value.length==10) return false;"
                                                placeholder="Select Enquiry Name"
                                            /> */}
                                        </div>
                                        <div class="field-placeholder">
                                            Enquiry Type <span class="text-danger">*</span>
                                        </div>
                                        <samp class=" error" id="errorMobileno"></samp>
                                    </div>
                                </Form.Item>
                            </Grid>
                            <Grid item xs={12} lg={3} sm={12} xl={3}>
                                <Form.Item
                                    // label="Short Name"
                                    name=" EnquiryPersonName"
                                    id="shortName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Enquiry Person Name.'
                                        }
                                    ]}
                                >
                                    <div class="field-wrapper">
                                        <div class="input-group">
                                            <Input
                                                // class="form-control"
                                                // id="mobileNo"
                                                name="EnquiryPersonName"
                                                className="textfont"
                                                type="text"
                                                // maxlength="10"
                                                // value=""
                                                // onchange="mobileNoValidation(event)"
                                                // onkeypress="if(this.value.length==10) return false;"
                                                placeholder="Enter  Enquiry Person Name"
                                            />
                                        </div>
                                        <div class="field-placeholder">
                                            Enquiry Person Name <span class="text-danger">*</span>
                                        </div>
                                        <samp class=" error" id="errorMobileno"></samp>
                                    </div>
                                </Form.Item>
                            </Grid>
                            <Grid item xs={12} lg={3} sm={12} xl={3}>
                                <Form.Item
                                    // label="Main Group"
                                    // id="maingroupId"
                                    name="ContactNumber"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Enter Contact Number.'
                                        }
                                    ]}
                                >
                                    <div class="field-wrapper">
                                        <div class="input-group">
                                            <Input
                                                // class="form-control"
                                                // id="mobileNo"
                                                name="ContactNumber"
                                                type="Number"
                                                className="textfont"
                                                // maxlength="10"
                                                // value=""
                                                // onchange="mobileNoValidation(event)"
                                                // onkeypress="if(this.value.length==10) return false;"
                                                placeholder="Enter Contact Number"
                                            />
                                        </div>
                                        <div class="field-placeholder">
                                            Contact Number <span class="text-danger">*</span>
                                        </div>
                                        <samp class=" error" id="errorMobileno"></samp>
                                    </div>
                                </Form.Item>
                            </Grid>
                            <Grid item xs={12} lg={3} sm={12} xl={3}>
                                <Form.Item
                                    // label="Description"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Enter Email.'
                                        }
                                    ]}
                                >
                                    <div class="field-wrapper">
                                        <div class="input-group">
                                            <Input
                                                // class="form-control"
                                                // id="mobileNo"
                                                name="email"
                                                type="email"
                                                className="textfont"
                                                // maxlength="10"
                                                // value=""
                                                // onchange="mobileNoValidation(event)"
                                                // onkeypress="if(this.value.length==10) return false;"
                                                placeholder="Enter Email"
                                            />
                                        </div>
                                        <div class="field-placeholder">
                                            Email <span class="text-danger">*</span>
                                        </div>
                                        <samp class=" error" id="errorMobileno"></samp>
                                    </div>
                                </Form.Item>
                            </Grid>
                            <Grid item xs={12} lg={2} sm={12} xl={2}>
                                <Form.Item
                                    // label="Description"
                                    name="departmentName"
                                    // rules={[
                                    //     {
                                    //         required: true,
                                    //         message: 'Please enter Department Name.'
                                    //     }
                                    // ]}
                                >
                                    <div class="field-wrapper">
                                        <div class="input-group">
                                            <Select
                                                showSearch
                                                value={editselectedtype && editselectedtype.value ? editselectedtype : detailsvaluess}
                                                placeholder={'Enter Department Name'}
                                                className="placeholdetextsty textfont"
                                                defaultActiveFirstOption={false}
                                                showArrow={true}
                                                filterOption={false}
                                                // onSearch={handlepationtnameSearch}
                                                // onChange={handlepationtnameChange}
                                                notFoundContent={null}
                                                // options={(enquiryTypedata || []).map((d) => ({
                                                //     value: d.id,
                                                //     label: d.MEMBER_NAME
                                                // }))}
                                            />
                                            {/* <input
                                                // class="form-control"
                                                // id="mobileNo"
                                                name=" Department Name"
                                                type="text"
                                                // maxlength="10"
                                                // value=""
                                                // onchange="mobileNoValidation(event)"
                                                // onkeypress="if(this.value.length==10) return false;"
                                                placeholder="Enter Department Name"
                                            /> */}
                                        </div>
                                        <div class="field-placeholder">
                                            Department Name <span class="text-danger">*</span>
                                        </div>
                                        <samp class=" error" id="errorMobileno"></samp>
                                    </div>
                                </Form.Item>
                            </Grid>
                            <Grid item xs={12} lg={2} sm={12} xl={2}>
                                <Form.Item
                                    // label="Description"
                                    name="employeeName"
                                    // rules={[
                                    //     {
                                    //         required: true,
                                    //         message: 'Please enter Employee Name.'
                                    //     }
                                    // ]}
                                >
                                    <div class="field-wrapper">
                                        <div class="input-group">
                                            <Select
                                                showSearch
                                                value={editselectedtype && editselectedtype.value ? editselectedtype : detailsvaluess}
                                                placeholder={'Enter Employee Name'}
                                                className="placeholdetextsty textfont"
                                                defaultActiveFirstOption={false}
                                                showArrow={true}
                                                filterOption={false}
                                                // onSearch={handlepationtnameSearch}
                                                // onChange={handlepationtnameChange}
                                                notFoundContent={null}
                                                // options={(enquiryTypedata || []).map((d) => ({
                                                //     value: d.id,
                                                //     label: d.MEMBER_NAME
                                                // }))}
                                            />
                                        </div>
                                        {/* <div class="input-group">
                                            <input
                                                // class="form-control"
                                                // id="mobileNo"
                                                name="Employee Name"
                                                type="text"
                                                // maxlength="10"
                                                // value=""
                                                // onchange="mobileNoValidation(event)"
                                                // onkeypress="if(this.value.length==10) return false;"
                                                placeholder="Enter Employee Name"
                                            />
                                        </div> */}
                                        <div class="field-placeholder">
                                            Employee Name <span class="text-danger">*</span>
                                        </div>
                                        <samp class=" error" id="errorMobileno"></samp>
                                    </div>
                                </Form.Item>
                            </Grid>
                            <Grid item xs={12} lg={4} sm={12} xl={4}>
                                <Form.Item
                                    // label="Description"
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Enter Address.'
                                        }
                                    ]}
                                >
                                    <div class="field-wrapper">
                                        <div class="input-group">
                                            <TextArea
                                                // class="form-control"
                                                // id="mobileNo"
                                                name="address"
                                                type="text"
                                                className="textfont"
                                                // maxlength="10"
                                                // value=""
                                                // onchange="mobileNoValidation(event)"
                                                // onkeypress="if(this.value.length==10) return false;"
                                                placeholder="Enter Address"
                                                rows={2}
                                            />
                                        </div>
                                        <div class="field-placeholder">
                                            Address<span class="text-danger">*</span>
                                        </div>
                                        <samp class=" error" id="errorMobileno"></samp>
                                    </div>
                                </Form.Item>
                            </Grid>
                            <Grid item xs={12} lg={2} sm={12} xl={2}>
                                <Form.Item
                                    // label="Pin"
                                    name="pincode"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Enter Pincode.'
                                        }
                                    ]}
                                >
                                    <div class="field-wrapper">
                                        <div class="input-group">
                                            <Input
                                                // class="form-control"
                                                // id="mobileNo"
                                                name="pincode"
                                                type="Number"
                                                className="textfont"
                                                // maxlength="10"
                                                // value=""
                                                // onchange="mobileNoValidation(event)"
                                                // onkeypress="if(this.value.length==10) return false;"
                                                placeholder="Enter Pincode"
                                            />
                                        </div>
                                        <div class="field-placeholder">
                                            Pincode <span class="text-danger">*</span>
                                        </div>
                                        <samp class=" error" id="errorMobileno"></samp>
                                    </div>
                                </Form.Item>
                            </Grid>
                            <Grid item xs={12} lg={2} sm={12} xl={2}>
                                <Form.Item
                                    // label="Date"
                                    name="enquiryDate"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Enquiry Date.'
                                        }
                                    ]}
                                >
                                    <div class="field-wrapper">
                                        <div class="input-group">
                                            <DatePicker
                                                fullWidth
                                                defaultValue={dayjs(new Date())}
                                                format={dateFormat}
                                                className="datepicinp textfont"
                                                placement={placement}
                                                placeholder={'Enter Enquiry Date'}
                                            />
                                            {/* <input
                                                // class="form-control"
                                                // id="mobileNo"
                                                name="Enquiry Date"
                                                type="date"
                                                // maxlength="10"
                                                // value=""
                                                // onchange="mobileNoValidation(event)"
                                                // onkeypress="if(this.value.length==10) return false;"
                                                placeholder="Enter Enquiry Date"
                                            /> */}
                                        </div>
                                        <div class="field-placeholder">
                                            Enquiry Date <span class="text-danger">*</span>
                                        </div>
                                        <samp class=" error" id="errorMobileno"></samp>
                                    </div>
                                </Form.Item>
                            </Grid>
                            <Grid item xs={12} lg={2} sm={12} xl={2}>
                                <Form.Item
                                    // label="Date"
                                    name="enquiryTime"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Enquiry Time .'
                                        }
                                    ]}
                                >
                                    <div class="field-wrapper">
                                        <div class="input-group">
                                            <Input
                                                // class="form-control"
                                                // id="mobileNo"
                                                name="enquiryTime"
                                                type="time"
                                                className="textfont"
                                                // maxlength="10"
                                                // value=""
                                                // onchange="mobileNoValidation(event)"
                                                // onkeypress="if(this.value.length==10) return false;"
                                                placeholder="Enter Enquiry Time "
                                            />
                                        </div>
                                        <div class="field-placeholder">
                                            Enquiry Time <span class="text-danger">*</span>
                                        </div>
                                        <samp class=" error" id="errorMobileno"></samp>
                                    </div>
                                </Form.Item>
                            </Grid>
                            <Grid item xs={12} lg={3} sm={12} xl={3}>
                                <Form.Item
                                    // label="Date"
                                    name="referrdBy"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Enter Referrd By.'
                                        }
                                    ]}
                                >
                                    <div class="field-wrapper">
                                        <div class="input-group">
                                            <Input
                                                // class="form-control"
                                                // id="mobileNo"
                                                name="referrdBy"
                                                type="text"
                                                className="textfont"
                                                // maxlength="10"
                                                // value=""
                                                // onchange="mobileNoValidation(event)"
                                                // onkeypress="if(this.value.length==10) return false;"
                                                placeholder="Enter Contact Number"
                                            />
                                        </div>
                                        <div class="field-placeholder">
                                            Referrd By <span class="text-danger">*</span>
                                        </div>
                                        <samp class=" error" id="errorMobileno"></samp>
                                    </div>
                                </Form.Item>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} lg={12} sm={12} xl={12}>
                            <Form.Item>
                                <div>
                                    <Button
                                        className="btn btn-danger m-1 text-center  float-end"
                                        style={{ paddingtop: '3px', height: '38px' }}
                                    >
                                        <FontAwesomeIcon icon={faXmark} className="mx-1" />
                                        Cancel
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="btn btn-primary m-1 text-center  float-end"
                                        style={{ height: '38px' }}
                                        loadingsepaper={loadingsepaper}
                                        // disabled={!email || email === ''}
                                    >
                                        <FontAwesomeIcon icon={faFloppyDisk} className="mx-1" />
                                        Save
                                    </Button>
                                </div>
                            </Form.Item>
                        </Grid>
                    </Typography>
                    {/* </MainCard> */}
                </Form>
            </Card>
        </>
    );
};

export default Brandfrom;
