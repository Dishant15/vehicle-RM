import axios from 'axios';
import { generateHash } from "./utils";

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

export function changePassword(level, new_password) {
	return ((dispatch) => {
		const dataToServer = {
			level,
			hash:generateHash(new_password)
		};
		axios.post("http://localhost:8080/change-pass", dataToServer)
			.then((response) => {
				dispatch({
					type:"PASSWORD_CHANGED",
					payload: response.data
				});
			});
	});
}

export function changePassStateReset() {
	return {
		type: "PASS_CHANGE_STATE_RESET"
	};
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