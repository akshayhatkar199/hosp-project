import React, { useEffect, useState, useRef } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { AudioOutlined } from '@ant-design/icons';
import DataTable, { FilterComponent } from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Space, Table, Tag } from 'antd';
import swal from 'sweetalert';
import { Input } from 'antd';
import { CSVLink } from 'react-csv';
import { useReactToPrint } from 'react-to-print';
import {
    faFileExcel,
    faCloudArrowDown,
    faPrint,
    faFileSpreadsheet,
    faFilePdf,
    faPenToSquare,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
const { Search } = Input;

// project import
import MainCard from 'components/MainCard';
import Button from 'themes/overrides/Button';
import { filter } from 'lodash';
import { Link } from 'react-router-dom';
import { MemberregiExcellsheetApi, membertableshowsearchByApi } from 'components/Helper/member_rgi';

const onSearch = (value) => console.log(value);

const PationtDetails = () => {
    const conponentPDF = useRef();
    const [filtersearch, setFilterSearch] = useState('');
    const [PationtDetailsData, setPationtDetailsData] = useState([]);
    const [printoffset, setPrintoffset] = useState([]);
    const [memberExcellsheetdata, setMemberExcellsheetdata] = useState([]);
    const [parpage, setParpage] = useState(10);
    const [loading, setloading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            total: 0,
            pageSize: 10
        }
    });
    let offset = printoffset;
    console.log(offset);
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            render: (id) => <a>{id}</a>
        },
        {
            title: ' Name',
            dataIndex: 'MEMBER_NAME',
            key: 'MEMBER_NAME'
        },
        {
            title: 'Date',
            dataIndex: 'REGI_DATE',
            key: 'REGI_DATE'
        },
        {
            title: 'Address',
            dataIndex: 'MEMBER_ADD',
            key: 'MEMBER_ADD'
        },
        {
            title: 'Email',
            dataIndex: 'MEMBER_EMAIL',
            key: 'MEMBER_EMAIL'
        },
        {
            title: 'MOBILE NO',
            dataIndex: 'MOBILE_NO',
            key: 'stateName'
        },
        {
            title: 'Blood',
            dataIndex: 'BLOOD',
            key: 'BLOOD'
        },
        {
            title: 'Sex',
            dataIndex: 'SEX',
            key: 'SEX',
            render: (SEX) => {
                return <p>{SEX == 1 ? 'M' : 'F'}</p>;
            }
        },
        {
            title: 'Age',
            dataIndex: 'AGE',
            key: 'AGE'
        }
    ];

    // <================================== onSearch filter function==========================================>
    const onSearch = (e) => {
        console.log(e.target.value);
        const multiplesearchinput = e.target.value;
        petientbyapi(0, multiplesearchinput);
    };
    // <================================== End search filter function ==========================================>
    const handlePrint = useReactToPrint({
        content: () => conponentPDF.current,
        documentTitle: 'patient_data',
        onAfterPrient: () => alert('Print success')
    });

    // <================================== Api call ==========================================>

    useEffect(() => {
        petientbyapi();
        excellmemberfunction();
    }, []);

    const excellmemberfunction = () => {
        let payloadData = {
            search: ''
        };
        MemberregiExcellsheetApi(payloadData).then(
            (res) => {
                console.log('resexcell', res);
                setMemberExcellsheetdata(res.data);
            },
            (err) => {
                console.log('err', err);
            }
        );
    };

    const petientbyapi = (offset = 0, multiplesearchinput = '', current = null) => {
        setloading(true);
        setPrintoffset(offset);
        let payloadData = {
            offset: offset,
            limit: 10,
            search: multiplesearchinput,
            searchcountryname: multiplesearchinput,
            searchstatename: multiplesearchinput
        };
        membertableshowsearchByApi(payloadData).then(async (res) => {
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

            setPationtDetailsData(res.data.data);
            setloading(false);
        });
        (err) => {
            console.log(err);
        };
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
    //                         setPationtDetailsData(newData);
    //                         console.log('newData', newData);
    //                     });
    //                 }
    //             },
    //             (err) => {}
    //         )
    //         .catch();
    // };

    // <================================== End Api call ==========================================>

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
        petientbyapi(offset, '', pagination.current);
    };
    // <================================== End Table onChange function handleTableChange  ==========================================>
    // <================================== Ui Start  ==========================================>
    return (
        <>
            <Typography variant="h5" className="mx-2">
                <small className="text-black-50">Home</small> {'/'} <b>Pationt Details Data</b>
            </Typography>
            <br></br>
            <MainCard>
                <Grid container spacing={2} columnSpacing={{ sm: 1, md: 3 }}>
                    <Grid item lg={6} xs={12} sm={12} md={12}>
                        <span className="main-title bg-white text-dark">Pationt Details</span>
                    </Grid>
                    <Grid item lg={6} xs={12} sm={12} md={12} className="text-end">
                        <Search
                            placeholder="search"
                            className="m-1"
                            onChange={onSearch}
                            style={{
                                width: 200
                            }}
                        />
                        <Link to={'/Casepaper'}>
                            <button className="btn btn-success mx-1 m-1 btn-sm" type="button">
                                Create
                            </button>
                        </Link>
                        {/* <button className="btn btn-success mx-1 m-1 btn-sm" type="button" onClick={handlePrint}>
                            <FontAwesomeIcon icon={faFilePdf} /> PDF
                        </button> */}
                        <Link to={`/Registerpetient/${offset}`}>
                            <button className="btn btn-success mx-1 m-1 btn-sm" type="button">
                                <FontAwesomeIcon icon={faPrint} /> Print
                            </button>
                        </Link>
                        <button className="btn btn-success mx-1 m-1 btn-sm" type="button">
                            <CSVLink data={memberExcellsheetdata} id="excel" className="text-decoration-none text-white">
                                <FontAwesomeIcon icon={faFileExcel} className="mx-1" />
                                EXCELL
                            </CSVLink>
                        </button>
                    </Grid>
                </Grid>
                <Typography variant="body2">
                    <hr className="MuiDivider-root MuiDivider-fullWidth css-1wnin34-MuiDivider-root"></hr>
                    <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 12, md: 12 }}>
                        <Grid item lg={12} xs={12} sm={12} md={12}>
                            <div className="table-responsive" ref={conponentPDF}>
                                <Table
                                    columns={columns}
                                    dataSource={PationtDetailsData}
                                    size="small"
                                    loading={loading}
                                    bordered
                                    id="excel"
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

export default PationtDetails;
