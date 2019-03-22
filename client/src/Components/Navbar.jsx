import React, { Component } from 'react';

export default class Navbar extends Component {

	constructor(props) {
		super(props);

		this.state = {

		}
	}

	render() {
		return (
			<React.Fragment>
			<nav>
			    <ul>
			        <li className={"has-separator"} onClick={() => this.props.onType("Cases") }><img src="http://localhost:3000/img/composant/case.png" alt="boitier" />Boîtier</li>
			        <li className={"has-separator"} onClick={() => this.props.onType("Alimentation") }><img src="http://localhost:3000/img/composant/power.png" alt="alimentation" />Alimentation</li>
			        <li className={"has-separator"} onClick={() => this.props.onType("Disk 1") }><img src="http://localhost:3000/img/composant/stockage.png" alt="stockage" />Stockage</li>
			        <li className={"has-separator"} onClick={() => this.props.onType("Motherboard") }><img src="http://localhost:3000/img/composant/motherboard.png" alt="carte mère" />Carte mère</li>
			        <li className={"has-separator"} onClick={() => this.props.onType("Graphic Card") }><img src="http://localhost:3000/img/composant/videocard.png" alt="carte graphique" />Carte graphique</li>
			        <li className={"has-separator"} onClick={() => this.props.onType("Memory") }><img src="http://localhost:3000/img/composant/memory.png" alt="mémoire" />Mémoire</li>
			        <li className={"has-separator"} onClick={() => this.props.onType("Processor") }><img src="http://localhost:3000/img/composant/processor.png" alt="processeur" />Processeur</li>
			        <li className={"has-separator"} onClick={() => this.props.onType("Cooling") }><img src="http://localhost:3000/img/composant/cooling.png" alt="refroidissement" />Refroidissement</li>
			    </ul>
			</nav>
			</React.Fragment>
		);
	}
}
