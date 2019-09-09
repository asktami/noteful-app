import React, { useContext } from 'react';

import NotefulContext from './NotefulContext';

import NoteItem from './NoteItem';

const NoteList = props => {
	// need to grab NotefulContext (globals)
	const contextType = useContext(NotefulContext);
	const { notes } = contextType;

	// if selected a folder, show only the notes in that folder
	// otherwise show all notes from all folders
	const foldernotes = props.match.params.folderId
		? notes.filter(note => note.folderId === props.match.params.folderId)
		: notes;

	return (
		<NotefulContext.Consumer>
			{context => (
				<>
					<div className="header-container">
						<span>
							<h2>Notes</h2>
						</span>
						&nbsp;&nbsp;
						<span>
							<button className="btn-add" onClick={context.togglePopup}>
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
							use spread here IF want whole note object, and get inside NoteItem via note.key
							alternative is
							note={note} and in NoteItem get via props.note.key
							*/}
									<NoteItem note={note} />
								</div>
							</article>
						))
					) : (
						<article className="no-border">
							<div className="note">No notes in this folder.</div>
						</article>
					)}
				</>
			)}
		</NotefulContext.Consumer>
	);
};

export default NoteList;
