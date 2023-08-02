// material-ui
import React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { LaptopOutlined, faCircleCheck, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLaptop,
    faLocationDot,
    faHome,
    faStar,
    faMessage,
    faBell,
    faUser,
    faBars,
    faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import './help.css';

const Help = () => {
    return (
        <>
            <Typography variant="h5" className="mx-2">
                <small className="text-black-50" style={{ fontFamily: 'Poppins' }}>
                    Home
                </small>
                {'/'} <b> Help </b>
            </Typography>
            <br></br>
            <Card className="driver-create-card ">
                <Grid item xs={12} container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12} lg={12} md={12} sm={12}>
                        <div className="text-center">
                            <FontAwesomeIcon icon={faLaptop} style={{ fontSize: '30px', color: 'red' }} className="m-1" />
                            <b className="comtransmain ">
                                <span style={{ color: 'red' }}>Com</span>
                                <span style={{ color: 'blue' }}>transe</span>
                            </b>
                        </div>
                        <br />
                        <div className="helpdiv">
                            <span className="fontstyle">
                                {/* <i className="fas fa-laptop" style={{ fontSize: '100px', color: 'red' }}></i> */}
                                <FontAwesomeIcon icon={faLaptop} style={{ fontSize: '30px', color: 'red' }} className="m-1" />
                                <b className="comtransmain ">
                                    <span style={{ color: 'red' }}>Com</span>
                                    <span style={{ color: 'blue' }}>transe</span>
                                </b>
                                <br />
                                Technology Kolhapur To become a leading software company that delivers <br />
                                effective business solutions meeting all the required standards within and across the state.
                            </span>
                            <br />
                            <br />
                            <span className="fontstyle">
                                Welcome to <span style={{ color: 'red' }}>COM</span>
                                <span style={{ color: 'blue' }}>TRANSE</span> TECHNOLOGY, a Leading & reputed Software Company in Kolhapur,
                                Maharashtra. The main reason to set-up our Software Company in Kolhapur, is to provide the best industry
                                level services locally. The name <span style={{ color: 'red' }}>'COM</span>
                                <span style={{ color: 'blue' }}>TRANSE'</span> is fusion of COMputing, TRANsaction and SErvices,
                                representing service commitments to customer for all their computing needs by employing latest technologies.
                                Our mission is to enhancing the business growth of our customers with creative Design and Development to
                                deliver market-defining high-quality solutions that create value and reliable competitive advantage for our
                                clients around the world.
                            </span>
                            <br />
                            <br />
                            <span className="fontstyle">
                                <FontAwesomeIcon icon={faStar} style={{ fontSize: '10px', color: 'blue' }} className="m-1" />
                                <b>Our Mission</b> <br />
                                is to deliver optimal solutions with quality and services at reasonable prices. For us customer satisfaction
                                is given top place. We are very friendly in our dealings to the customers and it helps us retain existing
                                clients and expand customer circle. We always try to improve the quality of our products by exploring
                                innovative ideas.
                            </span>
                            <br />
                            <br />
                            <span className="fontstyle">
                                <FontAwesomeIcon icon={faStar} style={{ fontSize: '10px', color: 'blue' }} className="m-1" />
                                <b> Our vision</b> <br />
                                is to develop in a constant manner and grow as a major IT service provider to become a leading performer, in
                                providing quality Web and Software Development solutions in the competitive global marketplace. Our
                                professional, flexible and integrated process reflects in what we do. We always guide our customers to
                                success. We have the ability to accelerate and quickly share the great work or products of your organization
                                or business.
                            </span>
                            <br />
                            <br />
                            <span className="fontstyle">
                                <FontAwesomeIcon icon={faStar} style={{ fontSize: '10px', color: 'blue' }} className="m-1" />
                                <b> Our Values</b> <br />
                                We are committed to deliver best industry practices coupled with emerging practical and dependable
                                technological solutions. Our team is specialized in every aspect of software development. We cherish and
                                nurture our values and interactions with all our employees and clients. We have high regards for individual
                                value which creates a transparent atmosphere ensuring outstanding teamwork and rapport, built within the
                                company. We promise to live up to our values. Our values reflect in: • Developing lasting beneficial
                                relationships with our clients • Confidentiality with respect to work • Learning and Growing atmosphere •
                                Integrity expressed • Independent and Reliable business objectives
                            </span>
                            <br />
                            <br />
                            <b>Link : </b>
                            <a href="https://comtranse.in/" style={{ color: 'blue' }} target="_blank">
                                <span style={{ color: 'red' }}>Com</span>
                                <span style={{ color: 'blue' }}>transe</span> Technology Technology Pvt.Ltd.
                            </a>
                            <br />
                            <br />

                            <span className="fontstyle">
                                <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: '20px', color: 'blue' }} className="m-1" />
                                <b className="comtransmain">
                                    <span style={{ color: 'red' }}>Com</span>
                                    <span style={{ color: 'blue' }}>transe</span> Technology
                                </b>
                                <br />
                                NCC Bhavan , Near Shivaji University <br />
                                Gate No.8, Sky Ville Apartment, <br />
                                Kolhapur-416008. Maharashtra,India. <br />
                                <span style={{ color: 'red' }}>Com</span>
                                <span style={{ color: 'blue' }}>transe</span>@gmail.com <br />
                                +919623510789 +917756082222
                            </span>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </>
    );
};

export default Help;
