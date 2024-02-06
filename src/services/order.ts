import { postOrderRequest, postOrderResponse } from "@/interface/order";
import { ax } from "@/utils/axios";

const postOrder = (cart: postOrderRequest) => {
	return ax.post<postOrderResponse>("/order", cart);
};

export {
    postOrder
}