import React, { Component } from 'react';

export default class Slider extends Component {
	render() {
		return (
			<React.Fragment>
			<div className="wrapper">
			    <input defaultChecked type="radio" name="slider" id="slide1" data-bgc="#080808" autoComplete="off"/>
			    <input type="radio" name="slider" id="slide2" data-bgc="#0a0c19" autoComplete="off"/>
			    <input type="radio" name="slider" id="slide3" data-bgc="#000000" autoComplete="off"/>
			    <input type="radio" name="slider" id="slide4" data-bgc="#ad0725" autoComplete="off"/>
			    <input type="radio" name="slider" id="slide5" data-bgc="#ffffff" autoComplete="off"/>

			    <div className="slider-wrapper">
			        <div className="inner">
			            <a href="/">
			                <article>
			                    <div className="info top-left"></div>
			                    <img alt="ok" className="img-slider" src="img/slider/1.jpg"/>
			                </article>
			            </a>
			            <a href="/">
			                <article>
			                    <div className="info bottom-right"></div>
			                    <img alt="ok" className="img-slider" src="img/slider/2.jpg"/>
			                </article>
			            </a>
			            <a href="/">
			                <article>
			                    <div className="info bottom-left"></div>
			                    <img alt="ok" className="img-slider" src="img/slider/3.jpg"/>
			                </article>
			            </a>
			            <a href="/">
			                <article>
			                    <div className="info top-right"></div>
			                    <img alt="ok" className="img-slider" src="img/slider/4.jpg"/>
			                </article>
			            </a>
			            <a href="/">
			                <article>
			                    <div className="info bottom-left"></div>
			                    <img alt="ok" className="img-slider" src="img/slider/5.jpg"/>
			                </article>
			            </a>
			        </div>
			    </div>
			    <div className="slider-prev-next-control">
			        <label htmlFor="slide1"></label>
			        <label htmlFor="slide2"></label>
			        <label htmlFor="slide3"></label>
			        <label htmlFor="slide4"></label>
			        <label htmlFor="slide5"></label>
			    </div>
			    <div className="slider-dot-control">
			        <label htmlFor="slide1"></label>
			        <label htmlFor="slide2"></label>
			        <label htmlFor="slide3"></label>
			        <label htmlFor="slide4"></label>
			        <label htmlFor="slide5"></label>
			    </div>
			</div>
			</React.Fragment>
		);
	}
}
