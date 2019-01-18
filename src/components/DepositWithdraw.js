import React, { Component } from 'react';
import Modal from "./Modal";
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
	deposit = () => {
		// TODO
		return
	}

	withdraw = () => {
		// TODO
		return
	}

	closeModal = () => {
		this.setState({activeModal: false})
	}

	render () {
		return (
			<div className="transfer-section">
				<button onClick={() => this.onButtonClick("deposit")}>deposit</button>
				<button onClick={() => this.onButtonClick("withdraw")}>withdraw</button>
				{
					this.state.activeModal && 
					<Modal 
					name={this.state.activeModal} 
					CTA={this.state.activeModal === "deposit" ? this.deposit : this.state.activeModal === "withdraw" ? this.withdraw : false}
					close={this.closeModal}
					/>
				}
			</div>
		)
	}
}

export default DepositWithdraw;