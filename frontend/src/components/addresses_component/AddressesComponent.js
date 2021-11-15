import React, {useState, useEffect} from 'react'
import {Link, Redirect, Route, Switch} from "react-router-dom";
import "./AddressesComponent.css"

import {AddressComponent} from '../address_component/AddressComponent'
import {addressesServices} from "../../services";
import {AddUpdateAddressComponent} from "../add_update_address_component/AddUpdateAddressComponent";

export const AddressesComponent = ({planned} = planned) => {
    const [addresses, setAddresses] = useState(null);

    useEffect(async () => {
        const addressesData = await addressesServices.getAllAddresses();
        setAddresses(addressesData);
    }, [])

    const onAddressDelete = async (addressId) => {
        await addressesServices.deleteAddress(addressId);
        setAddresses(await addressesServices.getAllAddresses());
    }

    return (
        <div className="wid-70 custom-border custom-p-5 bg-light d-flex flex-column">
            {addresses && addresses.map(address => <AddressComponent address={address} key={address.id}
                                                                     onAddressDelete={onAddressDelete}/>)}
            <Link to={'/addresses/add'} className="nav-link d-flex flex-column">
                <button type="button" className="btn btn-outline-primary">Add address</button>
            </Link>
            <Link to={'/addresses/plan'} className="nav-link d-flex flex-column">
                <button type="button" className="btn btn-outline-primary">Plan route</button>
            </Link>
        </div>
    )
}
