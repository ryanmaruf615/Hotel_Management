import React, {Fragment, useState} from 'react';
import {  toast } from 'react-toastify';
import {login} from "../actions/auth";
import LoginForm from "../Components/loginForm";
import {useDispatch} from "react-redux";


const Login = ({history}) =>{

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const dispatch = useDispatch();

    const handleSubmit =async (e) =>{
        console.log(email,password);
        e.preventDefault();
        try{
            let res =  await login( {email, password});
            if(res.data){
                console.log('Save User re in Redux and local storage then redirect');
                //console.log(res.data);
                //save user and token to local storage
                window.localStorage.setItem('auth',JSON.stringify(res.data));
                //save user and token to redux
                dispatch({
                    type: "LOGGED_IN_USER",
                    payload: res.data,
                });
                history.push("/dashboard");
            }
            toast.success("Login Successful");

        }catch (err) {
            console.log(err);
            if(err.response.status === 400) toast.error(err.response.data);
        }
    };


    return(
        <Fragment>
        <div className="container-fluid bg-secondary p-5 text-center">
            <h1>LOGIN</h1>
        </div>
            <div className="container">
                <div className="col-md-6 offset-md-3">
                    <LoginForm  handleSubmit ={handleSubmit}
                               email = { email }
                               setEmail={setEmail}
                               password = {password}
                               setPassword ={setPassword} />

                </div>
            </div>
        </Fragment>
    )
};

export default Login;