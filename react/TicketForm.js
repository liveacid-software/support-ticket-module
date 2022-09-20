import { Field, Form, Formik } from 'formik';
import React from 'react';

const TicketForm= ({ onSubmit, error }) => (
	<Formik initialValues={{ subject: '', body: '' }} onSubmit={onSubmit}>
		<Form>
			<div className='form-group'>
				<Field type='text' name='subject' placeholder='Subject' className='form-control input-field' />
			</div>
			<div className='form-group'>
				<Field as='textarea' name='body' placeholder='Describe issue' className='form-control input-field' />
			</div>

			<button
				type='submit'
				className='btn btn-lg btn-inreach btn-block btn-bordred btn-flat sign-up-btn sign-in-btn'
			>
				Submit
			</button>
			{error && <div className='alert alert-danger'>Sorry something went wrong</div>}
		</Form>
	</Formik>
);

export default TicketForm;
