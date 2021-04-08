import React, {Fragment, useState} from 'react';
import RegisterForm from '../Components/RegisterForm';
import {  toast } from 'react-toastify';
import {register} from "../actions/auth";


const Register = ({history}) =>{

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');


    const handleSubmit =async (e) =>{
        e.preventDefault();
    try{
        const res =  await register( {name, email, password});
        console.log('Register user ====>',res );
        toast.success("Registration Success.please Login");
        history.push('/login');
    }catch (err) {
        console.log(err);
        if(err.response.status === 400) toast.error(err.response.data);
    }
    };



    return(
        <Fragment>
        <div className="container-fluid bg-secondary p-5 text-center">
            <h1>Register</h1>
        </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <RegisterForm
                                      handleSubmit ={handleSubmit}
                                      name ={name}
                                      setName={setName}
                                      email = { email }
                                      setEmail={setEmail}
                                      password = {password}
                                      setPassword ={setPassword} />
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default Register;