// hosted on Heroku using PostgreSQL db
const prod = {
	DATASOURCE: `postgresql`,
	NOTES_ENDPOINT: `https://asktami-cors-anywhere.herokuapp.com/https://asktami-noteful-api.herokuapp.com/api/notes`,
	FOLDERS_ENDPOINT: `https://asktami-cors-anywhere.herokuapp.com/https://asktami-noteful-api.herokuapp.com/api/folders`,
	API_KEY: process.env.REACT_APP_API_KEY,
};

// hosted locally using PostgreSQL db
const dev = {
	DATASOURCE: `postgresql`,
	NOTES_ENDPOINT: `http://localhost:8000/api/notes`,
	FOLDERS_ENDPOINT: `http://localhost:8000/api/folders`,
	API_KEY: process.env.REACT_APP_API_KEY,
};

// hosted locally using json db
// export default {
// 	DATASOURCE: `json`,
// 	FOLDERS_ENDPOINT: `http://localhost:9090/folders`,
// 	NOTES_ENDPOINT: `http://localhost:9090/notes`
// };

// hosted on github using json db
// https://my-json-server.typicode.com/asktami/react-router-context-noteful

// see documentation at
// http://localhost:9090
// see data at
// http://localhost:9090/db

// Default to dev if not set
export const config = process.env.NODE_ENV === 'production' ? prod : dev;
