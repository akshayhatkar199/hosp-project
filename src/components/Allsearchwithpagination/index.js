import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { AudioOutlined } from '@ant-design/icons';
import DataTable, { FilterComponent } from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Space, Table, Tag } from 'antd';
import swal from 'sweetalert';
// import { customersSearchApi, customerslistApi, student_mastersSearchApi } from '../Helper/customer';
import { student_mastersSearchApi, student_mastersdeletedApi } from '../Helper/student_master';
import { Input } from 'antd';
// import './Invoicefilter.css';
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

const onSearch = (value) => console.log(value);
const customStyles = {
    cells: {
        style: {
            borderRight: '1px solid #ddd'
        }
    }
};

const Allsearchwithpagination = () => {
    const [filtersearch, setFilterSearch] = useState('');
    const [studentData, setstudentData] = useState([]);
    const [parpage, setParpage] = useState(10);
    const [loading, setloading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            total: 0,
            pageSize: 10
        }
    });
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            render: (id) => <a>{id}</a>
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'birth_date',
            dataIndex: 'birth_date',
            key: 'birth_date'
        },
        {
            title: 'mobile No',
            dataIndex: 'mobileno',
            key: 'mobileno'
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city'
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/creatstudent/${record.id}`}>
                        <button className="m-1 btn btn-outline-dark btn-sm h6">
                            <FontAwesomeIcon icon={faPenToSquare} className="m-1 h5 text-warning icon text-center h6" />
                        </button>
                    </Link>

                    <button className="m-1  btn btn-outline-danger btn-sm h6" onClick={() => deletestudentlist(record.id)}>
                        <FontAwesomeIcon icon={faTrash} className="m-1 h5 text-dark icon text-center h6" />
                    </button>
                </Space>
            )
        }
    ];

    // <================================== onSearch filter function==========================================>
    const onSearch = (e) => {
        console.log(e.target.value);
        const multiplesearchinput = e.target.value;
        customerfun(0, multiplesearchinput);
        // setFilterSearch(multiplesearchinput);
    };
    // console.log('filtersearch', filtersearch);
    // <================================== End search filter function ==========================================>

    // <================================== Api call ==========================================>
    useEffect(() => {
        customerfun();
    }, []);

    const customerfun = (offset = 0, multiplesearchinput = '', current = null) => {
        setloading(true);
        let payloadData = {
            offset: offset,
            limit: 10,
            search: multiplesearchinput,
            searchorderNo: multiplesearchinput,
            searchEmail: multiplesearchinput
        };
        student_mastersSearchApi(payloadData).then(async (res) => {
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

            setstudentData(res.data.data);
            setloading(false);
        });
        (err) => {
            console.log(err);
        };
    };

    const deletestudentlist = async (id) => {
        let payloadData = {
            id: id,
            is_active: 0
        };
        swal({
            title: 'Are you sure to delete student?',

            icon: 'warning',
            dangerMode: true,
            buttons: ['Cancel', 'Ok']
        })
            .then(
                (willDelete) => {
                    if (willDelete) {
                        student_mastersdeletedApi(payloadData).then(async (res) => {
                            //approch 1
                            // customerfun();
                            //approch 2
                            let newData = studentData.filter((e) => {
                                if (e.id != id) {
                                    return e;
                                }
                            });
                            setstudentData(newData);
                            console.log('newData', newData);
                        });
                    }
                },
                (err) => {}
            )
            .catch();
    };

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
        customerfun(offset, '', pagination.current);
    };
    // <================================== End Table onChange function handleTableChange  ==========================================>
    // <================================== Ui Start  ==========================================>
    return (
        <>
            <Typography variant="h5" className="mx-2">
                <small className="text-black-50">Home</small> {'/'} <b>Pagination With Search Filter New Data</b>
            </Typography>
            <br></br>
            <MainCard>
                <Grid container spacing={2} columnSpacing={{ sm: 1, md: 3 }}>
                    <Grid item lg={6} xs={12} sm={12} md={12}>
                        <span className="main-title bg-white text-dark">Invoice List Pagination With Search Filter</span>
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
                        <Link to={'/creatstudent'}>
                            <button className="btn btn-primary mx-1 m-1 btn-sm" type="button">
                                Create
                            </button>
                        </Link>
                        <button className="btn btn-primary mx-1 m-1 btn-sm" type="button">
                            <FontAwesomeIcon icon={faFilePdf} /> PDF
                        </button>
                        <button className="btn btn-primary mx-1 m-1 btn-sm" type="button">
                            <FontAwesomeIcon icon={faPrint} /> Print
                        </button>
                        <button className="btn btn-primary mx-1 m-1 btn-sm" type="button">
                            <FontAwesomeIcon icon={faFileExcel} /> Excell
                        </button>
                    </Grid>
                </Grid>
                <Typography variant="body2">
                    <hr className="MuiDivider-root MuiDivider-fullWidth css-1wnin34-MuiDivider-root"></hr>
                    <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 12, md: 12 }}>
                        <Grid item lg={12} xs={12} sm={12} md={12}>
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={studentData}
                                    size="small"
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

export default Allsearchwithpagination;
