import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native';

import { iOSColors } from 'react-native-typography';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1a1c1e",
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	center: {
		// flex: 1,
		// alignItems: 'center',
		// justifyContent: 'center',
		marginHorizontal: 20,
		color: iOSColors.green,
	},
	input: {
		color: iOSColors.white,
		borderBottomWidth: 1,
		borderColor: iOSColors.tealBlue,
		margin: 20,
	}
});

export default class MyInlineWeb extends Component {
	render() {
		return (
			<KeyboardAvoidingView style={styles.container}>
				<View>
					<Text style={{color:iOSColors.white}}>Credit Card</Text>
					<TextInput
					style={styles.input}
					name="creditcart"
					label="Credit Card Number"
					placeholder="4747 **** **** ****"
					/>
					<Text style={{color:iOSColors.white}}>Expiration</Text>
					<TextInput
					style={styles.input}
					name="date"
					label="Expiration"
					placeholder="12/23"
					/>
					<Text style={{color:iOSColors.white}}>Security Number</Text>
					<TextInput
					style={styles.input}
					name="cvv"
					label="Security Number"
					placeholder="456"
					/>
					<Text style={{color:iOSColors.white}}>Card Owner</Text>
					<TextInput
					style={styles.input}
					name="owner"
					label="Card Owner"
					placeholder="Jesus Christ"
					/>
					<Text style={{marginHorizontal:20, fontWeight:'bold'}}>Total:</Text>
					<Text style={styles.center}>{(this.props.navigation.state.params.price /100).toFixed(2)} €</Text>
				</View>
			</KeyboardAvoidingView>
		);
	}
}