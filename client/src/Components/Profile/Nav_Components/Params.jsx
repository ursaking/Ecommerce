import React, {Component} from 'react';

class Params extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <React.Fragment>
                <div className="account-third-section">
                    <div className="newsletter">
                        <h3>Abonnements</h3>
                        <p>Recevez gratuitement toute l'actualité de Wacommerce ainsi que des offres exclusives et bons
                            plans dans votre boîte aux lettres électronique en vous abonnant à notre newsletter !</p>
                        <form action="">
                            <h4>Choisissez vos abonnements :</h4>
                            <div className="form-group">
                                <input type="checkbox" name="general" id="general" />
                                    <label htmlFor="general">Newsletter générale</label>
                            </div>
                            <p>Adresse actuelle : <strong>{localStorage.getItem('email')}</strong></p>
                            <button type="submit">Valider</button>
                        </form>
                    </div>
                </div>

            </React.Fragment>
        )
            ;
    }
}

export default Params