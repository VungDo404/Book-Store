export interface interface_account {
	statusCode: number;
	message: string;
	data: {
		user: {
			email: string;
			phone: string;
			fullName: string;
			role: string;
			avatar: string;
			id: string;
		};
	};
	author: string;
}
export interface interface_login_response {
    statusCode: number,
    message: string,
    data: {
        access_token: string,
        user: {
            email: string,
            phone: string,
            fullName: string,
            role: string,
            avatar: string,
            id: string
        }
    },
    author: string
}
export interface interface_login_request {
    username?: string;
    password?: string;
};
export interface dashBoardResponse {
	statusCode: number;
	message: string;
	data: {
		countOrder: number;
		countUser: number;
	};
	author: string;
}
export interface accountState {
	isAuthenticated: boolean;
	user: {
		email: string;
		phone: string;
		fullName: string;
		role: string;
		avatar: string;
		id: string;
	};
}
export interface interface_user {
	email?: string;
	phone?: string;
	fullName?: string;
	role?: string;
	avatar?: string;
	id?: string;
}