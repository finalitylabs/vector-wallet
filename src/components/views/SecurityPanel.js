import React from 'react';

export default (props) => {
	props = {};
	props.lastCheck = "00:00:00";
	return(
		<div className="security-panel-section">
			<p>Last security check: {props.lastCheck}</p>
			<div className="green pulsating-circle security-feedback"/>
		</div>
	)
}
