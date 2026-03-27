'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CircleUserRound, LogOut, Settings } from 'lucide-react';
import { createClient } from '@/service/api/subabaseClient';

type AuthUserMenuProps = {
	user: {
		email?: string | null;
	} | null;
};

export default function AuthUserMenu({ user }: AuthUserMenuProps) {
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const router = useRouter();

	const avatarUrl = typeof window !== 'undefined' ? localStorage.getItem('avatar_url') : null;

	const username = typeof window !== 'undefined' ? localStorage.getItem('username') : null;

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	async function handleLogout() {
		const supabase = createClient();
		await supabase.auth.signOut();

		if (typeof window !== 'undefined') {
			localStorage.removeItem('username');
			localStorage.removeItem('avatar_url');
		}

		setOpen(false);
		router.push('/login');
		router.refresh();
	}

	return (
		<div
			ref={menuRef}
			className='relative flex items-center gap-3'>
			{!user ? (
				<>
					<button
						type='button'
						className='flex h-9 w-9 items-center justify-center rounded-full bg-[#d9d4c8] text-[#697542] transition hover:bg-[#e7e2d8]'>
						<CircleUserRound size={18} />
					</button>

					<Link
						href='/login'
						className='rounded-md bg-[#d9d4c8] px-4 py-2 text-xs font-medium text-[#2b2f24] transition hover:bg-[#e7e2d8]'>
						PROFILE/Login/Register
					</Link>
				</>
			) : (
				<>
					<button
						type='button'
						onClick={() => setOpen(prev => !prev)}
						aria-haspopup='menu'
						aria-expanded={open}
						className='flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#8a9460]/40 bg-[#d9d4c8] text-[#697542] transition hover:bg-[#e7e2d8]'>
						{avatarUrl ? (
							<Image
								src={avatarUrl}
								alt='User avatar'
								width={40}
								height={40}
								className='h-full w-full object-cover'
							/>
						) : (
							<CircleUserRound size={20} />
						)}
					</button>

					{open && (
						<div className='absolute right-0 top-12 z-50 min-w-50 rounded-xl border border-[#2d3621] bg-[#1b232b] p-2 shadow-xl'>
							<div className='border-b border-[#2d3621] px-3 py-2'>
								<p className='truncate text-sm font-medium text-[#f5f1e8]'>{username || 'User'}</p>

								{user.email && <p className='truncate text-xs text-[#cfc8b8]'>{user.email}</p>}
							</div>

							<div className='mt-2 flex flex-col'>
								<Link
									href='/settings'
									onClick={() => setOpen(false)}
									className='flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[#cfc8b8] transition hover:bg-[#697542]/10 hover:text-[#f5f1e8]'>
									<Settings size={16} />
									<span>Settings</span>
								</Link>

								<button
									type='button'
									onClick={handleLogout}
									className='flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[#cfc8b8] transition hover:bg-[#697542]/10 hover:text-[#f5f1e8]'>
									<LogOut size={16} />
									<span>Logout</span>
								</button>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}
