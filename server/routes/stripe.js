import express from "express";


const router = express.Router();

//middleware
import {requireSignIn} from '../middlewares'

//controllers
 import { createConnectAccount ,getAccountStatus,getAccountBalance,stripeSessionId } from '../controllers/stripe';



router.post('/create-connect-account',requireSignIn,createConnectAccount);
router.post('/get-account-status',requireSignIn,getAccountStatus);
router.post('/get-account-balance',requireSignIn,getAccountBalance);

router.post("/stripe-sessionId",requireSignIn,stripeSessionId)


module.exports = router;