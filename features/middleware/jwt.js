
import jwt from 'jsonwebtoken';

export const jwtAuthMiddleware = async(req,res,next)=>{

    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({message:'Token not found'});

    // Extract jwt token from authorization header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({message:'Unauthorized'});

    try {
        // verify the token
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // Attach user information to request object
        req.user = decodedPayload;
        next();

        // const decodetoken = jwt.decode(token,{complete:true});
        // console.log(decodetoken);
    } catch (error) {
        console.log(error);
        res.status(401).json({message:'Invalid Token'});
    }


}

export const generateToken = (userData) => {
    // Generate a new JWT token by using the userdata 
    return jwt.sign({userData}, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d'
    })
}

//  default {jwtAuthMiddleware,generateToken};

