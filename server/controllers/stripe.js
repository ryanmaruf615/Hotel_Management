import User from '../models/user';
import Stripe from "stripe";
import queryString from "query-string";


const stripe = Stripe(process.env.STRIPE_SECRET);


export const createConnectAccount = async (req,res) =>{
 //1.find user from db
 const user = await User.findById(req.user._id).exec();
 console.log("User ==>",user);
 //2.if don't have stripe account id yet ,create now

 if(!user.stripe_account_id){
    const account = await stripe.accounts.create({
        type: 'express',
      });

     console.log("Account ===>",account);
     user.stripe_account_id = account.id;
     user.save();
   
 }
 
 //3.create login link based on account id (for frontend to complete onboarding)

 let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: 'account_onboarding',
  });
 //prefill any info as email
 
 accountLink = Object.assign(accountLink,{
     "stripe_user[email]":user.email || undefined,
 });
 //console.log('Account Link',accountLink);

 let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;

 //console.log('login link',link);
 
 res.send(link);

};

//update delay days 

const updateDelayDys = async (accountId) =>{
  const account = await stripe.accounts.update(accountId,{
    settings:{
      payouts:{
        schedule:{
          delay_days:7,
        },
      },
      },
      
  });
  return account;
}




export const getAccountStatus = async (req , res) => {
//console.log('get Account status');
const user = await User.findById(req.user._id).exec();
const account = await stripe.accounts.retrieve(user.stripe_account_id);
//console.log('User account retrive',account);
 //update delay days
 const updatedAccount= await updateDelayDys(account.id);
const updatedUser= await User.findByIdAndUpdate(user._id,
  {
  stripe_seller:updatedAccount,
},
{ new:true }
).select("-password").exec();

//console.log("Updated user",updatedUser);
res.json(updatedUser);

};

export const  getAccountBalance = async (req,res)=>{
  const user = await User.findById(req.user._id).exec();

  try{

    const blanace =await Stripe.blanace.retrieve({
      stripeAccount: user.stripe_account_id,

    });
    console.log("Balance ===> ",blanace);
    res.json(blanace);

  }catch(err){
    console.log(err);
  }
}

export const stripeSessionId = async (req,res) =>{

  redirect()

};




