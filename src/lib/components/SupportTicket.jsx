import axios from 'axios';
import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap'
import TicketForm from './TicketForm';

class SupportTicket extends Component {
	constructor(props) {
		super(props);

		this.state = {
			error: false,
			message: null,
			submitted: false,
			loading: false,
			api: props.apiPath ? props.apiPath : '/api/supportticket/submit'
		};
		// console.log("API  ENDPOINT PROPS: ", props);
	}

	componentDidMount() {
	}

	onSubmit = async (data) => {
		console.log("SUPPORT TICKET DATA: ", data);
		this.setState({ ...this.state.api, loading: true })
		try {

			const formData = new FormData();
			formData.append('subject', data.subject);
			formData.append('body', data.body);
			formData.append('priority', data.priority);
			formData.append('files', data.files);
		
			const { data: { userInfo, success }} = await axios.post(this.state.api, formData);
			if (success) {
				console.log("Success!");
				this.setState({ error: false, submitted: true, loading: false });
			} else this.setState({ error: true });
		} catch (err) {
			console.log("error: ", err);
			this.setState({ error: true, loading: false });
		}
	};

	render() {
		const {
			error,
			submitted,
			loading
		} = this.state;

		return (
			<div className='card'>
				<div className='card-body login-card-body'>
					<p className='login-box-msg'>Have an Issue? Submit a support ticket to <a href="https://liveacid.com">LiveACID Software</a></p>
					{loading && (
						<Spinner animation="border" role="status">
							<span className="visually-hidden">Loading...</span>
						</Spinner>
					)}

					{!loading && (
						<>
							{!submitted && (
								<TicketForm onSubmit={this.onSubmit} error={error} />
							)}
							{submitted && (
								<p>Submitted Thanks!</p>

							)}
						</>
					)}

				</div>
			</div>
		);
	}
}

export default SupportTicket;
