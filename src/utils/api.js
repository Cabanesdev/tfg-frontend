import * as axios from "axios";
import * as qs from "qs";
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

  getSession = () => this.init().get(`/user/session`);


  getUsers = (params) => {
    const parsedParams = qs.stringify(params)
    return this.init().get(`/user?${parsedParams}`);
  }

  getUserById = (id) => this.init().get(`/user/${id}`);

  updateUser = (data) => this.init().put('/user/', data);

  getPosts = (params) => {
    const parsedParams = qs.stringify(params)
    return this.init().get(`/post?${parsedParams}`);
  }

  getPostById = (id) => this.init().get(`/post/${id}`);

  createPost = (data) => this.init().post('/post', data);

  editPost = (id, data) => this.init().put(`/post/${id}`, data);

  deletePost = (id) => this.init().delete(`/post/${id}`);

  getComments = (params) => {
    const parsedParams = qs.stringify(params)
    return this.init().get(`/comment?${parsedParams}`);
  }

  createComment = (data) => this.init().post('/comment', data);

}

