import React, { Fragment} from 'react';
import DashboardNav from "../Components/DashboardNav";
import ConnectNav from "../Components/ConnectNav";
import {Link} from "react-router-dom";



const Dashboard = () =>{

        return (
            <Fragment>
                <div className="container-fluid bg-secondary p-5 text-center">
                    <ConnectNav/>
                </div>
                <div className="container-fluid p-4">
                <DashboardNav/>
                </div>

                <div className="container-fluid">
                  <div className="row">
                      <div className="col-md-10">

                      </div>
                      <div className="col-md-2">
                          <Link className="btn btn-primary" to="/">Browse Hotels</Link>
                      </div>
                  </div>
                </div>


            </Fragment>
        );
    }

export default Dashboard;