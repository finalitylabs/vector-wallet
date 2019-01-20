import React, { Component } from 'react';
import "./../../styles/Header.css";
import finlabs from './../../assets/finlabs.png';
import { Link } from "react-router-dom";

class Header extends Component {

	render() {
		return (
			<div id="header">
				<Link to="/">
					<img className="header-img" alt="Finality labs logo" src={finlabs}/>
				</Link>
				
				<Link className="withdrawal-link" to="/withdrawals">withdrawals</Link>
				{
					this.props.web3.address ? 
					<p className="eth-address">{this.props.web3.trimmedAddress}</p> 
					: 
					<div className="lds-ring header-spinner"><div></div><div></div><div></div><div></div></div> 
				}
			</div>
		)
	}
}

export default Header;