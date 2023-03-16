import { Field, Form, Formik } from 'formik';
import React from 'react';

const TicketForm = ({ onSubmit, error }) => {
	const hiddenFileInput = React.useRef(null);

	const handleClick = e => {
		hiddenFileInput.current.click();
	};

	return (
		<Formik initialValues={{ subject: '', body: '', files: [] }} onSubmit={onSubmit}>
			{({ values, setFieldValue }) => (
				<Form>
					{/*  SUBJECT AND DESCRIPTION  */}
					<div className='form-group'>
						<Field type='text' name='subject' placeholder='Subject' className='form-control input-field' />
					</div>
					<div className='form-group'>
						<Field as='textarea' name='body' placeholder='Describe issue' className='form-control input-field' />
					</div>
					{/*  FILE SELECT  */}
					<Field name='files' type='hidden' />
					<div className='form-group' style={{ display: 'flex', flexWrap: 'wrap' }}>
						<div style={{ width: 'auto', marginRight: '8px' }}>
							<input hidden id='files' ref={hiddenFileInput} name='files' type='file' onChange={(e) => {
								if (!values.files || !Array.isArray(values.files) || e.currentTarget.files.length == 0) return;
								const oldFiles = values.files;
								const newData = oldFiles?.concat(e.currentTarget.files[0]);
								setFieldValue('files', newData);
							}} />
							<button type='button' className='form-control' onClick={handleClick}>
								<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M14.86 5.64222L6.04438 14.4608C5.6437 14.8758 5.42204 15.4315 5.42714 16.0083C5.43224 16.5852 5.6637 17.1369 6.07166 17.5448C6.47962 17.9526 7.03144 18.1839 7.60827 18.1888C8.18511 18.1937 8.74079 17.9719 9.15565 17.5711L17.9703 8.75155C18.3905 8.34566 18.7257 7.86015 18.9563 7.32333C19.1869 6.78652 19.3083 6.20915 19.3134 5.62492C19.3185 5.0407 19.2071 4.46131 18.9859 3.92057C18.7647 3.37982 18.438 2.88856 18.0248 2.47543C17.6117 2.06231 17.1204 1.73559 16.5797 1.51436C16.0389 1.29312 15.4596 1.1818 14.8753 1.18687C14.2911 1.19195 13.7137 1.31333 13.1769 1.54393C12.6401 1.77453 12.1546 2.10973 11.7487 2.52997L2.9331 11.3446C1.69536 12.5823 1 14.2611 1 16.0115C1 17.7619 1.69536 19.4407 2.9331 20.6784C4.17084 21.9162 5.84958 22.6115 7.60002 22.6115C9.35045 22.6115 11.0292 21.9162 12.2669 20.6784L23 10" stroke="#71717A"/>
								</svg>
							</button>
						</div>
						{/*  FILE PREVIEWS  */}
						{values.files && Array.isArray(values.files) && values.files.map(file =>
							<button 
								type='button'
								className='form-control' 
								style={{ width: 'auto', marginRight: '8px', marginBottom: '8px' }} 
								id={'file' + file.name}
								onClick={e => {
									const newFiles = values.files;
									const index = newFiles.findIndex(f => f.name === file.name)
									newFiles.splice(index, 1);
									setFieldValue('files', newFiles);
								}}
							>
								✕ &nbsp; {file.name}
							</button>
						)}
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
					</div>
					{/*  SUBMIT  */}
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
	)
};

export default TicketForm;
