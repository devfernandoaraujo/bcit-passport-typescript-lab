import {userModel} from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string, callback: (error: Error | null, user: any)=> void) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return callback(null,user);
    }
    else{
      //TODO: Assignment requirement should be removed 
       return callback(new Error("Password is invalid."), null);
    }
  }
  //TODO: Assignment requirement should be removed 
  return callback(new Error("Email is invalid."), null);
};
const getUserById = (id:number) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const getUserByEmail=(email: string) =>{
  let user = userModel.findByEmail(email);
  if (user) {
    return user;
  }
  return null;

}

const getUserByGithubId=(githubId: number) =>{
  let user = userModel.findByGithubId(githubId);
  if (user) {
    return user;
  }
  return null;

}



const addUser = (name: string, githubId : number ) =>{
  let user = userModel.createUser(name,githubId);
  if (user) {
    return user;
  }
  return null;
}

function isUserValid(user: any, password: string) {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByEmail,
  getUserByGithubId,
  addUser
};
