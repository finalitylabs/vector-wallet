import React, { Component } from 'react';
import Withdrawal from './Withdrawal';
import './../../styles/WithdrawSection.css';

class Withdrawals extends Component {
	constructor(props) {
		super(props);
		this.state = {
			withdrawals: [ 
				{
					from: "0x0000000000000000000000000000000000000000",
					to: "0x0000000000000000000000000000000000000001",
					amount: "100000000000"
				},
				{
					from: "0x0000000000000000000000000000000000000000",
					to: "0x0000000000000000000000000000000000000001",
					amount: "100000000000"
				},
				{
					from: "0x0000000000000000000000000000000000000000",
					to: "0x0000000000000000000000000000000000000001",
					amount: "100000000000"
				},
				{
					from: "0x0000000000000000000000000000000000000000",
					to: "0x0000000000000000000000000000000000000001",
					amount: "100000000000"
				},
				{
					from: "0x0000000000000000000000000000000000000000",
					to: "0x0000000000000000000000000000000000000001",
					amount: "100000000000"
				},
				{
					from: "0x0000000000000000000000000000000000000000",
					to: "0x0000000000000000000000000000000000000001",
					amount: "100000000000"
				},
			]
		}
	}

	render () {
		const { withdrawals } = this.state;
		return (
			<div className="withdrawals-section">
				<table>
					<thead>
						<tr>
							<th>From</th>
							<th>To</th>
							<th>Amount</th>
						</tr>
					</thead>
					<tbody>
						{
							withdrawals.map((withdrawal, i) => <Withdrawal key={i} data={{...withdrawal, key:i}} />)
						}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Withdrawals;