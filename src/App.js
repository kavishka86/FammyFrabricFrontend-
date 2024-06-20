import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { Toaster } from 'react-hot-toast';
import store from './Redux/Store';
import TraHome from './pages/TraHome';
import TraLogin from './pages/TraLogin';
import TraRegister from './pages/TraRegister';
import ProtectedRoute from './Components/ProtectedRoute';
import PublicRoute from './Components/PublicRoute';
import CutOrderForm from './pages/CutOrderForm';
import CutOrderDetails from './pages/CutOrderDetails';
import CutOrderUpdate from './pages/CutOrderUpdate';
import EmpHome from './pages/EmpHome';
import EmpLoin from './pages/EmpLoin';
import EmpRegister from './pages/EmpRegister';
import EmpProtectedRoute from './Components/EmpProtectedRoute';
import EmpPublicRoute from './Components/EmpPublicRoute';
import LedForm from './pages/LedForm';
import LedDetailsDisplay from './pages/LedDetailsDisplay';
import LedUpdate from './pages/LedUpdate';
import LedHome from './pages/LedHome';
import LedReport from './pages/LedReport';
import Homepage from './pages/Homepage';
import EmpEmployees from './pages/EmpEmployees';
import EmpDetailsUpdate from './pages/EmpDetailsUpdate';
import EmpLeaveList from './pages/EmpLeaveList';
import EmpLeaveForm from './pages/EmpLeaveForm';
import EmpSalary from './pages/EmpSalary';
import PaymentDetails from './pages/PaymentDetails';
import CardDetails from './pages/CardDetails';
import EditCards from './pages/EditCards';
import PaymentReport from './pages/PaymentReport';
import './Payment.css';
import UpdateCards from './pages/UpdateCards';
//import "./Payment.css";

import ApprovedLeaves from './pages/ApprovedLeaves';
import RejectedLeaves from './pages/RejectedLeaves';
import AttendanceForm from './pages/AttendanceForm';
import AttendanceList from './pages/AttendanceList';
import EmpWorkingHours from './pages/EmpWorkingHours';

import DashBoard from './pages/Inventory/Inventory/Admin/DashBoard/DashBoard';
import Additem from './pages/Inventory/Inventory/Admin/AddItem/Additem';
import UpdateItem from './pages/Inventory/Inventory/Admin/UpdateItem/UpdateItem';
import DetailsDash from './pages/Inventory/Inventory/User/DetailsDash/DetailsDash';
import Tpoducts from './pages/Inventory/Inventory/User/DetailsDash/Tpoducts';
import AddAllocate from './pages/Inventory/Inventory/Admin/AddAllocate/AddAllocate';
import AddInform from './pages/Inventory/Inventory/Admin/AddInform/AddInform';

// import Root from './pages/Root';
import AdminViewOrders from './pages/AdminViewOrders';
import AdminUpdateOrder from './pages/AdminUpdateOrder';
import AdminViewFeedback from './pages/AdminViewFeedback';
import CustomerViewOrders from './pages/CustomerViewOrders';
import CustomerViewFeedback from './pages/CustomerViewFeedback';
import CustomerSendFeedback from './pages/CustomerSendFeedback';

import ResForm from './pages/ResForm';
import ResAllReservation from './pages/ResAllReservation';
import ResUpdate from './pages/ResUpdate';

import ApproveReservations from './pages/ApproveReservations';


import SupForm from './pages/SupForm';
import SupDisplay from './pages/SupDisplay';
import SupUpdate from './pages/SupUpdate';
import SupOrders from './pages/SupOrders';
import Dinuth from './pages/Dinuth';
import Home from './pages/Inventory/Inventory/User/Home/Home';
import Bill from './pages/Bill';





