import React, { Component } from 'react';
import { 
	Button, 
	KeyboardAvoidingView, 
	View, 
	Text, 
	StyleSheet, 
	ScrollView, 
	Image,
	TextInput,
	TouchableOpacity
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { iOSColors } from 'react-native-typography';
import axios from 'axios';

const styles = StyleSheet.create({
	container: {
		// flex: 1,
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

class Search extends Component {

	
	constructor(props) {
		super(props);

		this.state = {
			components: [],
			search: "",
			result: "",
		};
	}

	handleChange = search => {
		this.setState({search});
		this.setState({text: ""});

		axios.get(`http://192.168.0.13:8000/api/mobile?label=${search}`)
		.then((res) => {
			this.setState({components: res.data});
			console.log(res.data);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container}>
				<View style={{marginTop:20}}>
					<SearchBar
					placeholder="Search ..."
					onChangeText={this.handleChange.bind(this)}
					/>
				</View>
				{ this.state.components.map((item, i) =>
					<TouchableOpacity key={i} style={styles.components}
					onPress={() => {
						this.props.navigation.navigate('Details', {id: item.id})
						// console.log(this.props);
						}}
					>
						<Image 
						style={{height: 90, width: 90, flex: 0, borderRadius: 10, marginRight: 10}}
						source={{uri: `https://www.topachat.com${item.img200x200}`}}
						/>
						<View>
							<Text style={{fontWeight: "bold"}}> {item.label} </Text>
							<Text> {item.sublabel} </Text>
							<Text style={{fontWeight: "bold", color: iOSColors.green}}> {(item.sortValue.prix / 100).toFixed(2)}€ </Text>
						</View>
					</TouchableOpacity>)
				}
			</ScrollView>
		);
	}
}

export default Search;