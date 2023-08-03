// material-ui
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { number } from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';
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
import './banner.css';
import {
    bannerdetailsGetidByApi,
    bannerdetailsUpdateByApi,
    bannerfromsubmitByApi,
    uploadImgbannerApi
} from 'components/Helper/bannerdetails';
let timeout;
let currentValue;
const { RangePicker } = DatePicker;
// const dateFormat = 'YYYY-MM-DD';
const dateFormat = 'DD-MM-YYYY';

const Banner = () => {
    const [loading, setloading] = useState(false);
    const [baneerloding, setBaneerloding] = useState(false);
    const [banerslidersetiddata, setBanerslidersetiddata] = useState(null);
    const [checkboxxx, setCheckbox] = useState(false);
    const [placement, SetPlacement] = useState('bottomRight');
    let { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [fileList, setFileList] = useState([]);
    const [imgeidfile, setImgeidfile] = useState([]);
    // const [imgeidset, setImgeidset] = useState([]);
    const [imgError, setImageError] = useState('');
    // const [bnnerPhoto, setBnnerPhoto] = useState();
    // const [preview, setPreview] = useState();
    const { TextArea } = Input;
    // console.log('banerslidersetiddata', banerslidersetiddata);
    const URLidimage = 'http://localhost:3000/api/fileuploads/banner/download/';
    const props = {
        listType: 'picture',
        defaultFileList: [...fileList],
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            const isPNG = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg';
            // setPreview(undefined);
            console.log('file', file);
            if (!isPNG) {
                setImageError(`${file.name} is not a png file`);
                message.error(`${file.name} is not a png file`);
                console.log('okkk');
                const index = fileList.indexOf(file);
                const newFileList = fileList.slice();
                newFileList.splice(index, 1);
                setFileList([]);
                // const objectUrl = URL.createObjectURL(file);
                // setPreview(objectUrl);
                // URL.revokeObjectURL(objectUrl)
                return isPNG || Upload.LIST_IGNORE;
            } else {
                setImageError('');
                setFileList([...fileList, file]);
                console.log('kkkooooo');
                // setPreview(null);
                return false;
            }
        }
        // maxCount: 1,
    };

    useEffect(() => {
        if (typeof id !== 'undefined') {
            getbannertailbyid();
        } else {
            form.setFieldValue('bannerStartDate', dayjs(new Date()));
            // form.setFieldValue('bannerEndDate', dayjs(new Date()));
        }
    }, [id]);
    const getbannertailbyid = () => {
        setBaneerloding(true);
        bannerdetailsGetidByApi(id)
            .then(
                async (res) => {
                    console.log(' success');
                    let response = res;
                    response.bannerStartDate = dayjs(response.bannerStartDate, dateFormat); // moment(new Date(response.REGI_DATE)).format('YYYY-MM-DD'); // moment();
                    response.bannerEndDate = dayjs(response.bannerEndDate, dateFormat); // moment(new Date(response.REGI_DATE)).format('YYYY-MM-DD'); // moment();
                    setBanerslidersetiddata(response);
                    console.log('response', response);
                    setCheckbox(response.Checkbox);
                    form.resetFields();
                    console.log('res', res);
                    // console.log(' response', response);
                    setBaneerloding(false);
                },
                (err) => {
                    console.log('err', err);
                    setBaneerloding(false);
                }
            )
            .catch();
    };
    const onFinishbannerslider = async (values) => {
        console.log('----------', values);
        setloading(true);
        console.log('Success:', values);

        if (typeof id === 'undefined') {
            const formData = new FormData();
            if (values.image) {
                formData.append('files', values.image.file);
            }
            uploadImgbannerApi(formData, 'banner')
                .then(
                    async (res) => {
                        let filename = '';
                        if (res.result && res.result.files && res.result.files.files.length > 0) {
                            filename = res.result.files.files[0].name;
                        }
                        let payloadData = {
                            ...values,
                            imageupload: filename,
                            Checkbox: checkboxxx,
                            bannerStartDate: moment(new Date(values.bannerStartDate)).format('DD-MM-YYYY'),
                            bannerEndDate: moment(new Date(values.bannerEndDate)).format('DD-MM-YYYY')
                        };
                        console.log('payloaddata', payloadData);
                        bannerfromsubmitByApi(payloadData).then(
                            (res) => {
                                console.log('resbanner', res);
                                swal('success', 'success fully', 'success');
                                navigate('/Modify');
                                setloading(false);
                            },
                            (err) => {
                                console.log(err);
                                swal('err', 'Enqury Types ', 'error');
                            }
                        );
                    },
                    (err) => {
                        // console.log("error");
                        setloading(false);
                        // swal('Customer', 'invalid Customer', 'success');
                    }
                )
                .catch();
        } else {
            var filename = banerslidersetiddata.imageupload;
            // setBnnerPhoto(filename);
            const formData = new FormData();
            if (values.image && values.image.file) {
                formData.append('files', values.image.file);
                console.log('plase apload imag');
                await uploadImgbannerApi(formData, 'banner').then(async (res) => {
                    if (res.result && res.result.files && res.result.files.files.length > 0) {
                        filename = res.result.files.files[0].name;
                    }
                });
            }

            // //update
            console.log('Success:', values);
            let payloadData = {
                ...values,
                id: id,
                imageupload: filename,
                Checkbox: checkboxxx,
                bannerStartDate: moment(new Date(values.bannerStartDate)).format('DD-MM-YYYY'),
                bannerEndDate: moment(new Date(values.bannerEndDate)).format('DD-MM-YYYY')
            };
            setloading(true);
            await bannerdetailsUpdateByApi(payloadData)
                .then(
                    async (res) => {
                        console.log('res', res);
                        console.log(' success');
                        swal('Bnner Slider Update', 'Update success Fully', 'success');
                        navigate('/Modify');
                        setloading(false);
                    },
                    (err) => {
                        console.log('error', err);
                        setloading(false);
                        swal('Bnner slider', 'Not updated', 'error');
                    }
                )
                .catch();
        }
    };
    // };

    const onFinishFailedbannerslider = (value) => {
        console.log('value', value);
    };
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        if (e.target.checked == true) {
            console.log('checkbox-1');
            setCheckbox(1);
        } else {
            console.log('checkbox-0');
            setCheckbox(0);
        }
    };
    const placementChange = (e) => {
        SetPlacement(e.target.value);
    };
    const validationnewdate = new Date();
    // <================================== End Api call ==========================================>
    return (
        <>
            <Typography variant="h5" className="mx-2">
                <small className="text-black-50" style={{ fontFamily: 'Poppins' }}>
                    Home
                </small>
                {'/'} <b> बॅनर मॅनेज </b>
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
                            <b>बॅनर मॅनेज </b>
                        </span>
                    </h5>
                </div>
                <hr className="MuiDivider-root MuiDivider-fullWidth css-1wnin34-MuiDivider-root"></hr>
                <Form
                    name="basic"
                    initialValues={banerslidersetiddata}
                    // layout="vertical"
                    // labelCol={{ span: 22 }}
                    // wrapperCol={{ span: 22 }}
                    form={form}
                    onFinish={onFinishbannerslider}
                    onFinishFailed={onFinishFailedbannerslider}
                    autoComplete="off"
                >
                    <Typography variant="body2">
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={4} sm={12} xl={4}>
                                <Form.Item
                                    // label="Description"
                                    name="BannerLable"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Banner Lable.'
                                        }
                                    ]}
                                >
                                    <Input name="BannerLable" className="datepicinp textfont" placeholder={'Enter Banner Lable'} />
                                </Form.Item>
                                <span className="textlabel">
                                    Banner Lable<span className="text-danger">*</span>
                                </span>
                                {/* <Form.Item
                                    name="BannerLable"
                                    type="text"
                                    // id="outlined-basic"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Select Banner Lable.'
                                        }
                                    ]}
                                >
                                    <div class="field-wrapper">
                                        <div class="input-group">
                                            <Input
                                                // name="BannerLable"
                                                // className="textfont"
                                                className="datepicinp textfont"
                                                placeholder="Enter Banner Lable"
                                            />
                                        </div>
                                        <div class="field-placeholder">
                                            Banner Lable <span class="text-danger">*</span>
                                        </div>
                                        <samp class=" error" id="errorMobileno"></samp>
                                    </div>
                                </Form.Item> */}
                            </Grid>
                            <Grid item xs={12} lg={4} sm={12} xl={4}>
                                <Form.Item
                                    // label="Description"
                                    name="bannerHeading"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please banner Heading.'
                                        }
                                    ]}
                                >
                                    <Input name="bannerHeading" className="datepicinp textfont" placeholder={'Enter banner Heading'} />
                                </Form.Item>
                                <span className="textlabel">
                                    banner Heading<span className="text-danger">*</span>{' '}
                                </span>
                                {/* <Form.Item
                                    name="bannerHeading"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please enter Select banner Heading .'
                                        }
                                    ]}
                                >
                                    <div class="field-wrapper">
                                        <div class="input-group">
                                            <Input
                                                // name="bannerHeading"
                                                className="textfont"
                                                type="text"
                                                placeholder="Enter banner Heading"
                                            />
                                        </div>
                                        <div class="field-placeholder">
                                            banner Heading <span class="text-danger">*</span>
                                        </div>
                                        <samp class=" error" id="errorMobileno"></samp>
                                    </div>
                                </Form.Item> */}
                            </Grid>
                            <Grid item xs={12} lg={4} sm={12} xl={4}>
                                <Form.Item
                                    // label="Description"
                                    name="bannerInfo"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please banner Info.'
                                        }
                                    ]}
                                >
                                    <Input name="bannerInfo" className="datepicinp textfont" placeholder={'Enter banner Info'} />
                                </Form.Item>
                                <span className="textlabel">
                                    banner Info<span className="text-danger">*</span>{' '}
                                </span>
                                {/* <Form.Item
                                    name="bannerInfo"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Enter banner Info.'
                                        }
                                    ]}
                                >
                                    <div class="field-wrapper">
                                        <div class="input-group">
                                            <Input
                                                // name="bannerInfo"
                                                type="text"
                                                className="textfont"
                                                placeholder="Enter  Banner Info"
                                            />
                                        </div>
                                        <div class="field-placeholder">
                                            Banner Info <span class="text-danger">*</span>
                                        </div>
                                        <samp class=" error" id="errorMobileno"></samp>
                                    </div>
                                </Form.Item> */}
                            </Grid>
                            <Grid item xs={12} lg={2} sm={12} xl={2}>
                                {id ? (
                                    <Form.Item name="image">
                                        <Upload {...props} maxCount={1}>
                                            <Button className="buttonimge" icon={<UploadOutlined />}>
                                                Select File
                                            </Button>
                                        </Upload>
                                    </Form.Item>
                                ) : (
                                    <Form.Item
                                        name="image"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please Enter image Upload.'
                                            }
                                        ]}
                                    >
                                        <Upload {...props} maxCount={1}>
                                            <Button className="buttonimge" icon={<UploadOutlined />}>
                                                Select File
                                            </Button>
                                        </Upload>
                                    </Form.Item>
                                )}
                                <lable className="text-danger">{imgError}</lable>
                                <span className="textimagelabel">
                                    image<span className="text-danger">*</span>{' '}
                                </span>
                            </Grid>

                            <Grid item xs={12} lg={2} sm={12} xl={2}>
                                <Form.Item
                                    // label="Description"
                                    name="bannerStartDate"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Enter date.'
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (value && value.isBefore(moment(), 'day') && typeof id === 'undefined') {
                                                    return Promise.reject('Please Enter next date!');
                                                }
                                                return Promise.resolve();
                                            }
                                        })
                                    ]}
                                >
                                    <DatePicker
                                        fullWidth
                                        name="bannerStartDate"
                                        defaultValue={dayjs(new Date())}
                                        format={dateFormat}
                                        // disabled={[true]}
                                        className="datepicinp textfont datepicker text-dark"
                                        placement={placement}
                                        placeholder={'Enter start Date'}
                                    />
                                </Form.Item>
                                <span className="textlabel">
                                    start Date<span className="text-danger">*</span>{' '}
                                </span>
                            </Grid>
                            <Grid item xs={12} lg={2} sm={12} xl={2}>
                                <Form.Item
                                    // label="Description"
                                    name="bannerEndDate"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please Enter date.'
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (value && value.isBefore(moment(), 'day')) {
                                                    return Promise.reject('Please Enter next date!');
                                                }
                                                return Promise.resolve();
                                            }
                                        })
                                    ]}
                                >
                                    <DatePicker
                                        fullWidth
                                        name="bannerEndDate"
                                        format={dateFormat}
                                        className="datepicinp textfont datepicker"
                                        // disabledDate={disabledDate}
                                        placement={placement}
                                        placeholder={'Enter end Date'}
                                    />
                                </Form.Item>
                                <span className="textlabel">
                                    End Date<span className="text-danger">*</span>{' '}
                                </span>
                            </Grid>
                            {/* <Grid item xs={12} lg={4} sm={12} xl={4}></Grid> */}
                            <Grid item xs={12} lg={2} sm={12} xl={2}>
                                <Form.Item
                                    // label="Description"
                                    name="Checkbox"
                                    checked={checkboxxx}
                                    value={1}

                                    // rules={[
                                    //     {
                                    //         required: true,
                                    //         message: 'Please enter Department Name.'
                                    //     }
                                    // ]}
                                >
                                    <Checkbox name="Checkbox" onChange={onChange} checked={checkboxxx}>
                                        {/* <Checkbox name="Checkbox" value={1}> */}
                                        <b>Verify</b>
                                    </Checkbox>
                                </Form.Item>
                            </Grid>
                            <Grid item xs={12} lg={4} sm={12} xl={4}></Grid>
                            <Grid item xs={12} lg={4} sm={12} xl={4}>
                                {id ? (
                                    banerslidersetiddata && banerslidersetiddata.imageupload && banerslidersetiddata.imageupload != '' ? (
                                        <>
                                            <div>
                                                <img
                                                    src={URLidimage + banerslidersetiddata.imageupload}
                                                    alt=""
                                                    className="imagePreview img-thumbnail imagespositionid"
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h6 className="text-danger">NO image</h6>
                                        </>
                                    )
                                ) : null}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} lg={12} sm={12} xl={12}>
                            <Form.Item>
                                <div>
                                    <Link to="/Modify">
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

export default Banner;
