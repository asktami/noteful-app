import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import NoteError from './NoteError';

import NotefulContext from './NotefulContext';

import NoteItem from './NoteItem';

const NoteList = props => {
	// console.log('NoteList props = ', props);
	// console.log('NoteList props history = ', props.history);

	// need to grab NotefulContext (globals)
	const contextType = useContext(NotefulContext);
	const { notes } = contextType;

	// if selected a folder, show only the notes in that folder
	// otherwise show all notes from all folders
	const foldernotes = props.match.params.folderId
		? notes.filter(note => note.folderId === props.match.params.folderId)
		: notes;

	return (
		<NotefulContext.Consumer>
			{context => (
				<>
					<div className="header-container">
						<span>
							<h2>Notes</h2>
						</span>
						&nbsp;&nbsp;
						<span>
							<NavLink to={'/add-note'}>
								<button className="btn-add">+</button>
							</NavLink>
						</span>
					</div>
					{foldernotes.length > 0 ? (
						foldernotes.map(note => (
							<NoteError>
								<article key={note.id}>
									<div className="note">
										{/*
							{...note}
							use spread here IF want whole note object, and get inside NoteItem via note.key
							alternative is
							note={note} and in NoteItem get via props.note.key

							QUESTION:
							why MUST pass {...props} to have the history, location, and match props inside NoteItem
							*/}
										<NoteItem note={note} {...props} />
									</div>
								</article>
							</NoteError>
						))
					) : (
						<article className="no-border">
							<div className="note">No notes in this folder.</div>
						</article>
					)}
				</>
			)}
		</NotefulContext.Consumer>
	);
};

export default NoteList;

// validate that get an array that has id and name
// this array is the "notes" variable coming from context
NoteList.propTypes = {
	notes: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			note: PropTypes.object.isRequired
		})
	)
};
