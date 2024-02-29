import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import saveUser from '../features/user/authSlice'

export const URL_BASE = "https://maadsenemobi.com/api/";

export function setItem(key, data) {
	data = JSON.stringify(data);
	return AsyncStorage.setItem(key, data);
}

export function getItem(key) {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem(key).then(data => {
			resolve(JSON.parse(data));
		});
	});
}

export function removeItem(key) {
	return AsyncStorage.removeItem(key);
}

export function clearAsyncStorate(key) {
	return AsyncStorage.clear();
}

export function setUserData(data) {
	data = JSON.stringify(data);
	return AsyncStorage.setItem('userData', data);
}

export async function getUserData() {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem('userData').then(data => {
			resolve(JSON.parse(data));
		});
	});
}
export async function getLogged() {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem('logged').then(data => {
			resolve(JSON.parse(data));
		});
	});
}
export async function getDataDBasynStore() {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem('dataAppDB').then(data => {
			resolve(JSON.parse(data));
		});
	});
}
export async function clearUserData() {
	return AsyncStorage.removeItem('userData');
}
export const saveUserData = (data) =>  {

	const dispatch = useDispatch();
	//dispatch(saveUser(data));


}

export function setUserMyCategory(data) {
	
	data = JSON.stringify(data);
	return AsyncStorage.setItem('userMyCategory', data);
}