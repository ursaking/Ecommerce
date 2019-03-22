import React, { Component } from 'react';

export default class Footer extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <React.Fragment>
                <footer>
                    <section className="info-achat">
                        <div className="container">
                            <div>
                                <i className="fas fa-credit-card"></i>
                                <p>Débit à<br/><span>l'éxpédition</span></p>
                            </div>
                            <div>
                                <i className="fas fa-truck"></i>
                                <p>Livraison<br/><span>express</span></p>
                            </div>

                            <div>
                                <i className="fas fa-map-marker-alt"></i>
                                <p>Réseau national<br/><span>de magasins</span></p>
                            </div>
                            <div>
                                <i className="fas fa-euro-sign"></i>
                                <p>
                                    Paiement<br/><span>en 3x</span></p>
                            </div>
                            <div>
                                <i className="fas fa-cookie-bite"></i>
                                <p>Sav<br/><span>100% Parisiens</span></p>
                            </div>
                        </div>
                    </section>

                    <div className="option-achat">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <div className="payement">
                            <span>
                                Moyens de paiement acceptés
                            </span>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="shipping col">
                                        Nos transporteurs
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="informations">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <span>WaCommerce</span>
                                    <ul>
                                        <li><a href="">Qui sommes-nous ?</a></li>
                                        <li><a href="">Nos services</a></li>
                                        <li><a href="">Les magasins WaCommerce</a></li>
                                        <li><a href="">Contactez-nous</a></li>
                                    </ul>
                                </div>
                                <div className="col">
                                    <span>WaCommerce & vous</span>
                                    <ul>
                                        <li><a href="">Notre démarche écologique</a></li>
                                        <li><a href="">WaCommerce recrute</a></li>
                                        <li><a href="">Notre programme d'affiliation</a></li>
                                        <li><a href="">Politique de cookies</a></li>
                                        <li><a href="">Gérer vos cookies</a></li>
                                    </ul>
                                </div>
                                <div className="col">
                                    <span>Guides & SAV</span>
                                    <ul>
                                        <li><a href="">Guides & SAV</a></li>
                                        <li><a href="">Foire Aux Questions</a></li>
                                    </ul>
                                </div>
                                <div className="col">
                                    <span>A Propos</span>
                                    <ul>
                                        <li><a href="">Plan du site</a></li>
                                        <li><a href="">Conditions générales de vente</a></li>
                                        <li><a href="">Informations légales</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="social">
                        <div className="container">
                            <div className="row">
                                <span>WaCommerce sur les réseaux sociaux</span>
                                <ul>
                                    <li><a href=""><i className="fab fa-youtube-square"></i></a></li>
                                    <li><a href=""><i className="fab fa-twitch"></i></a></li>
                                    <li><a href=""><i className="fab fa-facebook"></i></a></li>
                                    <li><a href=""><i className="fab fa-instagram"></i></a></li>
                                    <li><a href=""><i className="fab fa-twitter-square"></i></a></li>
                                    <li><a href=""><i className="fab fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}
