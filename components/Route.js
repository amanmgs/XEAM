import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import Home from './Home';
import Weather from './Weather';


const Route = createStackNavigator(
  { 
	Home:Home,
	Weather:Weather,
  },
  {
  headerMode: 'none',
  }
);

export default createAppContainer(Route);