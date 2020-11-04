// @flow

import {  Toast } from 'native-base';


export const SuccessToaster = (message) => {
   
	Toast.show({
		text: message,
		duration: 3000,
		position: "bottom",
		type: "success",
		textStyle: { textAlign: "center" },
	})
}


export const ErrorToaster = (message) => {
   
	Toast.show({
		text: message,
		duration: 3000,
		position: "bottom",
		type: "danger",
		textStyle: { textAlign: "center" },
	})
}



export const WarningToaster = (message) => {
   
	Toast.show({
		text: message,
		duration: 3000,
		position: "bottom",
		type: "warning",
		textStyle: { textAlign: "center" },
	})
}


export const InfoToaster = (message) => {
   
	Toast.show({
		text: message,
		duration: 3000,
		position: "bottom",		
		textStyle: { textAlign: "center" },
	})
}
