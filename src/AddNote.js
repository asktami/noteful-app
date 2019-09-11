import React from 'react';
import config from './config';

import NotefulContext from './NotefulContext';

class AddNote extends React.Component {
	static contextType = NotefulContext;

	state = {
		formValid: false,
		errorCount: null,
		error: null,
		folderId: '',
		name: '',
		content: '',
		errors: {
			folderId: '',
			name: '',
			content: ''
		}
	};

	handleChange = event => {
		const { name, value } = event.target;

		console.log('this.state = ', this.state);

		console.log('---- in AddNote, handleChange ----');
		console.log('--------e = ', event.target);
		console.log('--------e name = ', name);
		console.log('--------e value = ', value);

		this.setState({ [name]: value.trim() });

		console.log('this.state = ', this.state);
	};

	handleClickCancel = () => {
		this.props.history.push('/');
	};

	handleSubmit = e => {
		e.preventDefault();

		// TO DO - make sure folderId, name and content are not blank or an empty string

		// get the form fields from the event
		const { folderId, name, content } = e.target;
		const note = {
			folderId: folderId.value,
			name: name.value,
			content: content.value,
			modified: new Date()
		};
		this.setState({ error: null });

		console.log('config.API_NOTES = ', config.API_NOTES);

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
				this.setState({ error });
			});
	};

	render() {
		console.log('AddNote props = ', this.props);
		console.log('AddNote context folders = ', this.context.folders);
		const folders = this.context.folders;

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
					<textarea
						id="content"
						name="content"
						onChange={this.handleChange}
					></textarea>
					<br />
					<button className="btn-cancel" onClick={this.handleClickCancel}>
						Cancel
					</button>{' '}
					<button className="btn-save">Save Note</button>
				</fieldset>
			</form>
		);
	}
}

export default AddNote;

// AddNote.defaultProps = {
// 	modified: new Date().toLocaleTimeString()
// };
