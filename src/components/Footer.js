import React from 'react';

const Footer = () => {
    return (
        <>
            <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12" style={{ position: 'fixed', bottom: '0', width: '100%', zIndex: '1' }}>
                <div class="d-flex py-3 w-100" style={{ justifyContent: 'center', backgroundColor: 'black', padding: '10px' }}>
                    <div class="text-white">
                        Designed &amp; Developed By{' '}
                        <a href="https://comtranse.in/" style={{ color: 'blue' }} target="_blank">
                            Akshay Hatkar
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;
