// material-ui
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { number } from 'prop-types';
import DataTable, { FilterComponent } from 'react-data-table-component';
import { DatePicker, Radio } from 'antd';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import { Space, Table, Tag, Select, Input, InputNumber, Card } from 'antd';
import Box from '@mui/material/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faCircleCheck, faCaretLeft, faCaretRight, faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Upload, Button, Icon, Form, Modal, Checkbox } from 'antd';
import { TextareaAutosize } from '@mui/base';
import swal from 'sweetalert';
import { UploadOutlined, QuestionOutlined } from '@ant-design/icons';
import moment from 'moment';
import dayjs from 'dayjs';
import './Familyfrom.css';
import {
    familyrelationdetailsGetidByApi,
    familyrelationdetailsUpdateByApi,
    familyrelationfromsubmitByApi
} from 'components/Helper/familyrelationmaster';
let timeout;
let currentValue;
const { RangePicker } = DatePicker;
// const dateFormat = 'YYYY-MM-DD';
const dateFormat = 'DD-MM-YYYY';

const Familyform = () => {
    const [loading, setloading] = useState(false);
    const [Familyloding, setFamilyloding] = useState(false);
    const [familyetiddata, setfamilyetiddata] = useState(null);
    const [checkboxxx, setCheckbox] = useState(false);
    const [placement, SetPlacement] = useState('bottomRight');
    let { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const [imgeidfile, setImgeidfile] = useState([]);

    useEffect(() => {
        if (typeof id !== 'undefined') {
            getbannertailbyid();
        } else {
            form.setFieldValue('bannerStartDate', dayjs(new Date()));
            // form.setFieldValue('bannerEndDate', dayjs(new Date()));
        }
    }, [id]);
    const getbannertailbyid = () => {
        setFamilyloding(true);
        familyrelationdetailsGetidByApi(id)
            .then(
                async (res) => {
                    console.log(' success');
                    let response = res;
                    setfamilyetiddata(response);
                    console.log('response', response);
                    form.resetFields();
                    console.log('res', res);
                    // console.log(' response', response);
                    setFamilyloding(false);
                },
                (err) => {
                    console.log('err', err);
                    setFamilyloding(false);
                }
            )
            .catch();
    };
    const onFinishbannerslider = async (values) => {
        console.log('----------', values);
        setloading(true);
        console.log('Success:', values);

        if (typeof id === 'undefined') {
            let payloadData = {
                ...values
            };
            console.log('payloaddata', payloadData);
            familyrelationfromsubmitByApi(payloadData).then(
                (res) => {
                    console.log('resbanner', res);
                    swal('success', 'success fully', 'success');
                    navigate('/Familytable');
                    setloading(false);
                },
                (err) => {
                    console.log(err);
                    swal('err', 'family Types ', 'error');
                }
            );
        } else {
            // //update
            console.log('Success:', values);
            let payloadData = {
                ...values,
                id: id
            };
            setloading(true);
            await familyrelationdetailsUpdateByApi(payloadData)
                .then(
                    async (res) => {
                        console.log('res', res);
                        console.log(' success');
                        swal('family Update', 'Update success Fully', 'success');
                        navigate('/Familytable');
                        setloading(false);
                    },
                    (err) => {
                        console.log('error', err);
                        setloading(false);
                        swal('family', 'Not updated', 'error');
                    }
                )
                .catch();
        }
    };
    // };

    // const onFinishFailedbannerslider = (value) => {
    //     console.log('value', value);
    // };

    // <================================== End Api call ==========================================>
    return (
        <>
            <Typography variant="h5" className="mx-2">
                <small className="text-black-50" style={{ fontFamily: 'Poppins' }}>
                    Home
                </small>
                {'/'} <b>कुटुंब </b>
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
                            <b>कुटुंब </b>
                        </span>
                    </h5>
                </div>
                <hr className="MuiDivider-root MuiDivider-fullWidth css-1wnin34-MuiDivider-root"></hr>
                <Form
                    name="basic"
                    initialValues={familyetiddata}
                    form={form}
                    onFinish={onFinishbannerslider}
                    // onFinishFailed={onFinishFailedbannerslider}
                    autoComplete="off"
                >
                    <Typography variant="body2">
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={4} sm={12} xl={4}>
                                <Form.Item
                                    // label="Description"
                                    name="familyName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Enter Family Name.'
                                        }
                                    ]}
                                >
                                    <Input name="familyName" className="datepicinp textfont" placeholder={'Enter Family Name'} />
                                </Form.Item>
                                <span className="textlabel">
                                    Family Name<span className="text-danger">*</span>{' '}
                                </span>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} lg={12} sm={12} xl={12}>
                            <Form.Item>
                                <div>
                                    <Link to="/Familytable">
                                        <Button
                                            className="btn btn-danger m-1 text-center  float-end"
                                            style={{ paddingtop: '3px', height: '38px' }}
                                        >
                                            <FontAwesomeIcon icon={faXmark} className="mx-1" />
                                            Cancel
                                        </Button>
                                    </Link>
                                </div>
                                <div>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="btn btn-primary m-1 text-center  float-end"
                                        style={{ height: '38px' }}
                                        loading={loading}
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

export default Familyform;
