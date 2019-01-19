import React, {Component} from 'react';

class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			amount: 0,
			error: null,
		}

	}

	allowedAmount = (amount) => {
		if (amount < 0.00001) {
			this.setState({error: "Transaction value < 0.00001 VETH"})
			return false;
		} else {
			return true;
		}
	}

	setMax = (e) => {
		e.preventDefault();
		const gasLimit = 21000;

		window.web3.eth.getGasPrice((err,res) => {
			const max = this.props.web3.ETHBalance - ((res * gasLimit) / 10 ** 18)
			if (max < 0) {
				this.setState({amount:0})
			} else {
				this.setState({amount: max})
			}
		});

	}

	render() {
		return(
			<div className="modal">
				<div className="main">
					<h1>{this.props.name}</h1>
					<form onSubmit={
					e => {
						e.preventDefault();
						const allowedAmount = this.allowedAmount(this.state.amount);
						if (allowedAmount) {
							this.props.CTA(this.state.amount);
						}
					}
					}>
						<label>Amount: </label>
						<input 
						type="text"
						onChange={e => {
							this.setState({amount: e.target.value})
						}}
						value={this.state.amount}
						/>
						{/* TODO: This needs to be ETH balance when depositing and VETH when withdrawing */}
						<a href="/" onClick={this.setMax}>Max: {this.props.web3.ETHBalance}</a>
						<div className="error">{this.state.error}</div>
						<input type="submit" value={this.props.name}/>
					</form>
				</div>
				<div onClick={this.props.close} className="blackground"/>
			</div>
		)
	}
}

export default Modal;