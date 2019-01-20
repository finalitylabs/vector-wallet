import React, { Component } from 'react';
import "./../../styles/Footer.css";
import ethLogo from './../../assets/ethereum-logo.png';

class Footer extends Component {

	render() {
		return (
			<div id="footer">
				<p>Powered by: The Ethereum foundation</p>
				<img className="footer-img" alt="Ethereum foundation logo" src={ethLogo}/>
			</div>
		)
	}
}

export default Footer;