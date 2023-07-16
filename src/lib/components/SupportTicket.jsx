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
			files: [],
			api: props.apiPath ? props.apiPath : '/api/supportticket/submit'
		};

	}

	componentDidMount() {
	}

	setFiles = (files) => {
		this.setState({ ...this.state, files });
	}
	onSubmit = async (data) => {
		this.setState({ ...this.state.api, loading: true })

		const formData = new FormData();
		formData.append('subject', data.subject);
		formData.append('body', data.body);
		formData.append('priority', data.priority);
		for (let i = 0; i < this.state.files.length; i++) {
			formData.append('files', this.state.files[i]);
		}
	
		return axios
			.post(this.state.api, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				withCredentials: true,
			})

			.then((results) => {
				if (results.data.success) {
					console.log("Success!");
					this.setState({ error: false, submitted: true, loading: false });
				} else this.setState({ error: true });
			}).catch((err) => {
				console.log("error: ", err);
				this.setState({ error: true, loading: false });
			})



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
								<TicketForm onSubmit={this.onSubmit} error={error} setFiles={this.setFiles} />
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
