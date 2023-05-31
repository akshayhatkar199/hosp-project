import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { AudioOutlined } from '@ant-design/icons';
import DataTable, { FilterComponent } from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Space, Table, Tag } from 'antd';
import { Input } from 'antd';
import './newinvoice.css';
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

const onSearch = (value) => console.log(value);
const customStyles = {
    cells: {
        style: {
            borderRight: '1px solid #ddd'
        }
    }
};
const apidata = [
    {
        id: '1',
        InvoiceDate: '02-02-2023',
        CustomerName: 'Anil Rathod',
        PaymentType: 'Cash',
        TotalProduct: '10',
        TotalDiscountAmt: '98',
        TotalGstAmt: '99',
        PaidAmount: '1000'
    },
    {
        id: '2',
        InvoiceDate: '06-02-2023',
        CustomerName: 'Mahesh Patil',
        PaymentType: 'Phone Pay',
        TotalProduct: '5',
        TotalDiscountAmt: '59',
        TotalGstAmt: '50',
        PaidAmount: '5000'
    },
    {
        id: '3',
        InvoiceDate: '10-04-2023',
        CustomerName: 'Arjun Mohite',
        PaymentType: 'Phone Pay',
        TotalProduct: '5',
        TotalDiscountAmt: '59',
        TotalGstAmt: '50',
        PaidAmount: '5000'
    },
    {
        id: '4',
        InvoiceDate: '15-04-2023',
        CustomerName: 'kedar bhalkar',
        PaymentType: 'Phone Pay',
        TotalProduct: '5',
        TotalDiscountAmt: '59',
        TotalGstAmt: '50',
        PaidAmount: '5000'
    }
];

const NewInvoice = () => {
    const [data, setdata] = useState([]);
    const [filterdata, setfilterdata] = useState([]);
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>
        },
        {
            title: 'InvoiceDate',
            dataIndex: 'InvoiceDate',
            key: 'InvoiceDate'
        },
        {
            title: 'CustomerName',
            dataIndex: 'CustomerName',
            key: 'CustomerName'
        },
        {
            title: 'PaymentType',
            dataIndex: 'PaymentType',
            key: 'PaymentType'
        },
        {
            title: 'TotalProduct',
            dataIndex: 'TotalProduct',
            key: 'TotalProduct'
        },
        {
            title: 'TotalDiscountAmt',
            dataIndex: 'TotalDiscountAmt',
            key: 'TotalDiscountAmt'
        },

        {
            title: 'TotalGstAmt',
            dataIndex: 'TotalGstAmt',
            key: 'TotalGstAmt'
        },
        {
            title: 'PaidAmount',
            dataIndex: 'PaidAmount',
            key: 'PaidAmount'
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button className="btn btn-sm active-btt">active</button>
                </Space>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <button className="m-1 btn btn-outline-dark btn-sm h6">
                        <FontAwesomeIcon icon={faPenToSquare} className="m-1 h5 text-warning icon text-center h6" />
                    </button>
                    <button className="m-1  btn btn-outline-danger btn-sm h6">
                        <FontAwesomeIcon icon={faTrash} className="m-1 h5 text-dark icon text-center h6" />
                    </button>
                </Space>
            )
        }
    ];
    useEffect(() => {
        setdata(apidata);
        setfilterdata(apidata);
    }, []);

    const onFilter = (e) => {
        console.log(e.target.value);
        const searchName = e.target.value;
        const tablefilter = data.filter((obj) => obj.CustomerName.toLowerCase().indexOf(searchName.toLowerCase()) >= 0);
        setfilterdata(tablefilter);
    };
    return (
        <>
            <Typography variant="h5" className="mx-2">
                <small className="text-black-50">Home</small> {'/'} <b>New Invoice</b>
            </Typography>
            <br></br>
            <MainCard>
                <Grid container spacing={2} columnSpacing={{ sm: 1, md: 3 }}>
                    <Grid item lg={6} xs={12} sm={12} md={12}>
                        <span className="main-title bg-white text-dark">Invoice List</span>
                    </Grid>
                    <Grid item lg={6} xs={12} sm={12} md={12} className="text-end">
                        <Search
                            placeholder="search"
                            className="m-1"
                            // onSearch={onSearch}
                            onChange={onFilter}
                            style={{
                                width: 200
                            }}
                        />

                        <button className="btn btn-primary mx-1 m-1 btn-sm" type="button">
                            Create
                        </button>
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
                                <Table columns={columns} dataSource={filterdata} size="small" />
                            </div>
                        </Grid>
                    </Grid>
                </Typography>
            </MainCard>
        </>
    );
};

export default NewInvoice;
