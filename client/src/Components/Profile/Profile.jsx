import React, {Component} from "react";
import NavbarProfile from "./Profile_Navbar";
import Informations from "./Nav_Components/Information";
import Commands from "./Nav_Components/Commands";
import Reclams from "./Nav_Components/Reclams";
import Params from "./Nav_Components/Params";
import {Router, Route, Switch} from "react-router-dom";
import history from "../../history";

import axios from 'axios';

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                token: localStorage.getItem('token'),
                lastname: "Jean",
                addresses: [],
            },
        }

        axios.get(`http://localhost:8000/api/user?token=${localStorage.getItem('token')}`)
            .then((res) => {
                this.setState({user: res.data});
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <React.Fragment>
                <Router history={history}>

                    <section className="account container">
                        <div className="row flex-nowrap">
                            <div className="account-panel col-3">
                                <NavbarProfile/>
                            </div>

                            <div className="account-content col-9">
                                <Switch>
                                    <Route exact path="/profile"
                                           render={(props) => (<Informations user={this.state.user}/>)}/>
                                    <Route exact path="/profile/orders"
                                           render={(props) => (<Commands user={this.state.user}/>)}/>
                                    <Route exact path="/profile/settings"
                                           render={(props) => (<Params user={this.state.user}/>)}/>
                                    <Route exact path="/profile/contact"
                                           render={(props) => (<Reclams user={this.state.user}/>)}/>
                                </Switch>
                            </div>

                        </div>
                    </section>
                </Router>
            </React.Fragment>
        );
    }
}

export default Profile;