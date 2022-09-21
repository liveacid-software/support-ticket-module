import axios from 'axios';
import React, { Component } from 'react';

import TicketForm from './TicketForm';

class SupportTicket extends Component {
	constructor(props) {
		super(props);
		this.state = { error: false, message: null, submitted: false};
	}

	componentDidMount() {
	}

	submitTicket = async (plane) => {
		await axios.post('/api/planes', { ...plane, tail_number: plane.tailNumber });
	};

	onSubmit = async (data) => {
		console.log("SUPPORT TICKET DATA: ", data);
		try {
			const {
				data: { userInfo, success },
			} = await axios.post('/supportticket/submit', { ...data });
			if (success) {
				console.log("Success!");
				this.setState({error: false, submitted: true});
			} else this.setState({error: true});
		} catch (err) {
			console.log("error: ", err);
			this.setState({error: true});
		}
	};

	render() {
		const {
			error,
			submitted,
		} = this.state;

		return (
			<div>
				{ !submitted ? <TicketForm onSubmit={this.onSubmit} error={error} /> : <p>Submitted Thanks!</p> }
			</div>
		);
	}
}

export default SupportTicket;
