const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const getAccessToken = () => localStorage.getItem('token');

const putAccessToken = (token) => {
  localStorage.setItem('token', token);
};

const fetchWithAuth = async (url, options = {}) => {
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAccessToken()}`,
      ...options.headers,
    },
  });
};

const responseApi = async (response) => {
  const json = await response.json();

  if (json.status !== 'success') {
    throw new Error(json.message);
  }
  return json.data;
};

const api = {
  async register({name, email, password}) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, email, password}),
    });
    const data = await responseApi(response);
    return data.user;
  },

  async login({email, password}) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    });

    const data = await responseApi(response);
    return data.token;
  },

  async getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await responseApi(response);
    return data.users;
  },
  async getOwnProfile() {
    const response = await fetchWithAuth(`${BASE_URL}/users/me`);
    const data = await responseApi(response);
    return data.user;
  },

  async getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const data = await responseApi(response);
    return data.threads;
  },

  async getDetailThread(threadId) {
    const response = await fetch(`${BASE_URL}/threads/${threadId}`);
    const data = await responseApi(response);
    return data.detailThread;
  },

  async createThread({title, body, category}) {
    const response = await fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      body: JSON.stringify({title, body, category}),
    });

    const data = await responseApi(response);
    return data.thread;
  },

  async createComment({threadId, content}) {
    const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/comments`,
        {
          method: 'POST',
          body: JSON.stringify({content}),
        },
    );

    const data = await responseApi(response);
    return data.comment;
  },

  async upVoteThread(threadId) {
    const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/up-vote`,
        {method: 'POST'},
    );
    await responseApi(response);
  },

  async downVoteThread(threadId) {
    const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/down-vote`,
        {method: 'POST'},
    );
    await responseApi(response);
  },

  async neutralVoteThread(threadId) {
    const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/neutral-vote`,
        {method: 'POST'},
    );
    await responseApi(response);
  },

  async upVoteComment({threadId, commentId}) {
    const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
        {method: 'POST'},
    );
    await responseApi(response);
  },

  async downVoteComment({threadId, commentId}) {
    const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
        {method: 'POST'},
    );
    await responseApi(response);
  },

  async neutralVoteComment({threadId, commentId}) {
    const response = await fetchWithAuth(
        `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
        {method: 'POST'},
    );
    await responseApi(response);
  },

  async getLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const data = await responseApi(response);
    return data.leaderboards;
  },
  putAccessToken,
  getAccessToken,
};

export default api;
