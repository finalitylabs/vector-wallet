import React, { Component } from 'react';
import Header from "./../views/Header";
import WalletUI from "./WalletUI";
import Web3Wrapper from "./../wrappers/Web3Wrapper";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: new Web3Wrapper()
    }
    this.init();

  }


  init = async () => {
    const provider = window.ethereum 
    ? 
    window.ethereum : window.web3 
    ? 
    window.web3 : "http://localhost:8545";

    this.state.web3.init(provider);
    await this.state.web3.enableWallet(provider);
    this.watchForAccountChange(provider);
    this.setState({web3: this.state.web3});
  }

  watchForAccountChange = (provider) => {
		provider.on("accountsChanged", async accounts => {
			if (accounts[0]) {
				await this.state.web3.getAndSetUserData();
			} else {
				await this.state.web3.enableWallet();
				await this.state.web3.getAndSetUserData();
      }
      this.setState({web3: this.state.web3})
		})
	}
  
  render() {
    console.log("app rerendered")
    return (
      <div className="App">
        <Header web3={this.state.web3}/>
        <WalletUI/>
      </div>
    );
  }
}

export default App;
