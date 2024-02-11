import { dashBoardResponse } from "@/interface/account";
import { ax } from "@/utils/axios";

const dashBoard = () => {
	return ax.get<dashBoardResponse>("/database/dashboard");
};

export { dashBoard };
