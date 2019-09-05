import React from 'react';
import NoteItem from './NoteItem';

import config from './config';
import NotefulContext from './NotefulContext';

//
// QUESTION - why get
// TypeError: Cannot read property 'context' of undefined
// when click on note title???
// error showing as on both FolderItem and Note
//

const Note = props => {
	const { notes } = this.context;

	// console.log('Note props = ', JSON.stringify(props));
	// console.log('Note params = ', props.match.params);
	// console.log('Note note id = ', props.match.params.noteId);

	const note = notes.find(note => note.id == props.match.params.noteId);

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
