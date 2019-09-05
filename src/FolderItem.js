import React, { useContext } from 'react';

import NotefulContext from './NotefulContext';

const FolderItem = props => {
	const context = useContext(NotefulContext);
	const { folders, notes } = context;

	// use the selected noteId to
	// - use the notes object & get the folderId
	// - from the folders object, use the folderId to get the note's parent folder

	const activeNote = notes
		? notes.find(note => note.id == props.match.params.noteId)
		: '';

	if (!activeNote) return 'Sorry, no note found.';

	const folderId = activeNote.folderId;
	const activeFolder = folders.filter(folder => folder.id == folderId);

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
