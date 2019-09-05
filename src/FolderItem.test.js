import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import FolderItem from './FolderItem';

describe(`FolderItem component`, () => {
	const folders = [
		{
			id: 101,
			label: 'test-folder-label'
		}
	];

	const notes = [
		{
			id: 101,
			folderId: 101,
			title: 'test-note-title',
			modified: new Date(2019, 8, 30)
		}
	];

	const props = {
		match: {
			params: {
				noteId: 101
			}
		},
		history: {
			goBack: null
		}
	};

	it('renders a FolderItem by default', () => {
		const wrapper = shallow(
			<FolderItem {...props} folders={folders} notes={notes} />
		);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('renders the FolderItem given props', () => {
		const wrapper = shallow(
			<FolderItem {...props} folders={folders} notes={notes} />
		);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
