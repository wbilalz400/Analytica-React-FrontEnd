import React, { useState, useEffect } from 'react';
import Button from '../components/FormButton';
import FormField from '../components/FormField';
import './MyProfileView.css';
import {updateUser} from '../api';

export default props => {
    const [name, setName] = useState(props.user.name);
    const [email, setEmail] = useState(props.user.email);
    const [phone, setPhone] = useState(props.user.phone);

    const doUpdateUser = () => {
        if (!name) {
            alert("Please enter name");
            return;
        }
        if (!email) {
            alert("Please enter email");
            return;
        }
        let payload = {
            name: name,
            email: email,
            phone: phone,
        };
        updateUser(payload)
        .then(res => {
            if (!!res.data.success) {
                window.location.reload();
            } else {
                alert(res.data.message);
            }
        })
    }
    return <div className="MPMain">
        <h1>Edit Profile</h1>
        <div className="InputContainer">
            <h3>Full Name</h3>
            <FormField
                placeholder="Your Name"
                type="name"
                color="orange"
                value={name}
                onChange = {e => setName(e.target.value)}
            />
        </div>
        <div className="InputContainer">
            <h3>Email</h3>
            <FormField
                placeholder="Your Email"
                type="email"
                onChange = {e => setEmail(e.target.value)}
                color="orange"
                value={email}
            />
        </div>
        <div className="InputContainer">
            <h3>Phone Number</h3>
            <FormField
                placeholder="Your Phone"
                type="phone"
                color="orange"
                onChange = {e => setPhone(e.target.value)}
                value={phone}
            />
        </div>
        <div className="ButtonContainer">
            <Button
                label="Update"
                onClick = {doUpdateUser}
                type = "primary"
                color = "orange"
            />
        </div>
    </div>
}