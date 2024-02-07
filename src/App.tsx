import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/Layout";
import { account } from "./services/auth";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./redux/hooks/hooks";
import { userAction } from "./redux/slices/accountReducer";
import Loading from "./components/Loading/Loading";
import "styles/app.scss";
import "react-image-gallery/styles/scss/image-gallery.scss";

export default function App() {
	const dispatch = useAppDispatch();
	const [isLoading, setIsLoading] = useState(true);
	const fetchAccount = async () => {
		setTimeout(async () => {
			setIsLoading(false);
			try {
				if (
					!["/", "/register", "/login"].includes(
						window.location.pathname
					)
				) {
					const response = (await account()).data;
					dispatch(userAction(response.data.user));
				}
			} catch (error) {
				// console.log(error)
			}
		}, 1000);
	};

	useEffect(() => {
		fetchAccount();
	}, []);
	return <>{isLoading ? <Loading /> : <RouterProvider router={router} />}</>;
}
