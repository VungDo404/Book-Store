import {
	GetAllCartResponse,
	PostCartRequest,
	PostCartResponse,
	PutCartRequest,
} from "@/interface/cart";
import { ax } from "@/utils/axios";

const postCart = (Cart: PostCartRequest) => {
	return ax.post<PostCartResponse>("/cart", Cart);
};

const getCartsOfUser = () => {
	return ax.get<GetAllCartResponse>("/cart");
};

const putCart = (id: string, Cart: PutCartRequest) => {
	return ax.put(`/cart/${id}`, Cart);
};

const deleteCart = (id: string) => {
	return ax.delete(`/cart/${id}`);
};

const deleteCarts = (id: string[]) => {
	return ax.delete(`/cart/bulk-delete`, { data: { id } });
};
export { postCart, getCartsOfUser, putCart, deleteCart, deleteCarts };
