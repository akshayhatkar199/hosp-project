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
import CreatableSelect from 'react-select/creatable';
// import { colourOptions } from '../data';
import dayjs from 'dayjs';
import './Memberfrom.css';
import {
    memberdetailsGetidByApi,
    memberdetailsUpdateByApi,
    memberfromsubmitByApi,
    MembermasterdropdownGetByApi
} from 'components/Helper/membermaster';
let timeout;
let currentValue;
const { RangePicker } = DatePicker;
const dateFormat = 'DD-MM-YYYY';

const Memberform = () => {
    const [loading, setloading] = useState(false);
    const [Memberloding, setMemberloding] = useState(false);
    const [Memberetiddata, setEducationetiddata] = useState(null);
    const [data, setDataMember] = useState([]);
    const [checkboxxx, setCheckbox] = useState(false);
    const [memberIdsearchData, setMemberIdsearchData] = useState([]);
    const [idMember, setIdMember] = useState([]);
    const [placement, SetPlacement] = useState('bottomRight');
    const [memberIdAdd, setMemberId] = useState();
    let { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (typeof id !== 'undefined') {
            getmemberbyid();
        } else {
            // form.setFieldValue('bannerStartDate', dayjs(new Date()));
            // form.setFieldValue('bannerEndDate', dayjs(new Date()));
        }
    }, [id]);
    const getmemberbyid = () => {
        setMemberloding(true);
        memberdetailsGetidByApi(id)
            .then(
                async (res) => {
                    console.log(' success');
                    let response = res;
                    setEducationetiddata(response);
                    console.log('response', response);
                    form.resetFields();
                    console.log('res', res);
                    // console.log(' response', response);
                    setMemberloding(false);
                },
                (err) => {
                    console.log('err', err);
                    setMemberloding(false);
                }
            )
            .catch();
    };
    const onFinishmember = async (values) => {
        console.log('----------', values);
        setloading(true);
        console.log('Success:', values);

        if (typeof id === 'undefined') {
            let payloadData = {
                ...values
            };
            console.log('payloaddata', payloadData);
            memberfromsubmitByApi(payloadData).then(
                (res) => {
                    console.log('resbanner', res);
                    swal('success', 'success fully', 'success');
                    navigate('/Membertable');
                    setloading(false);
                },
                (err) => {
                    console.log(err);
                    swal('err', 'Member Types ', 'error');
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
            await memberdetailsUpdateByApi(payloadData)
                .then(
                    async (res) => {
                        console.log('res', res);
                        console.log(' success');
                        swal('Member Update', 'Update success Fully', 'success');
                        navigate('/Membertable');
                        setloading(false);
                    },
                    (err) => {
                        console.log('error', err);
                        setloading(false);
                        swal('Member', 'Not updated', 'error');
                    }
                )
                .catch();
        }
    };
    // };

    // const onFinishFailedbannerslider = (value) => {
    //     console.log('value', value);
    // };
    // <=============================================================================================>
    const memberhandleSearch = (newValue) => {
        if (newValue) {
            fetchmember(newValue, setDataMember);
        } else {
            setDataMember([]);
        }
    };
    const memberhandleChange = (newValue) => {
        setMemberId(newValue);
    };
    const fetchmember = (memberIdAdd, callback) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = memberIdAdd;
        const fake = () => {
            const payloadData = {
                memberName: memberIdAdd,
                search: currentValue,
                searchid: currentValue
            };
            MembermasterdropdownGetByApi(payloadData).then((res) => {
                console.log('res--', res);
                setMemberIdsearchData(res.data);
                if (currentValue === memberIdAdd) {
                    const Cdata = res.data.map((item) => ({
                        value: item.id,
                        text: item.id + item.memberName
                    }));
                    callback(Cdata);
                }
            });
        };
        timeout = setTimeout(fake, 300);
    };

    // <================================== End Api call ==========================================>
    return (
        <>
            <Typography variant="h5" className="mx-2">
                <small className="text-black-50" style={{ fontFamily: 'Poppins' }}>
                    Home
                </small>
                {'/'} <b>मेंबर </b>
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
                            <b>मेंबर </b>
                        </span>
                    </h5>
                </div>
                <hr className="MuiDivider-root MuiDivider-fullWidth css-1wnin34-MuiDivider-root"></hr>
                <Form
                    name="basic"
                    initialValues={Memberetiddata}
                    form={form}
                    onFinish={onFinishmember}
                    // onFinishFailed={onFinishFailedbannerslider}
                    autoComplete="off"
                >
                    <Typography variant="body2">
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={4} sm={12} xl={4}>
                                <Form.Item
                                    // label="Description"
                                    name="memberName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Enter Member Name.'
                                        }
                                    ]}
                                >
                                    <Input name="memberName" className="datepicinp textfont" placeholder={'Enter Member Name'} />
                                </Form.Item>
                                <span className="textlabel">
                                    Member Name<span className="text-danger">*</span>{' '}
                                </span>
                            </Grid>
                            <Grid item xs={12} lg={4} sm={12} xl={4}>
                                <Form.Item
                                    name="memberName"
                                    id="outlined-basic"
                                    variant="outlined"
                                    type="text"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Enter your sort Number!'
                                        }
                                    ]}
                                    hasFeedback
                                    // dropdownRender
                                >
                                    <Select
                                        showSearch
                                        value={memberIdsearchData}
                                        placeholder={'search'}
                                        defaultActiveFirstOption={false}
                                        showArrow={true}
                                        filterOption={false}
                                        labelInValue={false}
                                        onSearch={memberhandleSearch}
                                        onChange={memberhandleChange}
                                        notFoundContent={null}
                                        options={(memberIdsearchData || []).map((d) => ({
                                            value: d.id,
                                            label: d.id + ' ' + d.memberName
                                        }))}
                                    />
                                </Form.Item>
                            </Grid>
                            {/* <Grid item xs={12} lg={4} sm={12} xl={4}>
                                <Form.Item
                                    name="memberName"
                                    id="outlined-basic"
                                    variant="outlined"
                                    type="text"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Enter your sort Number!'
                                        }
                                    ]}
                                    hasFeedback
                                >
                                    <CreatableSelect
                                        isNOClearable
                                        onChange={memberhandleChange}
                                        name="memberName"
                                        placeholder={'search'}
                                        onSearch={memberhandleSearch}
                                        value={(memberIdsearchData || []).map((d) => ({
                                            value: d.id,
                                            label: d.id + ' ' + d.memberName
                                        }))}
                                        options={memberIdsearchData}
                                    />
                                </Form.Item>
                            </Grid> */}
                        </Grid>
                        <Grid item xs={12} lg={12} sm={12} xl={12}>
                            <Form.Item>
                                <div>
                                    <Link to="/Membertable">
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

export default Memberform;
