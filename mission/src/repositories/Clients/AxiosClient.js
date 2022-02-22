import axios from 'axios';

// const baseDomain = 'https://virtserver.swaggerhub.com/lkaybob/projectlion-vue/1.0.0';
const baseDomain = 'http://localhost:8081';
const baseURL = `${baseDomain}`;

const Authorization = 'abcd1234';

export default axios.create({
  baseURL,
  headers: {
    Authorization,
  },
});
