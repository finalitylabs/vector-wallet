import React, { Component } from 'react';

class Withdrawal extends Component {
	
	challange = (transactionId) => {
		// TODO Challange
		console.log(`should challange withdraw with id: ${transactionId}`)
	}

	render () {
		return (
			<tr>
				<td>{this.props.data.from}</td>
				<td>{this.props.data.to}</td>
				<td>{this.props.data.amount}</td>
				<td>
					<button onClick={() => {
						this.challange(this.props.data.key)
					}}>
						challange
					</button>
				</td>
			</tr>
		)
	}
}

export default Withdrawal;