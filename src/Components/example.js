// import React from 'react';
// // import React, { useEffect, useCallback } from 'react';
// // import { Navigate, useNavigate } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
// // import { useDispatch, useSelector } from 'react-redux';
// // import axios from "axios";
// // import { setEmployee } from "../Redux/EmpSlice";
// // // import { hideLoading, showLoading } from "../Redux/AlertsSlice";

// function EmpProtectedRoute(props) {
// //   const { employee } = useSelector((state) => state.employee);
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const getEmployee = useCallback(async () => {
// //     try {
// //       // dispatch(showLoading());

// //       const response = await axios.post(
// //         "/api/employee/get-employee-info-by-id",
// //         {},
// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //         }
// //       );
// //       // dispatch(hideLoading());
// //       if (response.data.success) {
// //         dispatch(setEmployee(response.data.data));
// //       } else {
// //         localStorage.clear();
// //         navigate("/emplogin");
// //       }
// //     } catch (error) {
// //       // dispatch(hideLoading());
// //       localStorage.clear();
// //       navigate("/emplogin");
// //     }
// //   }, [dispatch, navigate]);

// //   useEffect(() => {
// //     if (!employee) {
// //         getEmployee();
// //     }
// //   }, [getEmployee, employee]);

//   if (localStorage.getItem('tokens')) {
//     return props.children;
//   } else {
//     return <Navigate to="/emplogin" />;
//   }
// }

// export default EmpProtectedRoute;






// import React from 'react';
// import { Navigate } from 'react-router-dom';
// // import React, { useEffect, useCallback } from 'react';
// // import { Navigate, useNavigate } from 'react-router-dom';
// // import { useDispatch, useSelector } from 'react-redux';
// // import axios from "axios";
// // import { setUser } from "../Redux/UserSlice";
// // import { hideLoading, showLoading } from "../Redux/AlertsSlice";

// function ProtectedRoute(props) {
//   // const { user } = useSelector((state) => state.user);
//   // const dispatch = useDispatch();
//   // const navigate = useNavigate();

//   // const getUser = useCallback(async () => {
//   //   try {
//   //     // dispatch(showLoading());

//   //     const response = await axios.post(
//   //       "/api/user/get-user-info-by-id",
//   //       { token: localStorage.getItem("token") },
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${localStorage.getItem("token")}`,
//   //         },
//   //       }
//   //     );
//   //     // dispatch(hideLoading());
//   //     if (response.data.success) {
//   //       dispatch(setUser(response.data.data));
//   //     } else {
//   //       localStorage.clear();
//   //       navigate("/login");
//   //     }
//   //   } catch (error) {
//   //     // dispatch(hideLoading());
//   //     localStorage.clear();
//   //     navigate("/login");
//   //   }
//   // }, [dispatch, navigate]);

//   // useEffect(() => {
//   //   if (!user) {
//   //     getUser();
//   //   }
//   // }, [getUser, user]);

//   if (localStorage.getItem('token')) {
//     return props.children;
//   } else {
//     return <Navigate to="/login" />;
//   }
// }

// export default ProtectedRoute;
