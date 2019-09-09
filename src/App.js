import React, { useState, useEffect } from 'react';

import { Route } from 'react-router-dom';
import './App.css';

import config from './config';

// when using dummyStore text datafile:
// import dummyStore from './dummy-store';

// using React.Context:
import NotefulContext from './NotefulContext';

import Header from './Header';
import Footer from './Footer';

import FolderList from './FolderList';
import FolderItem from './FolderItem';
import NoteList from './NoteList';
import Note from './Note';

const routes = [
	{
		path: '/',
		exact: true,
		header: Header,
		aside: FolderList,
		section: NoteList
	},
	{
		path: '/folder/:folderId',
		exact: true,
		header: Header,
		aside: FolderList,
		section: NoteList
	},
	{
		path: '/note/:noteId',
		exact: true,
		header: Header,
		aside: FolderItem,
		section: Note
	},
	{
		path: '/:any/:any/:any',
		exact: true,
		header: Header,
		aside: () => null,
		section: () => 'Do not edit the  url!'
	}
];

const App = () => {
	// // set default state variable values
	// setting default state with hooks
	const [folders, setFolders] = useState([]);
	const [notes, setNotes] = useState([]);
	const [errorFolders, setErrorFolders] = useState(null);
	const [errorNotes, setErrorNotes] = useState(null);

	const togglePopup = () => {
		alert('Feature not doen yet!');
	};

	// deleteNotes updates state
	// and inside render context is updated with values from state
	// then context is used to display values in FolderList and NoteList
	/*
    After making successful a DELETE API request, you can use a this.state.notes.filter method along with setState to remove a note from state and update context.
    */
	const deleteNote = noteId => {
		const newNotes = notes.filter(note => note.id !== noteId);
		setNotes(newNotes);
	};

	const addNote = note => {
		setNotes([...notes, note]);
	};

	const addFolder = folder => {
		setFolders([...folders, folder]);
	};

	/*
    // NOTE NOTE NOTE
    // Pattern: every route is responsible for loading the data it needs from scratch

    // So the component rendering the /detail/:id route needs to fetch data for itself, including the correct id to use from the url, via the props React Router provides.

    */

	const getFolders = () => {
		fetch(config.API_FOLDERS, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(res.status);
				}
				return res.json();
			})
			.then(setFolders)
			// passes res to setFolders function
			// shortcut which equals .then(res => this.setFolders(res))
			.catch(error => setErrorFolders(error));
	};

	const getNotes = () => {
		fetch(config.API_NOTES, {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(res.status);
				}
				return res.json();
			})
			.then(setNotes)
			// passes res to setNotes function
			// shortcut which equals .then(res => this.setNotes(res))
			.catch(error => setErrorNotes(error));
	};

	// get Folders & Notes when componentDidMount() {}
	// componentDidMount() {
	// 	this.getFolders();
	// 	this.getNotes();
	// }

	// only load ONCE, to fetch initial API data
	useEffect(() => {
		getFolders();
		getNotes();
	}, []); /* <-- add this */

	// create object to update the values stored in NotefulContext
	const contextValue = {
		notes: notes,
		folders: folders,
		deleteNote: deleteNote,
		addNote: addNote,
		addFolder: addFolder,
		togglePopup: togglePopup
	};
	return (
		<>
			<Header />
			{/* actually update the values stored in NotefulContext by passing contextValue into value

                Use the Provider to make values available to all children/grandchildren/subcomponents

                See: https://reactjs.org/docs/context.html#caveats

                -- the code below will re-render all consumers every time the Provider re-renders because a new object is always created for value
                */}
			<NotefulContext.Provider value={contextValue}>
				<main>
					<aside>
						{routes.map(({ path, exact, aside: A }) => (
							<Route key={path} path={path} exact={exact} component={A} />
						))}
					</aside>

					<section>
						{/* NOTE:
                         CAN use render props to pass togglePopup prop via route
                         AND
                         to pass location, match and history props to the component so that in the component I have access to the history object to push a new location into
                         (THIS IS NOT THE ONLY WAY)

                                    render={props => (
                                        <S
                                        {...props}
                                        togglePopup={togglePopup} />
                                    )}

                        can also pass togglePopup via Context and do:
                        component={S}
                        */}
						{routes.map(({ path, exact, section: S }) => (
							<Route key={path} path={path} exact={exact} component={S} />
						))}
					</section>
				</main>
			</NotefulContext.Provider>

			<Footer />
		</>
	);
};

export default App;
