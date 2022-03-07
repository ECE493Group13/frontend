import React from 'react';

export const Button = ({ buttonText, onClick }) => {
    
    const onclick = (e) => {
        e.preventDefault();
        onClick();
    }

    return(
        <button onClick={onclick} className="dms-button">
            {buttonText}
        </button>
    );
}