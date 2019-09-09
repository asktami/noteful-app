import React from 'react';

const NotefulContext = React.createContext({
	folders: [],
	notes: [],
	errorFolders: null,
	errorNotes: null,
	deleteNote: () => {},
	addNote: () => {},
	addFolder: () => {},
	togglePopup: () => {}
});

export default NotefulContext;
