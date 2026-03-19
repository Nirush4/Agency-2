import { CircleUserRound } from 'lucide-react';

export default function HomeTopBar() {
	return (
		<div className='mb-6 flex items-center justify-end gap-3'>
			<button
				type='button'
				className='flex h-9 w-9 items-center justify-center rounded-full bg-[#d9d4c8] text-[#697542] transition hover:bg-[#e7e2d8]'>
				<CircleUserRound size={18} />
			</button>

			<button
				type='button'
				className='rounded-md bg-[#d9d4c8] px-4 py-2 text-xs font-medium text-[#2b2f24] transition hover:bg-[#e7e2d8]'>
				PROFILE/Login/Register
			</button>
		</div>
	);
}
