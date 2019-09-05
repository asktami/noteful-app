import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Note from './Note';

describe(`Note component`, () => {
	const props = {
		match: {
			params: {
				noteId: 1
			}
		},
		notes: [
			{
				id: 1,
				folderId: 101,
				title: 'test-note-title',
				modified: new Date(2019, 8, 30)
			}
		]
	};

	it('renders a Note by default', () => {
		const wrapper = shallow(<Note {...props} />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('renders the Note given props', () => {
		const wrapper = shallow(<Note {...props} />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
