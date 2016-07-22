const initPass = {
	valide: null,
	level: null
};

export const passReducer = (state=initPass, action) => {
	switch(action.type){
		case "PASSWORD_VALIDATED": {
			return {...state, valide:true, level: action.payload }
		}
		case "PASSWORD_UNVALID": {
			return {...state, valide:false, level: null }
		}
	}
};

export const vehicleReducer = (state=[], action) => {
	return state;
};

export const priceReducer = (state=[], action) => {
	return state;
};

export const couponReducer = (state=[], action) => {
	return state;
};