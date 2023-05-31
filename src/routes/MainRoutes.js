import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import RequireAuth from 'components/requireAuth';
// import Driver from "components/Driver/index";

// render - dashboard
// const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Dashboardmain = Loadable(lazy(() => import('pages/Dashboardmain/index')));
const Casepaper = Loadable(lazy(() => import('pages/Casepaper/index')));
const PationtDetails = Loadable(lazy(() => import('pages/PationtDetails/index')));
const Patient = Loadable(lazy(() => import('pages/Patient/index')));
const Preserption = Loadable(lazy(() => import('pages/Preserption/index')));
const Master = Loadable(lazy(() => import('pages/Master/index')));
const Report = Loadable(lazy(() => import('pages/Report/index')));
const Help = Loadable(lazy(() => import('pages/Help/index')));
const CasepaperList = Loadable(lazy(() => import('pages/CasepaperList/index')));
const Printtable = Loadable(lazy(() => import('pages/Printtable/index')));
const Registerpetient = Loadable(lazy(() => import('pages/Registerpetient/index')));

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
        <RequireAuth>
            <MainLayout />
        </RequireAuth>
    ),
    children: [
        {
            path: 'Dashboardmain',
            element: (
                <RequireAuth>
                    <Dashboardmain />
                </RequireAuth>
            )
        },
        {
            path: 'Casepaper',
            element: (
                <RequireAuth>
                    <Casepaper />
                </RequireAuth>
            )
        },
        {
            path: 'Casepaper/:id',
            element: (
                <RequireAuth>
                    <Casepaper />
                </RequireAuth>
            )
        },
        {
            path: 'casepaperList',
            element: (
                <RequireAuth>
                    <CasepaperList />
                </RequireAuth>
            )
        },
        {
            path: 'patient',
            element: (
                <RequireAuth>
                    <Patient />
                </RequireAuth>
            )
        },
        {
            path: 'PationtDetails',
            element: (
                <RequireAuth>
                    <PationtDetails />
                </RequireAuth>
            )
        },
        {
            path: 'preserption',
            element: (
                <RequireAuth>
                    <Preserption />
                </RequireAuth>
            )
        },
        {
            path: 'master',
            element: (
                <RequireAuth>
                    <Master />
                </RequireAuth>
            )
        },
        {
            path: 'report',
            element: (
                <RequireAuth>
                    <Report />
                </RequireAuth>
            )
        },
        {
            path: 'help',
            element: (
                <RequireAuth>
                    <Help />
                </RequireAuth>
            )
        },
        {
            path: 'Printtable/:offset',
            element: (
                <RequireAuth>
                    <Printtable />
                </RequireAuth>
            )
        },
        {
            path: 'Registerpetient/:offset',
            element: (
                <RequireAuth>
                    <Registerpetient />
                </RequireAuth>
            )
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        }
    ]
};

export default MainRoutes;
