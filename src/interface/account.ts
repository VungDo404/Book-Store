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