import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			firstname: '',
			lastname: '',
			country: '',
		}
		this.handleChange = this.handleChange.bind(this);
	};

	handleChange (evt) {
		this.setState({ [evt.target.name]: evt.target.value });
	}

	onChange (event) {
		console.log(event.target.name);
		console.log(event.target.value);
	}

	redirect (){
		this.props.history.push("/login");
	}

	handleSubmit = event => {
		event.preventDefault();
			axios.post(`http://127.0.0.1:8000/api/register`,
				{
					email: this.state.email,
					password: this.state.password,
					firstname: this.state.firstname,
					lastname: this.state.lastname,
					address: {'country': this.state.country},
				})
				.then(res => {
					console.log(res);
					console.log(res.data);
					window.location = "http://127.0.0.1:3000/login"
				})
	}


	render() {
		return (
			<React.Fragment>
			<section className="register">
			    <h2>Créez votre compte</h2>
				<form onSubmit={this.handleSubmit} action="" className="register-form">
			        <div className="register-form-identify">
			            <h3>Identifiants</h3>
			            <em><span>*</span> Champs obligatoires</em>
			            <div className="effect-group">
			                <input className="effect" onChange={this.handleChange} name="email" type="text" placeholder="Adresse Email *" />
			                <label>Adresse Email <span>*</span></label>
			                <span className="focus-border">
			            	<i></i>
			            </span>
			            </div>
			            <div className="effect-group">
			                <input className="effect"onChange={this.handleChange} name="password" type="password" placeholder="Mot de passe *" />
			                <label>Mot de passe <span>*</span></label>
			                <span className="focus-border">
			            	<i></i>
			            </span>
			            </div>
			            <div className="effect-group">
			                <input className="effect" type="password" placeholder="Confirmation du mot de passe" />
			                <label>Confirmation du mot de passe</label>
			                <span className="focus-border">
			            	<i></i>
			            </span>
			            </div>
			        </div>
			        <div className="register-form-personal">
			            <h3>Informations personnelles</h3>
			            <div className="custom-radios">
			                <p className="custom-radios-title">Civilité <span>*</span></p>
			                <div>
			                    <input className="colored" type="radio" name="gender" id="man" value="male" checked />
			                    <label for="man"><span><i className="fas fa-check"></i></span>
			                    </label>
			                    <p>M.</p>
			                </div>

			                <div>
			                    <input className="colored" type="radio" name="gender" id="woman" value="color-2" />
			                    <label for="woman"><span><i className="fas fa-check"></i></span>
			                    </label>
			                    <p>Mme</p>
			                </div>
			            </div>
			            <div className="effect-group">
			                <input className="effect" type="text" onChange={this.handleChange} name="firstname" placeholder="Prénom *" />
			                <label>Prénom <span>*</span></label>
			                <span className="focus-border">
			            	<i></i>
			            </span>
			            </div>
			            <div className="effect-group">
			                <input className="effect" type="text" onChange={this.handleChange} name="lastname" placeholder="Nom *" />
			                <label>Nom <span>*</span></label>
			                <span className="focus-border">
			            	<i></i>
			            </span>
			            </div>
			            <div className="effect-group">
			                <input className="effect" onChange={this.handleChange} name="country" type="text" placeholder="Pays *" />
			                <label>Pays <span>*</span></label>
			                <span className="focus-border">
			            	<i></i>
			            </span>
			            </div>
			        </div>
			        <div className="register-form-newsletter">
			            <label className="label">
			                <input className="label__checkbox" type="checkbox" autocomplete="off"/>
			                <span className="label__text"><span className="label__check"><i className="fa fa-check icon"></i></span></span>
			            </label>
			            <p>Je souhaite m'inscrire à la newsletter WaCommerce pour recevoir toute l’information produit, les nouveautés, promotions et les réductions exclusives proposées aux abonnés !</p>
			        </div>
			        <button type="submit">Valider</button>
			    </form>
			</section>
			</React.Fragment>
		);
	}
}
