import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import NotefulContext from './NotefulContext';

const FolderList = props => {
	// need to grab NotefulContext (globals)
	const contextType = useContext(NotefulContext);
	const { folders } = contextType;

	return (
		<NotefulContext.Consumer>
			{context => (
				<>
					<div className="header-container">
						<span>
							<h2>Folders</h2>
						</span>
						&nbsp;&nbsp;
						<span>
							<button className="btn-add" onClick={context.unfinishedMessage}>
								+
							</button>
						</span>
					</div>
					<ul>
						{folders.map(folder => (
							<li
								key={folder.id}
								className={
									folder.id === props.match.params.folderId ? ' active' : null
								}
							>
								<NavLink to={`/folder/${folder.id}`}>
									<span role="img" aria-label="Folder">
										&#x1F4C2;
									</span>
									&nbsp;{folder.name}
								</NavLink>
							</li>
						))}
					</ul>
				</>
			)}
		</NotefulContext.Consumer>
	);
};

export default FolderList;
