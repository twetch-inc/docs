export default {
	logo: <span>Twetch Documentation</span>,
	docsRepositoryBase: 'https://github.com/twetch-inc/docs/blob/master',
	project: {
		link: 'https://github.com/twetch-inc/docs'
	},
	useNextSeoProps() {
		return {
			titleTemplate: '%s – Twetch'
		}
	},
	head: (
		<>
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta property="og:image" content="https://twetch.com/unfurl.png" />
		</>
	)
}
