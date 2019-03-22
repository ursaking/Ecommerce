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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#1a1c1e",
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	title: {
		flex: 1,
		marginVertical: 20,
		fontSize: 30,
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		marginHorizontal: 10,
	},
});

class Settings extends Component {
	state = {
		token: null,
		email: null,
		firstname: null,
		lastname: null,
		roles: null,
	}

	async getToken() {
		try {
			let token = await AsyncStorage.getItem('token');
			let email = await AsyncStorage.getItem('email');
			let firstname = await AsyncStorage.getItem('firstname');
			let lastname = await AsyncStorage.getItem('lastname');
			let roles = await AsyncStorage.getItem('roles');
			this.setState({token, email, firstname, lastname, roles});
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

	async handleLogout() {
		try {
			await AsyncStorage.clear();
		} catch(e) {
			return e;
		}
	}

	render() {
		this.getToken();
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Hello {this.state.firstname}</Text>
				<View style={styles.center}>
					<Text>Connected as {this.state.email}</Text>
					<Text>Token: {this.state.token}</Text>
					<Text>roles: {this.state.roles}</Text>
					<Text>firstname: {this.state.firstname}</Text>
					<Text>lastname: {this.state.lastname}</Text>
					<Button
					title="Disconnect"
					onPress={this.handleLogout}
					/>
				</View>
			</View>
		);
	}
}

export default Settings;