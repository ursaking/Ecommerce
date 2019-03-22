import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import Home from '../Component/Index';
import Details from '../Component/Details';


export default createStackNavigator(
	{
		Home: Home,
		Details: Details,
	}, {
		initialRouteName: "Home"
	}
);