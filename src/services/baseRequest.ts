import axios from 'axios';

export const baseRequest = axios.create({
	baseURL: 'https://sticky-notes-server.onrender.com/api',
	withCredentials: true,
});

export const privateRequest = axios.create({
	baseURL: 'https://sticky-notes-server.onrender.com/api',
	withCredentials: true,
});

baseRequest.defaults.headers.common['Content-Type'] = 'application/json';
privateRequest.defaults.headers.common['Content-Type'] = 'application/json';
