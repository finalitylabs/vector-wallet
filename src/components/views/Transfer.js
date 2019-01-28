import React, { Component } from 'react';
import Web3Utils from 'web3-utils';
import CoinStore from './CoinStore';

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
		// 0x0000000000000000000000000000000000000000
		if (!Web3Utils.isAddress(this.state.to)) {
			this.setState({error: "Invalid address"})
			return;
		}
		if (this.state.amount < 0.00001) {
			this.setState({error: "Transaction value < 0.00001 VETH"})
			return;
		}

    let coin = await this.getCoins(Math.ceil(parseFloat(this.state.amount)*100))
    if(coin === false) {
      console.log('No coin matching amount found')
      return
    }
    console.log(coin)

    let res = await this.props.vector.transfer(coin.block, this.state.to, this.props.web3.address, coin.rangeStart, coin.rangeEnd)
		// remove transfered coin from local db
    console.log(res)
    const coinStore = new CoinStore(this.props.web3)
    const addressStore = await coinStore.init()
    await coinStore.remove(addressStore, coin)
	}

  getCoins = async (count) => {
    //optimistic
    console.log(count)
    const coinStore = new CoinStore(this.props.web3)
    const addressStore = await coinStore.init()
    let keys = await coinStore.getAllKeys(addressStore)
    for(var i=0; i<keys.length; i++) {
      let value = await coinStore.get(addressStore, keys[i])
      let range = parseInt(value.rangeEnd) - (value.rangeStart)
      if(count === range) {
        return value
      }
    }
    return false
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