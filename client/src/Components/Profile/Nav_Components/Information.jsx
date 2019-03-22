import React, {Component} from 'react';
import axios from 'axios';

class Informations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
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
        const { user } = this.state;

        return (
            <React.Fragment>
                <div className="account-first-section">
                    <form className="account-info" action="">
                        <h3>Informations personnelles</h3>
                        <span>Champs obligatoires</span>
                        <div className="row">
                            <div className="col-5">

                                <div className="form-group radio">
                                    <label className="no-marge" htmlFor="civilite">Civilité<span></span> :</label>
                                    <div>
                                        <div>
                                            <input name="civilite" type="radio" defaultChecked disabled/>
                                            <p>M.</p>
                                        </div>
                                        <div>
                                            <input name="civilite" type="radio" disabled/>
                                            <p>Mme</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="firstname">Prenom<span></span> :</label>
                                    <input id="firstname" name="firstname" type="text" value={user.firstname} disabled/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Nom<span></span> :</label>
                                    <input id="name" name="name" type="text" value={user.lastname} disabled/>
                                </div>
                            </div>
                            <div className="col-5">
                                <div className="form-group">
                                    <label htmlFor="email">Email<span></span> :</label>
                                    <input id="email" name="email" type="text" value={user.email}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="age">Date de naissance<span></span> :</label>
                                    <input id="age" name="age" type="date" value="1997-02-22"/>
                                </div>

                            </div>
                        </div>
                        <button type="submit">Envoyer</button>
                    </form>

                    <div className="account-address">
                        <h3 className="carnet">Carnet d'adresses</h3>
                        <div className="d-flex">
                        { user.addresses.map((address, i) => 
                            <div className="group-adress mr">
                                <div className="group-adress-legende">
                                    <i className="fas fa-file-alt"></i>
                                    <p>Adresse de facturation</p>
                                </div>
                                <div className="group-adress-content">
                                    <p>{user.firstname} {user.lastname}</p>
                                    <p>{address.address}</p>
                                    <p>{address.city}</p>
                                    <p>{address.country}</p>
                                    <p>0102030405</p>
                                    <a href=""><i className="fas fa-pen"></i></a>
                                </div>
                            </div>
                            )}
                        </div>
                        <h3 className="other-title">Choisissez une autre adresse de livraison</h3>
                        <div className="other-adress">
                            { user.addresses.map((address, i) => 
                            <div className="other-adress-container" key={i}>
                                <div>
                                    <p>{user.firstname} {user.lastname}</p>
                                    <p>{address.address}</p>
                                    <p>{address.city}</p>
                                    <p>{address.country}</p>
                                    <p>0102030405</p>
                                    <a href="" className="edit"><i className="edit fas fa-pen"></i></a> <a href=""
                                                                                                           className="delete"><i
                                    className="fas fa-trash-alt"></i></a>
                                    <button>Choisir cette adresse</button>
                                </div>
                            </div>
                            )}
                        </div>
                        <a href="#modal">
                            <button className="add-adress">Ajouter une adresse</button>
                        </a>
                    </div>

                    <div id="modal">
                        <div className="modal-content">
                            <a href="#" className="close"><i className="fas fa-times"></i></a>

                            <div className="header">
                                <h2>Ajouter une adresse</h2>
                            </div>
                            <form className="copy">
                                <div className="form-group radio">
                                    <label className="no-marge" htmlFor="civilite">Civilité<span></span></label>
                                    <div>
                                        <div>
                                            <input name="civilite" type="radio" defaultChecked/>
                                            <p>M.</p>
                                        </div>
                                        <div>
                                            <input name="civilite" type="radio"/>
                                            <p>Mme</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="firstname">Prenom<span></span></label>
                                    <input id="add-firstname" name="firstname" type="text" value="Jean"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Nom<span></span></label>
                                    <input id="add-name" name="name" type="text" value="Dupont"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="adress">Adresse<span></span></label>
                                    <input id="add-adress" name="adress" type="text"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="postalcode">Code postal<span></span></label>
                                    <input id="add-postalcode" name="postalcode" type="text"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="city">Ville<span></span></label>
                                    <input id="add-city" name="city" type="text"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="country">Pays<span></span></label>
                                    <input id="add-country" name="country" type="text"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="tel">Téléphone<span></span></label>
                                    <input id="add-tel" name="tel" type="tel"/>
                                </div>
                                <button type="submit">Valider</button>
                            </form>
                            <div className="cf footer">
                                <p>Les informations recueillies par WaCommerce font l’objet d’un traitement destiné à la
                                    gestion de la relation client-prospect et aux opérations associées.</p>
                            </div>
                        </div>
                        <div className="overlay"></div>
                    </div>

                    <form action="" className="account-password">
                        <h3>Changer de mot de passe</h3>
                        <div className="form-group">
                            <label htmlFor="actualPassword">Mot de passe actuel<span></span> :</label>
                            <input id="actualPassword" name="email" type="password"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="newPassword">Nouveau mot de passe<span></span> :</label>
                            <input id="newPassword" name="email" type="password"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirmer le nouveau mot de passe<span></span> :</label>
                            <input id="confirmPassword" name="email" type="password"/>
                        </div>
                        <button type="submit">Valider</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default Informations