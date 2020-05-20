import axios from 'axios';

const axiosWithAuth = () => {
    const token = localStorage.getItem('token');
    return axios.create({
      baseURL: 'http://localhost:8000/api',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    });
};

export default axiosWithAuth;