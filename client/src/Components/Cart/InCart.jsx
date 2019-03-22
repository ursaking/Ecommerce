import React, { Component } from "react";
import axios from "axios";
import Script from "react-load-script";


class Reclams extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
      quantity: [],
      basket: JSON.parse(localStorage.getItem("products"))
    };
  }

  componentWillMount() {

  };


  deleteBasket = component => {
    var basket = this.state.basket;
    var component_id = component.id;
    basket.map((item, i)  => {
      console.log( component_id)
      if(item.id === component_id){
        console.log(i +item.id + '\n' +': is same :' + '\n' + component_id);
        basket.slice(i, 1);
        console.log(i, basket);
        // localStorage.setItem('products', basket);
      }
    })
  };

  deleteAllBasket() {
      localStorage.removeItem('products');
      window.location.reload();
  };


  onKeyPress(event) {
    console.log(event);

    const keyCode = event.keyCode || event.which;
    const keyValue = String.fromCharCode(keyCode);
    if (/\+|-/.test(keyValue))
      console.log('+');
      event.preventDefault();
  }

  render() {
    var render = null;
    if (this.state.basket !== null) {
      var number = this.state.basket.length;
      var total_price = this.state.basket.reduce(
          (accumulator, component, i) =>
              accumulator + (component.price * component.quantity) / 100,
          0
      );
      var totalPanier = Number(total_price).toFixed(2);
      render = this.state.basket.map((component) => {
        const deleted = () => this.deleteBasket(component);
        return (
            <div className="item">
              <img src={"https://www.topachat.com" + component.image} alt="" />
              <div className="cart-items-information">
                <h3>{component.label}</h3>
                <em>{component.sublabel}</em>
                <p>Dispo: <span className={component.stock === "in-stock" ? "instock" : "soldout"}></span></p>
              </div>
              <div className="cart-items-number">
                <input  type="number" onChange={this.onKeyPress.bind(this)}  placeholder={component.quantity} />
              </div>
              <sup>{(component.price * component.quantity) / 100} €</sup>
              <button onClick={deleted}>
                <i className="fas fa-times" />
              </button>
            </div>
        );
      });
    }
    const deleteAll = () => this.deleteAllBasket();
    return (
        <React.Fragment>
          <section className="cart container">
            {number > 0  ?
                <h2>Votre panier contient {number} produits</h2>
                : <h2>Votre panier est vide.</h2>}
            <div className="row">
              <div className="cart-items col-9">
                <div className="cart-items-table">{render}</div>

                <div className="cart-promo-code">
                  <p>Vous avez un code promo ?</p>
                  <input type="text" placeholder="Renseignez votre code ici" />
                  <button>OK</button>
                </div>
              </div>
              <div className="cart-price col-3">
                <h3>Montant total de vos produits</h3>
                {console.log(totalPanier)}
                {totalPanier >= 1 ?
                    <p>{totalPanier} €</p>
                 : <p>Votre panier est vide</p>}
                {totalPanier >= 1  ?
                    <button onClick={deleteAll}>vider le panier</button>
                    : null}
                {totalPanier >= 1  ?
                    <div style={{margin: 2.5 + 'em'}}  id="paypal-button-container"></div>
                    : null}
                    
                <span>Panier affiché TTC sur la base d'une TVA à 20%</span>
              </div>
            </div>
          </section>
        </React.Fragment>
    );
  }

    handleScriptError() {
    }

    handleScriptLoad() {
    }
}
export default Reclams;
