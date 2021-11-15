import {Route, Switch, Redirect} from "react-router-dom";
import {AddressesComponent, AddUpdateAddressComponent, PlannedAddressesComponent} from "./components";
import "./App.css"
import React from "react";

function App() {
    return (
        <div className="bg-gray-300 p-t-15 p-b-100 d-flex justify-content-center">
            <Switch>
                <Route path={'/addresses'} exact={true} render={() => <AddressesComponent/>}/>
                <Route path={'/addresses/plan'} render={() => <PlannedAddressesComponent/>}/>
                <Route path={'/addresses/add'} render={() => <AddUpdateAddressComponent status={'add'}/>}/>
                <Route path={'/addresses/:id'} render={() => <AddUpdateAddressComponent status={'update'}/>}/>
                <Redirect to={'/addresses'}/>
            </Switch>
        </div>
    );
}

export default App;
