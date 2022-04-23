import * as axios from "axios";
import { getSession } from './localstorage';


export default class Api {
  constructor() {
    this.api_url = 'http://localhost:3000';
    const token = getSession();

    if (token) {
      this.headers = {
        'bearer-token': getSession(),
      };
    }
  }

  init = () => (this.client = axios.create({
    baseURL: this.api_url,
    timeout: 0,
    headers: this.headers,
    withCredentials: false,
  }));

  register = (data) => this.init().post('/user/', data);

  login = (data) => this.init().post('/user/login', data);
}

