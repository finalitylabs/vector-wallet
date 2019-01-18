import React from 'react';
import "./../styles/Header.css";
import finlabs from './../assets/finlabs.png'

const Header = () => {
	return (
		<div id="header">
			<img className="header-img" src={finlabs}/>
			{/* TODO: Make this users ether address */}
			<p className="eth-address">[[TODO]]</p>
		</div>
	)
}

export default Header;