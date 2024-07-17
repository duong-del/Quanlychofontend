import callApi from "@/callApi/callApi";
import { useState } from "react";
import { Input, Button } from "antd";

export default function Signup({ hide1, handleOpenChange }) {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });

    const [errors, setErrors] = useState({});

    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^\d{10}$/;
        return re.test(phone);
    }

    function handleName(e) {
        setData({ ...data, name: e.target.value });
    }

    function handleEmail(e) {
        setData({ ...data, email: e.target.value });
    }

    function handlePassword(e) {
        setData({ ...data, password: e.target.value });
    }

    function handlePhoneNumber(e) {
        setData({ ...data, phone: e.target.value });
    }

    function handleAddress(e) {
        setData({ ...data, address: e.target.value });
    }

    function validateForm() {
        let errors = {};
        if (!data.name) errors.name = "Name is required";
        if (!data.email) errors.email = "Email is required";
        else if (!validateEmail(data.email)) errors.email = "Invalid email format";
        if (!data.password) errors.password = "Password is required";
        if (!data.phone) errors.phone = "Phone number is required";
        else if (!validatePhone(data.phone)) errors.phone = "Invalid phone number";
        if (!data.address) errors.address = "Address is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    async function signup() {
        if (!validateForm()) return;
        const signupData = await callApi("POST", "user/create", data);
        if (signupData.status === 200) {
            alert("Đăng ký thành công");
            hide1();
            handleOpenChange();
        } else {
            alert(
                "Đăng ký thất bại : \n " + 
                JSON.stringify( signupData.data)
            );
        }
    }

    return (
        <div>
            <h1>Sign Up</h1>

            <Input
                placeholder="name"
                value={data.name}
                onChange={handleName}
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

            <Input
                placeholder="Email"
                value={data.email}
                onChange={handleEmail}
            />
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

            <Input
                placeholder="Password"
                type="password"
                value={data.password}
                onChange={handlePassword}
            />
            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

            <Input
                placeholder="phone"
                value={data.phone}
                onChange={handlePhoneNumber}
            />
            {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}

            <Input
                placeholder="address"
                value={data.address}
                onChange={handleAddress}
            />
            {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}

            <Button type="primary" onClick={signup}>Sign Up</Button>
        </div>
    );
}
