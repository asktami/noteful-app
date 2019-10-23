import React from 'react';
import ReactDOM from 'react-dom';
import EditFolder from './EditFolder';

it('renders without crashing', () => {
	const div = document.createElement('div');
	const props = {
		history: {
			push: () => {}
		},
		match: {
			params: 99 // folderId
		}
	};
	ReactDOM.render(<EditFolder {...props} />, div);
	ReactDOM.unmountComponentAtNode(div);
});