function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <div className='loader-parent'>
            <div className="spinner-border" role="status">

            </div>
          </div> */}
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <TraHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <TraLogin />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <TraRegister />
              </PublicRoute>
            }
          />
          {/* <Route path='/cutorderform' element={<CutOrderForm/>}/> */}
          {/* <Route path='/display' element={<CutOrderDetails/>}/> */}
          {/* <Route path='/update/:id' element={<CutOrderUpdate/>}/> */}

          <Route path="/userhome" element={<Homepage />} />

          <Route
            path="/emphome"
            element={
              <EmpProtectedRoute>
                <EmpHome />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/emplogin"
            element={
              <EmpPublicRoute>
                <EmpLoin />
              </EmpPublicRoute>
            }
          />
          <Route
            path="/empregister"
            element={
              <EmpProtectedRoute>
                <EmpRegister />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/emphome"
            element={
              <EmpProtectedRoute>
                <EmpHome />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/tailororder"
            element={
              <EmpProtectedRoute>
                <CutOrderForm />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/display"
            element={
              <EmpProtectedRoute>
                <CutOrderDetails />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/update/:id"
            element={
              <EmpProtectedRoute>
                <CutOrderUpdate />
              </EmpProtectedRoute>
            }
          />

          <Route
            path="/ledform"
            element={
              <EmpProtectedRoute>
                <LedForm />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/leddisplay"
            element={
              <EmpProtectedRoute>
                <LedDetailsDisplay />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/ledupdate/:id"
            element={
              <EmpProtectedRoute>
                <LedUpdate />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/ledhome"
            element={
              <EmpProtectedRoute>
                <LedHome />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/ledreport"
            element={
              <EmpProtectedRoute>
                <LedReport />
              </EmpProtectedRoute>
            }
          />

          {/* <Route path='/emphome' element={<EmpHome/>}/> 
          <Route path='/emplogin' element={<EmpLoin/>}/>
          <Route path='/empregister' element={<EmpRegister/>}/> */}

          <Route
            path="/empEmployees"
            element={
              <EmpProtectedRoute>
                <EmpEmployees />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/empDetailsUpdate/:id"
            element={
              <EmpProtectedRoute>
                <EmpDetailsUpdate />
              </EmpProtectedRoute>
            }
          />

          <Route
            path="/empLeaveList"
            element={
              <EmpProtectedRoute>
                <EmpLeaveList />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/empLeaveForm"
            element={
              <EmpProtectedRoute>
                <EmpLeaveForm />
              </EmpProtectedRoute>
            }
          />

          <Route
            path="/empSalary"
            element={
              <EmpProtectedRoute>
                <EmpSalary />
              </EmpProtectedRoute>
            }
          />

          <Route
            path="/ApprovedLeaves"
            element={
              <EmpProtectedRoute>
                <ApprovedLeaves />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/RejectedLeaves"
            element={
              <EmpProtectedRoute>
                <RejectedLeaves />
              </EmpProtectedRoute>
            }
          />

          <Route
            path="/AttendanceForm"
            element={
              <EmpProtectedRoute>
                <AttendanceForm />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/AttendanceList"
            element={
              <EmpProtectedRoute>
                <AttendanceList />
              </EmpProtectedRoute>
            }
          />

          <Route
            path="/EmpWorkingHours"
            element={
              <EmpProtectedRoute>
                <EmpWorkingHours />
              </EmpProtectedRoute>
            }
          />

          <Route
            path="/inventorydashboard"
            element={
              <EmpProtectedRoute>
                <DashBoard />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/additem"
            element={
              <EmpProtectedRoute>
                <Additem />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/addallocate"
            element={
              <EmpProtectedRoute>
                <AddAllocate />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/addinform"
            element={
              <EmpProtectedRoute>
                <AddInform />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/updateitem/:id"
            element={
              <EmpProtectedRoute>
                <UpdateItem />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/userdetailsdashm"
            element={
              <ProtectedRoute>
                <DetailsDash />
                </ProtectedRoute>
            }
          />
          <Route
            path="/tprodut"
            element={
              <EmpProtectedRoute>
                <Tpoducts />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/userdetailsdash"
            element={
              <ProtectedRoute>
                <DetailsDash />
              </ProtectedRoute>
            }
          />
          <Route path="/displaydb" element={<EmpProtectedRoute><Home /></EmpProtectedRoute>} />

          {/* <Route path="/" element={<EmpProtectedRoute><Root /></EmpProtectedRoute>} /> */}

          {/* ---------- ORDERS ---------- */}

          {/* Order routes (for customer) */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <CustomerViewOrders />
              </ProtectedRoute>
            }
          />

          {/* Order routes (for admin) */}
          <Route
            path="/admin/orders"
            element={
              <EmpProtectedRoute>
                <AdminViewOrders />
              </EmpProtectedRoute>
            }
          />
          <Route
            path="/admin/orders/update/:id"
            element={
              <EmpProtectedRoute>
                <AdminUpdateOrder />
              </EmpProtectedRoute>
            }
          />

          {/* ---------- FEEDBACK ---------- */}

          {/* Feedback routes (for customer) */}
          <Route
            path="/feedback/new/:id"
            element={
              <ProtectedRoute>
                <CustomerSendFeedback />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback/:id"
            element={
              <ProtectedRoute>
                <CustomerViewFeedback />
              </ProtectedRoute>
            }
          />

          {/* Feedback routes (for admin) */}
          <Route
            path="/admin/orders/feedback/:id"
            element={
              <EmpProtectedRoute>
                <AdminViewFeedback />
              </EmpProtectedRoute>
            }
          />

          <Route
            path="/payDetails"
            element={
              <ProtectedRoute>
                <PaymentDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cardDetails"
            element={
              <ProtectedRoute>
                <CardDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editCards"
            element={
              <ProtectedRoute>
                <EditCards />
              </ProtectedRoute>
            }
          />

          <Route
            path="/report"
            element={
              <EmpProtectedRoute>
                <PaymentReport />
              </EmpProtectedRoute>
            }
          />
          <Route path="/updateCard/:id" element={<UpdateCards />} />

          <Route path="/form" element={<ResForm />} />
          <Route
            path="/reservation"
            element={<ResAllReservation />}
          />

          <Route path="/updates/:id" element={<ResUpdate />} />
          <Route
            path="/ApproveReservations"
            element={
              <EmpProtectedRoute>
                <ApproveReservations />
              </EmpProtectedRoute>
            }
          />

          <Route path="/resupdate/:id" element={<ResUpdate />} />
          <Route path="/login" element={<TraLogin />} />
          <Route path="/register" element={<TraRegister />} />
          <Route path="/home" element={<TraHome />} />
          <Route path="/payDetails" element={<PaymentDetails />} />
          <Route path="/cardDetails" element={<CardDetails />} />
          <Route path="/editCards" element={<EditCards />} />
          <Route path="/report" element={<PaymentReport />} />




          <Route path='/sform' element={<EmpProtectedRoute>< SupForm /></EmpProtectedRoute>} />
          <Route path='/sdisplay' element={<EmpProtectedRoute><SupDisplay /></EmpProtectedRoute>} />
          <Route path='/supdate/:id' element={<EmpProtectedRoute><SupUpdate /></EmpProtectedRoute>} />
          <Route path='/sorders' element={<EmpProtectedRoute><SupOrders /></EmpProtectedRoute>} />
          <Route path='/dinuth' element={<Dinuth />} />


          <Route path='/bill' element={<ProtectedRoute><Bill /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
