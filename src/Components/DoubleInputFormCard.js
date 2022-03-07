import React, { useState } from "react";
import { Button } from "../Components/Button";

export const DoubleInputFormCard = ({ onInputChange, title, subtitle, placeholder1, placeholder2, buttonText, onSubmit, placeholder1IsPass, placeholder2IsPass, height }) => {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");

    const handleChangeInput1 = (input) => {
        setInput1(input)
        onInputChange(input, input2);
    }

    const handleChangeInput2 = (input) => {
        setInput2(input)
        onInputChange(input1, input);
    }

    return(
        <div className="dms-double-input-form-container" style={{height: height}}>
            <p className="dms-double-input-form-title">{title}</p>
            {subtitle && <p className="dms-double-input-form-subtitle">{subtitle}</p>}
            <form onSubmit={onSubmit}>
                <input type={placeholder1IsPass ? "password" : "text"} placeholder={placeholder1} className="dms-double-input-text-input" onInput={e => handleChangeInput1(e.target.value)} />
                <input type={placeholder2IsPass ? "password" : "text"} placeholder={placeholder2} className="dms-double-input-text-input" onInput={e => handleChangeInput2(e.target.value)} />
                <div className="dms-double-input-form-button">
                    <Button buttonText={buttonText} onClick={(e) => onSubmit(e)}></Button>
                </div>
            </form>
        </div>
    );
}