import Link from 'next/link';
import { Instagram, Twitter, Github, Facebook } from 'lucide-react';

export default function Footer() {
	return (
		<footer className='border-t border-[#2d3621] bg-[#10161c] text-[#cfc8b8]'>
			<div className='mx-auto max-w-6xl px-6 py-10'>
				<div className='grid gap-8 md:grid-cols-4'>
					{/* BRAND */}
					<div>
						<h2 className='text-sm font-semibold uppercase tracking-[0.2em] text-[#f5f1e8]'>FridgeChef</h2>

						<p className='mt-3 text-sm leading-relaxed'>
							Plan meals, organize recipes and discover dishes from around the world.
						</p>
					</div>

					{/* NAVIGATION */}
					<div>
						<h3 className='mb-3 text-xs font-semibold uppercase tracking-wider text-[#f5f1e8]'>Navigation</h3>

						<div className='flex flex-col gap-2 text-sm'>
							<Link
								href='/about'
								className='hover:text-white transition'>
								About
							</Link>

							<Link
								href='/contact'
								className='hover:text-white transition'>
								Contact
							</Link>
						</div>
					</div>

					{/* LEGAL */}
					<div>
						<h3 className='mb-3 text-xs font-semibold uppercase tracking-wider text-[#f5f1e8]'>Legal</h3>

						<div className='flex flex-col gap-2 text-sm'>
							<Link
								href='/privacy'
								className='hover:text-white transition'>
								Privacy Policy
							</Link>

							<Link
								href='/terms'
								className='hover:text-white transition'>
								Terms of Service
							</Link>
						</div>
					</div>

					{/* CONTACT */}
					<div>
						<h3 className='mb-3 text-xs font-semibold uppercase tracking-wider text-[#f5f1e8]'>Contact</h3>

						<div className='flex flex-col gap-2 text-sm'>
							<p>Oslo, Norway</p>
							<p>+47 123 45 678</p>
							<p>contact@fridgechef.app</p>

							{/* SOCIAL */}
							<div className='mt-3 flex gap-3'>
								<Link href='#'>
									<Instagram
										size={18}
										className='hover:text-white transition'
									/>
								</Link>

								<Link href='#'>
									<Twitter
										size={18}
										className='hover:text-white transition'
									/>
								</Link>

								<Link href='#'>
									<Github
										size={18}
										className='hover:text-white transition'
									/>
								</Link>

								<Link href='#'>
									<Facebook
										size={18}
										className='hover:text-white transition'
									/>
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* BOTTOM BAR */}

				<div className='mt-10 border-t border-[#2d3621] pt-4 text-xs text-[#a8a08f] flex flex-col md:flex-row md:justify-between gap-2'>
					<p>© {new Date().getFullYear()} FridgeChef</p>

					<div className='flex gap-4'>
						<Link
							href='/privacy'
							className='hover:text-white'>
							Privacy Policy
						</Link>

						<Link
							href='/terms'
							className='hover:text-white'>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
