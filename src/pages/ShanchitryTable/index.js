import React, { useEffect, useState, useRef } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { AudioOutlined } from '@ant-design/icons';
import DataTable, { FilterComponent } from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Space, Table, Tag, DatePicker } from 'antd';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { debounce } from 'debounce';
import { CSVLink } from 'react-csv';
// import Printtable from '../Printtable';
import { Input } from 'antd';
import moment from 'moment';
import dayjs from 'dayjs';
import { useReactToPrint } from 'react-to-print';
import './shanchitrytable.css';
import { exportPDFData } from '../../utility/Common';
import {
    faFileExcel,
    faCloudArrowDown,
    faPrint,
    faFileSpreadsheet,
    faFilePdf,
    faPenToSquare,
    faXmark,
    faEye,
    faPen,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
const { Search } = Input;
const { RangePicker } = DatePicker;
const dateFormat = 'DD-MM-YYYY';
// project import
import MainCard from 'components/MainCard';
import Button from 'themes/overrides/Button';
import { filter } from 'lodash';
// import { detailsExcellsheetByApi } from '../../components/Helper/details';
import { bannertablesearchByApi } from 'components/Helper/bannerdetails';
import { ShanchitrtablesearchByApi } from 'components/Helper/Shanchitr';

const onSearch = (value) => console.log(value);

const ShanchitryTable = () => {
    // const conponentPDF = useRef();
    const [placement, SetPlacement] = useState('bottomRight');
    const [BrandtableData, setBrandtableData] = useState([]);
    const [modifyoffset, setModifyoffset] = useState([]);
    // const [modifyExcellsheetdata, setModifyExcellsheetdata] = useState([]);
    const [parpage, setParpage] = useState(10);
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            total: 0,
            pageSize: 10
        }
    });
    let offset = modifyoffset;
    // let id = BrandtableData;
    console.log('idoffset', offset);
    // console.log('id', id);
    const columns = [
        // {
        //     title: 'Sr.No',
        //     dataIndex: 'id',
        //     key: 'id',
        //     render: (id) => <a>{id}</a>
        // },
        {
            title: 'Sr.No',
            key: 'Action',
            width: '6%',
            render: (_, record) => (
                <Space size="middle">
                    {/* <button className="m-1 btn btn-outline-withe btn-sm h6" size="small"> */}
                    <Link to={`/Shanchitre/${record.id}`}>
                        <FontAwesomeIcon icon={faEye} className="m-1 h5  icon text-center " style={{ color: '#005ca1' }} />
                    </Link>
                    {/* <FontAwesomeIcon icon={faXmark} className="m-1 h5  icon text-center h6" style={{ color: '#005ca1' }} /> */}
                    {/* </button> */}
                    {/* <button className="m-1 btn btn-outline-withe btn-sm h6" size="small"> */}
                    {/* <FontAwesomeIcon icon={faXmark} className="m-1 h5  iconcross text-center h6" style={{ color: '#005ca1' }} /> */}
                    {/* </button> */}
                    {/* <Link to={`/Banner/${record.id}`}> */}
                    {/* <FontAwesomeIcon icon={faPen} className="m-1 h5   text-center h6" style={{ color: 'black' }} /> */}
                    {/* </Link> */}
                </Space>
            )
        },
        {
            title: 'View',
            dataIndex: 'id',
            key: 'id',
            render: (id) => <a>{id}</a>
        },
        {
            title: 'Text Label',
            dataIndex: 'textlabel',
            key: 'textlabel'
        },
        {
            title: 'Shanchitry Image',
            dataIndex: 'shanchitryimage',
            key: 'shanchitryimage'
        },
        {
            title: 'Date',
            dataIndex: 'shandate',
            key: 'shandate'
        }

        // {
        //     title: 'Actions',
        //     dataIndex: 'Checkbox',
        //     key: 'Checkbox',
        //     render: (Checkbox) => {
        //         return <p>{Checkbox == 1 ? <Tag color="green">Verify</Tag> : <Tag color="volcano">UnVerify</Tag>}</p>;
        //     }
        // }
    ];

    // <================================== onSearch filter function==========================================>
    const onSearch = (e) => {
        console.log(e.target.value);
        const multiplesearchinput = e.target.value;
        ShanchitrApifun(0, multiplesearchinput);
    };
    const debouncedInputChange = debounce(onSearch, 1000);
    // <================================== End search filter function ==========================================>

    const handlePDF = () => {
        try {
            const title = '';
            // title: 'Age',
            const headers = [['Name', 'Date', 'Address', 'Email', 'MOBILE NO', 'Blood', 'Sex', 'Age', 'DESCRIPTION']];
            const tdata = BrandtableData.map((elt) => [
                elt.MEMBER_NAME,
                elt.REGI_DATE,
                elt.MEMBER_ADD,
                elt.MEMBER_EMAIL,
                elt.MOBILE_NO,
                elt.BLOOD,
                elt.SEX == 1 ? 'M' : 'F',
                elt.AGE,
                elt.DESCRIPTION
            ]);
            exportPDFData(title, headers, tdata);
        } catch (error) {
            console.log('Error : ' + error);
        }
    };

    // <================================== Api call ==========================================>

    useEffect(() => {
        ShanchitrApifun();
        // excellfunction();
    }, []);

    // const excellfunction = () => {
    //     let payloadData = {
    //         search: ''
    //     };
    //     detailsExcellsheetByApi(payloadData).then(
    //         (res) => {
    //             console.log('resexcell', res);
    //             setCasepaperExcellsheetdata(res.data);
    //         },
    //         (err) => {
    //             console.log('err', err);
    //         }
    //     );
    // };
    const ShanchitrApifun = (offset = 0, multiplesearchinput = '', current = null) => {
        setloading(true);
        setModifyoffset(offset);
        let payloadData = {
            offset: offset,
            limit: 10,
            search: multiplesearchinput,
            bannerHeading: multiplesearchinput,
            bannerInfo: multiplesearchinput
        };
        ShanchitrtablesearchByApi(payloadData).then(
            async (res) => {
                console.log('res=>', res);
                // let tableParmsSample = tableParams;
                // tableParmsSample.pagination.total = res.data.count;
                // setTableParams(tableParmsSample);
                console.log('current----------', current);
                if (current) {
                    await setTableParams({
                        ...tableParams,
                        pagination: {
                            ...tableParams.pagination,
                            current: current
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

                setBrandtableData(res.data.data);
                setloading(false);
            },
            (err) => {
                console.log('errlistapi', err);
            }
        );
    };

    // const deleteorderlist = async (id) => {
    //     let payloadData = {
    //         id: id,
    //         is_active: 0
    //     };
    //     swal({
    //         title: 'Are you sure to delete student?',

    //         icon: 'warning',
    //         dangerMode: true,
    //         buttons: ['Cancel', 'Ok']
    //     })
    //         .then(
    //             (willDelete) => {
    //                 if (willDelete) {
    //                     customer_rorderdeletedApi(payloadData).then(async (res) => {
    //                         //approch 1
    //                         // customerfun();
    //                         //approch 2
    //                         let newData = orderData.filter((e) => {
    //                             if (e.id != id) {
    //                                 return e;
    //                             }
    //                         });
    //                         setBrandtableData(newData);
    //                         console.log('newData', newData);
    //                     });
    //                 }
    //             },
    //             (err) => {}
    //         )
    //         .catch();
    // };

    // <================================== End Api call ==========================================>
    const placementChange = (e) => {
        SetPlacement(e.target.value);
    };

    // <================================== Table onChange function handleTableChange  ==========================================>
    const handleTableChange = async (pagination, filters, sorter) => {
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
        ShanchitrApifun(offset, '', pagination.current);
        // ShanchitrApifun(offset);
    };
    // <================================== End Table onChange function handleTableChange  ==========================================>

    // <================================== Ui Start  ==========================================>
    return (
        <>
            <Typography variant="h5" className="mx-2">
                <small className="text-black-50">Home</small> {'/'} <b>क्षणचित्रे मॅनेजटेबल</b>
            </Typography>
            <br></br>
            <MainCard>
                <Grid container spacing={2} columnSpacing={{ sm: 1, md: 3 }}>
                    <Grid item lg={6} xs={6} sm={12} md={6}>
                        <span className="main-title bg-white text-dark ">
                            <b className="brandtaitletext">क्षणचित्रे मॅनेज टेबल</b>
                        </span>
                    </Grid>
                    <Grid item lg={6} xs={12} sm={12} md={6} className="text-end">
                        <Link to="/Shanchitre">
                            <button className="btn btn-primary  mx-1 m-1 btn-sm" type="primary">
                                <span className="plusicon">+</span> Add New
                            </button>
                        </Link>
                    </Grid>
                    <Grid item lg={6} xs={12} sm={12} md={6} className="text-start">
                        <Link to={'/Casepaper'}>
                            <button className="btn btuniconbord mx-1 m-1 btn-sm" type="button">
                                Copy
                            </button>
                        </Link>
                        <button className="btn btuniconbord mx-1 m-1 btn-sm" type="button">
                            {/* <CSVLink data={CasepaperExcellsheetdata} id="excel" className="text-decoration-none text-dark"> */}
                            <CSVLink data={''} id="excel" className="text-decoration-none text-dark">
                                <FontAwesomeIcon icon={faFileExcel} className="mx-1 " />
                                EXCELL
                            </CSVLink>
                        </button>
                        <button className="btn btuniconbord mx-1 m-1 btn-sm" type="button">
                            {/* <CSVLink data={CasepaperExcellsheetdata} id="excel" className="text-decoration-none text-white"> */}
                            {/* <FontAwesomeIcon icon={faFileExcel} className="mx-1" /> */}
                            CSV
                            {/* </CSVLink> */}
                        </button>
                        <button className="btn btuniconbord mx-1 m-1 btn-sm" type="button" onClick={handlePDF}>
                            <FontAwesomeIcon icon={faFilePdf} /> PDF
                        </button>
                        <Link to={`/Printtable/${offset}`}>
                            <button className="btn btuniconbord mx-1 m-1 btn-sm" type="button">
                                <FontAwesomeIcon icon={faPrint} /> Print
                            </button>
                        </Link>
                    </Grid>
                    <Grid item lg={6} xs={6} sm={12} md={6} className="text-end">
                        <Search
                            addonBefore={
                                <>
                                    <span className="searchtext">
                                        <b>Search</b> :
                                    </span>
                                </>
                            }
                            // placeholder="search"
                            className="m-1 setachbraninput"
                            // onChange={onSearch}
                            onChange={debouncedInputChange}
                            style={{
                                width: 280
                                // width: 229px;
                            }}
                        />

                        {/* <DatePicker fullWidth placement={placement} format={dateFormat} name="REGI_DATE" /> */}
                    </Grid>
                </Grid>
                <Typography variant="body2">
                    <hr className="MuiDivider-root MuiDivider-fullWidth css-1wnin34-MuiDivider-root"></hr>
                    <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 12, md: 12 }}>
                        <Grid item lg={12} xs={12} sm={12} md={12}>
                            <div className="table-responsive">
                                <Table
                                    className="tableheaderbg"
                                    columns={columns}
                                    dataSource={BrandtableData}
                                    size="small"
                                    id="excel"
                                    // bordered
                                    rowClassName={(record, index) => (index % 2 === 0 ? 'table-row-light' : 'table-row-dark')}
                                    loading={loading}
                                    pagination={tableParams.pagination}
                                    onChange={handleTableChange}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Typography>
            </MainCard>
        </>
        // <================================== End Ui  ==========================================>
    );
};

export default ShanchitryTable;
