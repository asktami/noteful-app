import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import config from './config';
import NotefulContext from './NotefulContext';

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
			console.error('delete note errorNotes = ', error);
			this.setState({ errorNotes: error });
		});
}

const NoteItem = props => {
	console.log('props', JSON.stringify(props));
	return (
		<NotefulContext.Consumer>
			{/*
			Use the Consumer to grab values from contex

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

					<NavLink to={{ pathname: `/note/${props.id}`, props: props }}>
						<h3>{props.name}</h3>
					</NavLink>

					<div className="button-container">
						<span>
							console.log('got here'); Modified on
							<span className="note-datemod">
								if(props.modified != undefined){' '}
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
