import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import NoteItem from './NoteItem';

// hardcode modified date so that test will pass when deploy to server in a different timezone

describe(`NoteItem component`, () => {
	const props = {
		note: {
			id: 1,
			id_folder: 101,
			title: 'test-note-title',
			modified: new Date(Date.UTC(2021, 3, 11, 3, 4, 5)).toLocaleString('en-US', { timeZone: 'America/New_York' }),
		},
	};

	it('renders a NoteItem by default', () => {
		const wrapper = shallow(<NoteItem {...props} />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('renders the NoteItem given props', () => {
		const wrapper = shallow(<NoteItem {...props} />);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
