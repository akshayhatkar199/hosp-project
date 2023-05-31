import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { AudioOutlined } from '@ant-design/icons';
import DataTable, { FilterComponent } from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Space, Table, Tag } from 'antd';
import { studentspageoffset, studentSearchApi } from '../Helper/student';
import { Input } from 'antd';
// import './Invoicefilter.css';
import {
    faFileExcel,
    faCloudArrowDown,
    faPrint,
    faFileSpreadsheet,
    faCirclePlus,
    faFilePdf,
    faPenToSquare,
    faTrash
} from '@fortawesome/free-solid-svg-icons';
const { Search } = Input;

// project import
import MainCard from 'components/MainCard';
import Button from 'themes/overrides/Button';
import { filter } from 'lodash';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const onSearch = (value) => console.log(value);
const customStyles = {
    cells: {
        style: {
            borderRight: '1px solid #ddd'
        }
    }
};

const Paginationwithsearchfilter = () => {
    const [filtersearch, setFilterSearch] = useState('');
    const [apilisdata, setApilisdata] = useState([]);
    const [parpage, setParpage] = useState(10);
    const [loading, setloading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            total: 15,
            pageSize: 10
        }
    });
    const navigate = useNavigate();

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
            title: 'ClassName',
            dataIndex: 'className',
            key: 'className'
        },
        {
            title: 'RollNo',
            dataIndex: 'rollNo',
            key: 'rollNo'
        },
        {
            title: 'Marks',
            dataIndex: 'marks',
            key: 'marks'
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city'
        },

        {
            title: 'Action',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (is_active) => {
                return <p>{is_active ? 'complete' : 'incomplete'}</p>;
            }
        }
    ];
    // <================================== normal filter ==========================================>
    // useEffect(() => {
    //     setdata(apidata);
    //     setfilterdata(apidata);
    // }, []);

    // const onFilter = (e) => {
    //     console.log(e.target.value);
    //     const searchName = e.target.value;
    //     const tablefilter = data.filter((obj) => obj.CustomerName.toLowerCase().indexOf(searchName.toLowerCase()) >= 0);
    //     setfilterdata(tablefilter);
    // };
    // <================================== End normal filter ==========================================>

    // <================================== search filter function==========================================>
    const onFilter = (e) => {
        console.log(e.target.value);
        const searchinput = e.target.value;
        studentapifun(0, searchinput);
        setFilterSearch(searchinput);
    };
    console.log('filtersearch', filtersearch);
    // <================================== End search filter function ==========================================>

    // <================================== Api call ==========================================>
    useEffect(() => {
        studentapifun();
    }, []);

    const studentapifun = (offset = 0, searchinput = '') => {
        setloading(true);
        let payloadData = {
            offset: offset,
            limit: 10,
            search: searchinput
        };
        studentSearchApi(payloadData).then((res) => {
            console.log('res---', res);
            setApilisdata(res.data);
            setloading(false);
        });
        (err) => {
            console.log(err);
        };
    };

    // <================================== End Api call ==========================================>

    // <================================== Table onChange function handleTableChange  ==========================================>
    const handleTableChange = (pagination, filters, sorter) => {
        console.log('pagination', pagination);
        setTableParams({
            pagination,
            filters,
            ...sorter
        });
        let offset = (pagination.current - 1) * parpage;
        console.log('offset', offset);
        studentapifun(offset);
    };
    // <================================== End Table onChange function handleTableChange  ==========================================>
    // <================================== Ui Start  ==========================================>
    return (
        <>
            <Typography variant="h5" className="mx-2">
                <small className="text-black-50">Home</small> {'/'} <b>Driver Details</b>
            </Typography>
            <br></br>
            <MainCard>
                <div className="title-main">
                    <h5 className=" text-center ">
                        <span className="ribbon ">Driver Details</span>
                    </h5>
                </div>
                <hr className="MuiDivider-root MuiDivider-fullWidth css-1wnin34-MuiDivider-root"></hr>
                <Grid container spacing={2} columnSpacing={{ sm: 1, md: 3 }}>
                    <Grid item lg={12} sm={12} xs={12} className="edit-button">
                        <Link to={'/Driver'}>
                            <button
                                type="button"
                                id="addtolist_btn"
                                className="btn btn-primary  button-hov-add-to-list btn-sm rounded-pill "
                            >
                                <FontAwesomeIcon icon={faCirclePlus} /> Add New
                            </button>
                        </Link>
                    </Grid>
                    <Grid item lg={8} xs={12} sm={12} md={12}>
                        <FontAwesomeIcon icon={faFileExcel} className="m-1 h3 text-success icon" />
                        <FontAwesomeIcon icon={faPrint} className="m-1 h3 text-danger icon" />
                        <FontAwesomeIcon icon={faCloudArrowDown} className="m-1 h3 text-primary icon" />
                    </Grid>
                    <Grid item lg={4} xs={12} sm={12} md={12} className="text-end">
                        <Search
                            placeholder="search"
                            className="m-1"
                            // onSearch={onSearch}
                            onChange={onFilter}
                            style={{
                                width: 200
                            }}
                        />
                    </Grid>
                </Grid>
                <Typography variant="body2">
                    {/* <hr className="MuiDivider-root MuiDivider-fullWidth css-1wnin34-MuiDivider-root"></hr> */}
                    <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 12, md: 12 }}>
                        <Grid item lg={12} xs={12} sm={12} md={12}>
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={apilisdata}
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

export default Paginationwithsearchfilter;
