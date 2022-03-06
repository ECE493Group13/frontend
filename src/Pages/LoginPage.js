import React from 'react';
import { Button } from '../Components/Button';

export const LoginPage = () => {
    return (
        <div className='dark-background'>
            <div className='login-form-container'>
                <p className="login-form-title">Data Mining System</p>
                <input type="text" placeholder="Username" className="login-text-input"/>
                <input type="text" placeholder="Password" className="login-text-input"/>
                <div className='login-form-button'>
                    <Button buttonText="Log in"></Button>
                </div>
                <p className='request-account-button'>No account? Get started here</p>
            </div>
        </div>
    );
}