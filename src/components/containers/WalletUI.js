import React from 'react';
import "./../../styles/Wallet.css";
import DepositWithdraw from './../views/DepositWithdraw';
import Transfer from './../views/Transfer';
import UserBalance from './../views/UserBalance';

const Header = () => {
	return (
		<div className="wallet-ui">
			<UserBalance/>
			<DepositWithdraw/>
			<Transfer/>
		</div>
	)
}

export default Header;