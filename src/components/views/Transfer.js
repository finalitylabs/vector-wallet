import React, { Component } from 'react';
import Web3Utils from 'web3-utils';

class Transfer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			amount: "",
			to: "",
			error: ""
		}
	}

	transfer = async (e) => {
		e.preventDefault();
    console.log(this.props.vector)
    console.log(this.state.amount)
    console.log(this.state.to)
		// 0x0000000000000000000000000000000000000000
		if (!Web3Utils.isAddress(this.state.to)) {
			this.setState({error: "Invalid address"})
			return;
		}
		if (this.state.amount < 0.00001) {
			this.setState({error: "Transaction value < 0.00001 VETH"})
			return;
		}

    await this.props.vector.transfer(this.state.to, this.props.web3.address, this.state.amount)
		// TODO: Transfer
	}

	render() {
		return(
			<div className="transfer-section">
				<h1>Transfer</h1> 
				<p className="note">NOTE: Plasma Vector can't handle transactions smaller than 0.00001 VETH</p>
				<form onSubmit={this.transfer}>
					{/* TODO: Make the form inputs seperate components */}
					<div className="input-label">
						<label>To:</label>
						<input type="text" value={this.state.to} 
						onChange={(e) => {
							this.setState({to: e.target.value})
						}}
						/>
					</div>
					<div className="input-label">
						<label>Amount:</label>
						<input type="text" value={this.state.from}
						onChange={(e) => {
							this.setState({amount: e.target.value})
						}}
						/>
					</div>
					<input type="submit" value="transfer" />
				</form>
				<div className="error">{this.state.error}</div>
			</div>
		)
	}
}

export default Transfer;