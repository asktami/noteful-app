import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import NoteError from './NoteError';

import NotefulContext from './NotefulContext';

import NoteItem from './NoteItem';

const NoteList = props => {
	// need to grab NotefulContext (globals)
	const contextType = useContext(NotefulContext);
	const { notes } = contextType;

	// if selected a folder, show only the notes in that folder
	// otherwise show all notes from all folders
	const foldernotes = props.match.params.folderId
		? notes.filter(note => note.folderId === props.match.params.folderId)
		: notes;

	return (
		<>
			<div className="header-container">
				<span>
					<h2>Notes</h2>
				</span>
				&nbsp;&nbsp;
				<span>
					<NavLink
						// if just passing url:
						// to={'/add-note'}

						// to pass selected folderId:
						to={{
							pathname: '/add-note',
							state: { folderId: props.match.params.folderId }
						}}
					>
						<button className="btn-add">+</button>
					</NavLink>
				</span>
			</div>
			{foldernotes.length > 0 ? (
				foldernotes.map(note => (
					<article key={note.id}>
						<NoteError>
							<div className="note">
								{/*
							{...note}
							use spread here IF want whole note object, and then get inside NoteItem via note.key
							alternative is
							note={note} and in NoteItem get via props.note.key

							NOTE:
							MUST pass {...props} to have the history, location, and match props inside NoteItem
							*/}
								<NoteItem note={note} {...props} />
							</div>
						</NoteError>
					</article>
				))
			) : (
				<article className="no-border">
					<div className="note">No notes in this folder.</div>
				</article>
			)}
		</>
	);
};

export default NoteList;

// to catch bugs
// check that get a notes array that has id, name, and modified
// this array is the "notes" variable coming from context
NoteList.propTypes = {
	notes: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			modified: PropTypes.string.isRequired
		})
	)
};
