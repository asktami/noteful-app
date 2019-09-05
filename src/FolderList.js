import React from 'react';
import { NavLink } from 'react-router-dom';

import NotefulContext from './NotefulContext';

class FolderList extends React.Component {
	// const contextType is needed to then say this.context
	static contextType = NotefulContext;

	render() {
		const { folders } = this.context;
		return (
			<>
				<div className="header-container">
					<span>
						<h2>Folders</h2>
					</span>
					&nbsp;&nbsp;
					<span>
						<button className="btn-add" onClick={this.props.togglePopup}>
							+
						</button>
					</span>
				</div>
				<ul>
					{folders.map(folder => (
						<li
							key={folder.id}
							className={
								folder.id == this.props.match.params.folderId ? ' active' : null
							}
						>
							<NavLink to={`/folder/${folder.id}`}>
								&#x1F4C2;&nbsp;{folder.name}
							</NavLink>
						</li>
					))}
				</ul>
			</>
		);
	}
}

export default FolderList;
