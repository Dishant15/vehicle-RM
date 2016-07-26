import axios from 'axios';
import { generateHash } from "./utils";

export function addNewCoupon(coupon) {
	// add new vehicle entry to database
	return ((dispatch) => {
		axios.post("http://localhost:8015/add-coupon", coupon)
			.then((response) => {
				// server must return whole new list of entries so we can update store with it
				dispatch({
					type:"COUPON_ADDED",
					payload: response.data
				});
			})
			.catch((err) => {
				dispatch({
					type: "COUPON_ADDITION_FAIL",
					payload: err
				});
			});
	});
}

export function editVehicleEntry(entry) {
	// add new vehicle entry to database
	return ((dispatch) => {
		axios.post("http://localhost:8015/edit-vehicle", entry)
			.then((response) => {
				// server must return whole new list of entries so we can update store with it
				dispatch({
					type:"VEHICLE_ENTRY_EDITED",
					payload: response.data
				});
			})
			.catch((err) => {
				dispatch({
					type: "VEHICLE_ENTRY_EDIT_FAILED",
					payload: err
				});
			});
	});
}

export function getVehicles() {
	return ((dispatch) => {
		dispatch({type: "VEHICLES_FETCHING"});
		axios.get("http://localhost:8015/get-vehicles")
			.then((response) => {
				dispatch({
					type:"VEHICLES_FETCHED",
					payload: response.data
				});
			})
			.catch((err) => {
				dispatch({
					type: "VEHICLES_FETCH_FAILED",
					payload: err
				});
			});
	});
}

export function newVehicleEntry(newEntry) {
	// add new vehicle entry to database
	return ((dispatch) => {
		axios.post("http://localhost:8015/add-vehicle", newEntry)
			.then((response) => {
				dispatch({
					type:"VEHICLE_ENTRY_CREATED",
					payload: response.data
				});
			})
			.catch((err) => {
				dispatch({
					type: "VEHICLE_ENTRY_FAILED",
					payload: err
				});
			});
	});
}

export function getHashPass(){
	// get password hash saved from the database
	return ((dispatch) => {
		axios.get("http://localhost:8015/get-pass")
			.then((response) => {
				dispatch({
					type:"PASS_REQ_SUCCESS",
					payload: response.data
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
		dispatch({type:"PASSWORD_CHANGING"});
		axios.post("http://localhost:8015/change-pass", dataToServer)
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

export function login(level){
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