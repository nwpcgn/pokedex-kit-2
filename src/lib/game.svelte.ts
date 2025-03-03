import type { Pokemon, Items, Moves } from './Types'
class GameObj {
	name = $state('')
	pokedex: Pokemon[] = $state([])
	items: Items[] = $state([])
	moves: Moves[] = $state([])
	constructor(name) {
		this.name = name
	}

	initData(array) {
		this.pokedex = array
	}
	initItems(array) {
		this.items = array
	}
	initMoves(array) {
		this.moves = array
	}
}

export let game = new GameObj('Pkmn-Battle')

export class Fighter {
	id: number = $state()
	name: string = $state()
	type: string = $state([])
	hp: number = $state()
	attack: number = $state()
	defense: number = $state()
	speed: number = $state()
	constructor({ id, name, type, hp, attack, defense, speed }) {
		this.id = id
		this.name = name
		this.type = type
		this.attack = attack
		this.defense = defense
		this.speed = speed
		this.hp = hp
	}

	
}

class Auth {
	user = $state()
	profil = $state()
	initUser(obj = null) {
		this.user = obj
		if (obj === null) this.profil = null
	}

	initProfil(obj = null) {
		this.profil = obj
	}
}

export let auth = new Auth()

export const typeColor = {
	Normal: '#A8A878',
	Fire: '#F08030',
	Water: '#6890F0',
	Electric: '#F8D030',
	Grass: '#78C850',
	Ice: '#98D8D8',
	Fighting: '#C03028',
	Poison: '#A040A0',
	Ground: '#E0C068',
	Flying: '#A890F0',
	Psychic: '#F85888',
	Bug: '#A8B820',
	Rock: '#B8A038',
	Ghost: '#705898',
	Dragon: '#7038F8',
	Dark: '#EE99AC',
	Steel: '#B8B8D0'
}

export const getTypeStyle = (key: String) => {
	const color = typeColor[key] ? typeColor[key] : 'rgb(167, 183, 35)'
	const style = `background-color: ${color};`
	return style
}
