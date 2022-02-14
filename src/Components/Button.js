import React from 'react';

export const Button = ({ buttonText, onClick }) => {
    
    const onclick = () => {
        onClick();
    }

    return(
        <button onClick={onclick} className="dms-button">
            {buttonText}
        </button>
    );
}