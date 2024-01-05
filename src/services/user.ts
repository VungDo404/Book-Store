import { Search, interface_get_users_with_paginate, postUserType } from '@/pages/admin/users/ManageUser';
import { interface_register_request } from '@/pages/register/register';
import { ax } from '@/utils/axios'; 

const getUsersWithPaginate = (current:number , pageSize:number , search:Search , sort:string) => {
    const {fullName='', email='', phone=''} = search; 
    return ax.get<interface_get_users_with_paginate>(`/user?current=${current}&pageSize=${pageSize}&fullName=/${fullName}/i&email=/${email}/i&phone=/${phone}/i&sort=${sort}`);
}
const deleteUser = (id:string) => {
    return ax.delete(`/user/${id}`);
}
const postUser = (user: interface_register_request) => {
    return ax.post<postUserType>('/user', user);
}
export {
    getUsersWithPaginate, 
    deleteUser, 
    postUser
}