import React, { Component } from 'react';
import Modal from "./../modals/DepositWithdrawModal";
import CoinStore from './CoinStore';
// TODO: Make Transfer and deposit function


class DepositWithdraw extends Component {
	constructor(props) {
		super(props)
    this.indexedDBAvailable = window.indexedDB;
		this.state = {
			activeModal: false,
		}
	}
	onButtonClick = (value) => {
		this.setState({activeModal: value})
	}
	deposit = async (amount) => {
		var sender = this.props.web3.account
    console.log('Depositing :' + amount)
    let res = await this.props.vector.deposit(amount, sender)
    console.log(res)
    let index = [parseInt(res.offset)-amount*100, parseInt(res.offset)]
    let coin = {rangeStart:parseInt(res.offset)-amount*100, rangeEnd:parseInt(res.offset), index:[index], block:res.block}
    console.log(coin)
    const coinStore = new CoinStore(this.props.web3)
    const addressStore = await coinStore.init()
    let dbres = await coinStore.add(addressStore, coin)
    const newData = await coinStore.get(addressStore, coin.rangeStart)
    console.log(newData)
    // todo, set new balance
    this.setState({activeModal:false})
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