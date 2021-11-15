class AddressesServices {
    apiUrl = 'http://localhost:8000';

    async getAllAddresses() {
        const response = await fetch(this.apiUrl).then(value => value.json());
        return response;
    }

    async getPlanedAddresses() {
        const response = await fetch(`${this.apiUrl}/plan`).then(value => value.json());
        return response;
    }

    async addAddress(addressData) {
        const response = await fetch(this.apiUrl,
            {method: 'POST', body: JSON.stringify(addressData), headers: {'Content-Type': 'application/json'}})
            .then(value => value.status);
        return response;
    }

    async getAddressById(addressId) {
        const response = await fetch(`${this.apiUrl}/${addressId}`).then(value => value.json());
        return response;
    }

    async updateAddress(addressId, addressData) {
        const response = await fetch(`${this.apiUrl}/${addressId}`,
            {method: 'PATCH', body: JSON.stringify(addressData), headers: {'Content-Type': 'application/json'}})
            .then(value => value.status);
        return response;
    }

    async deleteAddress(addressId) {
        const response = await fetch(`${this.apiUrl}/${addressId}`, {method: 'DELETE'})
            .then(value => value.status);
        return response;
    }
}

export const addressesServices = new AddressesServices()
