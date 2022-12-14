import axios from 'axios';
import React, { Component } from 'react';

import TicketForm from './TicketForm';

class SupportTicket extends Component {
	constructor(props) {
		super(props);
		
		this.state = { 
			error: false, 
			message: null, 
			submitted: false, 
			api: props.apiPath ? props.apiPath : '/api/supportticket/submit'
		};
		// console.log("API  ENDPOINT PROPS: ", props);
	}

	componentDidMount() {
	}

	onSubmit = async (data) => {
		console.log("SUPPORT TICKET DATA: ", data);
		try {
			const {
				data: { userInfo, success },
			} = await axios.post(this.state.api, { ...data });
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
			<div className='card'>
				<div className='card-body login-card-body'>
				 	<p className='login-box-msg'>Have an Issue? Submit a support ticket to <a href="https://liveacid.com">LiveACID Software</a></p>
					{ !submitted ? <TicketForm onSubmit={this.onSubmit} error={error} /> : <p>Submitted Thanks!</p> }
				</div>
			</div>
		);
	}
}

export default SupportTicket;
