'use client';

import { useState } from 'react';

type HeroSectionProps = {
	title?: string;
	subtitle?: string;
	weekLabel?: string;
};

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function HeroSection({
	title = 'Dish Title',
	subtitle = 'Weekly Menu',
	weekLabel = 'Week 11',
}: HeroSectionProps) {
	const [activeDay, setActiveDay] = useState('Mon');

	return (
		<section className='overflow-hidden rounded-2xl border border-[#2d3621] bg-[#1b232b] shadow-lg'>
			
			<div className='relative h-65 md:h-85'>
				<div className='absolute inset-0 bg-[linear-gradient(135deg,#697542_0%,#44502a_35%,#1b232b_100%)]' />

				<div className='absolute inset-0 flex items-center justify-center text-sm uppercase tracking-[0.2em] text-[#f5f1e8]/30'>
					Image Placeholder
				</div>

				<div className='absolute inset-0 bg-black/25' />

				<div className='absolute bottom-0 p-4 md:p-6'>
					<p className='text-xs uppercase tracking-wider text-[#cfc8b8]'>
						{subtitle} • {weekLabel}
					</p>

					<h1 className='text-2xl font-semibold text-[#f5f1e8] md:text-4xl'>{title}</h1>

					
					<p className='mt-1 text-xs text-[#cfc8b8]'>Selected day: {activeDay}</p>
				</div>
			</div>

			
			<div className='border-t border-[#8a9460]/30 bg-[#c4c7a8] px-2 py-2'>
				<div className='grid grid-cols-7 gap-1'>
					{days.map(day => {
						const isActive = day === activeDay;

						return (
							<button
								key={day}
								onClick={() => setActiveDay(day)}
								className={`rounded-md px-2 py-2 text-[10px] font-medium uppercase tracking-wide transition md:text-xs ${
									isActive ? 'bg-[#141b22] text-[#f5f1e8]' : 'text-[#1b232b] hover:bg-[#aeb58a]'
								}`}>
								{day}
							</button>
						);
					})}
				</div>
			</div>
		</section>
	);
}
