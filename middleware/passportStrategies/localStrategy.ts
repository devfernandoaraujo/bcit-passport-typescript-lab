import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const defaultError : string  = "Your login details are not valid. Please try again";

     getUserByEmailIdAndPassword(email, password,(error: Error |null, user: any)=>{
      try{
        return user
      ? done(null, user)
      : done(null, false, {
          message: error?.message ?? defaultError,
        });
      }catch(ex){
        done(null, false, {
          message: error?.message ?? defaultError,
        });
      }
      
    });
    
    }
);

/*
FIX ME (types) Fixed😭
*/
passport.serializeUser(function (user: Express.User, done: (err: any, id?: any) => void) {
  done(null, user.id);
});

/*
FIX ME (types) 😭 Fixed
*/
passport.deserializeUser(function (id: number, done: (err: any, id?: any) => void) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
