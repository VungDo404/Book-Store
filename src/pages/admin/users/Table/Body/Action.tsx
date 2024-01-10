import { Popconfirm, Space, Tooltip, Typography, message } from "antd";
import { formUpdate, userType } from "../../interface";
import { DeleteOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { handleDeleteUser } from "@/redux/slices/Admin/user.reducer";

interface propsType {
	record: userType;
	isEditing: (record: userType) => boolean;
	edit: (record: userType) => void;
	editingKey: string;
	cancelEdit: () => void;
	save: (_id: string) => Promise<void>;
}

export interface updateUser extends Omit<formUpdate, "email"> {
	_id: string;
}
export default function Action(props: propsType) {
	const { record, isEditing, edit, editingKey, cancelEdit, save } = props;
	const [messageApi, contextHolder] = message.useMessage();
	const dispatch = useAppDispatch();
	const editable = isEditing(record);
	const cancel = (e?: React.MouseEvent<HTMLElement>) => {
		console.log(e);
	};
	const confirm = async (
		e: React.MouseEvent<HTMLElement> | undefined,
		_id: string
	) => {
		try {
			await dispatch(handleDeleteUser(_id)).then(unwrapResult);
			messageApi.success("Delete user successfully");
		} catch (error: any) {
			console.log(error);
			messageApi.error(error?.message);
		}
	};
	return (
		<Space size="middle">
			{contextHolder}
			{!editable ? (
				<>
					<Popconfirm
						title="Delete the user"
						description="Are you sure to delete this user?"
						onConfirm={(e) => confirm(e, record._id)}
						onCancel={cancel}
						okText="Yes"
						cancelText="No"
						placement="leftBottom"
					>
						<Tooltip title="Delete">
							<DeleteOutlined style={{ cursor: "pointer" }} />
						</Tooltip>
					</Popconfirm>
					<Tooltip title="Update">
						<EditOutlined
							style={{ cursor: "pointer" }}
							disabled={editingKey !== ""}
							onClick={() => edit(record)}
						/>
					</Tooltip>
				</>
			) : (
				<span>
					<Space>
						<Typography.Link onClick={() => save(record._id)}>
							<Tooltip title="Save">
								<SaveOutlined style={{ cursor: "pointer" }} />
							</Tooltip>
						</Typography.Link>
						<Popconfirm
							title="Sure to cancel?"
							onConfirm={cancelEdit}
						>
							<Typography.Link>Cancel</Typography.Link>
						</Popconfirm>
					</Space>
				</span>
			)}
		</Space>
	);
}
