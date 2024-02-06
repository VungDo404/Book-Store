import { Row } from "antd";
import SearchBook from "./Search/SearchBookTable";
import BookTable from "./Table/BookTable";
import BookDetail from "./Table/Body/BookDetail";
import { useEffect, useState } from "react";
import { bookType } from "../../../interface/book";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { fetchBook } from "@/redux/slices/book.reducer";

export default function Books() {
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const initRecord: bookType = {
		_id: "",
		thumbnail: "",
		slider: [],
		mainText: "",
		author: "",
		price: 0,
		sold: 0,
		quantity: 0,
		category: "",
		createdAt: "",
		updatedAt: "",
		__v: 0,
	};
	const [open, setOpen] = useState<boolean>(false);
	const [currentRecord, setCurrentRecord] = useState<bookType>(initRecord);
	const showDrawer = () => {
		setOpen(true);
	};
	const onClose = () => {
		setOpen(false);
	};
	const fetchBooks = async () => {
		setLoading(true);
		await dispatch(fetchBook({ current: 1, pageSize: 10 }));
		setLoading(false);
	};
	useEffect(() => {
		fetchBooks();
	}, []);
	return (
		<>
			<Row justify="space-around">
				<SearchBook fetchBooks={fetchBooks} />
				<BookTable
					showDrawer={showDrawer}
					setCurrentRecord={setCurrentRecord}
					loading={loading}
				/>
			</Row>
			<BookDetail
				currentRecord={currentRecord}
				onClose={onClose}
				open={open}
			/>
		</>
	);
}
