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
import { faPenToSquare, faCircleCheck, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { Upload, Button, Icon, Form, Modal, Checkbox } from 'antd';
import { TextareaAutosize } from '@mui/base';
import swal from 'sweetalert';
import User from '../../image/undraw_user.png';
import { UploadOutlined, QuestionOutlined } from '@ant-design/icons';
import moment from 'moment';
import dayjs from 'dayjs';
// import Footer from '../components/Footer';
import './casepaper.css';
import {
    fromsubmitedByApi,
    caspaperMEMBER_IDByApi,
    casepaperGetByApi,
    casepaperUpdateByApi,
    casepaperExcellsheetByApi
} from 'components/Helper/case_paper';
import { MemberregidropdownnameSearchApi, modelfromByApi } from 'components/Helper/member_rgi';
let timeout;
let currentValue;
const { RangePicker } = DatePicker;
// const dateFormat = 'YYYY-MM-DD';
const dateFormat = 'DD-MM-YYYY';

const Casepaper = () => {
    const [placement, SetPlacement] = useState('bottomRight');
    const [pationtnamedata, setpationtpationtnamedata] = useState([]);
    const [pationtnamevalue, setPationtnameValue] = useState();
    const [isErrorPatient, setIsErrorPatient] = useState('');
    const [pationtnameSelectedName, setPationtnameSelectedName] = useState();
    const [isModalOpenpatientname, setIsModalOpenpatientname] = useState();
    const [editselectedPatient, seteditselectedPatient] = useState();
    const [loading, setloading] = useState(false);
    const [loadingmodel, setloadingmodel] = useState(false);
    const [loadingcasepaper, setloadingsepaper] = useState(false);
    const [casepaperData, setCasepaperData] = useState([]);
    const [parpage, setParpage] = useState(10);
    const [casepapergetiddata, setcasepapergetiddata] = useState(null);
    const [casepaperregigetiddata, setcasepaperregigetiddata] = useState(null);
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

    const columns = [
        {
            title: 'Date',
            dataIndex: 'REGI_DATE',
            key: 'REGI_DATE'
        },
        {
            title: 'Description',
            dataIndex: 'DESCRIPTION',
            key: 'DESCRIPTION'
        }
    ];

    const paginationComponentOptions = {
        rowsPerPageText: '',
        noRowsPerPage: true
    };
    useEffect(() => {
        if (typeof id !== 'undefined') {
            getcasepaerdatabyid();
        } else {
            form.setFieldValue('REGI_DATE', dayjs(new Date()));
            formmodal.setFieldValue('REGI_DATE', dayjs(new Date()));
        }
    }, [id]);
    const getcasepaerdatabyid = () => {
        setloadingsepaper(true);
        casepaperGetByApi(id)
            .then(
                async (res) => {
                    console.log(' success');
                    let response = res;
                    response.REGI_DATE = dayjs(response.REGI_DATE, dateFormat); // moment(new Date(response.REGI_DATE)).format('YYYY-MM-DD'); // moment();
                    setcasepapergetiddata(response);
                    setPationtnameValue(res.MEMBER_ID);
                    seteditselectedPatient({
                        value: res.MEMBER_ID,
                        label: res.MEMBER_NAME
                    });
                    form.resetFields();
                    console.log('res', res);
                    setloadingsepaper(false);
                    let payloadData = {
                        MEMBER_ID: res.MEMBER_ID,
                        offset: 0,
                        limit: 10
                    };
                    fetchcasepaperlist(payloadData, null);
                },
                (err) => {
                    console.log('err', err);
                    setloadingsepaper(false);
                }
            )
            .catch();
    };
    const onFinishcasepaper = (values) => {
        console.log('----------', values);
        // console.log('dfff', moment(new Date(values.REGI_DATE)).format('YYYY-MM-DD'));
        console.log('dfff', moment(new Date(values.REGI_DATE)).format('DD-MM-YYYY'));
        if (pationtnamevalue && pationtnamevalue > 0) {
            setIsErrorPatient('');
            if (typeof id === 'undefined') {
                setloadingsepaper(true);
                console.log('Success:', values);
                console.log('pationtnamevalue:', pationtnamevalue);
                let payloadData = {
                    ...values,
                    MEMBER_ID: pationtnamevalue,
                    MEMBER_NAME: pationtnameSelectedName,
                    // REGI_DATE: moment(new Date(values.REGI_DATE)).format('YYYY-MM-DD')
                    REGI_DATE: moment(new Date(values.REGI_DATE)).format('DD-MM-YYYY')
                    // ,
                    // REGI_DATE: '' + moment(values.REGI_DATE).format('YYYY-MM-DD') + ''
                };
                fromsubmitedByApi(payloadData).then((res) => {
                    console.log('res', res);
                    swal('success', 'success fully', 'success');
                    navigate('/casepaperList');
                    setloadingsepaper(false);
                });

                (err) => {
                    console.log(err);
                    swal('err', 'success fully', 'err');
                };
            } else {
                // //update
                console.log('Success:', values);
                let payloadData = {
                    ...values,
                    id: id,
                    MEMBER_ID: pationtnamevalue,
                    MEMBER_NAME: pationtnameSelectedName,
                    // REGI_DATE: moment(new Date(values.REGI_DATE)).format('YYYY-MM-DD')
                    REGI_DATE: moment(new Date(values.REGI_DATE)).format('DD-MM-YYYY')
                };
                setloadingsepaper(true);
                casepaperUpdateByApi(payloadData)
                    .then(
                        async (res) => {
                            console.log('res', res);
                            console.log(' success');
                            swal('Case paper', 'Update success Fully', 'success');
                            navigate('/casepaperList');
                            setloadingsepaper(false);
                        },
                        (err) => {
                            // console.log("error");
                            setloadingsepaper(false);
                            swal('Case paper', 'Not updated', 'error');
                        }
                    )
                    .catch();
            }
        } else {
            setIsErrorPatient('Please select name !');
        }
    };

    const placementChange = (e) => {
        SetPlacement(e.target.value);
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
            pationtnamefetch(newValue, setpationtpationtnamedata);
        } else {
            setpationtpationtnamedata([]);
        }
    };
    const fetchcasepaperlist = async (payloadData, current) => {
        let currentt = current;
        caspaperMEMBER_IDByApi(payloadData).then(
            async (res) => {
                console.log('res=>', res);
                console.log('current----------', currentt);
                if (current) {
                    await setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            current: currentt
                        }
                    });
                } else {
                    await setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            total: res.data.count
                        }
                    });
                }

                setCasepaperData(res.data.data);
                setloading(false);
            },
            (err) => {
                console.log(err);
            }
        );
    };
    const handlepationtnameChange = (newValue, n, offset = 0, current = null) => {
        setIsErrorPatient('');
        console.log('newValue', n);
        seteditselectedPatient(null);
        setPationtnameSelectedName(n.label);
        setPationtnameValue(newValue);
        let payloadData = {
            MEMBER_ID: newValue,
            offset: offset,
            limit: 10
        };
        fetchcasepaperlist(payloadData, current);
    };
    const pationtnamefetch = (pationtnamevalue, callback) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = pationtnamevalue;
        const fakepationtname = () => {
            const payloadData = {
                search: currentValue
            };
            MemberregidropdownnameSearchApi(payloadData).then((res) => {
                console.log('res--', res);
                setpationtpationtnamedata(res.data);
                // if (currentValue === pationtnamevalue) {
                //     const Cdata = res.data.map((item) => ({
                //         value: item.id,
                //         text: item.patientName
                //     }));
                //     callback(Cdata);
                // }
            });
        };
        timeout = setTimeout(fakepationtname, 300);
    };
    console.log('pationtnamevalue', pationtnamevalue);
    // console.log('data', pationtnamedata);
    // End patient name dropdown api
    // <==================================================================================>
    // start Model function
    console.log('pationtnamedata', pationtnamedata);
    const onpationtnameSubmitModel = (value) => {
        console.log('dfff', moment(new Date(value.REGI_DATE)).format('DD-MM-YYYY'));
        setloadingmodel(true);
        console.log('success', value);
        let payloadData = {
            ...value,
            // REGI_DATE: moment(new Date(value.REGI_DATE)).format('YYYY-MM-DD')
            REGI_DATE: moment(new Date(value.REGI_DATE)).format('DD-MM-YYYY')
        };
        modelfromByApi(payloadData).then((res) => {
            console.log('res-----------', res);
            let newData = pationtnamedata;
            newData.push({
                id: '' + res.id + '',
                MEMBER_NAME: '' + res.MEMBER_NAME + ''
            });
            console.log('newData', newData);
            seteditselectedPatient({
                value: res.id,
                label: res.MEMBER_NAME
            });
            setpationtpationtnamedata(newData);
            setPationtnameValue(res.id);
            setPationtnameSelectedName(res.MEMBER_NAME);
            setIsModalOpenpatientname(false);
            // navigate('/PationtDetails');
            // navigate('/Casepaper');
            setloadingmodel(false);
            swal('success', 'success fully', 'success');
        });

        (err) => {
            console.log(err);
            swal('err', 'success fully', 'err');
        };
    };
    // start Model function
    // <=============================================================================>
    // <======================================================================================>
    //checkbox
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    };
    // <================================== Table onChange function handleTableChange  ==========================================>
    const handleMemberIddChange = async (pagination, filters, sorter) => {
        console.log('pagination', pagination);
        await setTableParams({
            ...tableParams,
            pagination: {
                ...tableParams.pagination,
                current: pagination.current,
                pageSize: pagination.pageSize
            }
        });
        let offset = (pagination.current - 1) * parpage;
        console.log('offset', offset);
        let payloadData = {
            MEMBER_ID: pationtnamevalue,
            offset: offset,
            limit: 10
        };
        fetchcasepaperlist(payloadData, pagination.current);
    };
    // <================================== End Table onChange function handleTableChange  ==========================================>
    // <================================== Api call ==========================================>

    // useEffect(() => {
    //     casepaperbyfun();
    // }, []);

    // const casepaperbyfun = (offset = 0, current = null) => {
    //     setloading(true);
    //     let payloadData = {
    //         MEMBER_ID: pationtnamevalue,
    //         offset: offset,
    //         limit: 10
    //     };
    //     caspaperMEMBER_IDByApi(payloadData).then(async (res) => {
    //         console.log('res=>', res);
    //         console.log('current----------', current);
    //         if (current) {
    //             await setTableParams({
    //                 ...tableParams,
    //                 pagination: {
    //                     ...tableParams.pagination,
    //                     current: current
    //                 }
    //             });
    //         } else {
    //             await setTableParams({
    //                 ...tableParams,
    //                 pagination: {
    //                     ...tableParams.pagination,
    //                     total: res.data.count
    //                 }
    //             });
    //         }

    //         setCasepaperData(res.data.data);
    //         setloading(false);
    //     });
    //     (err) => {
    //         console.log(err);
    //     };
    // };

    // <================================== End Api call ==========================================>
    return (
        <>
            <Typography variant="h5" className="mx-2">
                <small className="text-black-50">Home</small> {'/'} <b> File Case Paper Detail </b>
            </Typography>
            <br></br>
            <Card className="driver-create-card ">
                <div className="title-main">
                    <h5>
                        {/* <FontAwesomeIcon icon={faCaretLeft} /> */}
                        <span className=" ribbon">Casepaper </span>
                        {/* <FontAwesomeIcon icon={faCaretRight} /> */}
                    </h5>
                </div>
                <hr className="MuiDivider-root MuiDivider-fullWidth css-1wnin34-MuiDivider-root"></hr>
                <Form name="basic" initialValues={casepapergetiddata} onFinish={onFinishcasepaper} autoComplete="off" form={form}>
                    <Grid item xs={12} container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} lg={6} md={6} sm={12}>
                            {/* <====================================================> */}
                            {/* <Grid item xs={12} lg={12} md={12} sm={12} container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}> */}
                            {/* <Grid xs={12} lg={4} md={6} sm={6}>
                                    <Form.Item
                                        name={['user', 'Srno']}
                                        label="Sr No"
                                        rules={[
                                            {
                                                type: 'number'
                                            }
                                        ]}
                                    >
                                        <InputNumber fullWidth />
                                    </Form.Item>
                                </Grid>
                                <Grid xs={12} lg={4} md={6} sm={6}>
                                    <Form.Item
                                        name={['user', 'caseno']}
                                        label="Case No"
                                        rules={[
                                            {
                                                type: 'number'
                                            }
                                        ]}
                                    >
                                        <InputNumber fullWidth />
                                    </Form.Item>
                                </Grid> */}
                            {/* <Grid xs={12} lg={12} md={12} sm={12}>
                                    <Form.Item
                                        name=" Date"
                                        id="outlined-basic"
                                        variant="outlined"
                                        label="Date"
                                        type="Date"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Enter your start Date!'
                                            }
                                        ]}
                                    > */}
                            {/* <span>Start Date</span> */}
                            {/* <TextField id="outlined-basic" type="Date" /> */}
                            {/* <DatePicker fullWidth placement={placement} /> */}
                            {/* </Form.Item>
                                </Grid> */}
                            {/* </Grid> */}
                            {/* <=======================================================> */}
                            <Form.Item
                                name="MEMBER_NAME"
                                id="outlined-basic"
                                label="Name"
                                className="nameinput_AADbutton"
                                variant="outlined"
                                type="text"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: 'Please Enter your Patient Name!'
                                //     }
                                // ]}
                                hasFeedback
                            >
                                <Select
                                    showSearch
                                    value={editselectedPatient && editselectedPatient.value ? editselectedPatient : pationtnamevalue}
                                    placeholder={'search Name'}
                                    defaultActiveFirstOption={false}
                                    showArrow={true}
                                    filterOption={false}
                                    onSearch={handlepationtnameSearch}
                                    onChange={handlepationtnameChange}
                                    notFoundContent={null}
                                    options={(pationtnamedata || []).map((d) => ({
                                        value: d.id,
                                        label: d.MEMBER_NAME
                                    }))}
                                />
                                <Button type="button" onClick={showModalpatientname} className="btn-sm insize-set bgimg btn ">
                                    <img src={User} alt="mant" className="img-fluid" style={{ marginTop: '-3px' }} />
                                </Button>
                                <span className="ant-form-item-explain-error">{isErrorPatient}</span>
                            </Form.Item>
                            {/* <==================================================================> */}
                            {/* Start Modal Patient Detail */}
                            <Modal
                                title="File New Patient Detail"
                                open={isModalOpenpatientname}
                                onOk={handleOkpatientname}
                                className="modal-size"
                                onCancel={handleCancelpatientname}
                                footer={null}
                            >
                                <hr className="MuiDivider-root MuiDivider-fullWidth css-1wnin34-MuiDivider-root"></hr>
                                <Grid
                                    item
                                    xs={12}
                                    lg={12}
                                    md={12}
                                    sm={12}
                                    container
                                    spacing={1}
                                    columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}
                                >
                                    <Form name="basic" onFinish={onpationtnameSubmitModel} autoComplete="off" form={formmodal}>
                                        {/* <Grid
                                            item
                                            xs={12}
                                            lg={12}
                                            md={12}
                                            sm={12}
                                            container
                                            spacing={1}
                                            columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}
                                        > */}
                                        {/* <Grid xs={12} lg={6} md={6} sm={12}>
                                                <Form.Item
                                                    label="Case Paper No"
                                                    name="casePaperNo"
                                                    type="number"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please input your Case Paper No!'
                                                        }
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </Grid> */}
                                        {/* <Grid xs={12} lg={6} md={6} sm={12}>
                                                <Form.Item
                                                    name=" Date"
                                                    id="outlined-basic"
                                                    variant="outlined"
                                                    label="Date"
                                                    type="Date"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please Enter your  Date!'
                                                        }
                                                    ]}
                                                > */}
                                        {/* <span>Start Date</span> */}
                                        {/* <TextField id="outlined-basic" type="Date" /> */}
                                        {/* <DatePicker fullWidth placement={placement} /> */}
                                        {/* </Form.Item>
                                            </Grid> */}
                                        {/* </Grid> */}
                                        {/* <==============================================================================> */}
                                        <Form.Item
                                            name="MEMBER_NAME"
                                            id="outlined-basic"
                                            variant="outlined"
                                            // onChange={(e) => {
                                            //     setCountrynamdataModel(e.target.value);
                                            // }}
                                            type="text"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please Enter your Patient Name!'
                                                }
                                            ]}
                                            hasFeedback
                                        >
                                            <TextField
                                                // id="outlined-basic"
                                                allowClear
                                                fullWidth
                                                label="Patient Name"
                                                type="text"
                                            />
                                        </Form.Item>
                                        {/* <===============================================================================> */}
                                        <Form.Item
                                            fullWidth
                                            name="MEMBER_ADD"
                                            label="Address"
                                            variant="outlined"
                                            // rules={[
                                            //     {
                                            //         required: true,
                                            //         message: 'Please input your Address!'
                                            //     }
                                            // ]}
                                        >
                                            <TextArea rows={3} fullWidth />
                                        </Form.Item>

                                        {/* <=========================================================================> */}
                                        <Grid item xs={12} container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid xs={12} lg={6} md={6} sm={12}>
                                                <Form.Item
                                                    name="REGI_DATE"
                                                    id="outlined-basic"
                                                    variant="outlined"
                                                    label="Date"
                                                    type="Date"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please Enter your start Date!'
                                                        }
                                                    ]}
                                                >
                                                    {/* <span>Start Date</span> */}
                                                    {/* <TextField id="outlined-basic" type="Date" /> */}
                                                    {/* <DatePicker fullWidth placement={placement} format={dateFormat} /> */}
                                                    <DatePicker
                                                        fullWidth
                                                        defaultValue={dayjs(new Date())}
                                                        format={dateFormat}
                                                        placement={placement}
                                                    />
                                                </Form.Item>
                                            </Grid>
                                            <Grid xs={12} lg={6} md={6} sm={12}>
                                                {/* <span className="m-2"> Sex</span> */}
                                                <Form.Item
                                                    name="SEX"
                                                    className=""
                                                    // id="outlined-basic"
                                                    // variant="outlined"
                                                    // type="number"
                                                    // rules={[
                                                    //     {
                                                    //         required: true,
                                                    //         message: 'Please Enter your Whatsapp Number!'
                                                    //     }
                                                    // ]}
                                                >
                                                    <Radio.Group>
                                                        <Radio value={1}>Male</Radio>
                                                        <Radio value={2}>Female</Radio>
                                                    </Radio.Group>
                                                    {/* <Checkbox onChange={onChange}>Male</Checkbox>
                                        <Checkbox onChange={onChange}> Female</Checkbox> */}
                                                    {/* <Checkbox onChange={onChange}>दुपार</Checkbox> */}
                                                </Form.Item>
                                            </Grid>
                                        </Grid>
                                        {/* <====================================================================> */}
                                        <Grid item xs={12} container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid xs={6} lg={8} md={8} sm={12}>
                                                <Form.Item
                                                    name="MEMBER_EMAIL"
                                                    id="outlined-basic"
                                                    className="w-100"
                                                    variant="outlined"
                                                    label="E - Email"
                                                    type="email"
                                                    // rules={[
                                                    //     {
                                                    //         required: true,
                                                    //         message: 'Please Enter Your Email!'
                                                    //     },
                                                    //     { type: 'email', message: 'please enter a valid email' }
                                                    // ]}
                                                >
                                                    <Input fullWidth />
                                                    {/* <TextField fullWidth label="Email" type="email" /> */}
                                                </Form.Item>
                                            </Grid>
                                            <Grid xs={6} lg={4} md={4} sm={12}>
                                                <Form.Item
                                                    name="AGE"
                                                    id="outlined-basic"
                                                    variant="outlined"
                                                    className="w-100 "
                                                    label="Age"
                                                    type="number"
                                                    // rules={[
                                                    //     {
                                                    //         required: true,
                                                    //         message: 'Please Enter your Age!'
                                                    //     }
                                                    // ]}
                                                >
                                                    <InputNumber fullWidth />
                                                    {/* <TextField label="Age" type="number" fullWidth /> */}
                                                </Form.Item>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                            <Grid xs={12} lg={6} md={6} sm={12} xl={6}>
                                                <Form.Item
                                                    name="MOBILE_NO"
                                                    id="outlined-basic"
                                                    variant="outlined"
                                                    style={{ width: '250px' }}
                                                    label="Mobile No"
                                                    type="number"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Please Enter your Mobile Number!'
                                                        },
                                                        { max: 10, message: 'Please Enter 10 characters Mobile Number!' }
                                                    ]}
                                                >
                                                    <Input fullWidth />
                                                    {/* <TextField fullWidth label="Mobile No" type="number" /> */}
                                                </Form.Item>
                                            </Grid>
                                            <Grid xs={12} lg={6} md={6} sm={12} xl={6}>
                                                <Form.Item
                                                    name="BLOOD"
                                                    id="outlined-basic"
                                                    variant="outlined"
                                                    label="Blood Group"
                                                    type="text"
                                                    // rules={[
                                                    //     {
                                                    //         required: true,
                                                    //         message: 'Please Enter Your Blood Group!'
                                                    //     }
                                                    // ]}
                                                >
                                                    <Input fullWidth />
                                                    {/* <TextField fullWidth label="Blood Group" type="text" /> */}
                                                </Form.Item>
                                            </Grid>
                                        </Grid>
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                                className="btn btn-primary m-2 button-hov-add-to-list btn-sm rounded-pill float-end"
                                                loadingmodel={loadingmodel}
                                                // disabled={!email || email === ''}
                                            >
                                                Save
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Grid>
                            </Modal>
                            {/* End Modal Patient Detail */}
                            {/* <=====================================================================> */}
                            <Form.Item
                                fullWidth
                                name="MEMBER_ADD"
                                label="Address"
                                variant="outlined"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: 'Please input your Address!'
                                //     }
                                // ]}
                            >
                                <TextArea rows={3} fullWidth />
                            </Form.Item>
                            {/* <========================================================================================> */}
                            <Grid item xs={12} container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid xs={12} lg={6} md={6} sm={12}>
                                    <Form.Item
                                        name="REGI_DATE"
                                        id="outlined-basic"
                                        variant="outlined"
                                        label="Date"
                                        type="Date"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Enter your start Date!'
                                            }
                                        ]}
                                    >
                                        <DatePicker fullWidth defaultValue={dayjs(new Date())} format={dateFormat} placement={placement} />
                                    </Form.Item>
                                </Grid>
                                <Grid xs={12} lg={6} md={6} sm={12}>
                                    {/* <span className="m-2"> Sex</span> */}
                                    <Form.Item
                                        name="SEX"
                                        className=""
                                        // id="outlined-basic"
                                        // variant="outlined"
                                        // type="number"
                                        // rules={[
                                        //     {
                                        //         required: true,
                                        //         message: 'Please Enter your Whatsapp Number!'
                                        //     }
                                        // ]}
                                    >
                                        <Radio.Group>
                                            <Radio value={1}>Male</Radio>
                                            <Radio value={2}>Female</Radio>
                                        </Radio.Group>
                                        {/* <Checkbox onChange={onChange}>Male</Checkbox>
                                        <Checkbox onChange={onChange}> Female</Checkbox> */}
                                        {/* <Checkbox onChange={onChange}>दुपार</Checkbox> */}
                                    </Form.Item>
                                </Grid>
                            </Grid>
                            {/* <===========================================================================> */}
                            <Grid item xs={12} lg={12} md={12} sm={12} container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
                                <Grid xs={12} lg={8} md={8} sm={6}>
                                    <Form.Item
                                        name="MEMBER_EMAIL"
                                        id="outlined-basic"
                                        variant="outlined"
                                        type="email"
                                        // rules={[
                                        //     {
                                        //         required: true,
                                        //         message: 'Please Enter Your Email!'
                                        //     },
                                        //     { type: 'email', message: 'please enter a valid email' }
                                        // ]}
                                    >
                                        <TextField fullWidth label="Email" type="email" />
                                    </Form.Item>
                                </Grid>
                                <Grid xs={12} lg={4} md={4} sm={6}>
                                    <Form.Item
                                        name="AGE"
                                        id="outlined-basic"
                                        variant="outlined"
                                        type="number"
                                        // rules={[
                                        //     {
                                        //         required: true,
                                        //         message: 'Please Enter your Age!'
                                        //     }
                                        // ]}
                                    >
                                        <TextField label="Age" type="number" fullWidth />
                                    </Form.Item>
                                </Grid>
                            </Grid>
                            {/* <======================================================================================> */}
                            <Grid item xs={12} lg={12} md={12} sm={12} container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2 }}>
                                <Grid xs={12} lg={6} md={6} sm={6}>
                                    <Form.Item
                                        name="MOBILE_NO"
                                        id="outlined-basic"
                                        variant="outlined"
                                        type="number"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Enter your Mobile Number!'
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    console.log('String(value).length', String(value).length);
                                                    if (!value || String(value).length === 10) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(new Error('Please Enter 10 characters Mobile Number!'));
                                                }
                                            })
                                        ]}
                                    >
                                        <TextField fullWidth label="Mobile No" type="number" />
                                    </Form.Item>
                                </Grid>
                                <Grid xs={12} lg={6} md={6} sm={6}>
                                    <Form.Item
                                        name="BLOOD"
                                        id="outlined-basic"
                                        variant="outlined"
                                        type="text"
                                        // rules={[
                                        //     {
                                        //         required: true,
                                        //         message: 'Please Enter Your Blood Group!'
                                        //     }
                                        // ]}
                                    >
                                        <TextField fullWidth label="Blood Group" type="text" />
                                    </Form.Item>
                                </Grid>
                            </Grid>
                            <Form.Item
                                fullWidth
                                name="DESCRIPTION"
                                label="Description"
                                variant="outlined"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Description!'
                                    }
                                ]}
                            >
                                <TextArea rows={5} fullWidth />
                            </Form.Item>
                        </Grid>
                        {/* <=======================================================================================> */}
                        {/* Start Table */}
                        <Grid item xs={12} lg={6} md={6} sm={12}>
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={casepaperData}
                                    bordered
                                    size="small"
                                    loading={loading}
                                    pagination={tableParams.pagination}
                                    onChange={handleMemberIddChange}
                                />
                                {/* <Table dataSource={dataSource} columns={columns} size="small" />; */}
                            </div>
                        </Grid>
                        {/* End Table */}
                        {/* <==========================================================================================> */}

                        <Grid item lg={12} sm={12} xs={12} className="edit-button">
                            <Form.Item>
                                {/* <button
                                    type="submit"
                                    htmlType="submit"
                                    id="addtolist_btn"
                                    className="btn btn-primary m-2 button-hov-add-to-list btn-sm rounded-pill"
                                >
                                    <FontAwesomeIcon icon={faCircleCheck} /> Save
                                </button> */}
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="btn btn-primary m-2 button-hov-add-to-list btn-sm rounded-pill"
                                    loadingcasepaper={loadingcasepaper}
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                            {/* <Form.Item>
                                <Link to={'/Drivercreate'}>
                                    <button
                                        type="button"
                                        id="addtolist_btn"
                                        className="btn btn-primary  button-hov-add-to-list btn-sm rounded-pill mt-2"
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} /> Edit
                                    </button>
                                </Link>
                            </Form.Item> */}
                        </Grid>
                    </Grid>
                </Form>
            </Card>
        </>
    );
};

export default Casepaper;
