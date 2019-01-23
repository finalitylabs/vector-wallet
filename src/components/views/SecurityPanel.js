import React, { Component } from 'react';
import SecurityCheck from './SecurityCheck';
import moment from 'moment';

export default class SecurityPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lastCheck: null,
			formattedTimeSinceLastCheck: null,
			moreThanWeekAgo: false
		}
	}
	async componentWillReceiveProps() {
		const securityCheck = new SecurityCheck(this.props.web3);
		const addressStore = await securityCheck.init();
		const data = await securityCheck.get(addressStore);
		const hasData = !!data;
		let lastCheck = null;
		if (!hasData) {
			// TODO: Do security check!
			
			// Add timestamp of security check to indexedDB
			await securityCheck.add(addressStore);
			const newData = await securityCheck.get(addressStore);
			lastCheck = newData.last_check_time;
		} else {
			const weekAgo = parseInt(moment().subtract(7, 'days').format('x'));
			lastCheck = data.last_check_time;

			// If the UNIX timestamp of the last security check is smaller than the timestamp of 
			// one week ago, initiate security check.
			if (lastCheck < weekAgo) {
				this.setState({ moreThanWeekAgo: true })
				// TODO: Do security check asap!
				// Fake security check
				setTimeout(() => {
					this.setState({ moreThanWeekAgo: false })
				}, 2000);
				// Put timestamp in database
				await securityCheck.put(addressStore);
				const newData = await securityCheck.get(addressStore);
				lastCheck = newData.last_check_time;
			}
		}
		this.setState({lastCheck})
	}
	render() {
		if (this.timer) {
			clearInterval(this.timer);
		}
		const { lastCheck } = this.state;
		this.timer = window.setInterval(() => {
			if (lastCheck) {
				const now = new Date().getTime();
				var ms = moment(now,"x").diff(moment(lastCheck,"x"));
				var d = moment.duration(ms);
				var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");

				this.setState({formattedTimeSinceLastCheck: s})
			}
		}, 1000)
		
		return(
			<div className="security-panel-section">
			{
				this.state.formattedTimeSinceLastCheck &&
				<>
					<p>Last security check: {this.state.formattedTimeSinceLastCheck}</p>
					<div className={`${!this.state.moreThanWeekAgo ? 'green': 'red'} pulsating-circle security-feedback`}/>
				</>
			}
			
		</div>
		)
	}
}
