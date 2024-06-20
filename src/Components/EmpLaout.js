import React, { useState } from 'react';
import '../Layout.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'remixicon/fonts/remixicon.css';
import g2 from "../pages/image/g2.png";


function EmpLaout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const { employee } = useSelector((state) => state.employee);
    const navigate = useNavigate();
    const location = useLocation();

    // Define menu items based on user type
    let menuToBeRendered = [];
    let menutoberendered = [];

    if (employee && employee.empemployeeType === 'Tailor') {
        menuToBeRendered = [
            {
                empname: 'Dashboard',
                path: '/emphome',
                icon: 'ri-dashboard-fill',
            },
            {
                empname: 'Material Alloction',
                path: '/tprodut',
                icon: 'ri-grid-line',
            },
            {
                empname: 'Reservation',
                path: '/ApproveReservations',
                icon: 'ri-git-repository-commits-fill',
            },
            {
                empname: 'Add Orders',
                path: '/tailororder',
                icon: 'ri-order-play-line',
            },
            {
                empname: 'Orders',
                path: '/display',
                icon: 'ri-list-ordered-2',
            },
            {
                empname: 'Leaves',
                path: '/empLeaveForm',
                icon: 'ri-profile-fill',
            }
        ];

        menutoberendered = [
            {
                empname: 'Cutting Management System',
            },
        ];
    } else if(employee && employee.empemployeeType === 'Ledger Book Handler'){
        menuToBeRendered = [
            {
                empname: 'Dashboard',
                path: '/emphome',
                icon: 'ri-dashboard-fill',
            },
            {
                empname: 'Report Form',
                path: '/ledform',
                icon: 'ri-file-chart-line',
            },
            {
                empname: 'Details Table',
                path: '/leddisplay',
                icon: 'ri-line-chart-line',
            },
           
        ];

        menutoberendered = [
            {
                empname: 'Ledger Book Management System',
            },
        ];
    }
    else if(employee && employee.empemployeeType === 'HR Manager'){
        menuToBeRendered = [
            {
                empname: "Home",
                path: "/emphome",
                icon: "ri-home-line",
            },
            {
                empname: "Employees",
                path: "/empEmployees",
                icon: "ri-user-2-fill",
            },
            // {
            //     empname: "Attendence",
            //     path: "/AttendanceList",
            //     icon: "ri-user-2-fill",
            // },
            {
                empname: "Leave ",
                path: "/EmpLeaveList",
                icon: "ri-list-check-3",
            },
            {
                empname: "Salary ",
                path: "/EmpSalary",
                icon: "ri-bank-card-line",
            }
        ];

        menutoberendered = [
            {
                empname: 'Employee Management System',
            },
        ];


        
    }else if(employee && employee.empemployeeType === 'Inventory Manager'){
        menuToBeRendered = [
            {
                empname: 'Home',
                path: '/emphome',
                icon: 'ri-dashboard-fill',
            },
            {
                empname: 'Dashboard',
                path: '/inventorydashboard',
                icon: 'ri-home-3-fill',
            },
            {
                empname: 'Add Item',
                path: '/additem',
                icon: 'ri-file-chart-line',
            },
            {
                empname: 'Inform Supplier',
                path: '/addinform',
                icon: 'ri-stock-line',
            },
            {
                empname: 'Allocate',
                path: '/addallocate',
                icon: 'ri-profile-fill',
            },
          
        ];

        menutoberendered = [
            {
                empname: 'Inventory Management System',
            },
        ];
    }
    else if(employee && employee.empemployeeType === 'Customer Service Manager'){
        menuToBeRendered = [
            {
                empname: 'Dashboard',
                path: '/emphome',
                icon: 'ri-dashboard-fill',
            },
            {
                empname: 'Orders',
                path: '/admin/orders',
                icon: 'ri-sort-asc',
            },
          
          
        ];

        menutoberendered = [
            {
                empname: 'Customer Service Management System',
            },
        ];
    }
    else if(employee && employee.empemployeeType === 'Supplier Manager'){
        menuToBeRendered = [
            {
                empname: 'Dashboard',
                path: '/emphome',
                icon: 'ri-dashboard-fill',
            },
            {
                empname: 'Add Orders',
                path: '/sorders',
                icon: 'ri-sort-asc',
            },
            {
                empname: 'Supplier Details',
                path: '/sdisplay',
                icon: 'ri-briefcase-line',
            },
          
          
        ];

        menutoberendered = [
            {
                empname: 'Supplier Management System',
            },
        ];
    }else if(employee && employee.empemployeeType === 'Financial Manager'){
        menuToBeRendered = [
            {
                empname: 'Dashboard',
                path: '/emphome',
                icon: 'ri-dashboard-fill',
            },
            {
                empname: 'Report Form',
                path: '/report',
                icon: 'ri-file-chart-line',
            },
            
        
          
        ];

        menutoberendered = [
            {
                empname: 'Financial Management System',
            },
        ];
    }
    
    else{
        console.log('hi baby');

    }

    return (
        <div className='main p-2'>
            <div className='d-flex layout'>
                <div className={`${collapsed ? 'collapsed-sdebar' : 'sidebar'}`}>
                    <div className='sidebar-header'>
                   
                        <img className="famg7" src={g2} alt="famlogo" />{" "}
                    </div>
                    <div className='menu'>
                        {menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path;
                            return (
                                <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`} key={menu.empname}>
                                    <i className={menu.icon}></i>
                                    {!collapsed && <Link to={menu.path}>{menu.empname}</Link>}
                                </div>
                            );
                        })}

                        <div className={`d-flex menu-item `} onClick={() => {
                            localStorage.clear();
                            navigate('/emplogin');
                        }}>
                            <i className='ri-logout-box-r-fill'></i>
                            {!collapsed && <Link to={'/emplogin'}>Logout</Link>}
                        </div>
                    </div>
                </div>
                <div className='content'>
                    <div className='header'>
                        {collapsed ? (
                            <i className="ri-menu-2-line header-action-icon" onClick={() => setCollapsed(false)}></i>)
                            :
                            (<i className="ri-close-fill header-action-icon" onClick={() => setCollapsed(true)}></i>)}

                        {menutoberendered.map((header) => (
                            <div className={'d-flex menu-items '} key={header.empname}>
                                <Link>{header.empname}</Link>
                            </div>
                        ))}

                        <div className='d-flex alin-items-center'>
                            <i className="ri-user-3-fill header-action-icon mr-2"></i>
                            
                            <Link className='anchor' to='/profile'>{employee?.empname || 'Guest'}</Link>
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

export default EmpLaout;
