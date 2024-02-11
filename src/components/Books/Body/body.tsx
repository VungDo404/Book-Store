import { Layout } from "antd";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import { useEffect, useState } from "react";
import { handleGetCategory, refresh } from "@/redux/slices/book.reducer";
import { useAppDispatch } from "@/redux/hooks/hooks";
import Sider from "antd/es/layout/Sider";

export default function Body() {
	const [spinning, setSpinning] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(handleGetCategory());
		dispatch(refresh());
	}, []);
	return (
		<Layout style={{ padding: "20px 0" }}>
			<Sider
				style={{ backgroundColor: "white", height: "fit-content" }}
				breakpoint="lg"
				collapsedWidth={0}
				trigger={null}
			>
				<LeftContent setSpinning={setSpinning} />
			</Sider>
			<RightContent spinning={spinning} setSpinning={setSpinning} />
		</Layout>
	);
}
