import React, { Component } from 'react';
import Header from "./../views/Header";
import WalletUI from "./WalletUI";
import Web3Wrapper from "./../wrappers/Web3Wrapper";
import Web3CheckModal from './../modals/Web3CheckModal';
import { NETWORK } from "./../../constants";
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

    await this.state.web3.init(provider);
    if (provider !== null) {
      this.watchForAccountChange(provider);
      await this.state.web3.enableWallet(provider);
      this.setState({web3: this.state.web3, initCompleted: true});
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
        <Header web3={this.state.web3} />
        <WalletUI web3={this.state.web3} />
        {
          (!this.web3Check() && this.state.initCompleted) && <Web3CheckModal web3={this.state.web3} />
        }
      </div>
    );
  }
}

export default App;
