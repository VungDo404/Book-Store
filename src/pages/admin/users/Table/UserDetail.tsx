import { Avatar, Col, Divider, Drawer, Row } from "antd";
import { userType } from "../ManageUser";

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
							title="Account"
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
						<DescriptionItem
							title="Avatar"
							content=<Avatar
								alt="avatar"
								src={`${import.meta.env.VITE_API_URL}/images/avatar/${currentRecord?.avatar}`}
							/>
						/>
					</Col>
				</Row>
				<Row>
					<Col span={12}>
						<DescriptionItem
							title="Created Date"
							content={currentRecord?.createdAt}
						/>
					</Col>
					<Col span={12}>
						<DescriptionItem
							title="Updated Date"
							content={currentRecord?.updatedAt}
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
