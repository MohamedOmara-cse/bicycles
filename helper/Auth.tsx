import { createContext, useState, useEffect } from "react";

let baseUrl = "https://bicycle-api.herokuapp.com";
  const loginUser = async (email: string, password: string) => {

	const authTokens = localStorage.getItem("authTokens") ?localStorage.getItem("authTokens"): null;
    const response = await fetch(`${baseUrl}/auth/login/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});
    const data = await response.json();
  if(response.status==200){
    localStorage.setItem("authTokens", JSON.stringify(data.access_token).slice(1,JSON.stringify(data.access_token).length-1));
  }
  return  response;
};

  const logoutUser = () => {

  };

  const create = async (body:any) => {
    let authTokens = localStorage.getItem("authTokens") ;
    let response = await fetch(`${baseUrl}/bicycles/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authTokens}`,
			},
			body: body,
		});
    let data=await response.json();
    return response;
  }

  const update = async (body:any,id:string) => {
	let authTokens = localStorage.getItem("authTokens");
    let response = await fetch(`${baseUrl}/bicycles/${id}`, {
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${authTokens}`,
			},
			method: "PUT",
			body: body,
		});
    let data=await response.json();

    return response;
    }  


   const Delete=async (id:any)=>{
    let authTokens = localStorage.getItem("authTokens");
    let response = await fetch(`${baseUrl}/bicycles/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authTokens}`,
      }
      , method: "DELETE"
      });
      let data=await response.json();
      return response;
    }




  const contextData = {
    loginUser,
    logoutUser,
    create,
    update
    ,Delete
  };
export default contextData;