interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
	if (totalPages <= 1) {
		return (
			<div className="flex justify-end mt-8">
				<span className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md">1</span>
			</div>
		);
	}

	return (
		<div className="flex justify-end gap-2 mt-8">
			{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
				<button
					type="button"
					key={page}
					onClick={() => onPageChange(page)}
					className={`px-4 py-2 rounded-md ${
						currentPage === page
							? "bg-gray-200 text-gray-700"
							: "bg-white text-gray-600 hover:bg-gray-100"
					}`}
				>
					{page}
				</button>
			))}
		</div>
	);
} 