import React, { useState } from 'react';
import '../Layout.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'remixicon/fonts/remixicon.css';
import g2 from "../pages/image/g2.png";

function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [showModal, setShowModal] = useState(false);
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
            name: 'Products',
            path: '/userdetailsdashm',
            icon: 'ri-profile-fill',
        },
        {
            name: 'Reservation Form',
            path: '/form',
            icon: 'ri-arrow-up-line',
        },
        {
            name: 'Orders',
            path: '/orders',
            icon: 'ri-shopping-basket-fill',
        },
        {
            name: 'Reservation',
            path: '/reservation',
            icon: 'ri-git-repository-commits-fill',
        },
        {
            name: 'Make Payment ',
            path: '/payDetails',
            icon: 'ri-profile-fill',
        },
     
    ];
    const userTitleMenu = [
        {
            name: 'Customer Management System',
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
        },
    ];
    const TailorTitleMenu = [
        {
            name: 'Cutting Management System',
        },
    ];
    // Assuming user.isTailor is a boolean value indicating whether the user is a tailor or not

    // const menuToBeRendered = user?.isTalor ? TailorMenu : userMenu;
    // const menutoberendered = user?.isTalor ? TailorTitleMenu : userTitleMenu;

    let menuToBeRendered;
    let menutoberendered;

    if (user && user.isTalor === 'Doctor') {
        menuToBeRendered = TailorMenu;
        menutoberendered = TailorTitleMenu;
    } else {
        menuToBeRendered = userMenu;
        menutoberendered = userTitleMenu;
    }

    // Function to handle opening modal
    const handleOpenModal = () => {
        setShowModal(true);
    };

    // Function to handle closing modal
    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="main p-2">
            <div className="d-flex layout">
                <div
                    className={`${collapsed ? 'collapsed-sdebar' : 'sidebar'}`}
                >
                    <div className="sidebar-header">
                    <img className="famg7" src={g2} alt="famlogo" />{" "}
                    </div>
                    <div className="menu">
                        {menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path;
                            return (
                                <div
                                    className={`d-flex menu-item ${
                                        isActive && 'active-menu-item'
                                    }`}
                                    key={menu.name}
                                >
                                    <i className={menu.icon}></i>
                                    {!collapsed && (
                                        <Link to={menu.path}>{menu.name}</Link>
                                    )}
                                </div>
                            );
                        })}

                        <div
                            className={`d-flex menu-item `}
                            onClick={() => {
                                localStorage.clear();
                                navigate('/login');
                            }}
                        >
                            <i className="ri-logout-box-r-fill"></i>
                            {!collapsed && <Link to={'/login'}>Logout</Link>}
                        </div>
                    </div>
                </div>

                <div className="content">
                    <div className="header">
                        {collapsed ? (
                            <i
                                className="ri-menu-2-line header-action-icon"
                                onClick={() => setCollapsed(false)}
                            ></i>
                        ) : (
                            <i
                                className="ri-close-fill header-action-icon"
                                onClick={() => setCollapsed(true)}
                            ></i>
                        )}

                        {menutoberendered.map((header) => {
                            return (
                                <div
                                    className={'d-flex menu-items '}
                                    key={header.name}
                                >
                                    <Link>{header.name}</Link>
                                </div>
                            );
                        })}

                        <div className="d-flex alin-items-center">
                            <i
                                className="ri-notification-3-fill header-action-icon mr-2"
                                onClick={handleOpenModal}
                            ></i>

                            <Link className="anchor" to="/profile">
                                {user?.name || 'Guest'}
                            </Link>
                        </div>
                    </div>
                    <div className="body">{children}</div>
                </div>

                {/* Bootstrap modal */}
                <div
                    className={`modal fade ${showModal ? 'show' : ''}`}
                    id="exampleModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    style={{ display: showModal ? 'block' : 'none' }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="exampleModalLabel"
                                >
                                    Notifications
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <div className="modal-body">
                                Woo-hoo, no notifications yet!
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                                {/* Additional buttons if needed */}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Modal backdrop */}
                {showModal && <div className="modal-backdrop fade show"></div>}
            </div>
        </div>
    );
}

export default Layout;
