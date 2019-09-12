import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import NoteItem from './NoteItem';

import NotefulContext from './NotefulContext';

const Note = props => {
	// need to grab NotefulContext (globals)
	const context = useContext(NotefulContext);
	const { notes } = context;

	// NOTE
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

// to catch bugs
// check that get a notes array that has id, name, content, and modified
// this array is the "notes" variable coming from context
Note.propTypes = {
	notes: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			content: PropTypes.string.isRequired,
			modified: PropTypes.string.isRequired
		})
	)
};
