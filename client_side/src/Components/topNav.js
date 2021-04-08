import {useSelector,useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {useHistory} from 'react-router-dom';

const TopNav = () =>{
    const dispatch = useDispatch();
    const {auth} = useSelector((state)=>({...state}));
    const history = useHistory();

    const logout = () =>{
        dispatch({
            type:"LOGOUT",
            payload:null,
        });
        window.localStorage.removeItem('auth');
        history.push("/login");
    }

    return(
    <div className="nav bg-light d-flex flex-row-reverse ">
        {auth !== null && (
            <>
                <a className="nav-link p-2 pointer" onClick={logout}>Logout</a>
            </>
        )}
        {auth === null && (
            <>
                <Link className="nav-link p-2" to="/register">Register</Link>
                <Link className="nav-link p-2" to="/login">Login</Link>
            </>
        )}
        {auth !== null && (
            <>
                <Link className="nav-link p-2" to="/dashboard">Dashboard</Link>
            </>
        )}
        <Link className="nav-link p-2" to="/">Home</Link>

    </div>
);
}
export default TopNav;