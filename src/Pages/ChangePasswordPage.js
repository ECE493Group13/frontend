import React, { useState } from 'react';
import { DoubleInputFormCard } from '../Components/DoubleInputFormCard';
import { Header } from '../Components/Header';
import { useNavigate } from 'react-router-dom';

export const ChangePasswordPage = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const navigate = useNavigate();

    const onInputChange = (oldPassword, newPassword) => {
        setOldPassword(oldPassword);
        setNewPassword(newPassword);
    }

    const onChangePassword = () => {
        fetch('http://localhost:4433/auth/update-password', {
            method: 'POST',
            body: JSON.stringify({
                "old_password": oldPassword,
                "new_password": newPassword
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json()).then(message => {
            // TODO: do something with the response
            console.log(message);
        });

        // TODO: Hardcoded to go to home page without verification
        navigate('/home');
    }
    
    return (
        <div>
            <Header></Header>
            <div className='change-password-card-margin-top'>
                <DoubleInputFormCard
                    onInputChange={onInputChange}
                    title="Reset Password"
                    subtitle="DMS has detected a temporary password, please reset it before continuing"
                    placeholder1="Old password" 
                    placeholder2="New password"
                    buttonText="Submit"
                    onSubmit={onChangePassword}
                    placeholder1IsPass
                    placeholder2IsPass 
                    height={340}
                />
            </div>
        </div>
    );
}