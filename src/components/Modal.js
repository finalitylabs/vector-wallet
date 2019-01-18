import React, {Component} from 'react';

class Modal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			amount: 0,
		}
	}

	render() {
		return(
			<div className="modal">
				<div className="main">
					<h1>{this.props.name}</h1>
					<form onSubmit={this.props.CTA}>
						<label>Amount: </label>
						<input type="text"/>
						<input type="submit" value={this.props.name}/>
					</form>
				</div>
				<div onClick={this.props.close} className="blackground"/>
			</div>
		)
	}
}

export default Modal;