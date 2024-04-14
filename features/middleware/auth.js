
// authentication imports
import passport from "passport";
import LocalStrategy from 'passport-local';
import Person from "../models/Person.js";

passport.use(new LocalStrategy (async (username,password,done)=>{

    try {
        // for username
        const user = await Person.findOne({username});
        if(!user){
            return done(null,false,{Message: "Incorrect Username"});
        }
        // For password
        const isPasswordMatch = await user.comparepassword(password);
        if(isPasswordMatch){
            return done(null,user)
        }else{
            return done(null,false,{Message: "Incorrect Password"});
        }
    } catch (error) {
        return done(error)
    }

}));

export default passport;