import {Link} from "react-router-dom";

const DashboardNav = () =>{
    const active = window.location.pathname;

    return(
        <ul className="nav nav-tabs">
        <li className="nav-item d-flex flex-row ">
            <Link className={`nav-link p-2 ${active === '/dashboard' && "active"}`} to="/dashboard">Your Bookings</Link>
            <Link className={`nav-link p-2 ${active === '/dashboard/seller' && "active"}`} to="dashboard/seller">Your Hotels</Link>
        </li>
        </ul>
)};
export default DashboardNav;
