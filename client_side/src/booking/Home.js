import React, {useState, useEffect, Fragment} from 'react';
//import {useSelector} from 'react-redux';
import {allHotels} from "../actions/hotel";
import SmallCard from "../Components/cards/SmallCard";
import Search from "../Components/forms/Search";


const Home = () =>{
    //const {user} = useSelector((state) =>({ ...state}));
    const [hotels,setHotels]=useState([]);

    useEffect(() =>{
        loadAllHotels();
    },[]);

    const loadAllHotels = async () =>{
        let res = await allHotels();
        setHotels(res.data);
    }

    return(
        <Fragment>
        <div className="container-fluid bg-secondary p-5 text-center">
            <h1>ALL HOTELS</h1>

        </div>
            <div className="container-fluid  ">
                <br/>
                <Search />
                {hotels.map((h) => <SmallCard  key={h._id} h={h}/>)}

            </div>
        </Fragment>
    )
};

export default Home;