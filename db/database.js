import React, { Component } from 'react';

import { AsyncStorage, View, Button, Text, StyleSheet, Dimensions } from 'react-native';

var numTasks;

export async function _storeDB(user, item) { 
	try {
		await AsyncStorage.setItem(user, item);
	} catch (error) {
	}
};

export async function _retrieveDB(user) {
	try {
		const value = await AsyncStorage.getItem(user);
		if (value !== null) {
			console.log("print" + value)
			return value;
		}
	} catch (error) {
	}
}

export async function _getnumTask(){
	try {
		const value = await AsyncStorage.getItem('numTasks');
		return value;
	} catch (error) {}

};

export async function _addnewTask(){
	try {
		const value = await AsyncStorage.getItem('numTasks');
		value++;
		await AsyncStorage.setItem('numTasks', value.toString());
	} catch (error) {}
}

module.exports = { 
	_storeDB,
	_retrieveDB,
	_getnumTask,
	_addnewTask
}