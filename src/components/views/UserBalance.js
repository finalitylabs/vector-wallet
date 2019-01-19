import React, {Component} from 'react';

class UserBalance extends Component {
	constructor(props) {
		super(props);
		this.state = {
			balance: 10
		}
	}
	render() {
		return (
			<div className="user-balance-section">
				<h1>Balance</h1>
				{/* TODO: get balance from server */}
				<div className="balance">{this.state.balance} VETH</div>
			</div>
		)
	}
}



export default UserBalance;