import { Row } from "antd";
import { useEffect, useState } from "react";
import "styles/ManageUser.scss";
import SearchUser from "./Search/SearchUserTable";
import UserTable from "./Table/UserTable";
import UserDetail from "./Table/Body/UserDetail";
import { userType } from "../../../interface/user";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { fetchUser } from "@/redux/slices/user.reducer";

export default function MangeUser() {
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const initRecord: userType = {
		_id: "",
		fullName: "",
		email: "",
		phone: "",
		role: "",
		avatar: "",
		deleted: false,
		createdAt: "",
		updatedAt: "",
		__v: 0,
	};
	const [open, setOpen] = useState<boolean>(false);
	const [currentRecord, setCurrentRecord] = useState<userType>(initRecord);
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};
	const fetchUsers = async () => {
		setLoading(true);
		dispatch(fetchUser({}));
		setLoading(false);
	};
	useEffect(() => {
		fetchUsers();
	}, []);
	return (
		<>
			<Row justify="space-around">
				<SearchUser fetchUsers={fetchUsers} />
				<UserTable
					showDrawer={showDrawer}
					setCurrentRecord={setCurrentRecord}
					loading={loading}
				/>
			</Row>
			<UserDetail
				currentRecord={currentRecord}
				onClose={onClose}
				open={open}
			/>
		</>
	);
}
