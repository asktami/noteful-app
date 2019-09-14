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
		folderId: this.props.location.state.folderId || '', // use selected folderId passed in via NavLink
		name: '',
		content: '',
		errors: {
			folderId:
				!this.props.location.state.folderId && 'You must select a folder', // error only if no folderId passed in via NavLink
			name: 'You must enter a note title',
			content: 'You must enter a description'
		}
	};

	// to see addNote apiError in ui:
	/*
	state = {
		apiError: 'addNote apiError errorMessage',
		...
	*/

	updateErrorCount = () => {
		let errors = this.state.errors;
		let count = 0;

		Object.values(errors).forEach(val => {
			if (val.length > 0) {
				count++;
			}
		});

		this.setState({ errorCount: count });
		let valid = count === 0 ? true : false;
		this.setState({ formValid: valid });
	};

	validateField = (name, value) => {
		let err = '';

		if (name === 'name') {
			if (value.length === 0) {
				err = 'Note title is required';
			} else if (value.length < 3) {
				err = 'Note title must be at least 3 characters long';
			}
		}

		if (name === 'folderId') {
			if (value.length === 0) {
				err = 'You must select a folder';
			}
		}

		if (name === 'content') {
			if (value.length === 0) {
				err = 'You must enter a description';
			} else if (value.length < 5) {
				err = 'The description must be at least 5 characters long';
			}
		}

		const { errors } = { ...this.state };
		errors[name] = err;
		this.setState({ errors });
	};

	handleChange = event => {
		const { name, value } = event.target;
		this.setState({ [name]: value.trim() });

		this.validateField(name, value.trim());
		this.updateErrorCount();
	};

	handleClickCancel = () => {
		this.props.history.push('/');
	};

	handleSubmit = e => {
		e.preventDefault();
		// this.updateErrorCount();

		// do NOT submit form if any errors
		if (this.state.errorCount > 0) return;

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
				// clear form values
				folderId.value = '';
				name.value = '';
				content.value = '';

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

		// selected folderId passed in via NavLink:
		// console.log(
		// 	'AddNote props.location.state.folderId = ',
		// 	this.props.location.state.folderId
		// );

		if (this.state.apiError) {
			return <p class="error">{this.state.apiError}</p>;
		}

		return (
			<form onSubmit={this.handleSubmit}>
				<fieldset>
					<legend>New Note</legend>
					<label htmlFor="folderId">Folder</label>
					<select
						id="folderId"
						name="folderId"
						required
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
					{errors.folderId.length > 0 && (
						<ValidationError message={errors.folderId} />
					)}
					<label htmlFor="name">Title</label>
					<input
						type="text"
						id="name"
						name="name"
						onChange={this.handleChange}
					/>
					{errors.name.length > 0 && <ValidationError message={errors.name} />}
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
						disabled={this.state.formValid === false}
					>
						Save Note
					</button>
				</fieldset>

				{this.state.errorCount !== null ? (
					<p className="form-status">
						Form is {this.state.formValid ? 'complete  ✅' : 'incomplete  ❌'}
					</p>
				) : null}
			</form>
		);
	}
}

export default AddNote;
