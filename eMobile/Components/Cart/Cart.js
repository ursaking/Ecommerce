import React, { Component } from 'react';
import {
	View,
	Text,
	Button,
	StyleSheet,
	Image,
	AsyncStorage,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import axios from "axios";
import { iOSColors } from 'react-native-typography';


const styles = StyleSheet.create({
	container: {
		// flex: 1,
		backgroundColor: "#1a1c1e",
		marginTop: 30,
	},
	center: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 20,
	},
	text: {
		color: iOSColors.gray,
	},
	components: {
		flex: 1,
		backgroundColor: iOSColors.customGray,
		borderRadius: 15,
		// height: 100,
		padding: 5,
		margin: 5,
		borderWidth: 2,
		flexDirection: 'row',
		borderColor: iOSColors.black,
	}
});

class Cart extends Component {

	constructor(props) {
		super(props);

		this.state = {
			basket: [],
		};
		this.getBasket = this.getBasket.bind(this)
		this.handleBuy = this.handleBuy.bind(this)
		this.getBasket();
	};

	async getBasket() {
		// await AsyncStorage.removeItem('basket');
		let basket = JSON.parse(await AsyncStorage.getItem('basket'));
		if (basket == null || basket.length === 0) {
			basket = new Array();
		}
		// console.log(basket)
		this.setState({basket});
	};

	handleBuy = () => {
		var price = 0;
		this.state.basket.map(c => {
			price += c.sortValue.prix;
		});

		axios.post("http://192.168.0.13:8000/api/order", {
			token: "192.168.0.11",
			basket: this.state.basket,
			price: price	
		})
		.then(res => {
			this.props.navigation.navigate('Paypal', {price: price})
		})
		.catch(err => {

		})
	};
	
	static navigationOptions = {
		title: "Cart",
		headerStyle: {
			backgroundColor: iOSColors.tealBlue,
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	};

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<Button
				title="Buy"
				color={iOSColors.green}
				onPress={this.handleBuy}
				/>
				{ this.state.basket.map((item, i) =>
					<TouchableOpacity key={i} style={styles.components}
					onPress={() => {
						this.props.navigation.navigate('Details', {id: item.id})
						// console.log(this.props);
						}}
					>
						{console.log(item.sortValue)}
						<Image 
						style={{height: 90, width: 90, flex: 0, borderRadius: 10, marginRight: 10}}
						source={{uri: `https://www.topachat.com${item.img200x200}`}}
						/>
						<View>
							<Text style={{fontWeight: "bold"}}> {item.label} </Text>
							<Text> {item.sublabel} </Text>
							<Text style={{fontWeight: "bold", fontSize: 25, color: iOSColors.green}}> {( item.sortValue.prix / 100).toFixed(2)}€ </Text>
						</View>
					</TouchableOpacity>)
				}
			</ScrollView>
		);
	}
}

export default Cart;