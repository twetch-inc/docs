'use client'

import * as React from 'react'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'

import { Button } from '@/components/ui/button'
import CopyButton from '@/components/copy-button'
import { Eye, EyeOff, Check, ChevronsUpDown } from 'lucide-react'
import useSWR from 'swr'

export default function Accounts() {
	const [open, setOpen] = React.useState(false)
	const [data, setData] = React.useState(null)

	const handleSelect = React.useCallback(async (id) => {
		setSelected(id)

		const { ExtendedPrivateKey, PublicKey } = await import('@/utils/sdk.wasm')
		const account = accounts.find((e) => e.id === id)

		const xpriv = ExtendedPrivateKey.from_mnemonic(Buffer.from(account.seed, 'utf8'), null)
		const derived = xpriv.derive_from_path('m/0/0')

		setData({
			private_key: derived.get_private_key().to_hex(),
			wif: derived.get_private_key().to_wif(),
			public_key: PublicKey.from_private_key(derived.get_private_key()).to_hex(),
			address: PublicKey.from_private_key(derived.get_private_key()).to_address().to_string()
		})
	}, [])

	const accounts = React.useMemo(() => {
		if (typeof window === 'undefined') {
			return []
		}

		try {
			const d = JSON.parse(localStorage.getItem('accounts'))

			return d
		} catch (e) {
			console.log(e)
		}

		return []
	}, [data, handleSelect])

	const [selected, setSelected] = React.useState(accounts[0]?.id)

	const selectedAccount = React.useMemo(() => {
		const a = accounts.find((e) => e.id === selected)
		if (!data && a) {
			handleSelect(a.id)
		}
		return a
	}, [selected, accounts, data])

	const renderAccount = React.useCallback((account) => {
		return (
			<SelectItem value={account.id}>
				@{account?.id} {account.name}
			</SelectItem>
		)
	}, [])

	const renderSeed = React.useCallback((v, i) => {
		return (
			<div className="flex items-center gap-2" key={i}>
				<p className="text-xs w-[11px] select-none">{i + 1}</p>
				<div className="py-2 px-4 rounded-lg border text-xs text-[#D4D4D8] text-center w-full">
					{v}
				</div>
			</div>
		)
	}, [])

	const handleOpen = React.useCallback(async () => {
		if (!data) {
			await handleSelect(selectedAccount?.id)
		}

		setOpen(true)
	}, [data, selectedAccount])

	if (!accounts?.length) {
		return <React.Fragment />
	}

	return (
		<div className="flex flex-col items-center gap-4 max-w-full">
			<Select value={selected} onValueChange={handleSelect}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="" />
				</SelectTrigger>
				<SelectContent>{accounts.map(renderAccount)}</SelectContent>
			</Select>
			<CopyButton value={data?.address} />
			{!open && (
				<Button className="flex gap-2" onClick={handleOpen}>
					<Eye />
					Show seed phrase
				</Button>
			)}
			{open && (
				<Button className="flex gap-2" onClick={() => setOpen(false)}>
					<EyeOff />
					Hide seed phrase
				</Button>
			)}
			{open && (
				<div className="border rounded-lg flex flex-col items-center p-4 gap-4 container">
					<div className="flex flex-col gap-1">
						<p className="text-[#D4D4D8] text-xs text-center select-none">Seed Phrase</p>
						<div className="grid grid grid-cols-2 gap-3">
							{selectedAccount.seed.split(' ').map(renderSeed)}
						</div>
					</div>
					<CopyButton value="Copy Seed" copyValue={selectedAccount.seed} />
					<CopyButton title="WIF Private Key" value={data.wif} />
					<CopyButton title="HEX Private Key" value={data.private_key} />
					<CopyButton title="Derivation Path" value="m/0/0" />
				</div>
			)}
		</div>
	)
}
