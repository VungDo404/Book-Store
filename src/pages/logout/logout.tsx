import { logout } from '@/services/auth';
import {useEffect} from 'react';
import { useNavigate } from "react-router-dom";

export default function Logout(){
    const navigate = useNavigate(); 
    const handleLogout = async () => {
        const response = (await logout()).data;
        if(response.statusCode === 201) 
            navigate('/');
    }
    useEffect(()=>{
        handleLogout()
    },[])
    return (
        <></>
    );
}