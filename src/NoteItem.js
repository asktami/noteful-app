import React from 'react';
import { NavLink } from 'react-router-dom';

import config from './config';
import NotefulContext from './NotefulContext';

//
// QUESTION: how to set different fetch errors in context, errorNotes vs. errorFolders?
//

// this function 1st deletes via the API, then from state
// context.deleteNote = the updater function, to update state in context
function deleteNoteRequest(noteId, cb) {
	fetch(config.API_NOTES + `/${noteId}`, {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json'
		}
	})
		.then(res => {
			if (!res.ok) {
				// get the error message from the response,
				return res.json().then(error => {
					// then throw it
					throw error;
				});
			}
			return res.json();
		})
		.then(data => {
			// call the callback function when the request is successful
			// this is where the App component can remove it from state
			cb(noteId);
		})
		.catch(error => {
			console.error(error);
		});
}

const NoteItem = props => {
	return (
		<NotefulContext.Consumer>
			{context => (
				<div className="note-item">
					{/*
			THIS CAUSED A staticContent ERROR:
			<NavLink to={`/note/${note.id}`} {...props}>
				<h3>{note.title}</h3>
			</NavLink> */}

					<NavLink to={{ pathname: `/note/${props.id}`, props: props }}>
						<h3>{props.name}</h3>
					</NavLink>

					<div className="button-container">
						<span>
							Modified on{' '}
							<span className="note-datemod">
								{props.modified.split('T', 1)[0]}
							</span>
						</span>
						<span>
							<button
								className="btn-delete"
								onClick={() => {
									deleteNoteRequest(props.id, context.deleteNote);
								}}
							>
								-
							</button>
						</span>
					</div>
				</div>
			)}
		</NotefulContext.Consumer>
	);
};
export default NoteItem;
