import React, {Component} from "react";
import queryString from "query-string";
import axios from "axios";

class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            component:[]
        };
    }

    componentDidMount() {
        const id = queryString.parse(this.props.location.search).id;

         axios
            .get(`http://localhost:8000/api/component/${id}`)
            .then(res => {
                this.setState({ component: res.data,
                                price: (res.data.sortValue.prix / 100).toFixed(2),
                                available: res.data.sortValue.dispo});

                console.log(res.data);
            })
            .catch(err => {})

    }

    addBasket = component => {
        console.log(component);
        var item = new Object();
        item.id = component.id;
        item.brand = component.brand;
        item.price = component.sortValue.prix;
        item.stock = component.sortValue.dispo;
        item.image = component.img200x200;
        item.label = component.label;
        item.sublabel = component.sublabel;
        item.quantity = 1;
        console.log(item);


        var basket = JSON.parse(localStorage.getItem("products"));
        if (basket == null || basket.length === 0) {
            basket = new Array();
            basket.push(item);
        } else {
            basket.push(item);
        }
        localStorage.setItem('products', JSON.stringify(basket));
        //window.location.reload();
    };

    render() {
        const add = () => this.addBasket(this.state.component);
        return (
            <React.Fragment>

                <section className="product-fiche container">

                    <div className="product-fiche_desc">
                        <h3>{this.state.component.label}</h3>
                        <em>{this.state.component.sublabel}</em>


                    </div>

                    <div className="product-fiche-content">
                        <div className="row">
                            <div className="col">
                                <img src={`https://www.topachat.com${this.state.component.img500x500}`} alt=""/></div>
                            <div className="col">
                                <div className="product-fiche-content_share">
                                    <a href=""><i className="fab fa-facebook"></i></a>
                                    <a href=""><i className="fab fa-twitter-square"></i></a>
                                    <a href=""><i className="fab fa-linkedin"></i></a>
                                    <a href=""><i className="fas fa-envelope-square"></i></a>
                                </div>

                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam rem voluptatem itaque
                                    soluta porro quis, labore accusamus nobis ut eum veniam asperiores, in culpa sit
                                    debitis fuga ad, aliquid temporibus molestiae architecto? Ex nulla temporibus, autem
                                    quasi culpa aut sed molestiae ab nemo saepe consectetur a ullam dignissimos unde! A
                                    totam tempora vero nostrum veniam, eos ipsum delectus ducimus quo eveniet, vel, enim
                                    beatae eligendi optio ullam. Non accusamus error temporibus illum, doloremque veniam
                                    dolor aperiam modi exercitationem deleniti consectetur fugiat cum enim at
                                    dignissimos animi, quis aut aliquam voluptatum mollitia, atque. Quas eos sit
                                    adipisci deserunt est iusto rem.</p>

                                <div className="product-fiche-content_addtocart">
                                    <div className="product-fiche-content_addtocart_left">

                                        <h4>{this.state.price}€</h4>

                                        <div className="product-fiche-content_addtocart_left_quantity">
                                            <label htmlFor="">Quantité</label>
                                            <select name="value" id="">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button onClick={add} className="product-fiche-content_addtocart_right">
                                        <i className="fas fa-shopping-cart"></i>
                                        <p>Ajouter au panier</p>
                                    </button>
                                </div>

                                <div className={this.state.available === "in-stock" ? "product-fiche-content_dispo instock" : "product-fiche-content_dispo outstock"}>
                                    <p>Disponibilité</p>
                                    <span className={this.state.available === "in-stock" ? "instock" : "outstock"}></span>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </React.Fragment>
        );
    }
}

export default Product;