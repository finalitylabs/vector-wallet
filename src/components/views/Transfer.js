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

    let _amt = Math.ceil(parseFloat(this.state.amount)*100)
    let coin = await this.getCoins(_amt)
    if(coin.value === false) {
      console.log('No coin matching amount found')
      return
    }
    console.log(coin)

    if(coin.offset === 0) {
      console.log('no remainder coin')
      let res = await this.props.vector.transfer(_amt, [coin.value.block], this.state.to, this.props.web3.address, coin.index)
      // remove transfered coin from local db
      console.log(res)
      const coinStore = new CoinStore(this.props.web3)
      const addressStore = await coinStore.init()
      await coinStore.remove(addressStore, coin.value)

    } else {
      console.log('remainder coin generated')
      let newRangeStart = coin.value.rangeEnd - coin.offset
      let res
      res = await this.props.vector.transfer(_amt, coin.blocks, this.state.to, this.props.web3.address, coin.index)
      let newCoin = {rangeStart:newRangeStart, rangeEnd:coin.rangeEnd, block:res.block, index:[[newRangeStart, coin.value.rangeEnd]]}
      console.log(newCoin)

      for(var i=0; i<coin.index.length; i++) {
        //remove spent coins
        const coinStore = new CoinStore(this.props.web3)
        const addressStore = await coinStore.init()
        console.log('deleting')
        await coinStore.remove(addressStore, {rangeStart:coin.index[i][0]})
      }

      // add new coin to db
      const coinStore = new CoinStore(this.props.web3)
      const addressStore = await coinStore.init()
      console.log('adding remainder coins')
      await coinStore.add(addressStore, newCoin)
    }    
	}

  getCoins = async (count) => {
    //optimistic
    console.log(count)
    const coinStore = new CoinStore(this.props.web3)
    const addressStore = await coinStore.init()
    let keys = await coinStore.getAllKeys(addressStore)
    // TODO, better clientside accounting

    // first check to see if there is a matching ranged coin
    for(var i=0; i<keys.length; i++) {
      let value = await coinStore.get(addressStore, keys[i])
      let range = parseInt(value.rangeEnd) - (value.rangeStart)
      if(count === range) {
        return {value:value, offset:0, index:[[value.rangeStart, value.rangeEnd]]}
      }
    }

    // else combine or split to get to transfer value
    let total = 0
    let combinedKeys = []
    let b = []
    for(var i=0; i<keys.length; i++) {
      let value = await coinStore.get(addressStore, keys[i])
      let range = parseInt(value.rangeEnd) - (value.rangeStart)
      total = total + range
      b.push(value.block)
      console.log(total)
      combinedKeys.push([value.rangeStart, value.rangeEnd])
      if(total >= count) {
        let off = total - count
        combinedKeys[combinedKeys.length-1][1] = combinedKeys[combinedKeys.length-1][1] - off
        console.log(off)
        return {value: value, total:total, index:combinedKeys, offset:off, rangeEnd:value.rangeEnd, blocks: b}
      }

    }
    return {value:false}
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