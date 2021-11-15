import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import {addressesServices} from "../../services";

export const AddUpdateAddressComponent = withRouter((props) => {
    const [address, setAddress] = useState(null);
    const inputRef = React.createRef();
    let addressId = -1;

    if (props.status == 'update') {
        const {match: {params: {id: id}}} = props;
        addressId = id;
    }

    const onSaveClick = () => {
        if (address) {
            addressesServices.updateAddress(addressId,{'location': inputRef.current.value})
        } else {
            addressesServices.addAddress({'location': inputRef.current.value})
        }
    }

    useEffect(async () => {
        if (addressId != -1) {
            const addressData = await addressesServices.getAddressById(addressId);
            setAddress(addressData);
        }
    }, [])

    return (
        <div className="custom-a-border custom-p-5 custom-m-5 bg-light">
            {address && (<input ref={inputRef} type="text" defaultValue={address.location}
                                className="form-control custom-m-5"/>)}
            {!address && (<input ref={inputRef} type="text" placeholder="address location"
                                 className="form-control custom-m-5"/>)}

            <div className="d-flex flex-column justify-content-center mt-2">
                <button type="button" className="btn btn-outline-primary" onClick={onSaveClick}>
                    Save address
                </button>
                <Link to={'/addresses'} className="mt-2">
                    <button type="button" className="btn btn-outline-primary wid-100">Back to addresses</button>
                </Link>
            </div>
        </div>

    )
})
