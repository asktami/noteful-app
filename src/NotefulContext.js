import React from 'react';

const NotefulContext = React.createContext({
	notes: [],
	folders: [],
	deleteNote: () => {},
	addNote: () => {},
	addFolder: () => {},
	addErrorNotes: () => {},
	addErrorFolders: () => {},
	unfinishedMessage: () => {}
});

export default NotefulContext;
