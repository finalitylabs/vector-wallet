import React, { Component } from 'react';
import "./../../styles/Wallet.css";
import DepositWithdraw from './../views/DepositWithdraw';
import Transfer from './../views/Transfer';
import UserBalance from './../views/UserBalance';
import SecurtyPanel from './../views/SecurityPanel';

class WalletUI extends Component {

	render() {
		return ( 
			<div className="wallet-ui">
				<SecurtyPanel />
				<UserBalance web3={this.props.web3} vBalance={this.props.vBalance}/>
				<DepositWithdraw web3={this.props.web3}/>
				<Transfer web3={this.props.web3}/>
			</div>
		)
	}
}


export default WalletUI;