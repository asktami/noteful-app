import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import NotefulContext from './NotefulContext';

const FolderItem = props => {
	const context = useContext(NotefulContext);
	const { folders, notes } = context;

	// use the selected noteId to
	// - use the notes object & get the folderId
	// - from the folders object, use the folderId to get the note's parent folder

	const activeNote = notes
		? notes.find(note => note.id === props.match.params.noteId)
		: '';

	if (!activeNote) return 'Sorry, no note found.';

	const folderId = activeNote.folderId;
	const activeFolder = folders.filter(folder => folder.id === folderId);

	return (
		<>
			{!activeFolder
				? null
				: activeFolder.map(folder => (
						<div className="header-container" key={folder.id}>
							<span>
								<h2>{folder.name}</h2>
							</span>
						</div>
				  ))}

			<br />
			<button className="btn-save" onClick={props.history.goBack}>
				Go Back
			</button>
		</>
	);
};

export default FolderItem;

// to catch bugs
// check that get a folders array that has id and name
// this array is the "folders" variable coming from context
// AND
// check that get a notes array that has id, name, and modified
// this array is the "notes" variable coming from context
FolderItem.propTypes = {
	folders: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		})
	),
	notes: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			modified: PropTypes.string.isRequired
		})
	)
};
