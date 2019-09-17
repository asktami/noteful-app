import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import FolderError from './FolderError';
import NotefulContext from './NotefulContext';

const FolderList = props => {
	// need to grab NotefulContext (globals)
	const contextType = useContext(NotefulContext);
	const { folders } = contextType;

	return (
		<>
			<header>
				<h2>Folders</h2>
				&nbsp;&nbsp;
				<NavLink to={'/add-folder'}>
					<button className="btn-add">+</button>
				</NavLink>
			</header>
			<ul>
				{folders.map(folder => (
					<li
						key={folder.id}
						className={
							folder.id === props.match.params.folderId ? ' active' : null
						}
					>
						<FolderError>
							<NavLink to={`/folder/${folder.id}`}>
								<span role="img" aria-label="Folder">
									&#x1F4C2;
								</span>
								&nbsp;{folder.name}
							</NavLink>
						</FolderError>
					</li>
				))}
			</ul>
		</>
	);
};

export default FolderList;

// to catch bugs
// check that get a folders array that has id and name
// this array is the "folders" variable coming from context
FolderList.propTypes = {
	folders: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		})
	)
};
