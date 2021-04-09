import express from "express";
import formidable from 'express-formidable';

const router = express.Router();

//middleware
import {requireSignIn} from '../middlewares'

//controllers
import { hotels,image,sellerHotels,create,read,update,searchListings } from '../controllers/hotel';


router.post('/create-hotel',requireSignIn,formidable(),create);

router.get('/hotels',hotels);

router.get('/hotel/image/:hotelId',image);
router.get('/seller-hotels',requireSignIn,sellerHotels);
router.get('/hotel/:hotelId',read);

router.put('/update-hotel/:hotelId',requireSignIn,formidable(),update);

router.post('/search-listening',searchListings);



module.exports = router;