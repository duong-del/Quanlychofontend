import { useDispatch } from "react-redux";
import { Button } from "antd";
import { useState } from "react";
import callApi from "@/callApi/callApi";
import { removeItem } from "@/utils/localStorage";
import { setEmail } from "@/states/modules/auth";

export default function Logout({setLogin}){
    const dispatch = useDispatch();
    async function Logout() {
        const logout = await callApi("POST","user/logout");
        console.log(logout);
        if(!logout.error){
           removeItem("token");
            setLogin(false);
            dispatch(setEmail(""));
            window.location.reload();
        }
    }
    return (
        <Button 
            type="primary"
            onClick = {Logout} 
            

            >Đăng xuất
        </Button>
    )
}