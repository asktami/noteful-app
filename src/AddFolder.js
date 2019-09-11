import React from 'react';
import config from './config';

import NotefulContext from './NotefulContext';

import ValidationError from './ValidationError';

class AddFolder extends React.Component {
	static contextType = NotefulContext;

	state = {
		apiError: null,
		formValid: false,
		errorCount: null,
		name: '',
		errors: {
			name: ''
		}
	};

	updateErrorCount = () => {
		let errors = this.state.errors;
		let count = 0;

		Object.values(errors).forEach(val => {
			if (val.length > 0) {
				count = count + 1;
			} else {
				count = 0;
			}
		});

		this.setState({ errorCount: count });

		let valid = this.state.errorCount === 0 ? true : false;
		this.setState({ formValid: valid });
	};

	validateField = (name, value) => {
		let err = '';

		// Name
		if (name === 'name') {
			if (value.length === 0) {
				err = 'Folder name is required';
			} else if (value.length < 3) {
				err = 'Folder name must be at least 3 characters long';
			}

			this.setState({ errors: { [name]: err } });
		}
	};

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value.trim() });

		this.validateField(name, value);
		this.updateErrorCount();

		console.log('---- in AddFolder, handleChange ----');
		console.log('--------e = ', event.target);
		console.log('--------e name = ', name);
		console.log('--------e value = ', value);
	};

	handleClickCancel = () => {
		this.props.history.push('/');
	};

	handleSubmit = e => {
		e.preventDefault();
		this.updateErrorCount();

		// do NOT submit form if any errors
		if (this.state.errorCount > 0) {
			alert('Form Error');
			return;
		}

		// get the form fields from the event
		const { name } = e.target;
		const folder = {
			name: name.value
		};
		this.setState({ error: null });
		fetch(config.API_FOLDERS, {
			method: 'POST',
			body: JSON.stringify(folder),
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) {
					// get the error message from the response,
					return res.json().then(error => {
						// then throw it
						throw error;
					});
				}
				return res.json();
			})
			.then(data => {
				// best practice, clear form values by doing  = ''
				name.value = '';
				// addFolder:
				this.context.addFolder(data);
				// return to list:
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({ apiError: error });
			});
	};
	render() {
		const { errors } = this.state;

		console.log('this.state = ', this.state);
		console.log('errCount = ', this.state.errorCount);

		return (
			<form className="addFolderForm" onSubmit={this.handleSubmit}>
				<fieldset>
					<legend>New Folder</legend>
					<label htmlFor="name">Name</label>
					<input
						type="text"
						id="name"
						name="name"
						required
						aria-required="true"
						aria-invalid="true"
						onChange={this.handleChange}
					/>
					{errors.name.length > 0 && <ValidationError message={errors.name} />}
					<br />
					<button className="btn-cancel" onClick={this.handleClickCancel}>
						Cancel
					</button>{' '}
					<button
						className="btn-save"
						disabled={
							this.state.errorCount === null || this.state.formValid === false
						}
					>
						Save Folder
					</button>
				</fieldset>

				{this.state.errorCount !== null ? (
					<p className="form-status">
						Form is {this.state.formValid ? 'valid ✅' : 'invalid ❌'}
					</p>
				) : null}
			</form>
		);
	}
}

export default AddFolder;
