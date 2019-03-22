import React, {Component} from "react";

import axios from 'axios';
import {withRouter} from "react-router-dom";
import queryString from "query-string";
import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import Select from 'react-select';


export class Items extends Component {
    static propTypes = {
        components: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    addBasket = component => {
        var item = new Object();
        item.id = component.id;
        item.brand = component.brand;
        item.price = component.sortValue.prix;
        item.stock = component.sortValue.dispo;
        item.image = component.img200x200;
        item.label = component.label;
        item.sublabel = component.sublabel;
        item.quantity = 1;

        var basket = JSON.parse(localStorage.getItem("products"));
        if (basket == null || basket.length === 0) {
            basket = new Array();
            basket.push(item);
        } else {
            basket.push(item);
        }
        localStorage.setItem('products', JSON.stringify(basket));
        window.location.reload();
    };

    render() {

        let commentNodes = Object.values(this.props.components).map((component, index) => {
            const add = () => this.addBasket(component);
            return (
                <li className="fiche" key={index}>
                    <div className="thumb">
                        <img src={`https://www.topachat.com${component.img200x200}`} alt=""/>
                    </div>
                    <div className="meta">
                        <a href={`/product?id=${component.id}`}><h3>{component.label}</h3></a>
                        <em>{component.sublabel}</em>
                        <div className="avis">
                            <div className="star">
                                <svg
                                    className="checked svg-inline--fa fa-star fa-w-18"
                                    aria-hidden="true"
                                    data-prefix="fas"
                                    data-icon="star"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    data-fa-i2svg=""
                                >
                                    <path
                                        fill="currentColor"
                                        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                    />
                                </svg>
                                <svg
                                    className="checked svg-inline--fa fa-star fa-w-18"
                                    aria-hidden="true"
                                    data-prefix="fas"
                                    data-icon="star"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    data-fa-i2svg=""
                                >
                                    <path
                                        fill="currentColor"
                                        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                    />
                                </svg>
                                <svg
                                    className="checked svg-inline--fa fa-star fa-w-18"
                                    aria-hidden="true"
                                    data-prefix="fas"
                                    data-icon="star"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    data-fa-i2svg=""
                                >
                                    <path
                                        fill="currentColor"
                                        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                    />
                                </svg>
                                <svg
                                    className="svg-inline--fa fa-star fa-w-18"
                                    aria-hidden="true"
                                    data-prefix="fas"
                                    data-icon="star"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    data-fa-i2svg=""
                                >
                                    <path
                                        fill="currentColor"
                                        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                    />
                                </svg>
                                <svg
                                    className="svg-inline--fa fa-star fa-w-18"
                                    aria-hidden="true"
                                    data-prefix="fas"
                                    data-icon="star"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    data-fa-i2svg=""
                                >
                                    <path
                                        fill="currentColor"
                                        d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                                    />
                                </svg>
                            </div>
                            <span>15 avis</span>
                        </div>
                    </div>
                    <div className="available">
                        <p className="instock">En stock</p>
                    </div>
                    <div className="price">
                        <h3>{(component.sortValue.prix / 100).toFixed(2)}€</h3>

                        <button onClick={add}>
                            <i className="fas fa-cart-plus"/>
                        </button>
                    </div>
                </li>
            );
        });

        return <ul className="product">{commentNodes}</ul>;
    }
}

class Index extends Component {
    static propTypes = {};


    constructor(props) {
        super(props);
        this.state = {
            components: [],
            offset: 0,
            type: "Graphic Card",
            actuallyPage: 1,
            priceMin: 0,
            priceMax: 1000,
            sort: 'label-asc'
        };
    }

   async loadComponentsFromServer() {
        let type = this.state.type;
        let offset = this.state.offset;
        let priceMin = this.state.priceMin;
        let priceMax = this.state.priceMax;
        let sort = this.state.sort;
        axios
            .get(`http://localhost:8000/api/components/?type=${type}&offset=${offset}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${sort}`)
            .then(res => {
                this.setState({components: res.data});
 
            })
            .catch(err => {
            });

        axios
            .get(`http://localhost:8000/api/components/howmanywithfilter?type=${type}&priceMin=${priceMin}&priceMax=${priceMax}`)
            .then(res => {
                this.setState({
                    pageCount: Math.ceil(res.data.count / 20),
                    nbComponent: res.data.count
                });
            })
            .catch(err => {
            });
    }

