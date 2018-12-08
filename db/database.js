import React from 'react';
import { AsyncStorage, View, Button, Text, StyleSheet, Dimensions } from 'react-native';

const var user = "Funny Witch"
const var item = 98

_storeDB = async () => {
	try {
		await AsyncStorage.setItem(user, item);
	} catch (error) {
		// Error saving data
	}
}

_retrieveDB = async () => {
	try {
		const value = await AsyncStorage.getItem(user);

		if (value !== null) {
			//data
			console.log(value);
		}
	} catch (error) {
		//Error retrieving data
	}
}