import React from 'react';

import { Route } from 'react-router-dom';
import './App.css';

import config from './config';

// import dummyStore from './dummy-store';
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

export default class App extends React.Component {
	// get context
	static contextType = NotefulContext;

	// set default state variable values
	state = {
		folders: [],
		notes: [],
		errorFolders: null,
		errorNotes: null
	};

	// const [folders, setFolders] = useState({
	// 	folders: [],
	// 	error: null
	//   });

	//   const [notes, setNotes] = useState({
	// 	notes: [],
	// 	error: null
	//   });

	togglePopup = () => {
		alert('Feature not done yet.');
	};

	setFolders = folders => {
		this.setState({
			folders,
			errorFolders: null
		});
	};

	setNotes = notes => {
		this.setState({
			notes,
			errorNotes: null
		});
	};

	// deleteNotes updates state
	// and inside render context is updated with values from state
	// then context is used to display values in FolderList and NoteList
	deleteNote = noteId => {
		const newNotes = this.state.notes.filter(note => note.id !== noteId);
		this.setState({
			notes: newNotes
		});
	};

	addNote = note => {
		this.setState({
			notes: [...this.state.notes, note]
		});
	};

	addFolder = folder => {
		this.setState({
			folders: [...this.state.folders, folder]
		});
	};

	/*
	// NOTE NOTE NOTE
	// Pattern: every route is responsible for loading the data it needs from scratch

	// So the component rendering the /detail/:id route needs to fetch data for itself, including the correct id to use from the url, via the props React Router provides.

	*/

	/*
	IMPORTANT - using Route Render Prompts vs Component
	This will show nothing in props
	console.log('*** App props = ', props);

	BUT you still need to pass {...props} in each Route if you want to use them later on

	TO WATCH:
	https://tylermcginnis.com/react-router-pass-props-to-components/

	const newId = parseInt()   ---> to convert url dynamic ids into numbers from strings

	used:
	<Link to={{ pathname: '/about', note: props }}
	in NoteItem.js

	READ:
	https://medium.com/@bopaiahmd.mca/how-to-pass-props-using-link-and-navlink-in-react-router-v4-75dc1d9507b4

	*/

	getFolders = () => {
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
			.then(this.setFolders)
			// passes res to setFolders function
			// shortcut which equals .then(res => this.setFolders(res))
			.catch(error => this.setState({ errorFolders: error }));
	};

	getNotes = () => {
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
			.then(this.setNotes)
			// passes res to setNotes function
			// shortcut which equals .then(res => this.setNotes(res))
			.catch(error => this.setState({ errorNotes: error }));
	};

	// get Folders & Notes when componentDidMount() {}
	componentDidMount() {
		this.getFolders();
		this.getNotes();
	}

	render() {
		// create object to update the values stored in NotefulContext
		const contextValue = {
			notes: this.state.notes,
			folders: this.state.folders,
			deleteNote: this.deleteNote,
			addNote: this.addNote,
			addFolder: this.addFolder
		};
		return (
			<>
				<Header />
				{/* actually update the values stored in NotefulContext by passing contextValue into value

				Use the Provider to make values available to all children/grandchildren/subcomponents

				See: https://reactjs.org/docs/context.html#caveats

				-- the code below will re-render all consumers every time the Provider re-renders because a new object is always created for valuethe code below will re-render all consumers every time the Provider re-renders because a new object is always created for value
				*/}
				<NotefulContext.Provider value={contextValue}>
					<main>
						{/* NOTE:
						 used render props to pass togglePopup prop via route
						if did not want to pass props via route could just do
						component={A}
						*/}
						<aside>
							{routes.map(({ path, exact, aside: A }) => (
								<Route
									key={path}
									path={path}
									exact={exact}
									render={props => (
										<A {...props} togglePopup={this.togglePopup} />
									)}
								/>
							))}
						</aside>

						<section>
							{/* NOTE:
						 used render props to pass togglePopup prop via route
						 AND
						 because wanted to pass location, match and history props to the component so that in the component I have access to the history object to push a new location into
						 (THIS IS THE ONLY WAY)

						if did not want to pass props via route could just do
						component={S}
						*/}
							{routes.map(({ path, exact, section: S }) => (
								<Route
									key={path}
									path={path}
									exact={exact}
									render={props => (
										<S {...props} togglePopup={this.togglePopup} />
									)}
								/>
							))}
						</section>
					</main>
				</NotefulContext.Provider>

				<Footer />
			</>
		);
	}
}
