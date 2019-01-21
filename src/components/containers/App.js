import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Header from "./../views/Header";
import Footer from './../views/Footer';
import WalletUI from "./WalletUI";
import Web3Wrapper from "./../wrappers/Web3Wrapper";
import Web3CheckModal from './../modals/Web3CheckModal';
import Withdrawals from "./../views/Withdrawals";
import { NETWORK } from "./../../constants";
import VectorClient from "vector-client";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: new Web3Wrapper(),
      initCompleted: false
    }
    this.init();

  }
  web3Check = () => {
    const metamaskInstalled = this.state.web3.metamaskInstalled;
		const loggedIn = this.state.web3.loggedIn;
    const correctNetwork = this.state.web3.network === NETWORK;
    
    return metamaskInstalled && loggedIn && correctNetwork;
  }
  init = async () => {
    const provider = window.ethereum 
    ? 
    window.ethereum : window.web3 
    ? 
    window.web3 : null;

    let vector = new VectorClient(this.state.web3)
    await this.state.web3.init(provider);
    let vBalance = await vector.getBalance(this.state.web3.address)

    if (provider !== null) {
      this.watchForAccountChange(provider);
      await this.state.web3.enableWallet(provider);
      this.setState({
        web3: this.state.web3,
        vector: vector,
        initCompleted: true,
        vBalance: vBalance
      });
    } else {
      this.setState({initCompleted: true});
    }

  }

  watchForAccountChange = (provider) => {
		provider.on("accountsChanged", async accounts => {
			if (accounts[0]) {
				await this.state.web3.getAndSetUserData();
			} else {
				await this.state.web3.enableWallet();
				await this.state.web3.getAndSetUserData();
      }
      this.setState({
        web3: this.state.web3
      })
		})
	}
  
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <>
            <Header web3={this.state.web3} />
            <Switch>
              <Route exact path="/withdrawals" render={() => <Withdrawals />}/>
              <Route exact path="/" render={() => <WalletUI web3={this.state.web3} vBalance={this.state.vBalance} vector={this.state.vector}/>}/>
            </Switch>
          </>
        </BrowserRouter>
        <Footer />
        {
          (!this.web3Check() && this.state.initCompleted) && <Web3CheckModal web3={this.state.web3} />
        }
      </div>
    );
  }
}

export default App;
