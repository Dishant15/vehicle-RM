import axios from 'axios';

export function getHashPass(){
	// get password hash saved from the database
	return ((dispatch) => {
		axios.get("http://localhost:8080/get-pass")
			.then((reaponse) => {
				dispatch({
					type:"PASS_REQ_SUCCESS",
					payload: reaponse.data
				});
			})
			.catch((err) => {
				dispatch({
					type: "PASS_REQ_FAILED",
					payload: err
				});
			});
	});
	
}

export function logout(level){
	return {
		type: "USER_LOGOUT"
	};
}

export function passwordValidated(level){
	return {
		type: "PASSWORD_VALIDATED",
		payload: level
	};
}

export function passwordUnvalid() {
	return {
		type: "PASSWORD_UNVALID"
	};
}