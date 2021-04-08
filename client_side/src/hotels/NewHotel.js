import React, {Fragment} from 'react';
import {useState} from 'react';
import {toast} from "react-toastify";
import { DatePicker,Select } from "antd";
import {createHotel} from "../actions/hotel";
import {useSelector} from "react-redux";
import HotelCreateForm from '../Components/forms/HotelCreateForm';

const { Option } = Select;

const config = {
    appId: process.env.REACT_APP_ALGOLIA_APP_ID,
    apiKey:process.env.REACT_APP_ALGOLIA_API_KEY,
    language:"en",
    countries:["au"],
};

const NewHotel = () =>{
    //redux
    const {auth} = useSelector((state) => ({...state}));
    const {token} = auth;

    const [values,setValues] = useState({
        title:'',
        content:'',
        image:'',
        price:'',
        from:'',
        to:'',
        bed:'',
    });

    const [preview,setPreview] = useState("https://via.placeholder.com/200x200.png?text=Preview");
    const [location,setLocation] = useState();

    //destructuring variables from state
    const {title,content,image,price,from,to,bed} = values;

    const handleSubmit= async (e) =>{
        e.preventDefault();
        //console.log(values);
        //console.log(location);
        let hotelData = new FormData();
        hotelData.append('title',title);
        hotelData.append('content',content);
        hotelData.append('location',location);
        hotelData.append('price',price);
        hotelData.append('title',title);
        hotelData.append('image',image);
        hotelData.append('from',from);
        hotelData.append('to',to);
        hotelData.append('bed',bed);

        try{
            let res = await createHotel(token,hotelData);
            console.log("hotel create response" , res);
            toast.success('New Hotel is created');
            setTimeout(()=>{
                window.location.reload();
            },1000);
        }catch (err) {
            console.log(err);
            toast.error(err.response.data);
        }
    };
    const handleImageChange = (e) =>{
    //console.log(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
        setValues({...values,image: e.target.files[0]});

    };

    const handleChange = (e) =>{
        setValues({...values,[e.target.name] : e.target.value});
    };


    return(
        <Fragment>
            <div className="container-fluid">
                <h1 className="primary text-center">Add New Hotel </h1>
                <div className="row">
            <div className="col-md-8">
                <br/>
                <HotelCreateForm
                values={values}
                setValues={setValues}
                location={location}
                setLocation={setLocation}
                handleChange={handleChange}
                handleImageChange={handleImageChange}
                handleSubmit={handleSubmit}
                />
            </div>
            <div className="col-md-4">
                <img src={preview} alt="preview_image" className="img img-fluid m-2 mt-5" style={{height:"400px"}}/>
            </div>
            </div>
            </div>
        </Fragment>
    )
};

export default NewHotel;