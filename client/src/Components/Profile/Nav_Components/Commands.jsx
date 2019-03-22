import React, {Component} from 'react';

import axios from 'axios';

class Commands extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
        };

        axios.get(`http://localhost:8000/api/order?token=${localStorage.getItem('token')}`)
        .then((res) => {
            this.setState({orders: res.data});
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        const { orders } = this.state;
        return (
            <React.Fragment>
                <div className="account-second-section">

                    <div className="order-inprocess">
                        <h3>{orders.length}</h3>
                        <p>Commandes en cours</p>
                    </div>

                    <div className="order-history">
                        <h3>Historique de vos commandes</h3>

                        <ul className="responsive-table">
                            <li className="table-header">
                                <div className="col col-1">Id</div>
                                <div className="col col-2">Commande</div>
                                <div className="col col-3">Montant</div>
                                <div className="col col-4">Date</div>
                                <div className="col col-4">Status</div>
                            </li>
                            {orders.map((order, i) => 
                            <li className="table-row">
                                <div className="col col-1">{i}</div>
                                <div className="col col-2">Nº{order.id}</div>
                                <div className="col col-3">{(order.price / 100).toFixed(2)}€</div>
                                <div className="col col-4">{order.data}</div>
                                <div className="col col-4 shipped">{order.status}</div>
                            </li>
                            )}
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Commands