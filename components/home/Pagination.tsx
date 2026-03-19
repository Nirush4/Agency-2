'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';

type PaginationProps = {
	totalPages?: number;
	initialPage?: number;
};

export default function Pagination({ totalPages = 5, initialPage = 1 }: PaginationProps) {
	const [currentPage, setCurrentPage] = useState(initialPage);

	const pages = useMemo(() => {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}, [totalPages]);

	const goToPreviousPage = () => {
		setCurrentPage(prev => Math.max(prev - 1, 1));
	};

	const goToNextPage = () => {
		setCurrentPage(prev => Math.min(prev + 1, totalPages));
	};

	const goToPage = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className='flex items-center justify-center gap-2'>
			<button
				type='button'
				onClick={goToPreviousPage}
				disabled={currentPage === 1}
				className='flex h-9 w-9 items-center justify-center rounded-md border border-[#8a9460]/30 bg-[#697542] text-[#f5f1e8] transition hover:bg-[#7a8550] disabled:cursor-not-allowed disabled:opacity-40'>
				<ChevronLeft size={16} />
			</button>

			{pages.map(page => {
				const isActive = page === currentPage;

				return (
					<button
						key={page}
						type='button'
						onClick={() => goToPage(page)}
						className={`flex h-9 min-w-9 items-center justify-center rounded-md border px-3 text-sm transition ${
							isActive
								? 'border-[#8a9460] bg-[#f5f1e8] font-semibold text-[#141b22]'
								: 'border-[#8a9460]/30 bg-[#1b232b] text-[#cfc8b8] hover:bg-[#697542]/20 hover:text-[#f5f1e8]'
						}`}>
						{page}
					</button>
				);
			})}

			<button
				type='button'
				onClick={goToNextPage}
				disabled={currentPage === totalPages}
				className='flex h-9 w-9 items-center justify-center rounded-md border border-[#8a9460]/30 bg-[#697542] text-[#f5f1e8] transition hover:bg-[#7a8550] disabled:cursor-not-allowed disabled:opacity-40'>
				<ChevronRight size={16} />
			</button>
		</div>
	);
}
