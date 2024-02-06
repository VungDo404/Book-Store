import { Content } from "antd/es/layout/layout";
import { useLocation } from "react-router-dom";
import "styles/Detail.scss";
import { Breadcrumb, Row } from "antd";
import LeftDetail from "./LeftDetail";
import RightDetail from "./RightDetail";
import { useEffect, useState } from "react";
import { bookType } from "@/interface/book";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { handleGetBookByID } from "@/redux/slices/book.reducer";
import NotFound from "@/components/Results/NotFound";
export default function Detail() {
	const { search } = useLocation();
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);
	const query = new URLSearchParams(search);
	const id = query.get("id");
	const [data, setData] = useState<bookType | {}>({});
	const getBook = async () => {
		const res = await dispatch(handleGetBookByID(id as string));
		if (handleGetBookByID.rejected.match(res)) {
			setError(true);
		} else if (handleGetBookByID.fulfilled.match(res)) {
			setLoading(false);
			setData(res.payload.data);
		}
	};
	useEffect(() => {
		setTimeout(() => {
			getBook();
		}, 1000);
	}, []);
	return (
		<>
		<Breadcrumb style={{ margin: "16px 0" }}>
					<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
		<Content
			style={{
				backgroundColor: "white",
				padding: "15px",
			}}
		>
			{error ? (
				<NotFound />
			) : (
				<Row>
					<LeftDetail data={data as bookType} loading={loading} />
					<RightDetail data={data as bookType} loading={loading} />
				</Row>
			)}
		</Content>
		</>
	);
}
