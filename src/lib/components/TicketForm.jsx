import { Field, Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import * as Yup from 'yup';

const TicketForm = ({ onSubmit, error, setFiles }) => {
	const hiddenFileInput = useRef(null);
	const [errorMessage, setErrorMessage] = useState('');
	const [selectedFiles, setSelectedFiles] = useState([]);

	const handleClick = e => {
		hiddenFileInput.current.click();
	};

	const addFile = async (filePicker, values, setFieldValue) => {
		
		if (!values.files || filePicker.currentTarget.files.length == 0) return;
		const files = filePicker.currentTarget.files;
		
		if (files.length > 1 || (selectedFiles.length + files.length) > 1) {
			setErrorMessage('I am sorry but you can only upload one file at a time.');
			return;
		} else { setErrorMessage(''); }

		if (!validateFile(files)) {
			setErrorMessage('The selected file type is invalid.');
			return;
		} else { setErrorMessage(''); }

		const maxSizeInBytes = 1048576; // 5MB (adjust as needed)
		if (files[0].size > maxSizeInBytes) {
		  setErrorMessage('File size exceeds the maximum allowed limit.');
		  return;
		}

		setSelectedFiles((prevSelectedFiles) => [
			...prevSelectedFiles,
			...Array.from(files),
		]);

		setFieldValue('files', files);
		setFiles(filePicker.currentTarget.files)

		console.log('***** got here *****',)


	}

	const validateFile = (files) => {
		let allowedExtensions =
			/(\.jpg|\.jpeg|\.png|\.gif|\.svg|\.log|\.docx|\.xlsx|\.pptx|\.txt|\.pdf|\.zip|\.gz|\.tgz|\.mp4|\.mov|\.webm)$/i;

		for (let i = 0; i < selectedFiles.length; i++) {
			const file = files[i];
			if (!allowedExtensions.exec(file.name)) {
				setErrorMessage('Invalid File Type');
				return false;
			}
		}
		return true
	}

	const handleRemove = (index) => {
		setSelectedFiles((prevSelectedFiles) =>
			prevSelectedFiles.filter((_, i) => i !== index)
		);
	};

	const SupportTicketSchema = Yup.object().shape({
		subject: Yup.string()
			.min(2, 'Too Short!')
			.max(50, 'Too Long!')
			.required('Subject is required'),
		body: Yup.string()
			.required('Description is required'),
		priority: Yup.string()
			.required('Priority is required'),
	});

	return (
		<Formik initialValues={{ subject: '', body: '', priority: '', files: [] }} onSubmit={onSubmit} validationSchema={SupportTicketSchema}>
			{({ values, setFieldValue, errors, touched }) => (
				<Form>
					{/*  SUBJECT AND DESCRIPTION  */}
					<div className='form-group'>
						<Field type='text' name='subject' placeholder='Subject' max={50} className='form-control input-field' />
						{touched.subject && errors.subject && <div style={{ color: 'red' }}>{errors.subject}</div>}
					</div>
					<div className='form-group'>
						<Field as='textarea' name='body' placeholder='Describe issue' className='form-control input-field' />
						{touched.body && errors.body && <div style={{ color: 'red' }}>{errors.body}</div>}
					</div>
					{/*  FILE SELECT  */}
					<Field name='files' type='hidden' />
					<div className='form-group' style={{ display: 'flex', flexWrap: 'wrap' }}>
						<div style={{ width: 'auto', marginRight: '8px' }}>
							<input
								hidden
								id='files'
								ref={hiddenFileInput}
								name='files'
								type='file'
								onChange={async (e) => { addFile(e, values, setFieldValue); }}
							/>
							<button type='button' className='form-control' onClick={handleClick}>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M14.86 5.64222L6.04438 14.4608C5.6437 14.8758 5.42204 15.4315 5.42714 16.0083C5.43224 16.5852 5.6637 17.1369 6.07166 17.5448C6.47962 17.9526 7.03144 18.1839 7.60827 18.1888C8.18511 18.1937 8.74079 17.9719 9.15565 17.5711L17.9703 8.75155C18.3905 8.34566 18.7257 7.86015 18.9563 7.32333C19.1869 6.78652 19.3083 6.20915 19.3134 5.62492C19.3185 5.0407 19.2071 4.46131 18.9859 3.92057C18.7647 3.37982 18.438 2.88856 18.0248 2.47543C17.6117 2.06231 17.1204 1.73559 16.5797 1.51436C16.0389 1.29312 15.4596 1.1818 14.8753 1.18687C14.2911 1.19195 13.7137 1.31333 13.1769 1.54393C12.6401 1.77453 12.1546 2.10973 11.7487 2.52997L2.9331 11.3446C1.69536 12.5823 1 14.2611 1 16.0115C1 17.7619 1.69536 19.4407 2.9331 20.6784C4.17084 21.9162 5.84958 22.6115 7.60002 22.6115C9.35045 22.6115 11.0292 21.9162 12.2669 20.6784L23 10" stroke="#71717A" />
								</svg>
							</button>
						</div>
						{/*  FILE PREVIEWS  */}
						{selectedFiles.map((file, index) => (
							<div key={index}>
								<img
									src={URL.createObjectURL(file)}
									alt={`Preview ${index}`}
									style={{ width: '200px', height: '200px' }}
								/>
								<Button variant='danger' onClick={() => handleRemove(index)}>Remove</Button>
							</div>
						))}
					</div>
					{/*  PRIORITY SELECT  */}
					<div className='form-group'>
						<Field as='select' name='priority' className='form-control'>
							<option value=''>Priority Level</option>
							<option value='emergency'>Emergency</option>
							<option value='high'>High</option>
							<option value='medium'>Medium</option>
							<option value='low'>Low</option>
						</Field>
						{touched.priority && errors.priority && <div style={{ color: 'red' }}>{errors.priority}</div>}
					</div>
					{/*  SUBMIT  */}
					<Button
						type='submit'
						className='btn btn-lg btn-inreach btn-block btn-bordred btn-flat sign-up-btn sign-in-btn'
					>
						Submit
					</Button>
					{error &&
						<div className='alert alert-danger'>
							Sorry, something went wrong. Please fill out all fields and try again.
						</div>
					}
					{!error && errorMessage !== '' &&
						<div className='alert alert-danger'>
							{errorMessage}
						</div>
					}
				</Form>
			)}
		</Formik>
	)
};

export default TicketForm;
