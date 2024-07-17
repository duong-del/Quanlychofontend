/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { useState, useEffect } from "react"
import callApi from "@/callApi/callApi"
import { Button, Popover } from "antd"
import Login from "../formInput/login"
import Logout from "../formInput/logout"
import ListArea from "@/utils/listArea"
import { useDispatch,useSelector } from "react-redux"
import { setEmail } from "@/states/modules/auth"
import Signup from "../formInput/signup"
import Payment from "@/utils/payment"
import "./styles.scss"

export default function User({ listArea, setListArea }) {
    const [user, setUser] = useState({})
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [logined, setLogin] = useState(false);
    const [areaCost, setAreaCost] = useState([...listArea]);

    const dispatch = useDispatch();
   
    const hide2 = () => {
        setOpen2(false);
    };
    const handleOpenChange2 = (newOpen) => {
        setOpen2(newOpen);
    };

    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const hide1 = () => {
        setOpen1(false);
    };
    const handleOpenChange1 = (newOpen) => {
        setOpen1(newOpen);
    };

    async function getUser() {
        const userg = await callApi("GET", "user/me")
        console.log(userg)
        if(userg.status == 200) dispatch(setEmail(userg.data.email))
        setUser(userg.data)
        
    }

    useEffect(() => {
        getUser()
    }, [logined, areaCost])
    
    console.log(user);
    return (
        user && !user.error ?
            <div className="user-info">
                <h1 className="user-title">THÔNG TIN NGƯỜI THUÊ
                    <Popover
                        content={<Logout setLogin={setLogin} />}
                        title="bạn có chắc đăng xuất ?🙄"
                        trigger="click"
                        open={open}
                        onOpenChange={handleOpenChange}
                    >
                        <Button type="primary">ĐĂNG XUẤT</Button>
                    </Popover>

                </h1>
                <p className="user-name">name : <span>{user.name}</span></p>
                <ul className="user-areaCost">
                    <h2 className="user-areaCost_title">danh sách khu bán hàng đã thuê</h2>
                    {user.areaCost && <ListArea setAreaCost={setAreaCost} setListArea={setListArea} list={user.areaCost} />}
                </ul>
                <h3 className="priceCost">số tiền ước tính phải thanh toán : <span>{user.unpaid || 0} đ</span>
                    <Popover
                        content={<Payment/>}
                        title="đã thanh toán tiền với chủ chợ"
                        trigger="click"
                        open={open2}
                        onOpenChange={handleOpenChange2}
                    >
                        <Button type="primary" style={{color:"white ! important"}}>THANH TOÁN</Button>
                    </Popover>
                </h3>
            </div>
            :
            <div className="user-info">
                <h1 className="user-title">THÔNG TIN NGƯỜI THUÊ
                    <Popover
                        content={<Login fn={[setLogin, hide]} />}
                        title="đăng nhập để thuê khu bán hàng trên trợ 🚩👌"
                        trigger="click"
                        open={open}
                        onOpenChange={handleOpenChange}
                    >
                        <Button type="primary">ĐĂNG NHẬP</Button>
                    </Popover>

                    <Popover
                        content={<Signup hide1={hide1} handleOpenChange={handleOpenChange}/>}
                        title="đăng kí tài khoản"
                        trigger="click"
                        open={open1}
                        onOpenChange={handleOpenChange1}
                    >
                        <Button type="primary">ĐĂNG KÍ</Button>
                    </Popover>
                </h1>
                <p className="user-name">name : <span>-----</span></p>
                <ul className="user-areaCost">
                    <h2 className="user-areaCost_title">danh sách khu bán hàng đã thuê</h2>
                    <li className="areaCost">-------</li>
                </ul>
                <h3 className="priceCost">số tiền ước tính phải thanh toán : <span>-----</span></h3>
            </div>
    )
}
