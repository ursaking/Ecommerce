import React, {Component} from 'react';

class Reclams extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
                <div className="account-last-section">
                    <div className="contact">
                        <h3>Réclamation</h3>
                        <form action="" className="">
                            <div className="d-flex">

                                <div className="select animated zoomIn subject">
                                    <input type="radio" name="type" autoComplete="off" />
                                        <i className="toggle icon fas fa-angle-down"></i>
                                        <i className="toggle icon fas fa-angle-up"></i>
                                        <span className="placeholder">Sujet</span>
                                        <label className="option">
                                            <input type="radio" name="type" autoComplete="off" />
                                                <span className="title animated fadeIn">Mauvaise commande</span>
                                        </label>
                                        <label className="option">
                                            <input type="radio" name="type" autoComplete="off" />
                                                <span className="title animated fadeIn">Commande défectueuse</span>
                                        </label>
                                        <label className="option">
                                            <input type="radio" name="type" autoComplete="off" />
                                                <span className="title animated fadeIn">Retour commande</span>
                                        </label>
                                        <label className="option">
                                            <input type="radio" name="type" autoComplete="off" />
                                                <span className="title animated fadeIn">Date de livraison</span>
                                        </label>
                                </div>

                                <div className="select animated zoomIn order">
                                    <input type="radio" name="order" autoComplete="off" />
                                        <i className="toggle icon fas fa-angle-down"></i>
                                        <i className="toggle icon fas fa-angle-up"></i>
                                        <span className="placeholder">Commande</span>
                                        <label className="option">
                                            <input type="radio" name="order" autoComplete="off" />
                                                <span className="title animated fadeIn">MI00001721876</span>
                                        </label>
                                        <label className="option">
                                            <input type="radio" name="order" autoComplete="off" />
                                                <span className="title animated fadeIn">MI00001721876</span>
                                        </label>
                                        <label className="option">
                                            <input type="radio" name="order" autoComplete="off" />
                                                <span className="title animated fadeIn">MI00001721876</span>
                                        </label>
                                        <label className="option">
                                            <input type="radio" name="order" autoComplete="off" />
                                                <span className="title animated fadeIn">MI00001721876</span>
                                        </label>
                                </div>
                                <input type="text" placeholder="Titre" />
                            </div>

                            <textarea placeholder="Décrivez au maximum votre demande" name="content"></textarea>

                            <button>Envoyer</button>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
            ;
    }
}

export default Reclams