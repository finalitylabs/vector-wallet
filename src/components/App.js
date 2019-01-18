import React, { Component } from 'react';
import Header from "./Header";
import WalletUI from "./WalletUI";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <WalletUI/>
      </div>
    );
  }
}

export default App;
