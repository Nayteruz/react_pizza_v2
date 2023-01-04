import axios from "axios";

const instance = axios.create({
	baseURL: 'https://63b448849f50390584ac5e63.mockapi.io',
});

export default instance;