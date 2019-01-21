import React, {Component} from 'react';

class UserBalance extends Component {
	constructor(props) {
		super(props);
		this.state = {
			balance: null
		}
	}
	
	render() {
		return (
			<div className="user-balance-section">
				<h1>Balance</h1>
				{/* TODO: get get VETH balance instead of ETH balance */}
				<div className="balance">{this.props.vBalance} VETH</div>
			</div>
		)
	}
}



export default UserBalance;