import React from 'react'
import { Button } from '@/components/ui/button'

export default function Header() {
	return (
		<header className="bg-black justify-between items-center sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex justify-center h-16 max-w-screen-xl items-center">
				<div className="flex items-center gap-4">
					<img src="/logo.svg" className="h-9" />
				</div>
			</div>
		</header>
	)
}
