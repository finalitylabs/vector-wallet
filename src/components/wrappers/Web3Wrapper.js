// TODO: Create Web3 wrapper that all settings initialzed and contract instances exported
import Web3 from 'web3';
import { throws } from 'assert';

export default class Web3Wrapper {
	constructor() {
		this.account = null;
		this.loggedIn = null;
		this.network = null;
		this.ETHBalance = null;
		this.accountShort = null;
	}
	
	init = async (provider) => {
		this.web3 = new Web3(provider);

		return new Promise(async resolve => {
			const accounts = await this.web3.eth.getAccounts();
			this.loggedIn = accounts.length ? true : false;
			this.address = this.loggedIn ? accounts[0] : null;
			this.trimmedAddress = this.address ? this.trimAddress(this.address) : null;
			this.network = await this.web3.eth.net.getId()

			if (this.loggedIn) {
				this.ETHBalance = await this.web3.eth.getBalance(this.address)
				// TODO: get the VETH address contract instance and balance
			}
			resolve();
		})
	}

	trimAddress = (address) => {
		const firstChars = address.substr(0, 5);
		const lastChars = address .substr(address.length - 6, address.length - 1);
		const trimmedAddress = firstChars + "..." + lastChars;
		return trimmedAddress;
	}
}