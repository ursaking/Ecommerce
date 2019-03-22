import React, { Component } from 'react';

import Slider from './Slider';

export default class Index extends Component {
	render() {
		return (
			<React.Fragment>
				<Slider />
				<section className="quality container">
					<div>
						<i className="fas fa-star"></i>
						<p>10 ans d'expertise à votre service</p>
					</div>
					<div>
						<i className="fas fa-shopping-cart"></i>
						<p>+ de 15 000 références choisies par nos experts</p>
					</div>
					<div>
						<i className="fas fa-thumbs-up"></i>
						<p>Des millions de clients satisfaits</p>
					</div>
					<div>
						<i className="fas fa-comments"></i>
						<p>Une équipe clientèle à votre écoute</p>
					</div>
					<div>
						<i className="fas fa-credit-card"></i>
						<p>Le débit de votre carte à l'expédition</p>
					</div>
				</section>

				<section className="home-products">

					<div className="product">
						<img src="img/home-product/motherboard.png" alt="carte mère"/>
							<a href="">Cartes mères<i className="fas fa-angle-right"></i></a>
					</div>

					<div className="product">
						<img src="img/home-product/proc.png" alt="processeurs"/>
							<a href="">Processeurs<i className="fas fa-angle-right"></i></a>
					</div>

					<div className="product">
						<img src="img/home-product/graphique.png" alt="carte graphiques"/>
							<a href="">Cartes graphiques<i className="fas fa-angle-right"></i></a>
					</div>

					<div className="product">
						<img src="img/home-product/cases.png" alt="boitier"/>
							<a href="">Boitiers<i className="fas fa-angle-right"></i></a>
					</div>

				</section>

				<section className="pro container">
					<div className="row">
						<div className="col-10 pro-text">
							<h3>Espace pro</h3>
							<p>TPE, PME, entrepreneurs..</p>
							<p>Faites confiance à l'expertise WaCommerce</p>
						</div>
						<div className="col-2">
							<img src="img/home-product/entreprise.png" alt=""/>
						</div>
					</div>
				</section>

			</React.Fragment>
		);
	}
}
