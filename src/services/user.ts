import { interface_get_users_with_paginate } from '@/pages/admin/users/ManageUser';
import { ax } from '@/utils/axios'; 

const getUsersWithPaginate = (current: number, pageSize: number) => {
    return ax.get<interface_get_users_with_paginate>(`/user?current=${current}&pageSize=${pageSize}`);
}

export {
    getUsersWithPaginate
}