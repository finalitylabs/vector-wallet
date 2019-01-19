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
    const provider = window.web3 ? window.web3 : "http://localhost:8545";
    await this.state.web3.init(provider)
    this.setState({web3: this.state.web3})
    console.log(this.state.web3)
  }
  
  render() {
    return (
      <div className="App">
        <Header web3={this.state.web3}/>
        <WalletUI/>
      </div>
    );
  }
}

export default App;
