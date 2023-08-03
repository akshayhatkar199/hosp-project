import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import RequireAuth from 'components/requireAuth';
// import Driver from "components/Driver/index";

// render - dashboard
// const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Dashboardmain = Loadable(lazy(() => import('pages/Dashboardmain/index')));
const Brandfrom = Loadable(lazy(() => import('pages/Brandfrom/index')));
const Banner = Loadable(lazy(() => import('pages/Banner/index')));
const Modify = Loadable(lazy(() => import('pages/Modify/index')));
const Mainbatmaya = Loadable(lazy(() => import('pages/Mainbatmaya/index')));
const ShanchitryTable = Loadable(lazy(() => import('pages/ShanchitryTable/index')));
// const Report = Loadable(lazy(() => import('pages/Report/index')));
const Help = Loadable(lazy(() => import('pages/Help/index')));
const Brandtable = Loadable(lazy(() => import('pages/Brandtable/index')));
const MainbatmayaTable = Loadable(lazy(() => import('pages/MainbatmayaTable/index')));
const Shanchitre = Loadable(lazy(() => import('pages/Shanchitre/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        // <RequireAuth>
        <MainLayout />
        // </RequireAuth>
    ),
    children: [
        {
            path: '/',
            element: (
                // <RequireAuth>
                <Dashboardmain />
                // </RequireAuth>
            )
        },
        // {
        //     path: 'Casepaper',
        //     element: <Casepaper />
        // },
        // {
        //     path: 'Casepaper/:id',
        //     element: (
        //         <RequireAuth>
        //             <Casepaper />
        //         </RequireAuth>
        //     )
        // },
        {
            path: 'BrandTable',
            element: <Brandtable />
        },
        {
            path: 'Brandfrom',
            element: <Brandfrom />
        },
        {
            path: 'Banner',
            element: <Banner />
        },
        {
            path: 'Banner/:id',
            element: <Banner />
        },
        {
            path: 'Modify',
            element: <Modify />
        },
        {
            path: 'Mainbatmaya',
            element: <Mainbatmaya />
        },
        {
            path: 'Mainbatmaya/:id',
            element: <Mainbatmaya />
        },
        {
            path: 'MainbatmayaTable',
            element: <MainbatmayaTable />
        },
        {
            path: 'Shanchitre',
            element: <Shanchitre />
        },
        {
            path: 'Shanchitre/:id',
            element: <Shanchitre />
        },
        {
            path: 'ShanchitryTable',
            element: <ShanchitryTable />
        },

        // {
        //     path: 'master',
        //     element: (
        //         <RequireAuth>
        //             <Master />
        //         </RequireAuth>
        //     )
        // },
        // {
        //     path: 'report',
        //     element: (
        //         <RequireAuth>
        //             <Report />
        //         </RequireAuth>
        //     )
        // },
        {
            path: 'help',
            element: (
                <RequireAuth>
                    <Help />
                </RequireAuth>
            )
        },
        // {
        //     path: 'Printtable/:offset',
        //     element: (
        //         <RequireAuth>
        //             <Printtable />
        //         </RequireAuth>
        //     )
        // },
        // {
        //     path: 'Registerpetient/:offset',
        //     element: (
        //         <RequireAuth>
        //             <Registerpetient />
        //         </RequireAuth>
        //     )
        // },
        {
            path: 'icons/ant',
            element: <AntIcons />
        }
    ]
};

export default MainRoutes;
