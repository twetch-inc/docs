import React from 'react'
import { Clipboard, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CopyButton(props: { title?: string; value: string; copyValue?: string }) {
	const { title, value, copyValue } = props
	const [copied, setCopied] = React.useState(false)

	const handleCopy = React.useCallback(() => {
		setCopied(true)

		navigator.clipboard.writeText(copyValue || value)

		setTimeout(() => {
			setCopied(false)
		}, 2000)
	}, [value, copyValue])

	return (
		<div className="flex flex-col gap-1 max-w-[270px] md:max-w-[350px]">
			{title && <p className="text-[#D4D4D8] text-xs text-center select-none">{title}</p>}
			<div
				className="h-8 px-3 rounded-lg border justify-between flex items-center cursor-pointer"
				onClick={handleCopy}
			>
				<p className="text-xs text-[#D4D4D8] overflow-hidden text-ellipsis select-none">{value}</p>
				<Button variant="ghost" size="icon" className="h-6 w-6 min-w-6 min-h-6">
					{!copied && <Clipboard className="h-3 w-3" />}
					{copied && <Check className="h-3 w-3" />}
				</Button>
			</div>
		</div>
	)
}
