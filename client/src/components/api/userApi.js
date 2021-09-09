import axios from 'axios'
import authHeader from '../../services/auth-header';
import authService from '../../services/authService';

const api = axios.create({
    baseURL: 'http://localhost:8082/api/users/',
})


export const getAllUsers = () => api.get(`/getAllUsers`)
export const getUserOrders = () => api.get(`/myOrders`, {headers: authHeader()})
export const getEmailbyName = name => api.get(`/email/?name=${name}`);

const apis = {
    getAllUsers,
    getUserOrders,
    getEmailbyName,
}

export default apis