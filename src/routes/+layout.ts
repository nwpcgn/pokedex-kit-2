export const load: LayoutLoad = async () => {
	return {
		nav: [
			{
				name: 'Game',
				href: '/game',
				icon: 'pkmn-home'
			},
			{
				name: 'Pokedex',
				href: '/game/pokedex',
				icon: 'pkmn-db'
			},
			{
				name: 'Battle',
				href: '/game/battle',
				icon: 'pkmn-archive'
			},
			{
				name: 'Settings',
				href: '/game/settings',
				icon: 'pkmn-options'
			}
		]
	}
}
