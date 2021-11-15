import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import "./PlannedAddressesComponent.css"

import {addressesServices} from "../../services";
import {SimpleAddressComponent} from "../simple_address_component/SimpleAddressComponent";

export const PlannedAddressesComponent = ({planned} = planned) => {
    const [addresses, setAddresses] = useState(null);

    useEffect(async () => {
        const addressesData = await addressesServices.getPlanedAddresses();
        setAddresses(addressesData);
    }, [])


    return (
        <div className="wid-70 custom-border custom-p-5 bg-light d-flex flex-column">
            {addresses && addresses.map((address, index) => <SimpleAddressComponent address={address} key={index}/>)}

            <Link to={'/addresses'} className="nav-link d-flex flex-column">
                <button type="button" className="btn btn-outline-primary">Back to addresses</button>
            </Link>
        </div>
    )
}
