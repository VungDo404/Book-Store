import { interface_account } from "@/App";
import { interface_login_request, interface_login_response } from "@/pages/login/login";
import { interface_register_request, interface_register_response } from "@/pages/register/register";
import { ax } from '@/utils/axios'; 

interface interface_logout{
    statusCode: number, 
    message: string, 
    data: string, 
    author: string
}

const login = async (data: interface_login_request) => {
    return await ax.post<interface_login_response>('/auth/login', data);
}

const register = async (data: interface_register_request) => {
    return await ax.post<interface_register_response >('/user/register', data);
}
const account = async () => {
    return await ax.get<interface_account>('auth/account');
}
const logout = async () => {
    return await ax.post<interface_logout>('auth/logout');
}
export {
    login,
    register,
    account,
    logout
}