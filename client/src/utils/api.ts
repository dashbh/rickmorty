import axios from 'axios';

const api = '/app';

const login = async (data: any) => {
  try {
    const response = await axios({
      method: 'post',
      baseURL: `${api}/user/login`,
      timeout: 5000,
      data: data
    });

    localStorage.setItem('user', JSON.stringify(response));

    return response;
  } catch (e) {
    console.log(e.message);
    return {
      status: e.response.status,
      error: e.response.data.error,
    };
  }
};

const register = async (data: any) => {
  try {
    const response = await axios({
      method: 'post',
      baseURL: `${api}/user/signup`,
      timeout: 5000,
      data: data
    });
    return response;
  } catch (e) {
    console.log(e.message);
    return {
      status: e.response.status,
      error: e.response.data.error,
    };
  }
};

const API = { login, register };
export default API;