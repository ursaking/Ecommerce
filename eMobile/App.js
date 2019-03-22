import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { iOSColors } from 'react-native-typography';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from "./Components/Home/Index";
import Component from "./Components/Component/Index";
import Profile from "./Components/Profile/Profile";
import Cart from "./Components/Cart/Index";
import Search from "./Components/Search/Search";


const API_URL = "http://192.168.0.13";

class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Tabs />
			</View>	
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const Tabs = createBottomTabNavigator({
	Home: Home,
	Search: Search,
	Cart: Cart,
	Profile: Profile,
},
{
	defaultNavigationOptions: ({ navigation }) => ({
		tabBarIcon: ({ focused, horizontal, tintColor }) => {
			const { routeName } = navigation.state;
			let iconName;
			if (routeName === 'Home') {
				iconName = "ios-home";
			} else if (routeName === 'Search') {
				iconName = "md-search";
			} else if (routeName === 'Cart') {
				iconName = "md-cart";
			} else if (routeName === 'Profile') {
				iconName = "md-person";
			}

			return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
		},
	}),
	tabBarOptions: {
		activeTintColor: iOSColors.tealBlue,
		inactiveTintColor: 'gray',
	},
});

export default createAppContainer(Tabs);