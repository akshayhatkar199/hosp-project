import React, { useState } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Checkbox, Form, Input } from 'antd';
import { message, Space } from 'antd';
import { checkLogin } from '../../store/reducers/userReducer';
import swal from 'sweetalert';

// import Image from '../../images/logo-login.png';
import './mainlogin.css';
import { loginByApi } from 'components/Helper/login';

const MainLogin = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // // console.log("login Componet")
    // const onformsubmit = async (values) => {
    //     console.log('success', values);
    // };

    const onformsubmit = async (values) => {
        setLoading(true);
        console.log('success', values);
        let payloadData = {
            ...values,
            email: values.email,
            password: values.password
        };
        loginByApi(payloadData).then(
            async (res) => {
                console.log('resid', res.userId);
                if (res.id) {
                    console.log('Login success full');
                    await localStorage.setItem('token', res.id);
                    await localStorage.setItem('userId', res.userId);
                    await dispatch(
                        checkLogin({
                            token: res.id,
                            userId: res.userId
                        })
                    );
                    swal('Login', 'Login success full', 'success');
                    navigate('/');
                    // window.location.href = 'http://localhost:3001/';
                    setLoading(false);
                } else {
                    console.log('In valid Email and Password');
                    swal('Login', 'In valid Email and Password', 'err');
                    setLoading(false);
                }
            },
            (err) => {
                console.log(err);
                swal('Login', 'In valid Email and Password', 'error');
                setLoading(false);
            }
        );
    };

    return (
        <div className="logincontainer">
            <Row>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 8 }} xxl={{ span: 8 }}></Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 8 }} xxl={{ span: 8 }}>
                    <Card className="login-card text-center mycards" bordered={false}>
                        {/* <img src={Image} className=" login-logo" /> */}
                        <h4 className="title-login">Satyajeet Tambe</h4>

                        <Form
                            layout="vertical"
                            name="basic"
                            labelCol={{
                                span: 8
                            }}
                            initialValues={{
                                remember: true
                            }}
                            onFinish={onformsubmit}
                            autoComplete="off"
                        >
                            <Form.Item
                                // label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email!'
                                    },
                                    { type: 'email', message: 'please enter a valid email' }
                                ]}
                            >
                                {/* <Input style={{ width: '100%' }} /> */}
                                <TextField fullWidth label="Email" type="email" />
                            </Form.Item>

                            <Form.Item
                                // label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!'
                                    }
                                ]}
                            >
                                {/* <Input.Password /> */}
                                <TextField fullWidth label="Password" type="password" />
                            </Form.Item>

                            <Form.Item
                            // wrapperCol={{
                            //   offset: 5,
                            //   span: 16,
                            // }}
                            >
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    className="btn text-center saveclass mybtn mt-3  "
                                >
                                    Login
                                </Button>

                                {/* <Link to="/registration">
                                    {' '}
                                    <Button type="link">Registration</Button>
                                </Link> */}
                            </Form.Item>
                        </Form>
                    </Card>
                    {/* <div className="login-footer-title">
                        <h5>Comtranse Technology, Kolhapur</h5>
                    </div> */}
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 6 }} lg={{ span: 6 }} xl={{ span: 8 }} xxl={{ span: 8 }}></Col>
            </Row>
        </div>
    );
};

export default MainLogin;
