import React from 'react';
import config from './config';

import NotefulContext from './NotefulContext';

import ValidationError from './ValidationError';

class AddNote extends React.Component {
	static contextType = NotefulContext;

	state = {
		apiError: null,
		formValid: false,
		errorCount: null,
		errorMessage: null,
		folderId: '',
		name: '',
		content: '',
		errors: {
			folderId: '',
			name: '',
			content: ''
		}
	};

	updateErrorCount = () => {
		let errors = this.state.errors;

		let errMsg =
			this.state.errorMessage === null ? '' : this.state.errorMessage;

		let count = 0;

		console.log('updateErrorCount errors = ', errors);

		Object.values(errors).forEach(val => {
			console.log('updateErrorCount errors VAL = ', val);
			if (val.length > 0) {
				count++;
				errMsg += `<br />${val}`;
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
		}

		// folderId
		if (name === 'folderId') {
			if (value.length === 0) {
				err = 'You must select a folder';
			}
		}

		// content
		if (name === 'content') {
			if (value.length === 0) {
				err = 'You enter a note';
			} else if (value.length < 5) {
				err = 'The note must be at least 5 characters long';
			}
			this.setState({
				errors: { [name]: err }
			});
		}

		// setValues({ ...values, [name]: { value: value.trim(), touched: true } });

		// this.setState({ errors: { [name]: err } });

		// this.setState({
		// 	errors: { [name]: err }
		// });
	};

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value.trim() });

		this.validateField(name, value);
		this.updateErrorCount();
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

		// TO DO - make sure folderId, name and content are not blank or an empty string

		// get the form fields from the event
		const { folderId, name, content } = e.target;
		const note = {
			folderId: folderId.value,
			name: name.value,
			content: content.value,
			modified: new Date()
		};
		this.setState({ apiError: null });

		fetch(config.API_NOTES, {
			method: 'POST',
			body: JSON.stringify(note),
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
				this.context.addNote(data);
				// return to list:
				this.props.history.push('/');
			})
			.catch(error => {
				this.setState({ apiError: error });
			});
	};

	render() {
		const { errors } = this.state;
		const folders = this.context.folders;

		console.log('AddNote props = ', this.props);
		console.log('AddNote context folders = ', this.context.folders);
		console.log('this.state. = ', this.state);
		console.log('errors = ', errors);
		console.log('errCount = ', this.state.errorCount);

		console.log('errors.content.length =', errors.content.length);

		return (
			<form onSubmit={this.handleSubmit}>
				<fieldset>
					<legend>New Note</legend>
					<label htmlFor="folderId">Folder</label>
					<select
						id="folderId"
						name="folderId"
						value={this.state.folderId}
						onChange={this.handleChange}
					>
						<option value="">Select a folder</option>
						{folders.map(folder => (
							<option key={folder.id} value={folder.id}>
								{folder.name}
							</option>
						))}
					</select>
					<label htmlFor="name">Title</label>
					<input
						type="text"
						id="name"
						name="name"
						onChange={this.handleChange}
					/>
					<label htmlFor="content">Description</label>
					<textarea id="content" name="content" onChange={this.handleChange} />
					{errors.content.length > 0 && (
						<ValidationError message={errors.content} />
					)}
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
						Save Note
					</button>
				</fieldset>

				{this.state.errorCount !== null ? (
					<p className="form-status">
						Form is {this.state.formValid ? 'valid ✅' : 'invalid ❌'}
						<br />
						{this.state.errorMessage}
					</p>
				) : null}
			</form>
		);
	}
}

export default AddNote;

// AddNote.defaultProps = {
// 	modified: new Date().toLocaleTimeString()
// };
