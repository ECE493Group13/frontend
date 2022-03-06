import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

export const Header = () => {
    return(
        <div className="dms-header flex-row-sb">
            <p className="dms-header-title">Data Mining System</p>
            <FontAwesomeIcon icon={faUserCircle} size="2x" className="dms-icon"/>
        </div>
    );
}