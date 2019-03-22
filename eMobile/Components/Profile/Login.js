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

class Login extends Component {

	constructor(props) {
		super(props);
	}

	state = {
		email: "",
		password: "",
	};
	
	async storeData(user) {
		try {
			await AsyncStorage.setItem("email", user.email);
			await AsyncStorage.setItem("firstname", user.firstname);
			await AsyncStorage.setItem("lastname", user.lastname);
			await AsyncStorage.setItem("token", user.apiToken);
			await AsyncStorage.setItem("address", user.address);
			await AsyncStorage.setItem("country", user.country);
			await AsyncStorage.setItem("state", user.state);
			await AsyncStorage.setItem("roles", user.roles);
			this.getData();
		} catch (error) {
			console.log("error store:", error);
		}
	}

	async getData() {
		try {
			let token = await AsyncStorage.getItem('token');
			console.log("token", token);
		} catch (error) {
			console.log("error get");
		}
	}

	handleLogin = () => {
		const user = {
			"email": this.state.email,
			"password": this.state.password
		};
		axios.post("http://192.168.0.13:8000/api/login", user,{
        	headers: {
            	'Content-Type': 'application/json',
        	}
    	})
		.then((res) => {
			if (!('error' in res.data)) {
				for (key in res.data) {
					this.setState({[key]: res.data[key]});
				}
				this.storeData(res.data);
			} else {
				this.setState({error: res.data.error});
				console.log(res.data.error);
			}
		})
		.catch((err) => {
			console.log(err);
		})
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.container}>
				<View style={styles.center}>
					<Image source={require('../../assets/logo.png')}/>
					<TextInput
					style={styles.input}
					name="email"
					label="Email"
					placeholder="Email"
					onChangeText={(email) => this.setState({email})}
					/>
					<TextInput
					style={styles.input}
					name="password"
					label="Password"
					secureTextEntry={true}
					placeholder="Password"
					onChangeText={(password) => this.setState({password})}
					/>
					<Button 
					title="Login"
					color={iOSColors.tealBlue}
					onPress={this.handleLogin}
					/>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

export default Login;