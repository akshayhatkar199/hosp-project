import React, { useEffect, useState } from 'react';
import './dashboard.css';
import Grid from '@mui/material/Unstable_Grid2';
import Logo from '../../image/logo.png';
import { Link } from 'react-router-dom';
// import { casepaperCountTotalByApi } from 'components/Helper/details';
// import { registerpatientCountTotalByApi } from 'components/Helper/member_rgi';
import helpimag from '../../image/dashboard-help.jfif';

const Dashboardmain = () => {
    const [casepapertotalcounting, setCasepapertotalcounting] = useState();
    const [registertotalcounting, setRegistertotalcounting] = useState();
    // useEffect(() => {
    //     getcasepaertotalcountbyid();
    //     gettotalRegistercountbyid();
    // }, []);
    // const getcasepaertotalcountbyid = () => {
    //     casepaperCountTotalByApi()
    //         .then(
    //             async (res) => {
    //                 // console.log(' rescountcase', res);
    //                 setCasepapertotalcounting(res.count);
    //                 // console.log('setCasepapertotalcounting', setCasepapertotalcounting);
    //             },
    //             (err) => {
    //                 console.log('err', err);
    //             }
    //         )
    //         .catch();
    // };
    // const gettotalRegistercountbyid = () => {
    //     registerpatientCountTotalByApi()
    //         .then(
    //             async (res) => {
    //                 // console.log(' rescountcase', res);
    //                 setRegistertotalcounting(res.count);
    //                 // console.log('setRegistertotalcounting', setRegistertotalcounting);
    //             },
    //             (err) => {
    //                 console.log('err', err);
    //             }
    //         )
    //         .catch();
    // };
    return (
        <>
            <div className="bagimg">
                <div className="ms-content-wrapper main">
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12} sm={12} lg={12} xl={12}>
                            <div className=" topArea">
                                <div className="col-9 col-9">
                                    <Grid item xs={12} sm={12} lg={9} xl={9}>
                                        <div className="mainInfoContainer">
                                            <div className="infos" style={{ paddingLeft: '39px' }}>
                                                <img
                                                    // src="https://speedx.mahavitran.net/assets/img/icons/transport.png"
                                                    src={Logo}
                                                    alt="dashboar"
                                                    style={{ width: '45%' }}
                                                    // style={{ height='100', width='100'
                                                    // }}
                                                />
                                                &nbsp;
                                                <span
                                                    style={{
                                                        textTransform: 'uppercase',
                                                        color: '#fff',
                                                        fontWeight: '600',
                                                        fontSize: '22px',
                                                        fontFamily: 'emoji'
                                                    }}
                                                >
                                                    Akshat Shah
                                                </span>
                                            </div>
                                        </div>
                                    </Grid>
                                </div>
                            </div>
                            {/* <div className="row" style={{ justifyContent: 'center', maxHeight: '342px' }}> */}
                            <Grid
                                container
                                rowSpacing={1}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                style={{ justifyContent: 'center', maxHeight: '342px' }}
                            >
                                <div className="col-11 for_over" style={{ zIndex: '1 !important' }}>
                                    <div className="cash_wrap">
                                        <div className="total_cash" style={{ display: 'flex' }}></div>
                                    </div>
                                    <h5 className="cashflowtext"> Akshat Shah</h5>
                                    <div className="wrapFlex">
                                        <Grid item xs={12} sm={12} lg={4} xl={4} md={4} className="records_data">
                                            <div className="data_rec fonclas">Contact</div>
                                            <div className="rounded bgcount">
                                                <span className="countfont">{casepapertotalcounting}</span>
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={12} lg={4} xl={4} md={4} className=" records_data">
                                            <div className="data_rec fonclas">Windows</div>
                                            <div className="rounded bgcount">
                                                <span className="countfont">{registertotalcounting}</span>
                                            </div>
                                        </Grid>

                                        <Grid item xs={12} sm={12} lg={4} xl={4} md={4} className=" records_data">
                                            <div className="data_rec fonclas"> Doors</div>
                                            <div className="rounded bgcount">
                                                <span className="countfont">{casepapertotalcounting}</span>
                                            </div>
                                        </Grid>
                                    </div>
                                </div>
                                <div className="row gapBothSides">
                                    <Grid
                                        container
                                        rowSpacing={1}
                                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                        style={{ justifyContent: 'center', maxHeight: '342px' }}
                                    >
                                        <Grid item xs={12} sm={4} md={3} lg={3} className="for_menus">
                                            <Link to="/patient">
                                                <div className="menus_icon">
                                                    <img
                                                        src="https://speedx.mahavitran.net/assets/img/icons/user.png"
                                                        alt="dashboard"
                                                        width="40"
                                                    />
                                                </div>
                                                <div className="menus_icon">New Windows</div>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={3} lg={3} className="for_menus">
                                            <Link to="/casepaperList">
                                                <div className="menus_icon">
                                                    <img
                                                        src="https://speedx.mahavitran.net/assets/img/icons/list.png"
                                                        alt="dashboard"
                                                        width="40"
                                                    />
                                                </div>
                                                <div className="menus_icon">Door </div>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={3} lg={3} className="for_menus">
                                            <Link to="/Casepaper">
                                                <div className="menus_icon">
                                                    <img
                                                        src="https://speedx.mahavitran.net/assets/img/icons/loadlist.png"
                                                        alt="dash"
                                                        width="40"
                                                    />
                                                </div>
                                                <div className="menus_icon">Sliding Doors Add</div>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={3} lg={3} className="for_menus">
                                            <Link to="/PationtDetails">
                                                <div className="menus_icon">
                                                    <img
                                                        src="https://speedx.mahavitran.net/assets/img/icons/bookinglist.jpg"
                                                        alt="da"
                                                        width="40"
                                                    />
                                                </div>
                                                <div className="menus_icon">Windows</div>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={3} lg={3} className="for_menus">
                                            {' '}
                                            <Link to="">
                                                <div className="menus_icon">
                                                    <img src={helpimag} alt="dash" width="40" />
                                                </div>
                                                <div className="menus_icon">Help</div>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={3} lg={3} className="for_menus">
                                            <Link to="/casepaperList">
                                                <div className="menus_icon">
                                                    <img
                                                        src="https://speedx.mahavitran.net/assets/img/icons/loading1.png"
                                                        alt="dashb"
                                                        width="40"
                                                    />
                                                </div>
                                                <div className="menus_icon">Loading List</div>
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12} sm={4} md={3} lg={3} style={{ marginTop: '77px' }}></Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            {/* </div> */}
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
};

export default Dashboardmain;
