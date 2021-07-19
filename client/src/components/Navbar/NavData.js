import { Contacts, Create, Home, Info, LocalLibrary, YouTube } from '@material-ui/icons';
import React from 'react';

export const NavItemsData = [
    {
        title: 'Home',
        path: '/home',
        icon: <Home />,
        cNamme: 'nav-text',
        auth: false
    },
    {
        title: 'Create Memories',
        path: '/createMemories',
        icon: <Create />,
        cNamme: 'nav-text',
        auth: true
    },
];

// {
//         title:'Courses',
//         path:'/courses',
//         icon:<LocalLibrary/>,
//         cNamme:'nav-text',
//     },
//     {
//         title:'YouTube',
//         path:'/youtube',
//         icon:<YouTube/>,
//         cNamme:'nav-text',
//     },
//     {
//         title:'ContactUs',
//         path:'/contact-us',
//         icon:<Contacts/>,
//         cNamme:'nav-text',
//     },
//     {
//         title:'About',
//         path:'/about',
//         icon:<Info/>,
//         cNamme:'nav-text',
//     }