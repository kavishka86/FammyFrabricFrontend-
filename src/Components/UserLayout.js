import React, { useState } from 'react';
import '../Layout.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'remixicon/fonts/remixicon.css';

function UserLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useSelector((state) => state.user);
    console.log(user);
    const navigate = useNavigate();
    console.log(user);
    const location = useLocation();

    const userMenu = [
        {
            name: 'Home',
            path: '/home',
            icon: 'ri-home-fill',
        },
        {
            name: 'Reservation',
            path: '/',
            icon: 'ri-git-repository-commits-fill',
        },
        {
            name: 'Profile',
            path: '/',
            icon: 'ri-profile-fill',
        }


    ];
    const userTitleMenu = [

        {
            name: 'Customer Mangment System',

        },

    ];


    const TailorMenu = [
        {
            name: 'Dashboard',
            path: '/home',
            icon: 'ri-dashboard-fill',
        },
        {
            name: 'Reservation',
            path: '/',
            icon: 'ri-git-repository-commits-fill',
        },
        {
            name: 'Orders',
            path: '/',
            icon: 'ri-order-play-line',
        },
        {
            name: 'Profile',
            path: '/',
            icon: 'ri-profile-fill',
        }

    ];
    const TailorTitleMenu = [

        {
            name: 'Cutting Mangment System',

        },

    ];
    // Assuming user.isTailor is a boolean value indicating whether the user is a tailor or not

    const menuToBeRendered = user?.isTalor ? TailorMenu : userMenu;
    const menutoberendered = user?.isTalor ? TailorTitleMenu : userTitleMenu;


    // let menuToBeRendered;
    // let menutoberendered;

    // if (user && user.isTalor === 'Doctor') {
       
    //         menuToBeRendered = TailorMenu;
    //         menutoberendered = TailorTitleMenu;

    
    // } else {
    //     menuToBeRendered = userMenu;
    //     menutoberendered = userTitleMenu;
    // }




    return (
        <div className='main p-2'>
            <div className='d-flex layout'>
                <div className={`${collapsed ? 'collapsed-sdebar' : 'sidebar'}`}>
                    <div className='sidebar-header'>
                        <h1>FF</h1>
                    </div>
                    <div className='menu'>
                        {menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path;
                            return (
                                <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`} key={menu.name}>
                                    <i className={menu.icon}></i>
                                    {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                                </div>
                            );
                        })}

                        <div className={`d-flex menu-item `} onClick={() => {
                            localStorage.clear();
                            navigate('/login')
                        }}>
                            <i className='ri-logout-box-r-fill'></i>
                            {!collapsed && <Link to={'/login'}>Logout</Link>}
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        {collapsed ? (
                            <i className="ri-menu-2-line header-action-icon" onClick={() => setCollapsed(false)}
                            ></i>)
                            :
                            (<i className="ri-close-fill header-action-icon" onClick={() => setCollapsed(true)}></i>)}

                        {menutoberendered.map((header) => {

                            return (
                                <div className={'d-flex menu-items '} key={header.name}>

                                    <Link >{header.name}</Link>
                                </div>
                            );
                        })}

                        <div className='d-flex alin-items-center' >
                            <i className="ri-notification-3-fill header-action-icon mr-2"></i>

                            <Link className='anchor' to='/profile'>{user?.name || 'Guest'}</Link>


                        </div>


                    </div>
                    <div className='body'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserLayout;
