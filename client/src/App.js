import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import Script from "react-load-script";

import Header from './Components/Header';
import Navbar from './Components/Navbar';

import Index from './Components/Index/Index';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Products from './Components/Products/Index';
import Product from './Components/Product/Index';
import Profile from './Components/Profile/Profile';
import Cart from './Components/Cart/InCart';

import Admin from './Components/Admin/AdminPanel';
import Footer from "./Components/Footer";


class App extends Component {

    state = {
        type: "Graphic Card",
        update: false,
        token: localStorage.getItem('token'),
        roles: localStorage.getItem('roles'),
        product: localStorage.getItem('products'),
    }

    handleType = (type) => {
        this.setState({type});
        this.setState({update: true});
        return <Redirect to={`/products?type=${type}`}/>
    }

    componentDidMount() {
        //localStorage.removeItem('products');
    }

    handleScriptError() {
        this.setState({scriptError: true})
    }

    handleScriptLoad() {
        this.setState({scriptLoaded: true})
    }

    render() {
        if (this.state.update === true) {
            this.setState({update: false});
            return (
                <Router>
                    <Redirect to={`/products?type=${this.state.type}`}/>
                </Router>
            );
        }
        return (
            <Router>
                <React.Fragment>
                    {/* Top */}
                    <Header/>
                    <Navbar onType={this.handleType}/>

                    {/* Index */}
                    <Route exact path="/" component={Index}/>

                    {/* User Related */}
                    {this.state.token === null ?
                        <Route path="/register" component={Register}/>
                        : null}
                    {this.state.token === null ?
                        <Route path="/login" component={Login}/>
                        : null}
                    {this.state.token !== null ?
                        <Route path="/profile" component={Profile}/>
                        : null}
                    {this.state.roles == "ROLE_ADMIN" ?
                        <Route path="/admin" component={Admin}/>
                        : null}

                    {/* Cart */}
                    <Route path="/cart" component={Cart}/>
                    {/* Product */}
                    <Route path="/products" component={Products}/>

                    <Route path="/product" component={Product}/>
                    <Script
                        url="http://localhost:3000/js/script.js"
                        onError={this.handleScriptError.bind(this)}
                        onLoad={this.handleScriptLoad.bind(this)}
                    />

                    <Footer/>
                </React.Fragment>
            </Router>
        );
    }
}

export default App;