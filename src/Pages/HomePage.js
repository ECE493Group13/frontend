import React from 'react';
import { Button } from '../Components/Button';
import { Header } from '../Components/Header';
import { KeywordBar } from '../Components/KeywordBar';

export const HomePage = () => {
    const handleFormSubmit = () => {
        fetch('http://localhost:4433/filterpaper', {
            method: 'POST',
            body: JSON.stringify({
                keywords: ["age", "blood"]
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
            <Header></Header>
            <KeywordBar />
            <div style={{ paddingTop: '50px', display: 'block', textAlign: 'center' }}>
                <Button buttonText="Call Flask API" onClick={handleFormSubmit}></Button>
            </div>
        </div>
    );
}