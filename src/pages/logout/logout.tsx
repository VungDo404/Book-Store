import { useAppDispatch } from '@/redux/hooks/hooks';
import { logoutAction } from '@/redux/slices/accountReducer';
import { logout } from '@/services/auth';
import {useEffect} from 'react';
import { useNavigate } from "react-router-dom";

export default function Logout(){
    const navigate = useNavigate(); 
    const dispatch = useAppDispatch(); 
    const handleLogout = async () => {
        const response = (await logout()).data;
        if(response.statusCode === 201) {
            localStorage.removeItem("access_token");
            dispatch(logoutAction());
            navigate('/');
        }
            
    }
    useEffect(()=>{
        handleLogout()
    },[])
    return (
        <></>
    );
}