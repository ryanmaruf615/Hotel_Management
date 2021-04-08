import User from '../models/user';
import jwt from 'jsonwebtoken';

export const register = async (req , res ) =>{    
    try{
        console.log(req.body);
    const {name,email,password} = req.body;
    //validation
    if(!name)return res.status(400).send('name is required');
    if(!password || password.length < 6 )return res.status(400).send('password is required and should be min 6 characters long');
    let userExist = await User.findOne({email}).exec()
    if(userExist)return res.status(400).send('Email is taken ')

    const user = new User(req.body)

        await user.save();
        console.log('user created',user)
        return res.json({ok:true});  
    } catch(err){
        console.log('Create user failed ',err);
        return res.status(400).send('Error .Try Again')

    }
};

export const login = async (req , res ) =>{
 
    const {email,password} = req.body;
    try{
        //check if user with that email exist
        let user = await User.findOne({email}).exec();
        console.log("User Exixt " , user);
        if(!user) return res.status(400).send('User with that email not found');
        //compare password 
        user.comparePassword(password,(err,match)=>{
            console.log('compare password in login error');
           
            if(!match || err) return res.status(400).send("wrong password");
           
            // console.log('Generate a token then send as a response to client');
          let token = jwt.sign({_id:user._id},process.env.JWT_SECRET,{
                expiresIn:'7d',
            });
            res.json({token,user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                createdAt:user.createdAt,
                updatedAt:user.updatedAt,
                stripe_account_id: user.stripe_account_id,
                stripe_seller:user.stripe_seller,
                stripeSession:user.stripeSession,
            }});
        })

    }catch(err){
        console.log("Login Error " ,err);
        res.status(400).send('Signin failed');
    }
};
