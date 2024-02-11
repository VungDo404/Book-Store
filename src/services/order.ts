import {
	dataOrderAdminResponse,
	getOrderResponse,
	postOrderRequest,
	postOrderResponse,
} from "@/interface/order";
import { ax } from "@/utils/axios";

const postOrder = (cart: postOrderRequest) => {
	return ax.post<postOrderResponse>("/order", cart);
};
const getOrder = () => {
	return ax.get<getOrderResponse>("/history");
};
const getOrderAdmin = (current: number, pageSize: number, query: string) => {
	return ax.get<dataOrderAdminResponse>(
		`/order?current=${current}&pageSize=${pageSize}${query}`
	);
};
export { postOrder, getOrder, getOrderAdmin };
