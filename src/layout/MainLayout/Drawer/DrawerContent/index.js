// project import
import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
import { MailOutlined, SettingOutlined, AppstoreOutlined, DashboardOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import {
    LogoutOutlined,
    UserOutlined,
    ProfileOutlined,
    WalletOutlined,
    QuestionCircleOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type
    };
}
// icons
const icons = {
    DashboardOutlined
};
const items = [
    // getItem(
    //     '',
    //     'grp',
    //     null,
    //     [
    //         // getItem('Dashboard', '1'),
    //         // getItem('Case Paper', '2'),
    //         getItem('Pationt', '3'),
    //         getItem('Preserption', '4'),
    //         getItem('Master', '5'),
    //         getItem('Report', '6'),
    //         getItem('Help', '7'),
    //         getItem('Log Out', '8')
    //     ],
    //     'group'
    // )
    getItem('Dashboard', '1', <DashboardOutlined />),
    getItem('Website Manage', 'sub2', <AppstoreOutlined />, [
        getItem('Banner create', '4', <UserOutlined />),
        getItem(' Banner Modify', '5', <ProfileOutlined />),
        getItem('Mainbatmaya ', '6', <UserOutlined />),
        getItem('MainbatmayaTable ', '7', <ProfileOutlined />),
        getItem('Shanchitre ', '8', <UserOutlined />),
        getItem('ShanchitryTable ', '9', <ProfileOutlined />)
    ]),
    getItem('Brand Details', 'sub1', <AppstoreOutlined />, [
        getItem('Brand Table ', '2', <ProfileOutlined />),
        getItem('Brand From', '3', <ProfileOutlined />)
    ]),
    // getItem('Brand Details', 'sub1', <AppstoreOutlined />, [
    //     getItem('Mainbatmaya ', '2', <ProfileOutlined />),
    //     getItem('Brand From', '3', <ProfileOutlined />)
    // ])
    // getItem('Preserption', '6', <WalletOutlined />),
    // getItem('Master', '7', <AppstoreOutlined />),
    // getItem('Report', '8', <QuestionCircleOutlined />),
    // getItem('Help', '9', <UnorderedListOutlined />),
    getItem('Log Out', '10', <LogoutOutlined />)
];
// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
// ==============================|| DRAWER CONTENT ||============================== //
const DrawerContent = () => {
    const [openKeys, setOpenKeys] = useState(['sub1']);
    const navigate = useNavigate();
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const menuclick = (item) => {
        // console.log(`"item" ${item}`);
        console.log(item);
        if (item.key == 1) {
            navigate(`/`);
            console.log(item.key);
        }
        if (item.key == 2) {
            navigate(`/BrandTable`);
            console.log(item.key);
        }
        if (item.key == 3) {
            navigate(`/Brandfrom`);
            console.log(item.key);
        }
        if (item.key == 4) {
            navigate(`/Banner`);
            console.log(item.key);
        }
        if (item.key == 5) {
            navigate(`/Modify`);
            console.log(item.key);
        }
        if (item.key == 6) {
            navigate(`/Mainbatmaya`);
            console.log(item.key);
        }
        if (item.key == 7) {
            navigate(`/MainbatmayaTable`);
            console.log(item.key);
        }
        if (item.key == 8) {
            navigate(`/Shanchitre`);
            console.log(item.key);
        }
        if (item.key == 9) {
            navigate(`/ShanchitryTable`);
            console.log(item.key);
        }
        if (item.key == 10) {
            swal({
                title: 'Are you sure?',
                text: 'Are you sure that you want to logout?',
                icon: 'warning',
                dangerMode: true,
                buttons: ['Cancel', 'Ok']
            }).then((willDelete) => {
                if (willDelete) {
                    swal('Success', 'Successfully Logout ', 'success');
                    localStorage.removeItem('token');
                    localStorage.removeItem('userId');
                    navigate(`/mainLogin`);
                }
            });
            // navigate(`/mainLogin`);

            console.log(item.key);
        }

        // console.log(`"key" ${key}`);
    };
    return (
        <SimpleBar
            sx={{
                '& .simplebar-content': {
                    display: 'flex',
                    flexDirection: 'column'
                }
            }}
        >
            <Navigation />
            <Menu
                className="menu-titles"
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                onClick={menuclick}
                style={{
                    width: 256,
                    fontFamily: 'Poppins',
                    fontSize: '15px'
                }}
                items={items}
            />
            {/* <span className="text-center">New Invoice</span> */}
            {/* <NavCard /> */}
        </SimpleBar>
    );
};

export default DrawerContent;
