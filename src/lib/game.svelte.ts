class Auth {
	user = $state()
	profil = $state()
	initUser(obj = null) {
		this.user = obj
	}
}


export let auth = new Auth()