import React, {Fragment} from 'react';
import {useState,useEffect} from 'react';
import {toast} from "react-toastify";
import { DatePicker,Select } from "antd";
import {createHotel, read, updateHotel} from "../actions/hotel";
import {useSelector} from "react-redux";
import HotelEditForm from "../Components/forms/HotelEditForm";

const { Option } = Select;

const config = {
    appId: process.env.REACT_APP_ALGOLIA_APP_ID,
    apiKey:process.env.REACT_APP_ALGOLIA_API_KEY,
    language:"en",
    countries:["au"],
};

const EditHotel = ({match}) =>{

    //redux
    const {auth} = useSelector((state) => ({...state}));
    const {token} = auth;

    const [values,setValues] = useState({
        title:'',
        content:'',
        location:'',

        price:'',
        from:'',
        to:'',
        bed:'',
    });

    const [image,setImage] = useState("");

    const [preview,setPreview] = useState("https://via.placeholder.com/200x200.png?text=Preview");


    //destructuring variables from state
    const {title,content,location,price,from,to,bed} = values;

    useEffect(()=>{
       loadSellerHotel();
    },[]);

    const  loadSellerHotel = async () =>{
        let res = await read(match.params.hotelId);
        //console.log(res);
        setValues({...values,...res.data});
        setPreview(`${process.env.REACT_APP_API}/hotel/image/${res.data._id}`);
    };

    const handleSubmit = async (e) =>{
        e.preventDefault();
        let hotelData = new FormData();
        hotelData.append('title',title);
        hotelData.append('content',content);
        hotelData.append('location',location);
        hotelData.append('price',price);
        hotelData.append('title',title);
        image && hotelData.append('image',image);
        hotelData.append('from',from);
        hotelData.append('to',to);
        hotelData.append('bed',bed);

        try{
            let res = await updateHotel(token,hotelData,match.params.hotelId);
            console.log("hotel update response" , res);
            toast.success(`${res.data.title} is Updated`);
            setTimeout(()=>{
                window.location.reload();
            },1000);
        }catch (err) {
            console.log(err);
            toast.error(err.response.data.err);
        }
    };
    const handleImageChange = (e) =>{
        setPreview(URL.createObjectURL(e.target.files[0]));
        setImage(e.target.files[0]);

    };

    const handleChange = (e) =>{
        setValues({...values,[e.target.name] : e.target.value});
    };


    return(
        <Fragment>
            <div className="container-fluid">
                <h1 className="primary text-center">Edit Hotel </h1>
                <div className="row">
                    <div className="col-md-8">
                        <br/>
                        <HotelEditForm
                            values={values}
                            setValues={setValues}
                            handleChange={handleChange}
                            handleImageChange={handleImageChange}
                            handleSubmit={handleSubmit}
                        />
                    </div>
                    <div className="col-md-4">
                        <img src={preview} alt="preview_image" className="img img-fluid m-2 mt-5" style={{height:"400px"}}/>

                        <pre>{JSON.stringify(values,null,4)}</pre>
                    </div>
                </div>
            </div>
        </Fragment>
    );

}
export default EditHotel;