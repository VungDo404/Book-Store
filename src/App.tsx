import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/Layout";
import { useEffect, useState } from "react";
import Loading from "./components/Loading/Loading";
import "styles/app.scss";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { useAppDispatch } from "./redux/hooks/hooks";
import { handleAccount } from "./redux/slices/accountReducer";
import { handleGetCartsOfUser } from "./redux/slices/cart.reducer";
import '@/i18n/config';
export default function App() {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useAppDispatch();
	const fetchAccount = async () => {
		dispatch(handleAccount());
		dispatch(handleGetCartsOfUser());
		setIsLoading(false);
	};

	useEffect(() => {
		fetchAccount();
	}, []);

	return <>{isLoading ? <Loading /> : <RouterProvider router={router} />}</>;
}
