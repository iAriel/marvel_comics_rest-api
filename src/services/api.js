import axios from 'axios';
import md5 from 'md5';

const privateKey ='22e5a9014af0f1b501f8ddb93fbfd007b902af9a';
const publicKey ='1dff886f9dc0e62c2169d5500268429d';

const time = Number(new Date());
const hash = md5(time + privateKey+publicKey);

const api = axios.create({
    baseUrl: `http://gateway.marvel.com/v1/public/characters?ts=${time}&apikey=${publicKey}&hash=${hash}`
})

export default api;