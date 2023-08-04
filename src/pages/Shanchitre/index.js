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
import './shanchitre.css';
import {
    ShanchitriddetailsGetidByApi,
    ShanchitrsubmitByApi,
    ShanchitrUpdateByApi,
    shanchitrydropdwonGetByApi,
    uploadImgShanchitrApi
} from 'components/Helper/Shanchitr';
let timeout;
let currentValue;
const { RangePicker } = DatePicker;
// const dateFormat = 'YYYY-MM-DD';
const dateFormat = 'DD-MM-YYYY';

const Shanchitre = () => {
    const [loading, setloading] = useState(false);
    const [baneerloding, setBaneerloding] = useState(false);
    const [shanchitrdata, setShanchitrdata] = useState(null);
    const [placement, SetPlacement] = useState('bottomRight');
    const [shanchitrysortNodata, setShanchitrysortNodata] = useState([]);
    const [data, setDatashachitry] = useState([]);
    const [sortNumberId, setSortNumberId] = useState();
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
    // console.log('shanchitrdata', shanchitrdata);
    const URLidimage = 'http://localhost:3000/api/fileuploads/Shanchitre/download/';
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
            form.setFieldValue('shandate', dayjs(new Date()));
        }
    }, [id]);
    const getbannertailbyid = () => {
        setBaneerloding(true);
        ShanchitriddetailsGetidByApi(id)
            .then(
                async (res) => {
                    console.log(' success');
                    let response = res;
                    response.shandate = dayjs(response.shandate, dateFormat); // moment(new Date(response.REGI_DATE)).format('YYYY-MM-DD'); // moment();
                    setShanchitrdata(response);
                    console.log('response', response);
                    setSortNumberId(response.sortNumber);
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
            uploadImgShanchitrApi(formData, 'Shanchitre')
                .then(
                    async (res) => {
                        let filename = '';
                        if (res.result && res.result.files && res.result.files.files.length > 0) {
                            filename = res.result.files.files[0].name;
                        }
                        let payloadData = {
                            ...values,
                            sortNumber: sortNumberId,
                            shanchitryimage: filename,
                            shandate: moment(new Date(values.shandate)).format('DD-MM-YYYY')
                        };
                        console.log('payloaddata', payloadData);
                        ShanchitrsubmitByApi(payloadData).then(
                            (res) => {
                                console.log('resbanner', res);
                                swal('success', 'success fully', 'success');
                                navigate('/ShanchitryTable');
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
            var filename = shanchitrdata.shanchitryimage;
            // setBnnerPhoto(filename);
            const formData = new FormData();
            if (values.image && values.image.file) {
                formData.append('files', values.image.file);
                console.log('plase apload imag');
                await uploadImgShanchitrApi(formData, 'Shanchitre').then(async (res) => {
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
                sortNumber: sortNumberId,
                shanchitryimage: filename,
                shandate: moment(new Date(values.shandate)).format('DD-MM-YYYY')
            };
            setloading(true);
            await ShanchitrUpdateByApi(payloadData)
                .then(
                    async (res) => {
                        console.log('res', res);
                        console.log(' success');
                        swal('Shanchitre Update', 'Update success Fully', 'success');
                        navigate('/ShanchitryTable');
                        setloading(false);
                    },
                    (err) => {
                        console.log('error', err);
                        setloading(false);
                        swal('Shanchitre', 'Not updated', 'error');
                    }
                )
                .catch();
        }
    };
    // };

    const onFinishFailedbannerslider = (value) => {
        console.log('value', value);
    };
    // const onChange = (e) => {
    //     console.log(`checked = ${e.target.checked}`);
    //     if (e.target.checked === true) {
    //         return 1;
    //     } else {
    //         return 0;
    //     }
    // };
    const placementChange = (e) => {
        SetPlacement(e.target.value);
    };
    const validationnewdate = new Date();
    // <================slecte tag============================================================>
    const shachitryhandleSearch = (newValue) => {
        if (newValue) {
            fetchshachitr(newValue, setDatashachitry);
        } else {
            setDatashachitry([]);
        }
    };
    const shachitryhandleChange = (newValue) => {
        setSortNumberId(newValue);
    };
    const fetchshachitr = (sortNumberId, callback) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = sortNumberId;
        const fake = () => {
            const payloadData = {
                sortNumber: sortNumberId,
                search: currentValue
            };
            shanchitrydropdwonGetByApi(payloadData).then((res) => {
                console.log('res--', res);
                setShanchitrysortNodata(res.data);
                if (currentValue === value) {
                    const Cdata = res.data.map((item) => ({
                        value: item.id,
                        text: item.sortNumber
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
                {/* {'/'} <b>Shanchitre Manage </b> */}
                {'/'} <b>क्षणचित्रे मॅनेज</b>
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
                            {/* <b>Shanchitre Manage</b> */}
                            <b>क्षणचित्रे मॅनेज</b>
                        </span>
                    </h5>
                </div>
                <hr className="MuiDivider-root MuiDivider-fullWidth css-1wnin34-MuiDivider-root"></hr>
                <Form
                    name="basic"
                    initialValues={shanchitrdata}
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
                                    name="textlabel"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please text label.'
                                        }
                                    ]}
                                >
                                    <Input name="textlabel" className="datepicinp textfont" placeholder={'Enter text label'} />
                                </Form.Item>
                                <span className="textlabel">
                                    Text Label<span className="text-danger">*</span>{' '}
                                </span>
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
                                                message: 'Please Enter image Shanchitre.'
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
                                    name="shandate"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please batmya date.'
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (value && value.isBefore(moment(), 'day') && typeof id === 'undefined') {
                                                    console.log('id', id);
                                                    return Promise.reject('Please Enter next datee!');
                                                }
                                                return Promise.resolve();
                                            }
                                        })
                                    ]}
                                >
                                    <DatePicker
                                        fullWidth
                                        name="shandate"
                                        defaultValue={dayjs(new Date())}
                                        format={dateFormat}
                                        // disabled={[true]}
                                        className="datepicinp textfont datepicker text-dark"
                                        placement={placement}
                                        placeholder={'Date'}
                                    />
                                </Form.Item>
                                <span className="textlabel">
                                    Date<span className="text-danger">*</span>{' '}
                                </span>
                            </Grid>
                            <Grid item lg={4} sm={6} xs={12}>
                                <Form.Item
                                    name="sortNumber"
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
                                    <Select
                                        showSearch
                                        value={shanchitrysortNodata}
                                        placeholder={'search'}
                                        // style={{
                                        //     width: 200
                                        // }}
                                        defaultActiveFirstOption={false}
                                        showArrow={true}
                                        filterOption={false}
                                        onSearch={shachitryhandleSearch}
                                        onChange={shachitryhandleChange}
                                        notFoundContent={null}
                                        options={(shanchitrysortNodata || []).map((d) => ({
                                            value: d.id,
                                            label: d.sortNumber
                                        }))}
                                    />
                                </Form.Item>
                                <span className="textlabel">
                                    search<span className="text-danger">*</span>
                                </span>
                            </Grid>
                            <Grid item xs={12} lg={1} sm={12} xl={1}>
                                <Form.Item
                                    // label="Description"
                                    name="Checkbox"
                                    value={1}
                                    // rules={[
                                    //     {
                                    //         required: true,
                                    //         message: 'Please enter Department Name.'
                                    //     }
                                    // ]}
                                >
                                    {/* <Checkbox onChange={onChange} value={1}> */}
                                    <Checkbox name="Checkbox" value={1}>
                                        <b>Verify</b>
                                    </Checkbox>
                                </Form.Item>
                            </Grid>
                            {/* <Grid item xs={12} lg={4} sm={12} xl={4}></Grid> */}
                            <Grid item xs={12} lg={4} sm={12} xl={4}>
                                {id ? (
                                    shanchitrdata && shanchitrdata.shanchitryimage && shanchitrdata.shanchitryimage != '' ? (
                                        <>
                                            <div>
                                                <img
                                                    src={URLidimage + shanchitrdata.shanchitryimage}
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
                                    <Link to="/ShanchitryTable">
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

export default Shanchitre;
