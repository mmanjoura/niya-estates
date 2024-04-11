import axios from "axios";
import React, { useState, useEffect } from "react";
export const GetUserInfo = () => {

  const [userInfo, setUserInfo] = useState(null);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios.get(baseURL+'/auth/account', 
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },  
      }
    ).then((response) => {
      setUserInfo(response);
    });
  }, []);
  return userInfo;
}