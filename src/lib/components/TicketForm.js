import { Field, Form, Formik } from 'formik';
import React from 'react';

const TicketForm = ({ onSubmit, error }) => (
	<Formik initialValues={{ subject: '', body: '', files: [] }} onSubmit={onSubmit}>
		{({ values, setFieldValue }) => (
		<Form>
			<Field name='files' type='hidden' />
			<div className='form-group'>
				<Field type='text' name='subject' placeholder='Subject' className='form-control input-field' />
			</div>
			<div className='form-group'>
				<Field as='textarea' name='body' placeholder='Describe issue' className='form-control input-field' />
			</div>
			<div className='form-group'>
				<input hidden id="files" name="files" type="files" onChange={(e) => {
					if (!values.files || values.files.length == 0) return;
					setFieldValue("files", values.files.push.apply(values.files, e.currentTarget.files));
				}} />
				<label for="files">Upload Files</label>
				{values.files ? values.files.forEach(file => {
					<span id="file-chosen">{file.name} X</span>
				}) : null}
			</div>
			<div className='form-group'>
				<Field as='select' name='priority' className='form-control'>
					<option value=''>Priority Level</option>
					<option value="emergency">Emergency</option>
					<option value="high">High</option>
					<option value="medium">Medium</option>
					<option value="low">Low</option>
				</Field>
			</div>

			<button
				type='submit'
				className='btn btn-lg btn-inreach btn-block btn-bordred btn-flat sign-up-btn sign-in-btn'
			>
				Submit
			</button>
			{error && <div className='alert alert-danger'>Sorry something went wrong. Please fill out all fields and try again.</div>}
		</Form>
		)}
	</Formik>
);

export default TicketForm;
