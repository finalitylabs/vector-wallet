import React, {Component} from 'react';
import { 
	NETWORK,
	WRONG_NETWORK_HEADER,
	WRONG_NETWORK_BODY,
	METAMASK_NOT_INSTALLED_HEADER,
	METAMASK_NOT_INSTALLED_BODY,
	METAMASK_NOT_LOGGED_IN_HEADER,
	METAMASK_NOT_LOGGED_IN_BODY,
	UNEXPECTED_ERROR_HEADER,
	UNEXPECTED_ERROR_BODY,
} from './../../constants';


class Web3CheckModal extends Component {
	
	render() {
		const metamaskInstalled = this.props.web3.metamaskInstalled;
		const loggedIn = this.props.web3.loggedIn;
		const network = this.props.web3.network

		return(
			<div className="modal">
				<div className="main">
					<h1>{
						!metamaskInstalled ? METAMASK_NOT_INSTALLED_HEADER :
						!loggedIn ? METAMASK_NOT_LOGGED_IN_HEADER : 
						network !== NETWORK ? WRONG_NETWORK_HEADER :
						UNEXPECTED_ERROR_HEADER
					}</h1>
					<p>
					{
						!metamaskInstalled ? <> <span>{METAMASK_NOT_INSTALLED_BODY}</span> <a href='https://metamask.io/' >https://metamask.io/</a> </> :
						!loggedIn ? METAMASK_NOT_LOGGED_IN_BODY : 
						network !== NETWORK ? WRONG_NETWORK_BODY :
						UNEXPECTED_ERROR_BODY
					}
					</p>
				</div>
				<div className="blackground"/>
			</div>
		)
	}
}

export default Web3CheckModal;