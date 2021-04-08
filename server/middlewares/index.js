import expressJwt from 'express-jwt';

// it always give us the info in this by default req.user
export const requireSignIn = expressJwt({

    //secret,expire date
    secret:process.env.JWT_SECRET,
    algorithms:["HS256"],
});