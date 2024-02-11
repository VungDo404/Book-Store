import { Avatar, Col, Divider, Drawer, Row } from "antd";
import moment from "moment";
import { userType } from "../../../../../interface/user";

interface DescriptionItemProps {
	title: string;
	content: React.ReactNode;
}
interface propsType {
	currentRecord: userType;
	onClose: () => void;
	open: boolean;
}
export default function UserDetail(props: propsType) {
	const { currentRecord, onClose, open } = props;

	const DescriptionItem = ({ title, content }: DescriptionItemProps) => (
		<div className="site-description-item-profile-wrapper">
			<p className="site-description-item-profile-p-label">{title}:</p>
			{content}
		</div>
	);
	const renderAvatar = () => {
		return (
			<Avatar
				alt="avatar"
				src={`${import.meta.env.VITE_API_URL}/images/avatar/${
					currentRecord?.avatar
				}`}
			/>
		);
	};

	return (
		<Drawer
			title="User information"
			placement="right"
			onClose={onClose}
			open={open}
			width={640}
		>
			<p className="site-description-item-profile-p">Personal</p>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title="Full Name"
						content={currentRecord?.fullName}
					/>
				</Col>
				<Col span={12}>
					<DescriptionItem
						title="Email"
						content={currentRecord?.email}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title="Phone number"
						content={currentRecord?.phone}
					/>
				</Col>
			</Row>
			<Divider />
			<p className="site-description-item-profile-p">Other</p>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title="Role"
						content={currentRecord?.role}
					/>
				</Col>
				<Col span={12}>
					<DescriptionItem title="Avatar" content={renderAvatar()} />
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title="Created Date"
						content={moment(
							currentRecord?.createdAt,
							"YYYY-MM-DDTHH:mm:ss.SSSZ"
						).format("YYYY-MM-DD HH:mm:ss")}
					/>
				</Col>
				<Col span={12}>
					<DescriptionItem
						title="Updated Date"
						content={moment(
							currentRecord?.updatedAt,
							"YYYY-MM-DDTHH:mm:ss.SSSZ"
						).format("YYYY-MM-DD HH:mm:ss")}
					/>
				</Col>
			</Row>
			<Row>
				<Col span={12}>
					<DescriptionItem
						title="Active"
						content={`${currentRecord?.isActive}`}
					/>
				</Col>
			</Row>
		</Drawer>
	);
}
