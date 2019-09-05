import React from 'react';

import NotefulContext from './NotefulContext';

const FolderItem = props => {
	const { folders } = this.context;
	const { notes } = this.context;

	// use the selected noteId to
	// - use the notes object & get the folderId
	// - from the folders object, use the folderId to get the note's parent folder

	const activeNote = notes
		? notes.find(note => note.id == props.match.params.noteId)
		: '';
	const folderId = activeNote.folderId;
	const activeFolder = folders.filter(folder => folder.id == folderId);

	return (
		<NotefulContext.Consumer>
			{context => (
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
			)}
		</NotefulContext.Consumer>
	);
};

export default FolderItem;
