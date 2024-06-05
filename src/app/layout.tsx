import type { Metadata } from 'next'
import Header from './header'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Twetch',
	description: 'Twetch',
	openGraph: {
		title: 'Twetch',
		description: 'Twetch',
		url: 'https://twetch.com',
		images: [
			{
				url: 'https://twetch.org/unfurl.png'
			}
		]
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" className="">
			<body className={`${inter.className} bg-black`}>
				<Header />
				{children}
				<Toaster />
			</body>
		</html>
	)
}
