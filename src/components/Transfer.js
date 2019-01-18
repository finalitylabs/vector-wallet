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

	transfer = (e) => {
		e.preventDefault();
		// 0x0000000000000000000000000000000000000000
		if (!Web3Utils.isAddress(this.state.to)) {
			this.setState({error: "Invalid address"})
			return;
		}
		if (this.state.amount < 0.00001) {
			this.setState({error: "Transaction value < 0.00001 VETH"})
			return;
		}

		// TODO: Transfer
	}

	render() {
		return(
			<div className="transfer">
				<h1>Transfer</h1> 
				<p>NOTE: Plasma Vector can't handle transactions smaller than 0.00001 VETH</p>
				<form onSubmit={this.transfer}>
					{/* TODO: Make the form inputs seperate components */}
					<label>To:</label>
					<input 
					type="text"  
					onChange={(e) => {
						this.setState({to: e.target.value})
					}}
					value={this.state.to}
					/>

					<label>Amount:</label>
					<input 
					type="text"  
					onChange={(e) => {
						this.setState({amount: e.target.value})
					}}
					value={this.state.from}
					/>
					<input type="submit" value="transfer" />
				</form>
				<div className="error">{this.state.error}</div>
			</div>
		)
	}
}

export default Transfer;