import React, {Fragment, useEffect, useState} from 'react';
import DashboardNav from "../Components/DashboardNav";
import ConnectNav from "../Components/ConnectNav";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {HomeOutlined} from '@ant-design/icons';
import {toast} from "react-toastify";
import {createConnectAccount} from "../actions/stripe";
import {sellerHotels} from "../actions/hotel";
import SmallCard from "../Components/cards/SmallCard";


const DashboardSeller = () =>{

    const {auth} = useSelector((state)=>({...state}));
    const [loading , setLoading] = useState(false);
    const [hotels , setHotels] = useState([]);

    useEffect(()=>{
        loadSellersHotels();
    },[]);
    const loadSellersHotels = async  () =>{
        let {data} = await sellerHotels(auth.token);
        setHotels(data);
    }

    const handleClick = async () =>{
        setLoading(true);
        try{
            let res = await createConnectAccount(auth.token);

            console.log(res.data) //get login link
            window.location.href= res.data;

        }catch (err) {
            console.log(err);
            toast.error('Stripe Connect Failed');
            setLoading(false);
        }
    }

    const connected = () =>{
        return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <h2>Your Hotels</h2>
                </div>
                <div className="col-md-2">
                    <Link className="btn btn-primary" to="/hotels/new">+ADD New</Link>
                </div>
            </div>

            <div className="row">
                {hotels.map(h => <SmallCard key={h._id} h={h} showViewMoreButton={false} owner={true}/>)}
            </div>
        </div>
        )};
    const notConnected = () =>{
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 offset-md-3 text-center">
                        <div className="p-5 pointer">
                            <HomeOutlined className ="h1"/>
                            <h4>Setup payouts to post hotel rooms</h4>
                            <p className="lead">
                                MERN partners with stripe to transfer earnings to your bank
                                account.
                            </p>
                            <button disabled={loading} onClick={handleClick} className="btn btn-primary">
                                {loading ? 'Processing...' : 'Setup Payouts'}
                            </button>
                            <p className="text-muted"><small>
                                you will be redirected to Stripe to complete the onboarding
                                process.
                            </small></p>
                        </div>
                    </div>
                </div>
            </div>

        )};

    return (
        <Fragment>
            <div className="container-fluid bg-secondary p-5 text-center">
                <ConnectNav/>
            </div>
            <div className="container-fluid p-4">
                <DashboardNav/>
            </div>

            {auth && auth.user && auth.user.stripe_seller &&
            auth.user.stripe_seller.details_submitted ? connected() : notConnected() }

        </Fragment>
    );
}

export default DashboardSeller;