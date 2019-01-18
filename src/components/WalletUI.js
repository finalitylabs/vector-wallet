import React from 'react';
import "./../styles/Wallet.css";
import DepositWithdraw from './DepositWithdraw';
import Transfer from './Transfer';
import UserBalance from './Userbalance';

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