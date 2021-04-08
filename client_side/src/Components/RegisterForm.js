import React from "react";

const RegisterForm = ({handleSubmit,name ,setName,email,setEmail,password,setPassword}) =>(
    <form onSubmit={handleSubmit}>
        <div className="form-group mt-5 mb-3">
            <label className="form-label">Your Name</label>
            <input type="text" className="form-control" placeholder="Type Your Name"
                   value={name} onChange={
                (e) => setName(e.target.value)}/>
        </div>
        <div className="form-group mb-3">
            <label className="form-label">Your Email</label>
            <input type="email" className="form-control" placeholder="Type Your Email"
                   value={email} onChange={
                (e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-group mb-3">
            <label className="form-label">Your Password</label>
            <input type="password" className="form-control" placeholder="Type Your Password"
                   value={password} onChange={
                (e) => setPassword(e.target.value)}/>
        </div>
        <div className="d-grid gap-2">
            <button disabled={!name || !email || !password} className="btn btn-primary" type="submit">Submit</button>
        </div>
    </form>
);

export default RegisterForm;