import React from 'react';
import { API_BASE_URL } from '../constants'
import { Button } from '../Components/Button';
import { Header } from '../Components/Header';
import { KeywordBar } from '../Components/KeywordBar';

export const HomePage = () => {
    const handleFormSubmit = () => {
        fetch(`${API_BASE_URL}/data/create`, {
            method: 'POST',
            body: JSON.stringify({
                name: "callFlaskAPI"
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json()).then(message => {
            console.log(message);
        })
    }
    
    return (
        <div>
            <Header showProfileIcon></Header>
            <KeywordBar />
            <div style={{paddingTop: '50px', display: 'block', textAlign: 'center'}}>
                <Button buttonText="Call Flask API" onClick={handleFormSubmit}></Button>
            </div>
        </div>
    );
}