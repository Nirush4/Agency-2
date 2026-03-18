import type { Metadata } from 'next';
import '../styles/globals.css';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
	title: 'FridgeChef',
	description: 'Recipe and fridge planner app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className='min-h-screen bg-[#141b22] text-[#f5f1e8]'>
				<div className='min-h-screen md:flex'>
					<Navbar />

					<div className='flex min-h-screen flex-1 flex-col'>
						<main className='flex-1 pb-16 md:pb-0'>{children}</main>
						<Footer />
					</div>
				</div>
			</body>
		</html>
	);
}
