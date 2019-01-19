// TODO: Create Web3 wrapper that all settings initialzed and contract instances exported
import Web3 from 'web3';

export default class Web3Wrapper {
	constructor() {
		this.metamaskInstalled = null;
		this.provider = null;
		this.account = null;
		this.loggedIn = null;
		this.network = null;
		this.ETHBalance = null;
		this.accountShort = null;
	}
	
	init = async (provider) => {
		if (provider) {
			this.metamaskInstalled = true;
			this.provider = provider;
			this.web3 = new Web3(provider);
			return new Promise(async resolve => {
				await this.getAndSetUserData();
				resolve();
			})
		} else {
			this.metamaskInstalled = false;
		}
	}

	getAndSetUserData = () => {
		return new Promise(async resolve => {
			const accounts = await this.web3.eth.getAccounts();
			this.loggedIn = accounts.length ? true : false;
			
			if (this.loggedIn === false) {
				this.enableWallet(this.provider);
			}

			this.address = this.loggedIn ? accounts[0] : null;
			this.trimmedAddress = this.address ? this.trimAddress(this.address) : null;
			this.network = await this.web3.eth.net.getId()

			if (this.address) {
				this.ETHBalance = await this.getBalance(this.address)
				// TODO: get the VETH address contract instance and balance
			}
			resolve();
		})
	}

	getBalance = (address) => {
		return new Promise(async resolve => {
			const balance = (await this.web3.eth.getBalance(address)) / ( 10 ** 18 )
			resolve(balance);
		});
	}

	enableWallet = (provider) => {
		return new Promise(async resolve => {
			try {
				await provider.enable();
				resolve(true);
			} catch {
				resolve(false);
			}
		})
	}

 	trimAddress = (address) => {
		const firstChars = address.substr(0, 5);
		const lastChars = address.substr(address.length - 6, address.length - 1);
		const trimmedAddress = firstChars + "..." + lastChars;
		return trimmedAddress;
	}
}