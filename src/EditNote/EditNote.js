import React from 'react';
import config from '../config';

import NotefulContext from '../NotefulContext';

import ValidationError from '../ValidationError';

class EditNote extends React.Component {
	static contextType = NotefulContext;

	state = {
		apiError: null,
		formValid: true,
		errorCount: null,
		id: '',
		folderId: '',
		name: '',
		content: '',
		errors: {
			folderId: '',
			name: '',
			content: ''
		}
	};

	// to see addNote apiError in ui:
	/*
	state = {
		apiError: 'addNote apiError errorMessage',
		...
	*/

	// get note to be updated
	componentDidMount() {
		const { noteId } = this.props.match.params;
		fetch(config.NOTES_ENDPOINT + `/${noteId}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${config.API_KEY}`
			}
		})
			.then(res => {
				if (!res.ok) return res.json().then(error => Promise.reject(error));

				return res.json();
			})
			.then(responseData => {
				this.setState({
					id: responseData.id,
					name: responseData.name,
					folderId: responseData.folderId,
					content: responseData.content
				});
			})
			.catch(error => {
				console.error(error);
				this.setState({ apiError: error });
			});
	}

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
		this.setState({ [name]: value });

		this.validateField(name, value);
		this.updateErrorCount();
	};

	handleClickCancel = () => {
		this.props.history.push('/');
	};

	resetFields = newFields => {
		this.setState({
			id: newFields.id || '',
			name: newFields.name || '',
			content: newFields.content || '',
			folderId: newFields.folderId || ''
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		// this.updateErrorCount();

		// do NOT submit form if any errors
		if (this.state.errorCount > 0) return;

		// get the form fields to be updated
		const { noteId } = this.props.match.params;
		// QUESTION - why doesn't it update MODIFIED?
		const newNote = {
			id: this.state.id,
			folderId: this.state.folderId,
			name: this.state.name,
			content: this.state.content,
			modified: new Date().toLocaleDateString('en-US', {
				timeZone: 'America/New_York'
			})
		};

		this.setState({ apiError: null });

		fetch(config.NOTES_ENDPOINT + `/${noteId}`, {
			method: 'PATCH',
			body: JSON.stringify(newNote),
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${config.API_KEY}`
			}
		})
			.then(res => {
				if (!res.ok) return res.json().then(error => Promise.reject(error));
			})
			.then(() => {
				this.resetFields(newNote);
				this.context.updateNotes(newNote);
				this.props.history.push('/');
			})
			.catch(error => {
				console.error(error);
				this.setState({ apiError: error });
			});
	};

	render() {
		const { errors, name, content, folderId } = this.state;
		const folders = this.context.folders;

		// selected folderId passed in via NavLink:
		// console.log(
		// 	'EditNote props.location.state.folderId = ',
		// 	this.props.location.state.folderId
		// );

		if (this.state.apiError) {
			return <p className="error">{this.state.apiError}</p>;
		}

		return (
			<form onSubmit={this.handleSubmit}>
				<input type="hidden" name="id" />
				<fieldset>
					<legend>Edit Note</legend>
					<label htmlFor="folderId">Folder</label>
					<select
						id="folderId"
						name="folderId"
						aria-label="Folder Id"
						required
						aria-required="true"
						aria-describedby="folderIdError"
						aria-invalid="true"
						value={folderId}
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
						<ValidationError id={'folderIdError'} message={errors.folderId} />
					)}
					<label htmlFor="name">Title</label>
					<input
						type="text"
						id="name"
						name="name"
						value={name}
						onChange={this.handleChange}
						aria-label="Note Title"
						required
						aria-required="true"
						aria-describedby="noteTitleError"
						aria-invalid="true"
					/>
					{errors.name.length > 0 && (
						<ValidationError id={'noteTitleError'} message={errors.name} />
					)}
					<label htmlFor="content">Description</label>
					<textarea
						id="content"
						name="content"
						value={content}
						onChange={this.handleChange}
						aria-label="Note Description"
						required
						aria-required="true"
						aria-describedby="noteDescriptionError"
						aria-invalid="true"
					/>
					{errors.content.length > 0 && (
						<ValidationError
							id={'noteDescriptionError'}
							message={errors.content}
						/>
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

export default EditNote;
