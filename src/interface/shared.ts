import { TablePaginationConfig } from "antd";
import { FilterValue } from "antd/es/table/interface";

export interface ApiResponse {
	statusCode: number;
	message: string;
	author: string;
}

export interface PaginationMeta {
	current: number;
	pageSize: number;
	pages: number;
	total: number;
}

export interface SharedTableParams {
    pagination: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Record<string, FilterValue>;
}
export interface UpdateResponse extends ApiResponse{
    data: {
		acknowledged: boolean;
		modifiedCount: number;
		upsertedId: null;
		upsertedCount: number;
		matchedCount: number;
	};
}

export interface DeleteResponse extends ApiResponse{
    data: {
		acknowledged: boolean;
		deletedCount: number;
	};
}