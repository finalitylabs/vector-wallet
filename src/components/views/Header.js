import React, { Component } from 'react';
import "./../../styles/Header.css";
import finlabs from './../../assets/finlabs.png'

class Header extends Component {

	render() {
		return (
			<div id="header">
				<img className="header-img" alt="Finality labs logo" src={finlabs}/>
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