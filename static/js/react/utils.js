import store from "./store";
import bcrypt from "bcryptjs";

// Level 1 = superuser
// Level 2 = staffuser

// const HASH_SUPERUSER = "$2a$10$c5F2f/dYJWOFrUw27MKk1Olcd8j9b36u6AHvkcacH4FnJsT3l0RIO";
// const HASH_STAFF = "$2a$10$cROLpIwfpQ.ANYoBG0F.UO3D5kbCjCbKNyDJR6iNIJLEd92CIrG7e";
// creating hash of the password
// var salt = bcrypt.genSaltSync(10);
// var hash = bcrypt.hashSync("test2", salt);
// console.log(hash);

export function checkSuperUserPass(in_pass) {
	const superuser_hash = store.getState().pass.superuser_hash;
	return bcrypt.compareSync(in_pass, superuser_hash);
}

export function checkStaffUserPass(in_pass) {
	const staffuser_hash = store.getState().pass.staffuser_hash;
	return bcrypt.compareSync(in_pass, staffuser_hash);
}

export function checkPassLevel(in_pass) {
	if(checkSuperUserPass(in_pass)){
		return 1;
	} else if(checkStaffUserPass(in_pass)) {
		return 2;
	} else {
		return null;
	}
}