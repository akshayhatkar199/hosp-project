import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import RequireAuth from 'components/requireAuth';
// import Driver from "components/Driver/index";

// render - dashboard
// const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Dashboardmain = Loadable(lazy(() => import('pages/Dashboardmain/index')));

const Banner = Loadable(lazy(() => import('pages/Banner/index')));
const BannerModify = Loadable(lazy(() => import('pages/BannerModify/index')));

const AboutUs = Loadable(lazy(() => import('pages/AboutUs/index')));
const AboutusTable = Loadable(lazy(() => import('pages/AboutusTable/index')));

const ScienceWork = Loadable(lazy(() => import('pages/ScienceWork/index')));
const ScienceworkTable = Loadable(lazy(() => import('pages/ScienceworkTable/index')));

const Videogallary = Loadable(lazy(() => import('pages/Videogallary/index')));
const VideogallaryTable = Loadable(lazy(() => import('pages/VideogallaryTable/index')));

const Whyus = Loadable(lazy(() => import('pages/Whyus/index')));
const WhyusTable = Loadable(lazy(() => import('pages/WhyusTable/index')));

const Jumbotron = Loadable(lazy(() => import('pages/Jumbotron/index')));
const JumbotronTable = Loadable(lazy(() => import('pages/JumbotronTable/index')));

const LogoCreate = Loadable(lazy(() => import('pages/LogoCreate/index')));
const LogoTable = Loadable(lazy(() => import('pages/LogoTable/index')));

// const Report = Loadable(lazy(() => import('pages/Report/index')));
// const Help = Loadable(lazy(() => import('pages/Help/index')));

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
        {
            path: 'Banner',
            element: <Banner />
        },
        {
            path: 'Banner/:id',
            element: <Banner />
        },
        {
            path: 'BannerModify',
            element: <BannerModify />
        },
        {
            path: 'AboutUs',
            element: <AboutUs />
        },
        {
            path: 'AboutUs/:id',
            element: <AboutUs />
        },
        {
            path: 'AboutusTable',
            element: <AboutusTable />
        },
        {
            path: 'ScienceWork',
            element: <ScienceWork />
        },
        {
            path: 'ScienceWork/:id',
            element: <ScienceWork />
        },
        {
            path: 'ScienceworkTable',
            element: <ScienceworkTable />
        },
        {
            path: 'Videogallary',
            element: <Videogallary />
        },
        {
            path: 'Videogallary/:id',
            element: <Videogallary />
        },
        {
            path: 'VideogallaryTable',
            element: <VideogallaryTable />
        },
        {
            path: 'Whyus',
            element: <Whyus />
        },
        {
            path: 'Whyus/:id',
            element: <Whyus />
        },
        {
            path: 'WhyusTable',
            element: <WhyusTable />
        },
        {
            path: 'Jumbotron',
            element: <Jumbotron />
        },
        {
            path: 'Jumbotron/:id',
            element: <Jumbotron />
        },
        {
            path: 'JumbotronTable',
            element: <JumbotronTable />
        },
        {
            path: 'LogoCreate',
            element: <LogoCreate />
        },
        {
            path: 'LogoCreate/:id',
            element: <LogoCreate />
        },
        {
            path: 'LogoTable',
            element: <LogoTable />
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
        // {
        //     path: 'help',
        //     element: (
        //         <RequireAuth>
        //             <Help />
        //         </RequireAuth>
        //     )
        // },
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
