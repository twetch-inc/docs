'use client'

import React from 'react'
import { Button } from '@/components/ui/button'

export default function Home() {
	return (
		<main className="flex flex-col gap-4 w-full relative max-w-full w-[600px] container py-14">
			<div className="flex flex-col justify-center items-center gap-2">
				<h1 className="font-bold text-2xl md:text-3xl text-center whitespace-nowrap">
					It’s time to say goodbye.
				</h1>
				<p className="text-sm text-center text-[#D4D4D8]">
					Thank you for being a part of this journey, your support throughout the years gave life to
					this incredible project.
					<br />
					<br />
					Yours wallet will be the new home for all your on-chain assets. Please back up your Twetch
					account seed phrase and import it to the{' '}
					<a className="text-[#22C55E]" target="_blank" href="https://yours.org">
						Yours wallet extension.
					</a>
				</p>
			</div>
		</main>
	)
}
