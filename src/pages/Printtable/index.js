import React, { useEffect, useState, useRef } from 'react';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Imagelogo from '../../image/logo_hospital.png';
import swal from 'sweetalert';
import { useReactToPrint } from 'react-to-print';
import './printtable.css';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
// project import
import MainCard from 'components/MainCard';
import Button from 'themes/overrides/Button';
import { filter } from 'lodash';
import { Link, useParams } from 'react-router-dom';
import { caspaperDetailListByApi } from 'components/Helper/case_paper';

const Printtable = () => {
    const conponentPDF = useRef();
    let { offset } = useParams();
    const [PrinttableData, setPrinttableData] = useState([]);
    const [loading, setloading] = useState(false);

    // <================================== Start handlePrint function ==========================================>

    const handlePrint = useReactToPrint({
        content: () => conponentPDF.current,
        documentTitle: 'Print',
        onAfterPrient: () => alert('Print success')
    });

    // <================================== End handlePrint function ==========================================>

    // <================================== Api call ==========================================>

    useEffect(() => {
        petientbyapi(offset);
    }, [offset]);

    const petientbyapi = (offset = 0) => {
        setloading(true);
        let payloadData = {
            offset: offset,
            limit: 10,
            search: ''
        };
        caspaperDetailListByApi(payloadData).then(
            async (res) => {
                // console.log('res=>', res);
                // console.log('current----------', current);
                setPrinttableData(res.data.data);
                setloading(false);
            },
            (err) => {
                console.log(err);
            }
        );
    };

    // <================================== End Api call ==========================================>

    // <================================== Ui Start  ==========================================>
    return (
        <>
            <Typography variant="h5" className="mx-2">
                <small className="text-black-50">Home</small> {'/'} <b>Casepaper Lists Print</b>
            </Typography>
            <br></br>
            <MainCard>
                <Grid container spacing={2} columnSpacing={{ sm: 1, md: 3 }}>
                    <Grid item lg={6} xs={12} sm={12} md={12}>
                        <span className="main-title bg-white text-dark"> Print</span>
                    </Grid>
                    <Grid item lg={6} xs={12} sm={12} md={12} className="text-end">
                        <button className="btn btn-success mx-1 m-1 btn-sm" type="button" onClick={handlePrint}>
                            <FontAwesomeIcon icon={faPrint} className="mx-1" /> Print
                        </button>
                    </Grid>
                </Grid>
                <Typography variant="body2">
                    <hr className="MuiDivider-root MuiDivider-fullWidth css-1wnin34-MuiDivider-root"></hr>
                    <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 12, md: 12 }}>
                        <Grid item lg={12} xs={12} sm={12} md={12}>
                            <div ref={conponentPDF}>
                                <div className="text-center">
                                    <img
                                        src={Imagelogo}
                                        alt="Mantis"
                                        width="100"
                                        className="text-center mx-5"
                                        style={{ padding: '13px 0px', borderRadius: '25%' }}
                                    />
                                </div>
                                <div className="row printsize">
                                    {/* <span className="text-center"> Case Paper</span> */}
                                    <table className="table-responsive table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>Name</th>
                                                <th>Date</th>
                                                <th>Address</th>
                                                <th>Email</th>
                                                <th>MOBILE NO</th>
                                                <th>Blood</th>
                                                <th>Sex</th>
                                                <th>Age</th>
                                                <th>DESCRIPTION</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {PrinttableData.map((res) => (
                                                <tr>
                                                    <td>{res.id}</td>
                                                    <td>{res.MEMBER_NAME}</td>
                                                    <td>{res.REGI_DATE}</td>
                                                    <td>{res.MEMBER_ADD}</td>
                                                    <td>{res.MEMBER_EMAIL}</td>
                                                    <td>{res.MOBILE_NO}</td>
                                                    <td>{res.BLOOD}</td>
                                                    <td>{res.SEX == 1 ? 'M' : 'F'}</td>
                                                    <td>{res.AGE}</td>
                                                    <td>{res.DESCRIPTION}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Typography>
            </MainCard>
        </>
        // <================================== End Ui  ==========================================>
    );
};

export default Printtable;
