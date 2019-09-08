import React from 'react';
import { NavLink } from 'react-router-dom';

import config from './config';
import NotefulContext from './NotefulContext';

// redirect
const redirectToTarget = props => {
	props.history.push(`/`);
};

// this function 1st deletes via the API, then from state
// context.deleteNote = the updater function, to update state in context
function handleClickDelete(noteId, cb, props) {
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
			// ie. update the notes stored in state
			// which also updates the notes stored in context
			cb(noteId);
		})
		.catch(error => {
			console.error('delete note errorNotes = ', error);
			this.setState({ errorNotes: error });
		});

	// redirect
	redirectToTarget(props);
}

const NoteItem = props => {
	console.log('NoteItem props', props);
	return (
		<NotefulContext.Consumer>
			{/*
			Use the Consumer to grab values from contex
			--- the value we're grabbing from context is the deleteNote function, we're passing it to the delete button

 			QUESTION: what is context?
			ANSWER:
			is it equal to the object inside NotefulCcontext.js?
			an anonymous function with the parameter context automatically defined by {context => ... }, don't know where the parameter function comes from, don't need to know where it comes from because we're using it to render a result; context is a variable containing data; this function is called by line 39 NotefulContext.Consumer

			NOTE: context could be any word since its just the parameter label
			*/}

			{context => (
				<div className="note-item">
					{/*
			THIS CAUSED A staticContent ERROR:
			<NavLink to={`/note/${note.id}`} {...props}>
				<h3>{note.title}</h3>
			</NavLink> */}

					<NavLink to={{ pathname: `/note/${props.note.id}`, props: props }}>
						<h3>{props.note.name}</h3>
					</NavLink>

					<div className="button-container">
						<span>
							Modified on{' '}
							<span className="note-datemod">
								{props.note.modified
									? props.note.modified.split('T', 1)[0]
									: ''}
							</span>
						</span>
						<span>
							<button
								className="btn-delete"
								onClick={() => {
									handleClickDelete(props.note.id, context.deleteNote, props);
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
