import React, { useEffect, useState, useRef } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { AudioOutlined } from '@ant-design/icons';
import DataTable, { FilterComponent } from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Space, Table, Tag, DatePicker } from 'antd';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { CSVLink } from 'react-csv';
// import Printtable from '../Printtable';
import { Input } from 'antd';
import moment from 'moment';
import { debounce } from 'debounce';
import dayjs from 'dayjs';
import { useReactToPrint } from 'react-to-print';
import './whyusTable.css';
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
// import { batmayatablesearchByApi } from 'components/Helper/batmaya';

const onSearch = (value) => console.log(value);

const WhyusTable = () => {
    // const conponentPDF = useRef();
    const [placement, SetPlacement] = useState('bottomRight');
    const [WhyusTableData, setWhyusTableData] = useState([]);
    const [aboutusoffset, setAboutusoffset] = useState([]);
    // const [modifyExcellsheetdata, setModifyExcellsheetdata] = useState([]);
    const [parpage, setParpage] = useState(10);
    const [loading, setloading] = useState(false);
    const URLidimage = 'http://localhost:3000/api/fileuploads/batmaya/download/';
    const navigate = useNavigate();
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            total: 0,
            pageSize: 10
        }
    });
    let offset = aboutusoffset;
    // let id = WhyusTableData;
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
                    <Link to={`/Whyus/${record.id}`}>
                        <FontAwesomeIcon icon={faEye} className="m-1 h5  icon text-center " style={{ color: '#005ca1' }} />
                    </Link>
                    {/* <FontAwesomeIcon icon={faXmark} className="m-1 h5  icon text-center h6" style={{ color: '#005ca1' }} /> */}
                    {/* </button> */}
                    {/* <button className="m-1 btn btn-outline-withe btn-sm h6" size="small"> */}
                    {/* <FontAwesomeIcon icon={faXmark} className="m-1 h5  iconcross text-center h6" style={{ color: '#005ca1' }} /> */}
                    {/* </button> */}
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
            title: 'Title ',
            dataIndex: 'title1',
            key: 'title1'
        },
        {
            title: 'Image',
            dataIndex: 'image1',
            key: 'image1'
        },
        {
            title: 'Date',
            dataIndex: 'createdDate',
            key: 'createdDate'
        },
        {
            title: 'Actions',
            dataIndex: 'Checkbox',
            key: 'Checkbox',
            render: (Checkbox) => {
                return <p>{Checkbox == 1 ? <Tag color="green">Verify</Tag> : <Tag color="volcano">UnVerify</Tag>}</p>;
            }
        }
    ];

    // <================================== onSearch filter function==========================================>
    const onSearch = (e) => {
        console.log(e.target.value);
        const multiplesearchinput = e.target.value;
        modifybyapidun(0, multiplesearchinput);
    };
    const debouncedInputChange = debounce(onSearch, 1000);
    // <================================== End search filter function ==========================================>

    const handlePDF = () => {
        try {
            const title = 'Batmaya List';
            // title: 'Age',
            const headers = [['Batmyalable', 'Papername', 'Batmya date']];
            const tdata = WhyusTableData.map((elt) => [elt.batmyalable, elt.papername, elt.batmyadate]);
            exportPDFData(title, headers, tdata);
        } catch (error) {
            console.log('Error : ' + error);
        }
    };

    // <================================== Api call ==========================================>

    useEffect(() => {
        // modifybyapidun();
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

    // <============================table offset =============================================>
    // const modifybyapidun = (offset = 0, multiplesearchinput = '', current = null) => {
    //     setloading(true);
    //     setAboutusoffset(offset);
    //     let payloadData = {
    //         offset: offset,
    //         limit: 10,
    //         search: multiplesearchinput,
    //         papername: multiplesearchinput,
    //         batmyalable: multiplesearchinput
    //     };
    //     batmayatablesearchByApi(payloadData).then(
    //         async (res) => {
    //             console.log('res=>', res);
    //             // let tableParmsSample = tableParams;
    //             // tableParmsSample.pagination.total = res.data.count;
    //             // setTableParams(tableParmsSample);
    //             console.log('current----------', current);
    //             if (current) {
    //                 await setTableParams({
    //                     ...tableParams,
    //                     pagination: {
    //                         ...tableParams.pagination,
    //                         current: current
    //                     }
    //                 });
    //             } else {
    //                 await setTableParams({
    //                     ...tableParams,
    //                     pagination: {
    //                         ...tableParams.pagination,
    //                         total: res.data.count
    //                     }
    //                 });
    //             }

    //             setWhyusTableData(res.data.data);
    //             setloading(false);
    //         },
    //         (err) => {
    //             console.log('errlistapi', err);
    //         }
    //     );
    // };
    // <============================ end table offset =============================================>
    // <================================delete=================================================>
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
    //                         setWhyusTableData(newData);
    //                         console.log('newData', newData);
    //                     });
    //                 }
    //             },
    //             (err) => {}
    //         )
    //         .catch();
    // };
    // <================================ End delete=================================================>

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
        modifybyapidun(offset, '', pagination.current);
        // modifybyapidun(offset);
    };
    // <================================== End Table onChange function handleTableChange  ==========================================>

    // <================================== Ui Start  ==========================================>
    return (
        <>
            <Typography variant="h5" className="mx-2">
                <small className="text-black-50">Home</small> {'/'} <b>Why Us Table</b>
            </Typography>
            <br></br>
            <MainCard>
                <Grid container spacing={2} columnSpacing={{ sm: 1, md: 3 }}>
                    <Grid item lg={6} xs={6} sm={12} md={6}>
                        <span className="main-title bg-white text-dark ">
                            <b className="brandtaitletext">Why Us Table</b>
                        </span>
                    </Grid>
                    <Grid item lg={6} xs={12} sm={12} md={6} className="text-end">
                        <Link to="/Whyus">
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
                                    dataSource={WhyusTableData}
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

export default WhyusTable;
