import React, { useContext } from 'react';
import NoteItem from './NoteItem';

import NotefulContext from './NotefulContext';

const Note = props => {
	const context = useContext(NotefulContext);
	const { notes } = context;

	// console.log('Note props = ', JSON.stringify(props));
	// console.log('Note params = ', props.match.params);
	// console.log('Note note id = ', props.match.params.noteId);

	// QUESTION
	// reloading the browser wipes the context from memory
	// so need to handle if user reloads the browser and its undefined
	const note = notes.find(note => note.id == props.match.params.noteId) || {};

	return (
		<article>
			<div className="note">
				<NoteItem note={note} togglePopup={props.togglePopup} />
				<p className="note-content">{note.content}</p>
			</div>
		</article>
	);
};

export default Note;
