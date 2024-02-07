import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { fetchBook } from "@/redux/slices/book.reducer";
import { DownOutlined } from "@ant-design/icons";
import {
	Card,
	Col,
	Divider,
	Dropdown,
	MenuProps,
	Pagination,
	Rate,
	Row,
	Space,
	Spin,
	Tabs,
	TabsProps,
} from "antd";
import Meta from "antd/es/card/Meta";
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import "styles/RightContent.scss";
interface propsType {
	spinning: boolean;
	setSpinning: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function RightContent(props: propsType) {
	const { spinning, setSpinning } = props;
	const data = useAppSelector((state) => state.bookData.data);
	const tableParams = useAppSelector((state) => state.bookData.tableParams);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const onChange = (key: string) => {
		if (key === "0") return;
		setSpinning(true);
		let sortField = key,
			sortOrder = "ascend";
		if (key[0] === "-") {
			sortField = key.slice(1);
			sortOrder = "descend";
		}
		dispatch(
			fetchBook({
				current: +import.meta.env.VITE_INIT_PAGE,
				pageSize: +import.meta.env.VITE_INIT_PAGE_SIZE,
				sortField,
				sortOrder,
			})
		);
		setTimeout(() => {
			setSpinning(false);
		}, 200);
	};
	const onClick: MenuProps["onClick"] = ({ key }) => {
		onChange(key);
	};
	const onChangePagination = (page: number, pageSize: number) => {
		dispatch(fetchBook({ current: page, pageSize }));
	};
	const priceItems: MenuProps["items"] = [
		{
			key: "price",
			label: <span>Price: Low to High</span>,
		},
		{
			key: "-price",
			label: <span>Price: High to Low</span>,
		},
	];
	const removeAccent = (str: string) => {
		return str
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-")
			.toLowerCase();
	};
	const items: TabsProps["items"] = [
		{
			key: "",
			label: "Relevance",
		},
		{
			key: "-sold",
			label: "Top Sales",
		},
		{
			key: "-updatedAt",
			label: "Latest",
		},
		{
			key: "0",
			label: (
				<Dropdown
					menu={{ items: priceItems, onClick }}
					arrow
					autoFocus={true}
				>
					<span>
						<Space>
							Price
							<DownOutlined />
						</Space>
					</span>
				</Dropdown>
			),
		},
	];
	return (
		<Spin size="large" spinning={spinning} wrapperClassName="spin">
			<Content
				style={{
					backgroundColor: "white",
					padding: "10px",
					marginLeft: "10px",
				}}
			>
				<Tabs
					defaultActiveKey="1"
					items={items}
					onChange={onChange}
					tabBarExtraContent={
						<Pagination
							simple
							current={tableParams.pagination.current}
							pageSize={tableParams.pagination.pageSize}
							total={tableParams.pagination.total}
							onChange={onChangePagination}
							responsive={true}
						/>
					}
				/>
				<Space
					direction={"vertical"}
					size={"middle"}
					style={{ width: "100%" }}
				>
					<Row gutter={[8, 16]} className="cards-container">
						{data.length > 0 &&
							data.map((value, index) => (
								<Col xs={24} sm={12} md={8} key={`${index}`}>
									<Card
										hoverable
										onClick={() =>
											navigate(
												`/book/${removeAccent(
													value.mainText
												)}/?id=${value._id}`
											)
										}
										bordered={true}
										style={{ height: "100%" }}
										cover={
											<img
												alt={`${value.thumbnail}`}
												src={`${
													import.meta.env.VITE_API_URL
												}/images/book/${
													value.thumbnail
												}`}
											/>
										}
									>
										<Meta
											title={
												<span
													style={{
														fontWeight: "lighter",
													}}
												>
													{value.mainText}
												</span>
											}
											description={
												<span>
													{Intl.NumberFormat(
														"vi-VN",
														{
															style: "currency",
															currency: "VND",
														}
													).format(value.price)}
												</span>
											}
										/>
										<Rate
											disabled
											defaultValue={5}
											style={{ fontSize: 10 }}
										/>
										<Divider
											type="vertical"
											orientationMargin={0}
										/>
										<span style={{ fontSize: 12 }}>
											{value.sold} sold
										</span>
									</Card>
								</Col>
							))}
					</Row>
					<Row justify={"center"}>
						<Col>
							<Pagination
								current={tableParams.pagination.current}
								pageSize={tableParams.pagination.pageSize}
								total={tableParams.pagination.total}
								onChange={onChangePagination}
								responsive={true}
							/>
						</Col>
					</Row>
				</Space>
			</Content>
		</Spin>
	);
}
