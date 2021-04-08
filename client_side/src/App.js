import React from 'react';
import Home from "./booking/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import TopNav from "./Components/topNav";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./user/Dashbord";
import PrivateRoute from "./Components/PrivateRoute";
import DashboardSeller from "./user/DashboardSeller";
import NewHotel from "./hotels/NewHotel";
import StripeCallback from "./stripe/StripeCallback";
import EditHotel from "./hotels/EditHotel";
import ViewHotel from "./hotels/ViewHotel";



function App() {
  return (
    <div >
        <BrowserRouter>
            <TopNav/>
            <ToastContainer position="top-center" autoClose={3000}/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/hotel/:hotelId" component={ViewHotel}/>
                <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                <PrivateRoute exact path="/dashboard/seller" component={DashboardSeller}/>
                <PrivateRoute exact path="/hotels/new" component={NewHotel}/>
                <PrivateRoute exact path="/stripe/callback" component={StripeCallback}/>
                <PrivateRoute exact path="/hotel/edit/:hotelId" component={EditHotel}/>
            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
