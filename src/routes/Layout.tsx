import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "pages/login/login";
import Register from "pages/register/register";
import Index from "@/components/Books";
import Body from "@/components/Books/Body/body";
import Detail from "@/components/Books/Detail/detail";
import NotFound from "@/components/Results/NotFound";
import ProtectedRoute from "@/pages/admin/ProtectedRoute";
import DashBoard from "@/pages/admin/dashboard/DashBoard";
import Books from "@/pages/admin/books/Books";
import Admin from "@/pages/admin/Admin";
import MangeUser from "@/pages/admin/users/ManageUser";
import Order from "@/components/Books/Order/Order";
import Account from "@/components/Books/Account/Account";
import Profile from "@/components/Books/Account/Profile";
import Password from "@/components/Books/Account/Password";
import PurchaseHistory from "@/components/Books/Account/PurchaseHistory";
import Authenticated from "@/components/others/Authenticated";
import Auth from "@/components/others/Auth";

export const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Auth>
				<Index />
			</Auth>
		),
		children: [
			{ index: true, element: <Body /> },
			{
				path: "book/:slug",
				element: <Detail />,
			},
			{
				path: "book/order",
				element: <Order />,
			},
			{
				path: "account",
				element: <Account />,
				children: [
					{
						path: "profile",
						element: <Profile />,
					},
					{
						index: true,
						element: <Navigate to="/account/profile" />,
					},
					{ path: "password", element: <Password /> },
					{ path: "purchase", element: <PurchaseHistory /> },
				],
			},
		],
	},
	{
		path: "/admin",
		element: (
			<ProtectedRoute>
				<Admin />
			</ProtectedRoute>
		),
		children: [
			{ index: true, element: <DashBoard /> },
			{
				path: "book",
				element: <Books />,
			},
			{
				path: "user",
				element: <MangeUser />,
			},
			{
				path: "order",
				element: <Order />,
			},
		],
	},
	{
		path: "/login",
		element: (
			<Authenticated>
				<Login />
			</Authenticated>
		),
	},
	{
		path: "/register",
		element: (
			<Authenticated>
				<Register />
			</Authenticated>
		),
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);
