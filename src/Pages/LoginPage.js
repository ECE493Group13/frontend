import React, { useState } from 'react';
import { DoubleInputFormCard } from '../Components/DoubleInputFormCard';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constants'

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const onInputChange = (username, password) => {
        setUsername(username);
        setPassword(password);
    }

    const onLogin = () => {
        fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json()).then(message => {
            // TODO: do something with the response
            console.log(message);
        });

        // TODO: Hardcoded to go to change password page without verification or checking if first time
        navigate('/changePassword');
    }

    const requestAccount = () => {
        navigate('/requestAccount');
    }

    return (
        <div className='dark-background'>
            <div className='login-form-card-margin-top'>
                <DoubleInputFormCard
                    onInputChange={onInputChange}
                    title="Data Mining System"
                    placeholder1="Username" 
                    placeholder2="Password"
                    buttonText="Log in"
                    onSubmit={onLogin}
                    placeholder2IsPass 
                />
                <p id="requestAcctButton" onClick={requestAccount} className='request-account-button'>No account? Get started here</p>
            </div>
        </div>
    );
}