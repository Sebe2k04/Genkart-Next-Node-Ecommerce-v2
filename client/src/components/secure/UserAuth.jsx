import { cookies } from "next/headers";
import React from "react";
import SetUserAuth from "./SetUserAuth";

const userAuth = () => {
  const cookieStore = cookies(); 
  const userToken =  cookieStore.get("token"); 
  let auth = false;
  if(!userToken){
    console.log("No token available");
  }else{
    auth = true;
    console.log("Token available");
  }
  return (
    <SetUserAuth token={userToken} auth={auth} />
  )
};

export default userAuth;
