import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { baseURL } from "../../../helpers/axios"



export const signinApi =createAsyncThunk(
    "signin/signinApi",async ({email,password}:{email:string,password:string},thunkApi)=>{

    
        try{
            const resp = await axios.post(`tenant/auth/login/`,{email,password})

            console.log({resp,data:resp.data})

            return resp.data
        }
        catch(err:any){
            // 
            console.log({err})
            return  thunkApi.rejectWithValue(err.response.data)
        }

    }
)
export const requestForgotPasswordApi = async (data:{email:string})=>{
    const resp = await axios.post('/tenant/user/forgot-password/request_password_change/',data)
    return resp.data
}

export const restPasswordApi= async(data:{new_password:string,token:string,uidb64:string})=>{
    const resp = await axios.post('/tenant/user/forgot-password/rest_password/',data)
    return resp.data
}