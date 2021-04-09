import {useState,useEffect} from 'react';
import queryString from 'query-string';
import {Link} from 'react-router-dom';
import Search from "../Components/forms/Search";
import {searchListings} from "../actions/hotel";

const SearchReasult = () =>{

    const [searchLocation,setSearchLocation] = useState('');
    const [searchDate,setSearchDate] = useState('');
    const [searchBed,setSearchBed] = useState('');
    const [hotels,setHotels] = useState([]);


    useEffect(()=>{
        const {location,date,bed} = queryString.parse(window.location.search);
        console.log("ami 1st step",{location,date,bed});

        searchListings({location,date,bed}).then(res=>{
            console.log("ami eine 1");
            console.log('search result ',res.data);
            setHotels(res.data);
            console.log("ami eine 1");
        })
    },[window.location.search]);
    return(
        <div className="container">
            <div className="row">
                {JSON.stringify(hotels,null,4)}

            </div>
        </div>
    )
}

export default SearchReasult;