import { useAppDispatch } from "@/redux/hooks/hooks";
import { handleGetDashBoard } from "@/redux/slices/accountReducer";
import { Card, Col, Row, Statistic } from "antd";
import { useEffect, useState } from "react";
import CountUp from 'react-countup';

export default function DashBoard() {
	const dispatch = useAppDispatch();
    const [numberOrder, setNumberOrder] = useState<number>(0);
    const [numberUser, setNumberUser] = useState<number>(0);
	const formatter = (value: number) => <CountUp end={value} separator="," />;
    const fetch = async () => {
        const res = await dispatch(handleGetDashBoard()); 
        if(handleGetDashBoard.fulfilled.match(res)){
            setNumberOrder(res.payload.data.countOrder); 
            setNumberUser(res.payload.data.countUser); 
        }
    }
    useEffect(()=> {
        fetch(); 
    }, [])
	return (
		<Row justify="space-around">
			<Col span={11}>
				<Card bordered={false}>
					<Statistic
						title="Total Orders"
						value={numberOrder}
						formatter={formatter}
					/>
				</Card>
			</Col>
			<Col span={11}>
				<Card bordered={false}>
					<Statistic
						title="Total User"
						value={numberUser}
						precision={2}
						formatter={formatter}
					/>
				</Card>
			</Col>
		</Row>
	);
}
