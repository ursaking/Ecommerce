import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import Search from './Search';
import Details from '../Component/Details';


export default createStackNavigator(
	{
		Search: Search,
		Details: Details,
	}, {
		initialRouteName: "Search"
	}
);