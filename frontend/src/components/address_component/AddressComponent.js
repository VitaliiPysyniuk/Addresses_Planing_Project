import React from 'react'
import "./AddressComponent.css"
import {Link} from "react-router-dom";
import editingLogo from '../../images/editing.png'
import deleteLogo from '../../images/delete.png'

export const AddressComponent = ({address, onAddressDelete}) => {

    return (
        <div className="custom-a-border custom-p-5 bg-light d-flex justify-content-between w-350 mb-1">
            {address.location}
            <div className="d-flex justify-content-between">
                <Link to={`/addresses/${address.id}`}>
                    <img src={editingLogo} className="me-5"/>
                </Link>
                <img src={deleteLogo} onClick={() => onAddressDelete(address.id)}/>
            </div>
        </div>
    )
}
