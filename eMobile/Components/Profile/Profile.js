import React, { Component } from 'react';
import { iOSColors } from 'react-native-typography';
import axios from 'axios';
import { 
	View,
	Text,
	Button,
	Image,
	StyleSheet,
	TextInput,
	KeyboardAvoidingView,
	AsyncStorage,
	} from 'react-native';

import Login from "./Login";
import Settings from "./Settings";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1a1c1e",
		// alignItems: 'center',
		justifyContent: 'center',
	},
	center: {
		// flex: 1,
		// alignItems: 'center',
		// justifyContent: 'center',
		marginHorizontal: 20,
	},
	input: {
		color: iOSColors.white,
		borderBottomWidth: 1,
		borderColor: iOSColors.tealBlue,
		margin: 20,
	}
});

class Profile extends Component {

	state = {
		token: null,
		email: null,
		roles: null,
	}

	async getToken() {
		try {
			let token = await AsyncStorage.getItem('token');
			let email = await AsyncStorage.getItem('email');
			let roles = await AsyncStorage.getItem('roles');
			this.setState({token, email, roles});
		} catch (error) {
			return false;
		}
	}
	
	async removeToken() {
		try {
			await AsyncStorage.removeItem('token');
			console.log("remove");
		} catch (error) {
			return false;
		}
	}

	render() {
		this.getToken();
			if (this.state.token !== null) {
				return (
					<Settings />
				);
			} else {
				return (
					<Login />
				);
			}
	}
}

export default Profile;