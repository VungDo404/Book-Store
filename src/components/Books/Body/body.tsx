import { Layout } from "antd";
import LeftContent from "./LeftContent";
import RightContent from "./RightContent";
import { useEffect, useState } from "react";
import { handleGetCategory, refresh } from "@/redux/slices/book.reducer";
import { useAppDispatch } from "@/redux/hooks/hooks";

export default function Body() {
	const [spinning, setSpinning] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(handleGetCategory());
		dispatch(refresh());
	}, []);
	return (
		<Layout style={{ padding: "20px 0" }}>
			<LeftContent setSpinning={setSpinning} />
			<RightContent spinning={spinning} setSpinning={setSpinning} />
		</Layout>
	);
}
