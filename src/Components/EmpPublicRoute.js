import React from 'react';
import { Navigate } from 'react-router-dom';

function EmpPublicRoute(props) {
    if (localStorage.getItem('tokens')) {
        return <Navigate to="/emphome" />;
    } else {
        return props.children;
    }
}

export default EmpPublicRoute;
