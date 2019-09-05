import React from 'react';

import NotefulContext from './NotefulContext';

import NoteItem from './NoteItem';

class NoteList extends React.Component {
	// const contextType is needed to then say this.context
	static contextType = NotefulContext;

	render() {
		const { notes } = this.context;

		// if selected a folder, show only the notes in that folder
		// otherwise show all notes from all folders
		const foldernotes = this.props.match.params.folderId
			? notes.filter(note => note.folderId == this.props.match.params.folderId)
			: notes;

		return (
			<>
				<div className="header-container">
					<span>
						<h2>Notes</h2>
					</span>
					&nbsp;&nbsp;
					<span>
						<button className="btn-add" onClick={this.props.togglePopup}>
							+
						</button>
					</span>
				</div>

				{foldernotes.map(note => (
					<article key={note.id}>
						<div className="note">
							{/*
							{...note}
							use spread here because want whole note object
							alternative is
							note={note} and in NoteItem would need to do props.note.key vs. props.key
							*/}
							<NoteItem note={note} />
							{/* console.log('props', JSON.stringify(...note)) */}
						</div>
					</article>
				))}
			</>
		);
	}
}

export default NoteList;
