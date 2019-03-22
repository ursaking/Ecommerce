import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onChange(event) {
        console.log(event.target.name);
        console.log(event.target.value);
    }

    handleSubmit = event => {
        console.log(this.state.email, this.state.password)
        event.preventDefault();
        axios.post(`http://127.0.0.1:8000/api/login`,
            {
                email: this.state.email,
                password: this.state.password,
            }).then(res => {
            localStorage.setItem('token', res.data.apiToken);
            localStorage.setItem('email', res.data.email);
            localStorage.setItem('roles', res.data.roles['0']);
            window.location = "http://127.0.0.1:3000/"
        }).catch(res => {
            console.log(res);
            console.log(res.data);
        })
    }


    render() {
        return (
            <React.Fragment>
                <section className="auth">
                    <h2>Identifiez-vous</h2>
                    <div className="auth-body">
                        <div className="auth-body-type">
                            <button className="clicked" data-type="auth-body-login">Déjà client ?</button>
                            <button data-type="auth-body-register">Nouveau client ?</button>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="auth-body-login">
                                <p>Connectez-vous avec votre adresse email et votre mot de passe pour accéder à votre
                                    espace client.</p>
                                <input name="email" type="text" onChange={this.handleChange} placeholder="Email"/>
                                <input name="password" type="password" onChange={this.handleChange}
                                       placeholder="Mot de passe"/>
                                <button type="submit">Connexion</button>
                            </div>
                        </form>
                        <div className="auth-body-register">
                            <p>Pour commander et accéder à nos différents services, nous vous convions à créer un compte
                                client. C’est simple, rapide et il vous apportera de nombreux avantages.</p>
                            <a href="http://127.0.0.1:3000/register">
                                <button>Créer votre compte</button>
                            </a>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default Login