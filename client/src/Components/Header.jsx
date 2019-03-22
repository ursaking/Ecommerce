import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import axios from 'axios';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            token: localStorage.getItem('token'),
            count: localStorage.getItem('count'),
        }
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange (evt) {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    onChange (event) {
        console.log(event.target.name); // the name of the form element
        console.log(event.target.value); // the value of the form element
    }

    componentDidMount() {
        var basket = JSON.parse(localStorage.getItem('products'));
        if (basket === null) {
            localStorage.setItem('count', 0);
        } else {
            var test = localStorage.getItem('count');
            if (test >= 0){
                localStorage.setItem('count', basket.length);
            }
        }

    }



    handleSubmit = event => {
        event.preventDefault();
        if (this.state.email !== "" && this.state.password !== ""){
            axios.post(`http://127.0.0.1:8000/api/login`,
                {
                    email: this.state.email,
                    password: this.state.password,
                })
                .then(res => {
                    localStorage.setItem('token', res.data.apiToken);
                    localStorage.setItem('email', res.data.email);
                    localStorage.setItem('roles', res.data.roles['0']);
                    window.location = "http://127.0.0.1:3000/"
                })
        }
    }

    render() {
        return (
            <React.Fragment>
                <header>
                    <div className="container">
                        <NavLink to="/"><img className="" src="http://localhost:3000/img/logo.png" alt="wacommerce"/></NavLink>
                        <form action="http://localhost:3000/products" className="">
                            <input type="text" name="label"
                                   placeholder="Chercher un produit, une marque, une catégorie..."/>
                            <button type="submit"><i className="fas fa-search"></i></button>
                        </form>
						<div className="d-flex">
                        {this.state.token !== null ?
                            <div className="auth-header">
                                <div id="auth-popover-button">
                                    <a href="http://127.0.0.1:3000/profile">
                                    <i className="fas fa-user"></i>
                                    <p>Compte</p>
                                    </a>
                                </div>
                            </div>
                            : <div className="auth-header">
                                <div id="auth-popover-button">
                                    <div id="auth-popover">
                                        <h3>Déjà client ?</h3>
                                        <form onSubmit={this.handleSubmit}>
                                            <input type="text" onChange={this.handleChange} name="email" placeholder="Email" />
                                            <input type="password" onChange={this.handleChange} name="password" placeholder="Mot de passe" />
                                            <button type="submit" onClick={this.handleSubmit}>Connexion <i className="fas fa-angle-right"></i>
                                            </button>
                                        </form>
                                        <hr />
                                        <h3>Nouveau client ?</h3>
                                        <a href="http://127.0.0.1:3000/register"><button>S'inscrire <i className="fas fa-angle-right"></i></button></a>
                                    </div>
                                    <i className="fas fa-user"></i>
                                    <p>Compte</p>
                                </div>
                            </div>}
                        <div className="auth-header">
                            <div id="auth-popover-button">

                            </div>
                            <NavLink to={"cart"}>
                                <i className="fas fa-shopping-cart">
                                        {this.state.count >= 1 ?
                                            <span className="badge badge-light">{this.state.count}</span>
                                            : null}
                                </i>
                                <p>Panier</p>
                            </NavLink>
							</div>
                        </div>
                    </div>
                </header>
            </React.Fragment>
        );
    }
}
