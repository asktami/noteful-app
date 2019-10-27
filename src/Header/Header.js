import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => {
	return (
		<header>
			<span>
				<h1>
					<Link to="/">Noteful</Link>
				</h1>
			</span>
			<span>
				a React app
				<br />
				(takes a couple of seconds to load the 1st time)
			</span>
		</header>
	);
};

export default Header;
