import {
  RouterProvider,
} from "react-router-dom";
import { router } from '@/routes/Layout';
import { account } from './services/auth';
import { useEffect, useState } from 'react';
import { useAppDispatch} from './redux/hooks/hooks';
import { userAction } from './redux/slices/accountReducer';
import Loading from './components/Loading/Loading';
import 'styles/app.scss'
import "react-image-gallery/styles/scss/image-gallery.scss";

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
  const [isLoading, setIsLoading] = useState(true);

  const fetchAccount = async () => {
    setTimeout( async () => {
      setIsLoading(false);
      try {
        if(!/\/(login|register)$/.test(window.location.href) ){
          const response = (await account()).data; 
          dispatch(userAction(response.data.user));
        }
      } catch (error) {
        // console.log(error)
      }
    }, 1000);
  }

  useEffect(()=> {
    fetchAccount(); 
  }, [])
  return (
    <>
      {isLoading ? <Loading/> :  <RouterProvider router={router} />}
    </>
  )
}


