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
			? notes.filter(note => note.folderId === this.props.match.params.folderId)
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
				{foldernotes.length > 0 ? (
					foldernotes.map(note => (
						<article key={note.id}>
							<div className="note">
								{/*
							{...note}
							use spread here b/c want whole note object, and get inside NoteItem via note.key
							alternative is
							note={note} and in NoteItem get via props.note.key

							QUESTION:
							pass {...this.props} so I can have the history object inside the NoteItem component to pass a new location to (as well as the location and match objects)
							*/}
								<NoteItem {...this.props} note={note} />
								{/* console.log('props', JSON.stringify(...note)) */}
							</div>
						</article>
					))
				) : (
					<article className="no-border">
						<div className="note">No notes in this folder.</div>
					</article>
				)}
			</>
		);
	}
}

export default NoteList;
