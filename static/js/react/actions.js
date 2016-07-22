export function passwordValidated(level){
	return {
		type: "PASSWORD_VALIDATED",
		payload: level
	}
}

export function passwordUnvalid() {
	return {
		type: "PASSWORD_UNVALID",
	}
}