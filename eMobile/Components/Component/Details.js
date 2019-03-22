import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity,
	Dimensions,
	Button,
	AsyncStorage,
} from 'react-native';

import { iOSColors } from 'react-native-typography';
import axios from 'axios';

const styles = StyleSheet.create({
	container: {
		backgroundColor: iOSColors.customGray,
		paddingTop: 20,
	},
	components: {
		flex: 1,
		backgroundColor: iOSColors.customGray,
		borderRadius: 15,
		padding: 5,
		margin: 5,
		borderWidth: 2,
		flexDirection: 'row',
		borderColor: iOSColors.black,
	}
});

class Details extends Component {

	constructor(props) {
		super(props);

		this.state = {
			component: {},
			sortValue: {},
		};
		this.getComponent();
		this.handleAdd = this.handleAdd.bind(this)
	}

	getComponent = () => {
		axios.get(`http://192.168.0.13:8000/api/component/${this.props.navigation.state.params.id}`)
		.then((res) => {
			this.setState({component: res.data});
			this.setState({sortValue: res.data.sortValue});
		})
		.catch((err) => {
			console.log(err);
		})
	};

	async handleAdd() {
				console.log(this.state)
		try {
			let basket = JSON.parse(await AsyncStorage.getItem('basket'));
			if (basket == null || basket.length === 0) {
				basket = new Array();
				basket.push(this.state.component);
			} else {
				basket.push(this.state.component);
			}
			await AsyncStorage.setItem("basket", JSON.stringify(basket));
		} catch (error) {
			console.log("error store:", error);
		}
	}
	
	static navigationOptions = {
		title: "Details",
		headerStyle: {
			backgroundColor: iOSColors.tealBlue,
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	};

	render() {
		const { component, sortValue } = this.state;
		// console.log(component);
		var {height, width} = Dimensions.get('window');
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<Image 
				style={{height: width, width: width, flex: 0, borderRadius: 10, marginRight: 10}}
				source={{uri: `https://www.topachat.com${component.img500x500}`}}
				/>
				<View>
					<Text style={{fontWeight: "bold"}}>Title : {component.label} </Text>
					<Text style={{fontWeight: "bold"}}>Brand : {component.brand} </Text>
					<Text style={{fontWeight: "bold"}}>Description :</Text>
					<Text> {component.sublabel} </Text>
					<Text style={{fontWeight: "bold"}}>Avis : {sortValue.avis} </Text>
					<Text> 
					 </Text>
					 <Text style={{fontWeight: "bold", fontSize:25}}>Price :</Text>
					<Text style={{fontWeight: "bold", fontSize: 25, color: iOSColors.green}}> {( sortValue.prix / 100).toFixed(2)}€ </Text>
					<Button 
					title="Add to Cart"
					color={iOSColors.green}
					onPress={this.handleAdd}
					/>
				</View>
			</ScrollView>
		);
	}
}

export default Details;