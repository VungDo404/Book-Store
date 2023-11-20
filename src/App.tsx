import './App.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from '@/routes/Layout';
import 'react-toastify/dist/ReactToastify.css';
import { account } from './services/auth';
import { useEffect } from 'react';
import { useAppDispatch } from './redux/hooks/hooks';
import { userAction } from './redux/slices/accountReducer';

export interface interface_account {
  statusCode: number,
  message: string,
  data: {
      user: {
          email: string,
          phone: string,
          fullName: string,
          role: string,
          avatar: string,
          id: string
      }
  },
  author: string
}
export default function App() {
  const dispatch = useAppDispatch(); 
  const fetchAccount = async () => {
    const response = (await account()).data; 
    dispatch(userAction(response.data.user));
  }
  useEffect(()=> {
    fetchAccount(); 
  }, [])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}


