import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";

class Profile_Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                token: localStorage.getItem('token'),
                lastname: "",
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

    handleClick(){

    }

    buttonLogout(){
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('roles');
        localStorage.removeItem('user');
        window.location = "http://127.0.0.1:3000/login";
    }

    render() {
        const {user} = this.state;
        return (
            <React.Fragment>

                <img src="http://localhost:3000/img/logo.jpg" alt="logo"/>
                <h3>{user.firstname + " " + user.lastname} </h3>
                <span>N° de client : {user.id}</span>
                <a type="button" href="http://127.0.0.1:3000/login" onClick={this.buttonLogout} ><i className="fas fa-power-off"></i> Se déconnecter</a>
                <ul>
                    <li><NavLink exact to={"/profile"} activeClassName={"active"}>Mes informations</NavLink></li>
                    <li><NavLink to={"/profile/orders"} activeClassName={"active"}>Mes commandes</NavLink></li>
                    <li><NavLink to={"/profile/settings"} activeClassName={"active"}>Mes paramètres</NavLink></li>
                    <li><NavLink to={"/profile/contact"} activeClassName={"active"}>Nous contactez</NavLink></li>
                </ul>

            </React.Fragment>
        );
    }
}

export default Profile_Navbar;