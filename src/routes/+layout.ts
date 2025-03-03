import { game } from '$lib/game.svelte.ts'
export const load: LayoutLoad = async ({ fetch }) => {
	const res = await fetch('/data/pokeDb.json')
	const { pokedex, items, moves } = await res.json()
	if (pokedex) game.initData(pokedex)
	if (items) game.initItems(items)
	if (moves) game.initMoves(moves)
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
		],
		pokedex,
		moves
	}
}
