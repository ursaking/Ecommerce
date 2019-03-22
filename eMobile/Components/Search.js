import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import { iOSColors } from 'react-native-typography';
import axios from 'axios';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	KeyboardAvoidingView,
	Button,
	} from 'react-native';


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1a1c1e",
	},
	center: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 20,
	},
	text: {
		color: iOSColors.gray,
	}
});

class Search extends Component {

	state = {
		search: "",
		result: "",
	}

	handleChange = search => {
		this.setState({search});

		axios.get("https://jsonplaceholder.typicode.com/users/" + search)
		.then((res) => {
			console.log(res.data);
		})
		.catch((err) => {
			console.log("Error", err.data);
		})
	}

	render() {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<View style={{marginTop:20}}>
					<SearchBar
					placeholder="Search ..."
					onChangeText={search => this.handleChange(search)}
					// lightTheme={true}
					/>
				</View>
				<View style={styles.center}>
					<Text style={styles.text}>
						Commencez à écrire dans la zone de recherche.
					</Text>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

export default Search;