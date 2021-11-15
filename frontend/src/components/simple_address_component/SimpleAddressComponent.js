import React from 'react'
import "./SimpleAddressComponent.css"

export const SimpleAddressComponent = ({address}) => {

    return (
        <div className="custom-a-border custom-p-5 bg-light d-flex justify-content-between w-350 mb-1">
            {address.location}
        </div>
    )
}