    async componentDidMount() {
        const values = queryString.parse(this.props.location.search);

        await this.setState({
            type: typeof values.type !== "undefined" ? values.type : "Graphic Card"
        });

        this.loadComponentsFromServer();
    }

    handlePageClick = components => {
        let selected = components.selected;
        let offset = Math.ceil(selected * 20);
        this.setState({offset: offset, actuallyPage: components.initialPage}, () => {
            this.loadComponentsFromServer();
        });
    };

    priceUpdate = (render, handle, value, un, percent) => {
        this.setState({
            priceMin: Math.ceil(render[0]),
            priceMax: Math.ceil(render[1])
        });
        this.loadComponentsFromServer();

    };

    handleChange = async (sort) => {
        await this.setState({ sort: sort.value });
            this.loadComponentsFromServer();
    }

    render() {
        const options = [
            { value: 'label-asc', label: 'Nom (défaut)' },
            { value: 'sort_value.prix-asc', label: 'Du - cher au + cher' },
            { value: 'sort_value.prix-desc', label: 'Du + cher au - cher' }
        ];

        var page = Math.floor(this.state.count / 20);
        var tmp = [];
        for (var i = 1; i <= page; i++) {
            tmp.push(i);
        }

        if (parseInt(this.state.page) + 1 <= tmp.length) {
            tmp["nextpage"] = parseInt(this.state.page) + 1;
        }
        if (parseInt(this.state.page) - 1 >= 1) {
            tmp["prevpage"] = parseInt(this.state.page) - 1;
        }

        const { sort } = this.state;
        return (
            <React.Fragment>
                <div className="container">
                    <section className="product-container row">
                        <div className="col-3">
                            <aside className="filter">
                                <div className="brand">
                                    <h4>Marque</h4>
                                    <ul>
                                        <li><input type="checkbox" value="ASUS"/>ASUS</li>
                                        <li><input type="checkbox" value="Corsair"/>Corsair</li>
                                        <li><input type="checkbox" value="Intel"/>Intel</li>
                                        <li><input type="checkbox" value="Lenovo"/>Lenovo</li>
                                    </ul>
                                </div>
                                <div className="price">
                                    <h4>Prix</h4>
                                    <div className="range">
                                        <Nouislider
                                            range={{min: 0, max: 1000}}
                                            start={[0, 1000]}
                                            connect={true}
                                            step={1}
                                            tooltips
                                            onEnd={this.priceUpdate}/>
                                    </div>
                                </div>
                                <div className="available">
                                    <h4>Disponibilité</h4>
                                    <div>
                                        <input id="available-filter" name="available-filter" type="checkbox"
                                               value="available"/>
                                        <label htmlFor="available-filter">Afficher les
                                            produits en stock</label>
                                    </div>
                                </div>
                            </aside>
                        </div>
                        <div className="products col-9">
                            <div className="products-list">
                                <div className="left">
                                    <div className="pagination">
                                        <ReactPaginate
                                            previousLabel={""}
                                            nextLabel={""}
                                            breakLabel={"..."}
                                            breakClassName={"break-me"}
                                            pageCount={this.state.pageCount}
                                            marginPagesDisplayed={1}
                                            pageRangeDisplayed={2}
                                            onPageChange={this.handlePageClick}
                                            subContainerClassName={"pages pagination"}
                                            activeClassName={"active"}
                                        />

                                    </div>
                                    <span>
                    {this.state.nbComponent} résultats
                  </span>
                                </div>

                                <div className="right">
{/*                                    <select name="list" id="list" title="list" autoComplete="off">
                                        <option disabled>Trier les produits</option>
                                        <option value="label-asc">Nom (défaut)</option>
                                        <option value="sort_value.prix-asc">Du - cher au + cher</option>
                                        <option value="sort_value.prix-desc">Du + cher au - cher</option>
                                    </select>*/}
                                    <Select
                                        placeholder={"Trier les produits"}
                                        value={sort}
                                        onChange={this.handleChange}
                                        options={options}
                                    />
                                </div>
                            </div>
                            <Items components={this.state.components}/>
                        </div>
                    </section>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Index);
