import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkLogin } from '../store/reducers/userReducer';
import loaders from '../image/loader.gif';

function RequireAuth({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(true);

    const detectKeyDown = (e) => {
        // console.log(e);
        // console.log(e.key);
        if (e.key === 'F1') {
            e.preventDefault();
            // alert('F1 press');
            navigate('/Casepaper');
            // console.log('clicked key', e.key);
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', detectKeyDown, true);
    }, []);

    const checkIsLogin = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if (token) {
            const data = await dispatch(
                checkLogin({
                    token: token,
                    userId: userId
                })
            );
            console.log('data', data.payload?.info?.data);
            if (data.payload?.info) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
        } else {
            setIsLogin(false);
        }
        setLoading(false);
    };
    useEffect(() => {
        checkIsLogin();
    }, []);
    if (loading) {
        return (
            <>
                <div className="d-flex align-items-center justify-content-center vh-100">
                    <img src={loaders} alt="Mantis" />
                </div>
            </>
        );
    }
    if (isLogin === false) {
        return <Navigate to="/mainLogin" />;
    }
    return <div>{children}</div>;
}

export default RequireAuth;
