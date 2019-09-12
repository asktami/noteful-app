import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

import NotefulContext from './NotefulContext';

const Note = props => {
	// console.log('Note props = ', props);
	// console.log('Note history = ', props.history);
	// console.log('Note params = ', props.match.params);
	// console.log('Note note id = ', props.match.params.noteId);

	const context = useContext(NotefulContext);
	const { notes } = context;

	// QUESTION
	// reloading the browser wipes the context from memory
	// so need to handle if user reloads the browser and its undefined
	// done by adding || {} here AND : '' for props.modified in NoteItem too
	const note = notes.find(note => note.id === props.match.params.noteId) || {};

	return (
		<article>
			<div className="note">
				<NoteItem {...props} note={note} />
				<p className="note-content">{note.content}</p>
			</div>
		</article>
	);
};

export default Note;

Note.propTypes = {
	props: PropTypes.object.isRequired
};
