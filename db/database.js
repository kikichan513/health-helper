import React, { Component } from 'react';

import { AsyncStorage, View, Button, Text, StyleSheet, Dimensions } from 'react-native';

const numTasks = 0

export async function _storeDB(user, item) { 
	try {
		await AsyncStorage.setItem(user, item);
	} catch (error) {
		// Error saving data
	}
};


export async function _retrieveDB(user) {
	try {
		var value = await AsyncStorage.getItem(user);
		if (value !== null) {
			console.log(value)
			return value;
			// return value;
		}
	} catch (error) {
		//Error retrieving data
	}
}

export function _getnumTask(){
	return numTasks;
};

module.exports = { 
	_storeDB,
	_retrieveDB
}