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

const EducationCreate = Loadable(lazy(() => import('pages/Educationform/index')));
const Educationtable = Loadable(lazy(() => import('pages/Educationtable/index')));

const Professionfrom = Loadable(lazy(() => import('pages/Professionfrom/index')));
const Professiontable = Loadable(lazy(() => import('pages/Professiontable/index')));

const MemberCreate = Loadable(lazy(() => import('pages/Memberform/index')));
const Membertable = Loadable(lazy(() => import('pages/Membertable/index')));

const EmployeeCreate = Loadable(lazy(() => import('pages/Employeeform/index')));
const Employeetable = Loadable(lazy(() => import('pages/Employeetable/index')));

const UnitCreate = Loadable(lazy(() => import('pages/Unitform/index')));
const Unittable = Loadable(lazy(() => import('pages/Unittable/index')));

const FamilyCreate = Loadable(lazy(() => import('pages/Familyform/index')));
const Familytable = Loadable(lazy(() => import('pages/Familytable/index')));

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
        {
            path: 'EducationCreate',
            element: <EducationCreate />
        },
        {
            path: 'EducationCreate/:id',
            element: <EducationCreate />
        },
        {
            path: 'EducationTable',
            element: <Educationtable />
        },
        {
            path: 'Professionfrom',
            element: <Professionfrom />
        },
        {
            path: 'Professionfrom/:id',
            element: <Professionfrom />
        },
        {
            path: 'Professiontable',
            element: <Professiontable />
        },
        {
            path: 'MemberCreate',
            element: <MemberCreate />
        },
        {
            path: 'MemberCreate/:id',
            element: <MemberCreate />
        },
        {
            path: 'Membertable',
            element: <Membertable />
        },
        {
            path: 'EmployeeCreate',
            element: <EmployeeCreate />
        },
        {
            path: 'EmployeeCreate/:id',
            element: <EmployeeCreate />
        },
        {
            path: 'Employeetable',
            element: <Employeetable />
        },
        {
            path: 'UnitCreate',
            element: <UnitCreate />
        },
        {
            path: 'UnitCreate/:id',
            element: <UnitCreate />
        },
        {
            path: 'Unittable',
            element: <Unittable />
        },
        {
            path: 'FamilyCreate',
            element: <FamilyCreate />
        },
        {
            path: 'FamilyCreate/:id',
            element: <FamilyCreate />
        },
        {
            path: 'Familytable',
            element: <Familytable />
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
