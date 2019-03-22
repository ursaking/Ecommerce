import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import Cart from './Cart';
import Paypal from './Paypal';


export default createStackNavigator(
	{
		Cart: Cart,
		Paypal: Paypal,
	}, {
		initialRouteName: "Cart"
	}
);