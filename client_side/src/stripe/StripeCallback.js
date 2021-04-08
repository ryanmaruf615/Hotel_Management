import {LoadingOutlined} from '@ant-design/icons';
import React,{useEffect}  from "react";
import {useSelector,useDispatch} from "react-redux";
import {getAccountStatus} from "../actions/stripe";
import {updateUserInLocalStorage} from "../actions/auth";

const StripeCallback = ({history}) =>{

    const {auth} = useSelector((state) => ({...state}));
    const dispatch = useDispatch();

    useEffect( () =>{
        console.log("ami call hoisi")
        if(auth && auth.token) accountStatus();
        },[auth]);

    const accountStatus = async () =>{
        try{
            const res = await getAccountStatus(auth.token);
            console.log('user Account status on stripe callback',res);
            //update user in localstorage
            updateUserInLocalStorage(res.data,()=>{
                console.log("ami eine 0");
                dispatch({
                    type:'LOGGED_IN_USER',
                    payload:res.data,
                });
                console.log("ami eine 2");
                //redirect user to dashboard
                window.location.href = "/dashboard/seller";
            });
        }catch (err) {
            console.log(err)
        }
    }

    return(
        <div className="d-flex justify-content-center p-5">
            <LoadingOutlined className="display-1 p-5 text-danger"/>
        </div>
    );};
export default StripeCallback;