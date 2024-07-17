import callApi from "@/callApi/callApi";
import { Button } from "antd";

export default function Payment(){
    async function payment(){
        const pay = await callApi("POST","user/payment")
        if(pay.status === 200){
            alert("Thanh toán thành công")
            window.location.reload();
        }
        else{
            alert("Thanh toán thất bại hãy thử lại !")
        }
    }
    return(
        <div>
            <h1>Thanh toán</h1>
            <Button type="primary" onClick={payment}>Pay</Button>
        </div>
    )
}