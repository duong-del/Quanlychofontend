import { Input,Button } from "antd";
import { useState,useEffect } from "react";
import callApi from "@/callApi/callApi";
import { setAuthToken } from "@/utils/localStorage";
import showAlert from "@/utils/listArea";
import { useDispatch } from "react-redux";
import { setEmail } from "@/states/modules/auth";

export default function Login({fn : [setLogin,hide]}){
    const dispatch = useDispatch()
    const [data,setData] = useState({});
    function handleEmail(e){
        setData({...data , email : e.target.value });
    }
    function handlePassword(e){
        setData({...data, password : e.target.value });
    }

    async function getUser(){
        const userlogin = await callApi("POST","user/login",data);

        if(userlogin.status >= 400){
            alert("sai email hoặc mật khẩu");
        }
        else{
            setAuthToken(userlogin.data.token);
            setLogin(true);
            hide();
            dispatch(setEmail(userlogin.data.email))
        }
        
        // setUser(user.data)
    } 
    function handleLogin(){
        if(!data.email ||!data.password){
            alert("Please enter email and password");
        }  else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)){
            alert("Please enter valid email");
        }  else if(data.password.length < 6){
            alert("Password should be at least 6 characters long");
        }  else {
            getUser();
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <Input onChange={handleEmail} placeholder="email" />
            <Input onChange={handlePassword} placeholder="password" />
            <Button onClick={handleLogin} type="primary">Login</Button>
        </div>
    )
}