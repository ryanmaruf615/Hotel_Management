import React, {Fragment,useState,useEffect} from 'react';
import {diffDays, read} from "../actions/hotel";
import moment from "moment";
import {useSelector} from "react-redux";
import {getSessionId} from "../actions/stripe";
import {loadStripe} from "@stripe/stripe-js/pure";

const ViewHotel = ({match,history}) =>{

    const [hotel,setHotel] = useState({});
    const [image,setImage] = useState("");

    const {auth} = useSelector((state)=>({...state}));

    useEffect(()=>{
        loadSellerHotel();
    },[]);

    const  loadSellerHotel = async () =>{
        let res = await read(match.params.hotelId);
        //console.log(res);
        setHotel(res.data);
        setImage(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
    };

    const handleClick = async (e) =>{
        e.preventDefault();
        if(!auth)history.push('/login');
        console.log(auth.token,match.params.hotelId);
       let res =  await  getSessionId(auth.token,match.params.hotelId);
       //console.log("get session id :",res.data.sessionId );
       const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
       stripe.redirectToCheckout({
           sessionId:res.data.sessionId,
       }).then((result)=>{
           console.log(result);
       })
    };

    return (
        <Fragment>
                <div className="container-fluid bg-secondary p-5 text-center ">
                    <h1 className="primary text-center">{hotel.title} </h1>
                </div >
                <div className="container ">
                    <div className="row">
                        <div className="col-md-6 ">
                            <br/>
                            <p><b className="h4">Description :</b> {hotel.content}</p>
                            <h5 className="alert alert-info mt-3"><b className="h4">Price :</b> <span className="text-primary">BDT {hotel.price}</span><b className="h3">৳</b></h5>
                            <p className="card-text"> <b className="h6">Available For :</b>
                            <span className="float-right text-primary">
                                <b> for {diffDays(hotel.from,hotel.to)}{" "}
                           {diffDays(hotel.from,hotel.to) <= 1 ? " Day" : " Days"}</b>
                           </span></p>
                            <p> <b >From :</b>
                                <b className="text-primary">{moment(new Date(hotel.from))
                                    .format('MMMM Do YYYY,h:mm:ss a')}</b></p>
                            <p> <b >To :</b>
                                <b className="text-primary">{moment(new Date(hotel.to))
                                    .format('MMMM Do YYYY,h:mm:ss a')}</b></p>
                            
                            <i>Posted By: {hotel.postedBy && hotel.postedBy.name}</i>
                            <br/>
                            <button onClick={handleClick}  className="btn btn-block btn-lg btn-primary mt-3">
                                {auth && auth.token ? "Book Now" : "Login to Book"}
                            </button>
                        </div>
                        <div className="col-md-6">
                            <img src={image} alt="preview_image" className="img img-fluid m-2 mt-5" style={{height:"400px"}}/>
                        </div>

                    </div>
                </div>
        </Fragment>
    )};

export default ViewHotel;