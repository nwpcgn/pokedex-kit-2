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
