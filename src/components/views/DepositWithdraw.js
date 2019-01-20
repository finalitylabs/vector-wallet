import React, { Component } from 'react';
import Modal from "./../modals/DepositWithdrawModal";
// TODO: Make Transfer and deposit function


class DepositWithdraw extends Component {
	constructor(props) {
		super(props)
		this.state = {
			activeModal: false,
		}
	}
	onButtonClick = (value) => {
		this.setState({activeModal: value})
	}
	deposit = async (amount) => {
		var receiver = "0x0000000000000000000000000000000000000000";  
		var sender = this.props.web3.account;

		window.web3.eth.sendTransaction(
		{to:receiver,
		from:sender, 
		value: window.web3.toWei(amount, "ether")}
		, (err, res) => {
			console.log(err, res)
		})
	}

	withdraw = (amount) => {
		// TODO
		return
	}

	closeModal = () => {
		this.setState({activeModal: false})
	}

	render () {
		return (
			<div className="withdraw-section">
				<button onClick={() => this.onButtonClick("deposit")}>deposit</button>
				<button onClick={() => this.onButtonClick("withdraw")}>Start withdraw</button>
				{
					this.state.activeModal && 
					<Modal 
					web3={this.props.web3}
					name={this.state.activeModal} 
					CTA={
						this.state.activeModal === "deposit" ? 
						this.deposit : this.state.activeModal === "withdraw" ? 
						this.withdraw : false
					}
					close={this.closeModal}
					/>
				}
			</div>
		)
	}
}

export default DepositWithdraw;